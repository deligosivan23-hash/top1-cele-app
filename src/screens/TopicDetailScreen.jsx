import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Target,
  CheckCircle2,
  Clock,
  CalendarDays,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { getTopicById, getTopicById as getParent } from '../data/topics';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';
import {
  getAccuracyTextClass,
  getAccuracyBgClass,
  getMasteryLabel,
  getDailyAccuracy,
} from '../utils/stats';

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatDate(ms) {
  if (!ms) return '—';
  return new Date(ms).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function barColor(accuracy) {
  if (accuracy === null || accuracy === undefined) return '#d1d5db';
  if (accuracy >= 86) return '#2a9d8f';
  if (accuracy >= 70) return '#f4a261';
  return '#e63946';
}

function topicBarColor(accuracy) {
  if (accuracy === null || accuracy === undefined) return '#d1d5db';
  if (accuracy >= 86) return '#2a9d8f';
  if (accuracy >= 70) return '#f4a261';
  return '#e63946';
}

// Custom tooltip for the bar chart
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-gray-700 mb-0.5">{label}</p>
      {d.accuracy !== null ? (
        <>
          <p className="text-gray-500">Accuracy: <span className="font-bold text-gray-800">{d.accuracy}%</span></p>
          <p className="text-gray-500">Items: <span className="font-bold text-gray-800">{d.count}</span></p>
        </>
      ) : (
        <p className="text-gray-400">No attempts</p>
      )}
    </div>
  );
}

// ─── Stat mini-card ──────────────────────────────────────────────────────────

function MiniStat({ icon: Icon, label, value, color = 'text-gray-700' }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <Icon size={14} className="text-gray-400" />
      <span className={`text-base font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-400 text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function TopicDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { topicStats, attempts } = useStore();

  const topic = getTopicById(id);

  // ── 404 state ──
  if (!topic) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-gray-500 text-sm">Topic not found.</p>
        <button
          onClick={() => navigate('/map')}
          className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-xl"
        >
          Back to Map
        </button>
      </div>
    );
  }

  // ── Resolve parent breadcrumb ──
  const parentTopic = topic.parentId ? getTopicById(topic.parentId) : null;
  const grandParentTopic = parentTopic?.parentId ? getTopicById(parentTopic.parentId) : null;
  const breadcrumb = [grandParentTopic, parentTopic]
    .filter(Boolean)
    .map((t) => t.name)
    .join(' › ');

  const stats = topicStats[id]; // may be undefined

  // ── Trend data ── filter attempts to this topic only
  const topicAttempts = attempts
    ? attempts.filter((a) => a.topicId === id)
    : [];
  const trendData = getDailyAccuracy(topicAttempts, 14);
  const hasTrendData = trendData.some((d) => d.accuracy !== null);

  const acc = stats?.accuracy ?? null;
  const color = topicBarColor(acc);

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* ── Header ── */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-white/70 text-sm mb-3 focus:outline-none"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="text-white font-bold text-xl leading-tight">
          {topic.fullName ?? topic.name}
        </h1>
        {breadcrumb && (
          <p className="text-white/60 text-xs mt-1">{breadcrumb}</p>
        )}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* ── Mastery card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {!stats ? (
            /* Untested empty state */
            <div className="flex flex-col items-center gap-3 py-4">
              <AccuracyBadge accuracy={null} showLabel />
              <p className="text-sm text-gray-400 text-center">
                You haven't practiced this topic yet.
              </p>
              <button
                onClick={() => navigate(`/practice?topic=${id}`)}
                className="mt-1 bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl w-full"
              >
                Start Practice
              </button>
            </div>
          ) : (
            <>
              {/* Big accuracy */}
              <div className="flex flex-col items-center mb-4">
                <AccuracyBadge accuracy={acc} showLabel />
                <span
                  className={`text-4xl font-extrabold mt-2 ${getAccuracyTextClass(acc)}`}
                >
                  {acc}%
                </span>
                <span className="text-xs text-gray-400 mt-0.5">overall accuracy</span>
              </div>

              {/* Mini stats row */}
              <div className="flex items-start divide-x divide-gray-100">
                <MiniStat
                  icon={Target}
                  label="attempts"
                  value={stats.attempts ?? 0}
                  color="text-gray-800"
                />
                <MiniStat
                  icon={CheckCircle2}
                  label="correct"
                  value={stats.correct ?? 0}
                  color="text-success"
                />
                <MiniStat
                  icon={Clock}
                  label="avg time"
                  value={stats.avgTime ? `${stats.avgTime}s` : '—'}
                  color="text-gray-800"
                />
              </div>

              {/* Last practiced */}
              <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50">
                <CalendarDays size={13} className="text-gray-400" />
                <span className="text-xs text-gray-400">
                  Last practiced:{' '}
                  <span className="text-gray-600 font-medium">
                    {formatDate(stats.lastPracticed)}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* ── Trend chart (only show if topic has been practiced) ── */}
        {stats && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Accuracy Trend (14 days)
            </p>

            {hasTrendData ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={trendData}
                  margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
                  barCategoryGap="30%"
                >
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                    {trendData.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={
                          entry.accuracy === null
                            ? '#e5e7eb'
                            : entry.accuracy >= 86
                            ? '#2a9d8f'
                            : entry.accuracy >= 70
                            ? '#f4a261'
                            : '#e63946'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[100px] flex items-center justify-center">
                <p className="text-sm text-gray-300">No data yet</p>
              </div>
            )}
          </div>
        )}

        {/* ── Quick actions ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2.5">
          <button
            onClick={() => navigate(`/practice?topic=${id}`)}
            className="w-full bg-primary text-white text-sm font-semibold py-3 rounded-xl focus:outline-none active:opacity-90"
          >
            Practice this topic
          </button>
          <button
            onClick={() => navigate('/map')}
            className="w-full bg-gray-100 text-gray-600 text-sm font-medium py-3 rounded-xl focus:outline-none active:opacity-80"
          >
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}
