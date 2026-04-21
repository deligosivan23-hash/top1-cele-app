import { useNavigate, useLocation } from 'react-router-dom';
import { Home, RotateCcw, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { getTopicById } from '../data/topics';
import { getAccuracyTextClass, getAccuracyBgClass } from '../utils/stats';

// ─── Rank logic ──────────────────────────────────────────────────────────────
function getRank(overall) {
  if (overall >= 90) return { label: 'Top 10%', color: 'text-success', bg: 'bg-teal-50 border-success/30' };
  if (overall >= 80) return { label: 'Top 20%', color: 'text-accent',  bg: 'bg-blue-50 border-accent/30'  };
  if (overall >= 70) return { label: 'Top 30%', color: 'text-warning', bg: 'bg-orange-50 border-warning/30' };
  return               { label: 'Needs Work',   color: 'text-danger',  bg: 'bg-red-50 border-danger/30'    };
}

function getPerformanceMsg(overall) {
  if (overall >= 90) return 'Outstanding! Top-shelf performance. 🏆';
  if (overall >= 80) return 'Great work — almost elite range. 💪';
  if (overall >= 70) return 'Solid session. Push past 80% next time.';
  return 'Needs more drilling — focus on weak areas below.';
}

// ─── Big Score Circle ─────────────────────────────────────────────────────────
function ScoreCircle({ overall }) {
  const radius = 52;
  const circ   = 2 * Math.PI * radius;
  const fill   = (overall / 100) * circ;

  let stroke = '#2a9d8f'; // success
  if (overall < 70) stroke = '#e63946';
  else if (overall < 85) stroke = '#f4a261';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${getAccuracyTextClass(overall)}`}>{overall}%</span>
        <span className="text-[10px] text-gray-400 font-medium mt-0.5">Overall</span>
      </div>
    </div>
  );
}

// ─── Subject score bar ────────────────────────────────────────────────────────
function SubjectBar({ label, score, color }) {
  if (score === null) return null;

  const barColor =
    score >= 85 ? 'bg-success' : score >= 70 ? 'bg-warning' : 'bg-danger';

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${color}`}>{label}</span>
        <span className={`text-xs font-semibold ${getAccuracyTextClass(score)}`}>{score}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ExamResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result ?? null;

  // Graceful fallback if navigated to directly
  if (!result) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center pb-24 px-6 text-center">
        <AlertCircle size={40} className="text-gray-300 mb-4" />
        <h2 className="text-lg font-bold text-primary mb-2">No Exam Data</h2>
        <p className="text-sm text-gray-400 mb-6">Start an exam from the Exam tab to see results here.</p>
        <button
          onClick={() => navigate('/exam')}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm"
        >
          Go to Exam Setup
        </button>
      </div>
    );
  }

  const { overall, scoreMste, scoreHge, scoreSec, totalCorrect, questionCount, type, durationMinutes, weakAreas } = result;
  const rank    = getRank(overall);
  const message = getPerformanceMsg(overall);
  const typeLabel = type === 'Full' ? 'Full Board' : type;

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <p className="text-white/60 text-xs mb-1 uppercase tracking-wider font-medium">{typeLabel} Exam</p>
        <h1 className="text-white text-xl font-bold tracking-tight">Exam Results</h1>
        <p className="text-white/50 text-xs mt-0.5">
          {questionCount} questions · {durationMinutes} min
        </p>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* Score + rank card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <ScoreCircle overall={overall} />

          <div className="flex items-center justify-center mt-3 mb-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${rank.bg} ${rank.color}`}>
              {rank.label}
            </span>
          </div>

          <p className="text-sm text-center text-gray-500 font-medium">{message}</p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-surface rounded-xl p-3 text-center">
              <p className="text-xl font-black text-primary">{totalCorrect}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Correct</p>
            </div>
            <div className="bg-surface rounded-xl p-3 text-center">
              <p className="text-xl font-black text-primary">{questionCount - totalCorrect}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Wrong</p>
            </div>
          </div>
        </div>

        {/* Per-subject breakdown */}
        {(scoreMste !== null || scoreHge !== null || scoreSec !== null) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-accent" />
              <h2 className="text-sm font-bold text-primary">Subject Breakdown</h2>
            </div>
            <div className="space-y-3.5">
              <SubjectBar label="MSTE" score={scoreMste} color="text-primary" />
              <SubjectBar label="HGE"  score={scoreHge}  color="text-accent"  />
              <SubjectBar label="SEC"  score={scoreSec}  color="text-success" />
            </div>
          </div>
        )}

        {/* Weak areas */}
        {weakAreas && weakAreas.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-danger" />
              <h2 className="text-sm font-bold text-primary">Weak Areas in This Exam</h2>
            </div>
            <div className="space-y-2">
              {weakAreas.map((area) => {
                const topic = getTopicById(area.topicId);
                const badgeClass = getAccuracyBgClass(area.accuracy);
                return (
                  <div
                    key={area.topicId}
                    className="flex items-center justify-between py-1.5"
                  >
                    <div className="flex-1 mr-3">
                      <p className="text-xs font-medium text-gray-700">{topic?.name ?? area.topicId}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {area.correct}/{area.total} correct
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                      {area.accuracy}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rank info card */}
        <div className={`rounded-2xl border p-4 ${rank.bg}`}>
          <div className="flex items-start gap-3">
            <Award size={18} className={`${rank.color} mt-0.5 shrink-0`} />
            <div>
              <p className={`text-sm font-bold ${rank.color}`}>Estimated Ranking</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {overall >= 90 && 'Scores ≥ 90% historically place in the top 10% of board takers. Excellent work.'}
                {overall >= 80 && overall < 90 && 'Scores 80–89% typically place in the top 20%. You\'re competitive.'}
                {overall >= 70 && overall < 80 && 'Scores 70–79% are passing range. Drill your weak areas to improve your standing.'}
                {overall < 70 && 'Below passing threshold. Focus heavily on weak areas. Consistent daily drilling is the key.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 p-4 flex gap-3">
        <button
          onClick={() => navigate('/practice')}
          className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw size={15} />
          Retrain Weak Areas
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Home size={15} />
          Home
        </button>
      </div>
    </div>
  );
}
