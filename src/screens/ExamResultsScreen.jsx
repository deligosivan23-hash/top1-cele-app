import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, RotateCcw, TrendingUp, Award, AlertCircle,
  ChevronDown, ChevronUp, AlertTriangle, Plus, CheckCircle,
} from 'lucide-react';
import { getTopicById } from '../data/topics';
import { useStore } from '../store/useStore';
import { getAccuracyTextClass, getAccuracyBgClass } from '../utils/stats';

// ── Helpers ────────────────────────────────────────────────────────────────
function getRank(pct) {
  if (pct >= 90) return { label: '🏆 Top 1 Pace',  color: 'text-success', bg: 'bg-teal-50  border-success/30' };
  if (pct >= 80) return { label: '💪 On Track',     color: 'text-accent',  bg: 'bg-blue-50  border-accent/30'  };
  if (pct >= 70) return { label: '✅ Passing',       color: 'text-warning', bg: 'bg-amber-50 border-warning/30' };
  return               { label: '⚠ Needs Work',    color: 'text-danger',  bg: 'bg-red-50   border-danger/30'  };
}

function ScoreCircle({ overall }) {
  const radius = 52;
  const circ   = 2 * Math.PI * radius;
  const fill   = (overall / 100) * circ;
  const stroke = overall >= 90 ? '#2a9d8f' : overall >= 70 ? '#f4a261' : '#e63946';
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke={stroke} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${fill} ${circ}`} className="transition-all duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black ${getAccuracyTextClass(overall)}`}>{overall}%</span>
        <span className="text-[10px] text-gray-400 font-medium mt-0.5">Overall</span>
      </div>
    </div>
  );
}

function SubjectBar({ label, score, color }) {
  if (score === null || score === undefined) return null;
  const bar = score >= 85 ? 'bg-success' : score >= 70 ? 'bg-warning' : 'bg-danger';
  // Pass/Top1 markers
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${color}`}>{label}</span>
        <span className={`text-xs font-semibold ${getAccuracyTextClass(score)}`}>{score}%</span>
      </div>
      <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${bar} transition-all duration-500`} style={{ width: `${score}%` }} />
        {/* 70% pass line */}
        <div className="absolute top-0 h-full w-px bg-warning/60" style={{ left: '70%' }} />
        {/* 90% top-1 line */}
        <div className="absolute top-0 h-full w-px bg-success/80" style={{ left: '90%' }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5 px-0.5">
        <span />
        <span style={{ marginLeft: '65%' }}>Pass</span>
        <span style={{ marginLeft: '8%' }}>Top 1</span>
      </div>
    </div>
  );
}

