import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Dot, BarChart, Bar, Cell,
} from 'recharts';
import {
  AlertTriangle, ChevronRight, Flame, TrendingUp,
  GraduationCap, Clock, Zap,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById, getLevel2Topics, getLevel3Topics } from '../data/topics';
import { universitySubjects } from '../data/subjects';
import { getDailyAccuracy, getWeakTopics, getAccuracyTextClass } from '../utils/stats';
import {
  getBoardReadinessScore, getReadinessBand,
  getFalseConfidenceTopics, getPredictedScore,
} from '../utils/adaptive';
import AccuracyBadge from '../components/AccuracyBadge';

// ── Helpers ────────────────────────────────────────────────────────────────
function computeStreak(attempts) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const day = new Date(today); day.setDate(today.getDate() - i); day.setHours(0, 0, 0, 0);
    const next = new Date(day); next.setDate(day.getDate() + 1);
    if (!attempts.some((a) => { const t = new Date(a.timestamp); return t >= day && t < next; })) break;
    streak++;
  }
  return streak;
}

function computeCategoryAcc(topicStats, cat) {
  const topics = getLevel2Topics().filter((t) => t.category === cat);
  if (!topics.length) return null;
  const withData = topics.filter((t) => topicStats[t.id]?.attempts > 0);
  if (!withData.length) return null;
  return Math.round(withData.reduce((s, t) => s + (topicStats[t.id]?.accuracy ?? 0), 0) / withData.length);
}

function SectionLabel({ children }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{children}</p>;
}

