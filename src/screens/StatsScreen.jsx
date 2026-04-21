import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById, getLevel2Topics } from '../data/topics';
import { universitySubjects } from '../data/subjects';
import { getDailyAccuracy, getDailyAvgTime, getWeakTopics } from '../utils/stats';

// ── Helpers ───────────────────────────────────────────────────────────────────
function computeStreak(attempts) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const day = new Date(today); day.setDate(today.getDate() - i); day.setHours(0,0,0,0);
    const next = new Date(day); next.setDate(day.getDate() + 1);
    if (!attempts.some((a) => { const t = new Date(a.timestamp); return t >= day && t < next; })) break;
    streak++;
  }
  return streak;
}

function getRankLabel(overall) {
  if (overall >= 90) return { label: 'Top 10%', cls: 'text-success' };
  if (overall >= 80) return { label: 'Top 20%', cls: 'text-accent' };
  if (overall >= 70) return { label: 'Top 30%', cls: 'text-warning' };
  return { label: 'Needs Work', cls: 'text-danger' };
}

function getBoardRating(acc) {
  if (acc >= 90) return { label: 'Top 1 Pace 🏆', cls: 'text-success', bg: 'bg-success/10 border-success/20' };
  if (acc >= 80) return { label: 'Strong 💪',     cls: 'text-accent',  bg: 'bg-accent/10 border-accent/20' };
  if (acc >= 70) return { label: 'On Track ✓',    cls: 'text-warning', bg: 'bg-warning/10 border-warning/20' };
  return               { label: 'Needs Work ⚠',  cls: 'text-danger',  bg: 'bg-danger/10 border-danger/20' };
}

function computeCategoryAccuracy(topicStats, category) {
  const l2 = getLevel2Topics().filter((t) => t.category === category);
  if (l2.length === 0) return 0;
  const sum = l2.reduce((acc, t) => acc + (topicStats[t.id]?.accuracy ?? 0), 0);
  return Math.round(sum / l2.length);
}

function SectionLabel({ children }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{children}</p>;
}

function AccuracyTooltip({ active, payload, label }) {
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

function TimeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (d.avgTime === null) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-bold text-primary">{label}</p>
      <p className="text-accent font-semibold">{d.avgTime}s avg</p>
      <p className="text-gray-400">{d.count} problems</p>
    </div>
  );
}

function NullAwareDot(props) {
  const { cx, cy, payload, dataKey } = props;
  if (payload[dataKey] === null) return <Dot cx={cx} cy={cy} r={0} />;
  return <Dot cx={cx} cy={cy} r={3} fill={props.fill || '#2a9d8f'} stroke="white" strokeWidth={1.5} />;
}