// ── Wrong answer review card ───────────────────────────────────────────────
function WrongCard({ qResult, number }) {
  const [open, setOpen] = useState(false);
  const { question: q, selected, correct } = qResult;
  if (!q || correct) return null;

  const correctLabel = q.choices?.[q.answerIndex]?.replace(/^[A-D]\.\s*/, '') ?? '—';
  const yourLabel    = selected !== null && selected !== undefined
    ? (q.choices?.[selected]?.replace(/^[A-D]\.\s*/, '') ?? '?')
    : 'No answer';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="w-7 h-7 rounded-full bg-danger/10 text-danger text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 leading-snug line-clamp-2">{q.stem}</p>
          <p className="text-xs text-danger mt-1 font-medium">Your answer: {yourLabel}</p>
        </div>
        <span className="text-gray-400 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 border-t border-gray-100 space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Correct Answer</p>
            <p className="text-sm text-success font-semibold">
              {String.fromCharCode(65 + q.answerIndex)}. {correctLabel}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Solution</p>
            <p className="text-sm text-gray-700 leading-relaxed">{q.solution}</p>
          </div>
          {q.trap && (
            <div className="flex items-start gap-2 bg-warning/5 rounded-xl px-3 py-2.5">
              <AlertTriangle size={13} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-warning">Trap: </span>{q.trap}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function ExamResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentSession, generateDailyPlan } = useStore();

  const result = location.state?.result ?? null;

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-6 text-center">
        <AlertCircle size={40} className="text-gray-300 mb-4" />
        <h2 className="text-lg font-bold text-primary mb-2">No Exam Data</h2>
        <p className="text-sm text-gray-400 mb-6">Start an exam from the Exam tab to see results here.</p>
        <button onClick={() => navigate('/exam')} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm">
          Go to Exam Setup
        </button>
      </div>
    );
  }

  const {
    overall, scoreMste, scoreHge, scoreSec,
    totalCorrect, questionCount, type, durationMinutes,
    weakTopics, questionResults, byCat,
  } = result;

  const rank      = getRank(overall);
  const typeLabel = type === 'Full' ? 'Full Board' : `${type} Subject`;
  const wrongResults = (questionResults ?? []).filter((r) => !r.correct);

  // "Add weak topics to practice plan" — enqueues a daily plan refresh
  const [addedToPlan, setAddedToPlan] = useState(false);
  function handleAddToPlan() {
    generateDailyPlan();
    setAddedToPlan(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-36">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <p className="text-white/60 text-xs mb-1 uppercase tracking-wider font-medium">{typeLabel} Exam</p>
        <h1 className="text-white text-xl font-bold">Exam Results</h1>
        <p className="text-white/50 text-xs mt-0.5">
          {questionCount} questions · {durationMinutes} min used
        </p>
      </div>

      <div className="px-4 -mt-3 space-y-4 pt-1">

        {/* ── Score + rank card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <ScoreCircle overall={overall} />

          {/* Pass / Top-1 verdict */}
          <div className="flex flex-col items-center mt-3 gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${rank.bg} ${rank.color}`}>
              {rank.label}
            </span>
            <div className="flex gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-warning inline-block" />70% passing
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success inline-block" />90% Top 1
              </span>
            </div>
          </div>

          {/* Correct / wrong grid */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-success">{totalCorrect}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-danger">{questionCount - totalCorrect}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Wrong</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-gray-700">{durationMinutes}m</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Used</p>
            </div>
          </div>
        </div>

        {/* ── Subject breakdown ── */}
        {(scoreMste !== null || scoreHge !== null || scoreSec !== null) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-accent" />
              <h2 className="text-sm font-bold text-primary">Subject Breakdown</h2>
            </div>
            <div className="space-y-5">
              <SubjectBar label="MSTE" score={scoreMste} color="text-primary" />
              <SubjectBar label="HGE"  score={scoreHge}  color="text-accent"  />
              <SubjectBar label="SEC"  score={scoreSec}  color="text-success" />
            </div>
          </div>
        )}

        {/* ── Weak topics this exam ── */}
        {weakTopics && weakTopics.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-danger" />
                <h2 className="text-sm font-bold text-primary">Weak Topics This Exam</h2>
              </div>
              <button
                onClick={handleAddToPlan}
                disabled={addedToPlan}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                  addedToPlan
                    ? 'bg-success/10 text-success'
                    : 'bg-primary/10 text-primary active:bg-primary/20'
                }`}
              >
                {addedToPlan
                  ? <><CheckCircle size={12} /> Added!</>
                  : <><Plus size={12} /> Add to Plan</>}
              </button>
            </div>
            <div className="space-y-2">
              {weakTopics.map((area) => {
                const topic = getTopicById(area.topicId);
                const bgCls = getAccuracyBgClass(area.accuracy);
                return (
                  <button
                    key={area.topicId}
                    onClick={() => navigate(`/topic/${area.topicId}`)}
                    className="w-full flex items-center justify-between py-2 px-0 text-left active:opacity-70"
                  >
                    <div className="flex-1 mr-3 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{topic?.name ?? area.topicId}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {area.correct}/{area.total} correct
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bgCls} text-white flex-shrink-0`}>
                      {area.accuracy}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Rank / context card ── */}
        <div className={`rounded-2xl border p-4 ${rank.bg}`}>
          <div className="flex items-start gap-3">
            <Award size={18} className={`${rank.color} mt-0.5 shrink-0`} />
            <div>
              <p className={`text-sm font-bold ${rank.color}`}>Performance Context</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {overall >= 90 && 'Scores ≥ 90% historically place in Top 10 of CELE. This is elite performance — maintain this consistency.'}
                {overall >= 80 && overall < 90 && 'Scores 80–89% are competitive but not yet Top 1 pace. Identify the 10% gap and drill it daily.'}
                {overall >= 70 && overall < 80 && 'Scores 70–79% are in the passing range. You need 20+ more percentage points to realistically chase Top 1.'}
                {overall < 70 && 'Below the 70% passing threshold. Heavy drilling on weak areas is required. Review every wrong answer below.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── Wrong answer review ── */}
        {wrongResults.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
              Wrong Answers — Review All ({wrongResults.length})
            </p>
            <div className="space-y-2">
              {wrongResults.map((r, i) => (
                <WrongCard key={r.question?.id ?? i} qResult={r} number={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky action buttons ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 p-4 flex gap-3 z-20">
        <button
          onClick={() => {
            // Queue weak topic for practice
            if (weakTopics?.[0]) {
              setCurrentSession({ topicId: weakTopics[0].topicId, mode: 'mini_test', totalQuestions: 10 });
              navigate('/practice/session');
            } else {
              navigate('/practice');
            }
          }}
          className="flex-1 py-3.5 rounded-2xl bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <RotateCcw size={15} /> Drill Weak Areas
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Home size={15} /> Home
        </button>
      </div>
    </div>
  );
}