// ── Section 1: Board Readiness Ring ───────────────────────────────────────
function ReadinessSection({ score, band, predicted }) {
  const radius = 52;
  const circ   = 2 * Math.PI * radius;
  const fill   = (Math.min(score, 100) / 100) * circ;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <SectionLabel>Board Readiness Score</SectionLabel>

      <div className="flex items-center gap-4">
        {/* Ring */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="9" />
            <circle cx="60" cy="60" r={radius} fill="none" stroke={band.color}
              strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${fill} ${circ}`}
              className="transition-all duration-700" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-black ${band.textClass}`}>{score}</span>
            <span className="text-[9px] text-gray-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* right panel */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${band.textClass} mb-1`}>{band.label}</p>
          <p className="text-xs text-gray-400 mb-3">Top 1 target ≥ 80</p>

          <div className="space-y-2">
            {[
              { cat: 'MSTE', sc: predicted.MSTE, clr: 'bg-primary' },
              { cat: 'HGE',  sc: predicted.HGE,  clr: 'bg-accent'  },
              { cat: 'SEC',  sc: predicted.SEC,   clr: 'bg-success' },
            ].map(({ cat, sc, clr }) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-500 w-8 shrink-0">{cat}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  {sc !== null && (
                    <div className={`h-full rounded-full ${clr} transition-all duration-500`}
                      style={{ width: `${sc}%` }} />
                  )}
                </div>
                <span className={`text-[10px] font-bold w-7 text-right tabular-nums
                  ${sc !== null ? getAccuracyTextClass(sc) : 'text-gray-300'}`}>
                  {sc !== null ? `${sc}%` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* band pills */}
      <div className="flex gap-1.5 mt-4 pt-3 border-t border-gray-50 flex-wrap">
        {[
          { min: 0,  max: 39,  label: 'Critical',    c: 'bg-danger/10  text-danger'  },
          { min: 40, max: 59,  label: 'Needs Work',  c: 'bg-warning/10 text-warning' },
          { min: 60, max: 79,  label: 'On Track',    c: 'bg-accent/10  text-accent'  },
          { min: 80, max: 100, label: 'Top 1 Pace',  c: 'bg-success/10 text-success' },
        ].map(({ min, max, label, c }) => (
          <span key={label}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c}
              ${score >= min && score <= max ? 'ring-2 ring-offset-1 ring-current' : 'opacity-50'}`}>
            {min}–{max === 100 ? '100' : max}: {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section 2: 30-Day Accuracy Trend ──────────────────────────────────────
function AccuracyTrend({ attempts }) {
  const data = getDailyAccuracy(attempts, 30);
  const hasData = data.some((d) => d.accuracy !== null);

  // Only show every 5th label to avoid crowding
  const xFormatter = (_, idx) => (idx % 5 === 0 ? data[idx]?.date ?? '' : '');

  function AccTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    if (d.accuracy === null) return null;
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-md text-xs">
        <p className="font-bold text-primary">{label}</p>
        <p className="text-success font-semibold">{d.accuracy}% accuracy</p>
        <p className="text-gray-400">{d.count} problems</p>
      </div>
    );
  }

  function NullDot(props) {
    const { cx, cy, payload } = props;
    if (payload.accuracy === null) return <Dot cx={cx} cy={cy} r={0} />;
    return <Dot cx={cx} cy={cy} r={3} fill="#2a9d8f" stroke="white" strokeWidth={1.5} />;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <SectionLabel>30-Day Accuracy Trend</SectionLabel>

      {!hasData ? (
        <div className="h-[100px] flex flex-col items-center justify-center gap-2">
          <TrendingUp size={28} className="text-gray-200" />
          <p className="text-sm text-gray-300">Practice more to see your trend</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
            <XAxis dataKey="date" tickFormatter={xFormatter}
              tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false}
              tick={{ fontSize: 9, fill: '#9ca3af' }} />
            <Tooltip content={<AccTooltip />} />
            {/* Pass threshold */}
            <ReferenceLine y={70} stroke="#f4a261" strokeDasharray="4 3" strokeWidth={1.5}
              label={{ value: 'Pass', position: 'insideTopRight', fontSize: 9, fill: '#f4a261', fontWeight: 700 }} />
            {/* Top 1 line */}
            <ReferenceLine y={90} stroke="#2a9d8f" strokeDasharray="4 3" strokeWidth={1.5}
              label={{ value: 'Top 1', position: 'insideTopRight', fontSize: 9, fill: '#2a9d8f', fontWeight: 700 }} />
            <Line
              type="monotone" dataKey="accuracy" stroke="#2a9d8f" strokeWidth={2}
              dot={<NullDot />} activeDot={{ r: 5, fill: '#2a9d8f' }}
              connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="flex gap-4 mt-1 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-4 border-t-2 border-dashed border-warning" />
          <span className="text-[10px] text-gray-400">70% Pass</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 border-t-2 border-dashed border-success" />
          <span className="text-[10px] text-gray-400">90% Top 1</span>
        </div>
      </div>
    </div>
  );
}

// ── Section 3: False Confidence Zones ─────────────────────────────────────
function FalseConfidenceSection({ attempts, topicStats, navigate, setCurrentSession }) {
  const topics = useMemo(() => getFalseConfidenceTopics(attempts, topicStats), [attempts, topicStats]);

  if (topics.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <SectionLabel>False Confidence Zones</SectionLabel>
      <div className="flex flex-col items-center gap-2 py-3 text-center">
        <span className="text-2xl">✅</span>
        <p className="text-sm text-gray-500 font-medium">No false confidence zones detected</p>
        <p className="text-xs text-gray-400">You need ≥5 timed attempts per topic to detect gaps</p>
      </div>
    </div>
  );

  return (
    <div className="bg-warning/8 border border-warning/25 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle size={15} className="text-warning" />
        <SectionLabel>⚠ False Confidence Zones</SectionLabel>
      </div>
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        You score fine untimed — but <span className="font-bold text-warning">drop significantly under time pressure</span>. These will cost points on exam day:
      </p>
      <div className="space-y-2.5 mb-3">
        {topics.slice(0, 5).map((t) => {
          const topic = getTopicById(t.topicId);
          return (
            <button
              key={t.topicId}
              onClick={() => navigate(`/topic/${t.topicId}`)}
              className="w-full flex items-center gap-3 active:opacity-70"
            >
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-semibold text-gray-700 truncate">{topic?.name ?? t.topicId}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-gray-400">
                    Untimed: <span className="font-bold text-success">{t.untimedAccuracy}%</span>
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Timed: <span className="font-bold text-danger">{t.timedAccuracy}%</span>
                  </span>
                  <span className="text-[10px] font-bold text-danger">−{t.gap}pp</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          setCurrentSession({ topicId: topics[0].topicId, mode: 'mini_test', totalQuestions: 10 });
          navigate('/practice/session');
        }}
        className="w-full bg-warning text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <Zap size={14} /> Train Worst Zone Now
      </button>
    </div>
  );
}

// ── Section 4: Category Accuracy Bars ─────────────────────────────────────
function CategoryBreakdown({ topicStats }) {
  const cats = [
    { id: 'MSTE', label: 'Math, Surveying & Transport', color: '#1d3557' },
    { id: 'HGE',  label: 'Hydraulics & Geotechnical',  color: '#457b9d' },
    { id: 'SEC',  label: 'Structural & Construction',   color: '#2a9d8f' },
  ].map((c) => ({ ...c, acc: computeCategoryAcc(topicStats, c.id) }));

  // L3 mastery breakdown per category
  const l3Stats = (cat) => {
    const all = getLevel3Topics().filter((t) => t.category === cat);
    let mastered = 0, developing = 0, weak = 0, untested = 0;
    all.forEach((t) => {
      const s = topicStats[t.id];
      if (!s) { untested++; return; }
      if (s.accuracy > 85) mastered++;
      else if (s.accuracy >= 70) developing++;
      else weak++;
    });
    return { mastered, developing, weak, untested, total: all.length };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <SectionLabel>Category Breakdown</SectionLabel>
      <div className="space-y-5">
        {cats.map(({ id, label, color, acc }) => {
          const { mastered, developing, weak, untested, total } = l3Stats(id);
          const mPct = total ? (mastered   / total) * 100 : 0;
          const dPct = total ? (developing / total) * 100 : 0;
          const wPct = total ? (weak       / total) * 100 : 0;
          return (
            <div key={id}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-xs font-bold" style={{ color }}>{id}</span>
                  <span className="text-[10px] text-gray-400 ml-1.5">{label}</span>
                </div>
                <span className={`text-xs font-bold tabular-nums ${acc !== null ? getAccuracyTextClass(acc) : 'text-gray-300'}`}>
                  {acc !== null ? `${acc}%` : 'Untested'}
                </span>
              </div>

              {/* accuracy bar with markers */}
              <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                {acc !== null && (
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${acc}%`, backgroundColor: color }} />
                )}
                <div className="absolute top-0 h-full w-px bg-warning/50" style={{ left: '70%' }} />
                <div className="absolute top-0 h-full w-px bg-success/80" style={{ left: '90%' }} />
              </div>

              {/* L3 stacked mini bar */}
              <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
                <div className="bg-success transition-all" style={{ width: `${mPct}%` }} />
                <div className="bg-warning transition-all" style={{ width: `${dPct}%` }} />
                <div className="bg-danger  transition-all" style={{ width: `${wPct}%` }} />
                <div className="bg-gray-100 flex-1" />
              </div>
              <div className="flex gap-3 mt-1">
                <span className="text-[9px] text-success">{mastered} mastered</span>
                <span className="text-[9px] text-warning">{developing} developing</span>
                <span className="text-[9px] text-danger">{weak} weak</span>
                <span className="text-[9px] text-gray-300">{untested} untested</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section 5: Weak Topics ─────────────────────────────────────────────────