// ── Board Rating Explainer Sheet ──────────────────────────────────────────────
function RatingExplainerSheet({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] p-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary text-base">Board Rating Explained</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Your <strong>Estimated Board Rating</strong> is the weighted average accuracy across all Level 2 topics in each CELE category.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Topics you haven't practiced yet count as <strong>0%</strong> — this motivates you to cover the full pyramid, not just the topics you like.
        </p>
        <div className="space-y-2">
          {[
            { range: '90%+', label: 'Top 1 Pace', color: 'bg-success', desc: "You're ahead of the curve." },
            { range: '80–89%', label: 'Strong', color: 'bg-accent', desc: "Solid base, keep pushing." },
            { range: '70–79%', label: 'On Track', color: 'bg-warning', desc: "Passing territory, needs polish." },
            { range: '<70%', label: 'Needs Work', color: 'bg-danger', desc: "Below passing threshold." },
          ].map((b) => (
            <div key={b.range} className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${b.color} shrink-0`} />
              <span className="text-xs font-bold text-gray-700 w-16">{b.range}</span>
              <span className="text-xs font-semibold text-gray-600">{b.label}</span>
              <span className="text-xs text-gray-400 flex-1">{b.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main StatsScreen ──────────────────────────────────────────────────────────
export default function StatsScreen() {
  const navigate = useNavigate();
  const { attempts, topicStats, examResults, enrolledSubjectIds, customSubjects } = useStore();
  const [showRatingExplainer, setShowRatingExplainer] = useState(false);

  const examCount = examResults.length;
  const bestExam  = examCount > 0 ? Math.max(...examResults.map((e) => e.overall ?? 0)) : null;
  const streak    = computeStreak(attempts);

  const accuracyData = getDailyAccuracy(attempts, 14);
  const timeData     = getDailyAvgTime(attempts, 14);

  const allLevel2 = getLevel2Topics();
  let needsWork = 0, developing = 0, mastered = 0;
  allLevel2.forEach((t) => {
    const s = topicStats[t.id];
    if (!s) { needsWork++; return; }
    if (s.accuracy > 85) mastered++;
    else if (s.accuracy >= 70) developing++;
    else needsWork++;
  });
  const total   = allLevel2.length;
  const masterPct = total > 0 ? (mastered   / total) * 100 : 0;
  const devPct    = total > 0 ? (developing / total) * 100 : 0;
  const needsPct  = total > 0 ? (needsWork  / total) * 100 : 0;

  const weakTopics  = getWeakTopics(topicStats, 5);
  const recentExams = [...examResults].slice(-5).reverse();
  const xTickFormatter = (val, idx) => (idx % 2 === 0 ? val : '');

  // Board Rating
  const msteAcc = computeCategoryAccuracy(topicStats, 'MSTE');
  const hgeAcc  = computeCategoryAccuracy(topicStats, 'HGE');
  const secAcc  = computeCategoryAccuracy(topicStats, 'SEC');
  const overallAcc = Math.round((msteAcc + hgeAcc + secAcc) / 3);
  const rating = getBoardRating(overallAcc);

  // University Coverage
  const allSubjects = useMemo(() => [...universitySubjects, ...(customSubjects ?? [])], [customSubjects]);
  const { unlockedCount, l2Total, topUntouched } = useMemo(() => {
    const ids = new Set();
    allSubjects.filter((s) => enrolledSubjectIds.includes(s.id))
      .forEach((s) => s.coveredTopicIds.forEach((id) => ids.add(id)));
    const l2 = getLevel2Topics();
    const untouched = l2.filter((t) => !topicStats[t.id] && !ids.has(t.id));
    return { unlockedCount: l2.filter((t) => ids.has(t.id)).length, l2Total: l2.length, topUntouched: untouched.slice(0, 2).map((t) => t.name) };
  }, [enrolledSubjectIds, topicStats, allSubjects]);
  const coveragePct = l2Total > 0 ? Math.round((unlockedCount / l2Total) * 100) : 0;

  return (
    <div className="min-h-screen bg-surface pb-24 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-xl font-black text-primary tracking-tight">Stats</h1>
      </div>

      <div className="px-4">
        {/* Overview chips */}
        <div className="mt-5">
          <SectionLabel>Overview</SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-primary">{examCount}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Exams Taken</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-success">{bestExam !== null ? `${bestExam}%` : '—'}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Best Exam</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-warning">{streak}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Board Rating Estimator */}
        <div className="mt-5">
          <SectionLabel>Board Rating Estimator</SectionLabel>
          <div className={`bg-white rounded-2xl border shadow-sm p-4 ${rating.bg}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-400 font-medium">Estimated Rating</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-3xl font-black ${rating.cls}`}>{overallAcc}%</span>
                  <span className={`text-sm font-bold ${rating.cls}`}>{rating.label}</span>
                </div>
              </div>
              <button onClick={() => setShowRatingExplainer(true)}
                className="text-xs text-accent font-semibold border border-accent/30 rounded-lg px-2.5 py-1.5 bg-white shrink-0">
                What's this?
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { cat: 'MSTE', acc: msteAcc },
                { cat: 'HGE',  acc: hgeAcc  },
                { cat: 'SEC',  acc: secAcc  },
              ].map(({ cat, acc }) => {
                const r = getBoardRating(acc);
                return (
                  <div key={cat} className="bg-white rounded-xl p-2.5 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{cat}</p>
                    <p className={`text-xl font-black mt-0.5 ${r.cls}`}>{acc}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Accuracy Trend */}
        <div className="mt-5">
          <SectionLabel>14-Day Accuracy</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={accuracyData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={xTickFormatter} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={32} />
                <Tooltip content={<AccuracyTooltip />} />
                <ReferenceLine y={85} stroke="#d1d5db" strokeDasharray="4 3" label={{ value: 'Target', position: 'insideTopRight', fontSize: 9, fill: '#9ca3af' }} />
                <Line type="monotone" dataKey="accuracy" stroke="#2a9d8f" strokeWidth={2} connectNulls={false}
                  dot={<NullAwareDot fill="#2a9d8f" dataKey="accuracy" />} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg Solve Time */}
        <div className="mt-5">
          <SectionLabel>14-Day Avg Solve Time</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={timeData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={xTickFormatter} />
                <YAxis domain={[0, 'auto']} tickFormatter={(v) => `${v}s`} tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={32} />
                <Tooltip content={<TimeTooltip />} />
                <Line type="monotone" dataKey="avgTime" stroke="#457b9d" strokeWidth={2} connectNulls={false}
                  dot={<NullAwareDot fill="#457b9d" dataKey="avgTime" />} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mastery Breakdown */}
        <div className="mt-5">
          <SectionLabel>Mastery Breakdown</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="h-4 rounded-full overflow-hidden flex mb-3">
              {masterPct > 0 && <div className="bg-success h-full" style={{ width: `${masterPct}%` }} />}
              {devPct    > 0 && <div className="bg-warning h-full" style={{ width: `${devPct}%` }} />}
              {needsPct  > 0 && <div className="bg-danger h-full"  style={{ width: `${needsPct}%` }} />}
              {total === 0 && <div className="bg-gray-100 h-full w-full" />}
            </div>
            <div className="flex items-center gap-4 text-xs">
              {[['bg-success','Mastered',mastered],['bg-warning','Developing',developing],['bg-danger','Needs Work',needsWork]].map(([bg,lbl,val]) => (
                <div key={lbl} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${bg} shrink-0`} />
                  <span className="text-gray-600 font-medium">{lbl}</span>
                  <span className="font-bold text-primary">{val}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2">{total} Level 2 topics total</p>
          </div>
        </div>

        {/* Weakest Topics */}
        <div className="mt-5">
          <SectionLabel>Weakest Topics</SectionLabel>
          {weakTopics.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-sm text-success font-semibold">No weak topics under 70% 🎉</p>
              <p className="text-xs text-gray-400 mt-1">Keep up the great work!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {weakTopics.map((s) => {
                const topic = getTopicById(s.topicId);
                return (
                  <div key={s.topicId} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
                    <div className="flex-1 mr-3 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{topic?.name ?? s.topicId}</p>
                      <p className="text-xs text-danger font-bold mt-0.5">{s.accuracy}% accuracy</p>
                    </div>
                    <button onClick={() => navigate(`/practice?topic=${s.topicId}`)}
                      className="shrink-0 text-xs font-bold text-accent border border-accent/30 rounded-lg px-3 py-1.5 bg-accent/5">
                      Train →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* University Coverage */}
        <div className="mt-5">
          <SectionLabel>University Coverage</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎓</span>
              <span className="font-bold text-gray-800 text-sm">Coverage from Enrolled Subjects</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Topics unlocked</span>
              <span className="font-black text-primary">{unlockedCount} / {l2Total}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-success rounded-full transition-all" style={{ width: `${coveragePct}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{enrolledSubjectIds.length} subjects enrolled</span>
              <span className="text-xs font-bold text-success">{coveragePct}% covered</span>
            </div>
            {topUntouched.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Top untouched areas</p>
                <div className="flex flex-wrap gap-1">
                  {topUntouched.map((n) => (
                    <span key={n} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{n}</span>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => navigate('/subjects')}
              className="mt-3 w-full text-xs text-accent font-semibold py-2 rounded-xl border border-accent/30 bg-accent/5">
              Manage Subjects →
            </button>
          </div>
        </div>

        {/* Exam History */}
        <div className="mt-5 mb-2">
          <SectionLabel>Exam History</SectionLabel>
          {recentExams.length === 0 ? (
            <p className="text-sm text-gray-400">No exams taken yet.</p>
          ) : (
            <div className="space-y-2">
              {recentExams.map((exam) => {
                const rank = getRankLabel(exam.overall ?? 0);
                return (
                  <div key={exam.id} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-xs text-gray-400 font-medium">{new Date(exam.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{exam.type ?? 'Mock Exam'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-lg font-black ${rank.cls}`}>{exam.overall ?? '—'}%</p>
                      <p className={`text-[10px] font-bold ${rank.cls}`}>{rank.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showRatingExplainer && <RatingExplainerSheet onClose={() => setShowRatingExplainer(false)} />}
    </div>
  );
}
