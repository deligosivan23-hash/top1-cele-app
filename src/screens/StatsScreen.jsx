import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from 'recharts';
import { useStore } from '../store/useStore';
import { getTopicById, getLevel2Topics } from '../data/topics';
import {
  getDailyAccuracy,
  getDailyAvgTime,
  getWeakTopics,
} from '../utils/stats';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeStreak(attempts) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const hasAttempt = attempts.some((a) => {
      const t = new Date(a.timestamp);
      return t >= day && t < next;
    });
    if (!hasAttempt) break;
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

function formatExamDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
      {children}
    </p>
  );
}

// ─── Custom Tooltip for Accuracy ─────────────────────────────────────────────
function AccuracyTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
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

// ─── Custom Tooltip for Avg Time ─────────────────────────────────────────────
function TimeTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
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

// ─── Custom dot that hides on null ───────────────────────────────────────────
function NullAwareDot(props) {
  const { cx, cy, payload, dataKey } = props;
  if (payload[dataKey] === null) return <Dot cx={cx} cy={cy} r={0} />;
  return <Dot cx={cx} cy={cy} r={3} fill={props.fill || '#2a9d8f'} stroke="white" strokeWidth={1.5} />;
}

// ─── Main StatsScreen ─────────────────────────────────────────────────────────
export default function StatsScreen() {
  const navigate = useNavigate();
  const { attempts, topicStats, examResults } = useStore();

  // ── Section 1: Summary chips ──
  const examCount = examResults.length;
  const bestExam =
    examCount > 0
      ? Math.max(...examResults.map((e) => e.overall ?? 0))
      : null;

  const streak = computeStreak(attempts);

  // ── Section 2 & 3: Chart data ──
  const accuracyData = getDailyAccuracy(attempts, 14);
  const timeData = getDailyAvgTime(attempts, 14);

  // ── Section 4: Mastery breakdown ──
  const allLevel2 = getLevel2Topics();
  let needsWork = 0, developing = 0, mastered = 0;
  allLevel2.forEach((topic) => {
    const s = topicStats[topic.id];
    if (!s) { needsWork++; return; }
    if (s.accuracy > 85) mastered++;
    else if (s.accuracy >= 70) developing++;
    else needsWork++;
  });
  const total = allLevel2.length;
  const needsPct  = total > 0 ? (needsWork  / total) * 100 : 0;
  const devPct    = total > 0 ? (developing / total) * 100 : 0;
  const masterPct = total > 0 ? (mastered   / total) * 100 : 0;

  // ── Section 5: Weak topics ──
  const weakTopics = getWeakTopics(topicStats, 5);

  // ── Section 6: Exam history (last 5) ──
  const recentExams = [...examResults].slice(-5).reverse();

  // ── X-axis tick formatter: show every other tick ──
  const xTickFormatter = (val, idx) => (idx % 2 === 0 ? val : '');

  return (
    <div className="min-h-screen bg-surface pb-20 overflow-y-auto">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-xl font-black text-primary tracking-tight">Stats</h1>
      </div>

      <div className="px-4">
        {/* ── Section 1: Summary Row ── */}
        <div className="mt-5">
          <SectionLabel>Overview</SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            {/* Exams Taken */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-primary">{examCount}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">Exams Taken</p>
            </div>
            {/* Best Exam */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-success">
                {bestExam !== null ? `${bestExam}%` : '—'}
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">Best Exam</p>
            </div>
            {/* Streak */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <p className="text-2xl font-black text-warning">{streak}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">Day Streak</p>
            </div>
          </div>
        </div>

        {/* ── Section 2: Accuracy Trend ── */}
        <div className="mt-5">
          <SectionLabel>14-Day Accuracy</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={accuracyData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={xTickFormatter}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 9, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip content={<AccuracyTooltip />} />
                <ReferenceLine
                  y={85}
                  stroke="#d1d5db"
                  strokeDasharray="4 3"
                  label={{ value: 'Target', position: 'insideTopRight', fontSize: 9, fill: '#9ca3af' }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2a9d8f"
                  strokeWidth={2}
                  connectNulls={false}
                  dot={<NullAwareDot fill="#2a9d8f" dataKey="accuracy" />}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Section 3: Avg Solve Time ── */}
        <div className="mt-5">
          <SectionLabel>14-Day Avg Solve Time</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={timeData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={xTickFormatter}
                />
                <YAxis
                  domain={[0, 'auto']}
                  tickFormatter={(v) => `${v}s`}
                  tick={{ fontSize: 9, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip content={<TimeTooltip />} />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#457b9d"
                  strokeWidth={2}
                  connectNulls={false}
                  dot={<NullAwareDot fill="#457b9d" dataKey="avgTime" />}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Section 4: Mastery Breakdown ── */}
        <div className="mt-5">
          <SectionLabel>Mastery Breakdown</SectionLabel>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            {/* Stacked bar */}
            <div className="h-4 rounded-full overflow-hidden flex mb-3">
              {masterPct > 0 && (
                <div className="bg-success h-full" style={{ width: `${masterPct}%` }} />
              )}
              {devPct > 0 && (
                <div className="bg-warning h-full" style={{ width: `${devPct}%` }} />
              )}
              {needsPct > 0 && (
                <div className="bg-danger h-full" style={{ width: `${needsPct}%` }} />
              )}
              {total === 0 && <div className="bg-gray-100 h-full w-full" />}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-success shrink-0" />
                <span className="text-gray-600 font-medium">Mastered</span>
                <span className="font-bold text-primary">{mastered}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-warning shrink-0" />
                <span className="text-gray-600 font-medium">Developing</span>
                <span className="font-bold text-primary">{developing}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger shrink-0" />
                <span className="text-gray-600 font-medium">Needs Work</span>
                <span className="font-bold text-primary">{needsWork}</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">{total} topics total</p>
          </div>
        </div>

        {/* ── Section 5: Weakest Topics ── */}
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
                  <div
                    key={s.topicId}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex-1 mr-3 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {topic?.name ?? s.topicId}
                      </p>
                      <p className="text-xs text-danger font-bold mt-0.5">{s.accuracy}% accuracy</p>
                    </div>
                    <button
                      onClick={() => navigate(`/practice?topic=${s.topicId}`)}
                      className="shrink-0 text-xs font-bold text-accent border border-accent/30 rounded-lg px-3 py-1.5 bg-accent/5 hover:bg-accent/10 transition-colors"
                    >
                      Train →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Section 6: Exam History ── */}
        <div className="mt-5 mb-2">
          <SectionLabel>Exam History</SectionLabel>
          {recentExams.length === 0 ? (
            <p className="text-sm text-gray-400">No exams taken yet.</p>
          ) : (
            <div className="space-y-2">
              {recentExams.map((exam) => {
                const rank = getRankLabel(exam.overall ?? 0);
                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-xs text-gray-400 font-medium">{formatExamDate(exam.date)}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">
                        {exam.type ?? 'Mock Exam'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-lg font-black ${rank.cls}`}>
                        {exam.overall ?? '—'}%
                      </p>
                      <p className={`text-[10px] font-bold ${rank.cls}`}>{rank.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