function WeakTopicsSection({ topicStats, navigate, setCurrentSession }) {
  const weak = getWeakTopics(topicStats, 6);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <SectionLabel>Weakest Topics</SectionLabel>
      </div>
      {weak.length === 0 ? (
        <div className="text-center py-3">
          <p className="text-sm text-success font-semibold">No topics below 70% 🎉</p>
          <p className="text-xs text-gray-400 mt-1">Keep drilling to maintain mastery!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {weak.map((s) => {
            const topic = getTopicById(s.topicId);
            return (
              <div key={s.topicId} className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/topic/${s.topicId}`)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-xs font-semibold text-gray-700 truncate">{topic?.name ?? s.topicId}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <AccuracyBadge accuracy={s.accuracy} />
                    <span className="text-[10px] text-gray-400">{s.attempts} attempts</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setCurrentSession({ topicId: s.topicId, mode: 'mini_test', totalQuestions: 10 });
                    navigate('/practice/session');
                  }}
                  className="shrink-0 text-xs font-bold text-white bg-primary px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                >
                  Drill
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Section 6: Exam History ────────────────────────────────────────────────
function ExamHistorySection({ examResults, navigate }) {
  const recent = [...examResults].reverse().slice(0, 10);

  if (recent.length === 0) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <SectionLabel>Exam History</SectionLabel>
      <p className="text-sm text-gray-400 text-center py-2">No exams taken yet.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <SectionLabel>Exam History</SectionLabel>
      <div className="space-y-2">
        {recent.map((exam) => {
          const pct  = exam.overall ?? 0;
          const isPassing = pct >= 70;
          const isElite   = pct >= 90;
          return (
            <div key={exam.id} className="flex items-center gap-3 py-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700">{exam.type ?? 'Exam'}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isElite ? 'bg-success/10 text-success' :
                    isPassing ? 'bg-accent/10 text-accent' :
                    'bg-danger/10 text-danger'}`}>
                    {isElite ? 'Top 1 Pace' : isPassing ? 'Passing' : 'Below Pass'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {exam.questionCount ?? '—'} items ·{' '}
                  {exam.date ? new Date(exam.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }) : ''}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-lg font-black tabular-nums ${getAccuracyTextClass(pct)}`}>{pct}%</p>
                {exam.scoreMste !== null && (
                  <p className="text-[9px] text-gray-400 tabular-nums">
                    M:{exam.scoreMste}% H:{exam.scoreHge ?? '—'}% S:{exam.scoreSec ?? '—'}%
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Overview chips ─────────────────────────────────────────────────────────
function OverviewChips({ attempts, topicStats, examResults }) {
  const streak      = computeStreak(attempts);
  const totalProbs  = attempts.length;
  const l3Attempted = getLevel3Topics().filter((t) => topicStats[t.id]?.attempts > 0).length;
  const l3Total     = getLevel3Topics().length;
  const overallAcc  = useMemo(() => {
    if (!attempts.length) return null;
    const correct = attempts.filter((a) => a.correct).length;
    return Math.round((correct / attempts.length) * 100);
  }, [attempts]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { value: totalProbs,             label: 'Problems Done',  icon: '📝', color: 'text-primary' },
        { value: streak ? `${streak}d`  : '—', label: 'Day Streak', icon: '🔥', color: 'text-warning' },
        { value: `${l3Attempted}/${l3Total}`, label: 'Topics Tested', icon: '🗺', color: 'text-accent' },
        { value: overallAcc !== null ? `${overallAcc}%` : '—', label: 'Overall Acc.', icon: '🎯',
          color: overallAcc !== null ? getAccuracyTextClass(overallAcc) : 'text-gray-300' },
      ].map(({ value, label, icon, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div>
            <p className={`text-lg font-black tabular-nums ${color}`}>{value}</p>
            <p className="text-[10px] text-gray-400 font-medium">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function StatsScreen() {
  const navigate = useNavigate();
  const { attempts, topicStats, examResults, enrolledSubjectIds, setCurrentSession } = useStore();

  const readinessScore  = useMemo(() => getBoardReadinessScore(attempts, topicStats, enrolledSubjectIds), [attempts, topicStats, enrolledSubjectIds]);
  const readinessBand   = useMemo(() => getReadinessBand(readinessScore), [readinessScore]);
  const predictedScores = useMemo(() => getPredictedScore(attempts, topicStats), [attempts, topicStats]);

  return (
    <div className="min-h-screen bg-gray-50 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <h1 className="text-white text-xl font-bold">Performance Intelligence</h1>
        <p className="text-white/60 text-xs mt-0.5">Your complete board exam readiness picture</p>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ── Overview ── */}
        <OverviewChips attempts={attempts} topicStats={topicStats} examResults={examResults} />

        {/* ── Board Readiness Ring ── */}
        <ReadinessSection score={readinessScore} band={readinessBand} predicted={predictedScores} />

        {/* ── 30-Day Accuracy Trend ── */}
        <AccuracyTrend attempts={attempts} />

        {/* ── False Confidence Zones ── */}
        <FalseConfidenceSection
          attempts={attempts}
          topicStats={topicStats}
          navigate={navigate}
          setCurrentSession={setCurrentSession}
        />

        {/* ── Category Breakdown ── */}
        <CategoryBreakdown topicStats={topicStats} />

        {/* ── Weakest Topics ── */}
        <WeakTopicsSection
          topicStats={topicStats}
          navigate={navigate}
          setCurrentSession={setCurrentSession}
        />

        {/* ── Exam History ── */}
        <ExamHistorySection examResults={examResults} navigate={navigate} />

      </div>
    </div>
  );
}
