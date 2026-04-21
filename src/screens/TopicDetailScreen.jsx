import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Target, CheckCircle2, Clock, CalendarDays, AlertTriangle, ListChecks, Zap, BookOpen } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { getTopicById, getChildren, getBreadcrumb } from '../data/topics';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';
import { getAccuracyTextClass, getAccuracyBgClass, getMasteryLabel, getDailyAccuracy } from '../utils/stats';

function barColor(acc) {
  if (acc === null || acc === undefined) return '#d1d5db';
  if (acc >= 86) return '#2a9d8f';
  if (acc >= 70) return '#f4a261';
  return '#e63946';
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-gray-700 mb-0.5">{label}</p>
      {d.accuracy !== null ? (
        <><p className="text-gray-500">Accuracy: <span className="font-bold">{d.accuracy}%</span></p>
        <p className="text-gray-500">Items: <span className="font-bold">{d.count}</span></p></>
      ) : <p className="text-gray-400">No attempts</p>}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, color = 'text-gray-700' }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <Icon size={14} className="text-gray-400" />
      <span className={`text-base font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-400 text-center leading-tight">{label}</span>
    </div>
  );
}

function DifficultyDots({ difficulty }) {
  return (
    <div className="flex gap-1 items-center">
      {[1,2,3,4,5].map((d) => (
        <span key={d} className={`w-2.5 h-2.5 rounded-full ${d <= difficulty ? 'bg-warning' : 'bg-gray-200'}`} />
      ))}
      <span className="text-xs text-gray-400 ml-1">Difficulty {difficulty}/5</span>
    </div>
  );
}

function TrendChart({ topicAttempts }) {
  const trendData = getDailyAccuracy(topicAttempts, 14);
  const hasData = trendData.some((d) => d.accuracy !== null);
  if (!hasData) return (
    <div className="h-[100px] flex items-center justify-center">
      <p className="text-sm text-gray-300">No data yet</p>
    </div>
  );
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={trendData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }} barCategoryGap="30%">
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
        <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
          {trendData.map((entry, idx) => (
            <Cell key={idx} fill={barColor(entry.accuracy)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function TopicDetailScreen() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { topicStats, attempts } = useStore();

  const topic = getTopicById(topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-gray-500 text-sm">Topic not found.</p>
        <button onClick={() => navigate('/map')} className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-xl">Back to Map</button>
      </div>
    );
  }

  const breadcrumb = getBreadcrumb(topicId);
  const stats = topicStats[topicId];
  const acc = stats?.accuracy ?? null;
  const topicAttempts = (attempts ?? []).filter((a) => a.topicId === topicId);
  const children = getChildren(topicId);

  const isL4 = topic.level === 4;
  const isL3orL4 = topic.level >= 3;

  const weakChildren = children.filter((c) => { const s = topicStats[c.id]; return s && s.accuracy < 70; });

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 text-sm mb-3">
          <ChevronLeft size={18} /><span>Back</span>
        </button>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 flex-wrap mb-2">
          {breadcrumb.slice(0, -1).map((t, i) => (
            <span key={t.id} className="flex items-center gap-1">
              {i > 0 && <span className="text-white/30 text-xs">›</span>}
              <button onClick={() => navigate(`/topic/${t.id}`)} className="text-white/50 text-xs hover:text-white/80">
                {t.name}
              </button>
            </span>
          ))}
        </div>
        <h1 className="text-white font-bold text-xl leading-tight">{topic.name}</h1>
        {isL4 && topic.difficulty && (
          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4,5].map((d) => (
              <span key={d} className={`w-2 h-2 rounded-full ${d <= topic.difficulty ? 'bg-warning' : 'bg-white/20'}`} />
            ))}
            <span className="text-white/50 text-xs ml-1">Level {topic.difficulty} difficulty</span>
          </div>
        )}
      </div>

      <div className="px-4 pt-4 space-y-3">

        {/* Mastery Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {!stats ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <AccuracyBadge accuracy={null} showLabel />
              <p className="text-sm text-gray-400 text-center">You haven't practiced this topic yet.</p>
              <button onClick={() => navigate(`/practice?topic=${topicId}`)}
                className="mt-1 bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl w-full">
                Start Practice
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-4">
                <AccuracyBadge accuracy={acc} showLabel />
                <span className={`text-4xl font-extrabold mt-2 ${getAccuracyTextClass(acc)}`}>{acc}%</span>
                <span className="text-xs text-gray-400 mt-0.5">overall accuracy</span>
              </div>
              <div className="flex items-start divide-x divide-gray-100">
                <MiniStat icon={Target} label="attempts" value={stats.attempts ?? 0} color="text-gray-800" />
                <MiniStat icon={CheckCircle2} label="correct" value={stats.correct ?? 0} color="text-success" />
                <MiniStat icon={Clock} label="avg time" value={stats.avgTime ? `${stats.avgTime}s` : '—'} color="text-gray-800" />
              </div>
              <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50">
                <CalendarDays size={13} className="text-gray-400" />
                <span className="text-xs text-gray-400">
                  Last practiced: <span className="text-gray-600 font-medium">{new Date(stats.lastPracticed).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Level 4 — Solution Template */}
        {isL4 && topic.template?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={16} className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Solution Template</p>
            </div>
            <ol className="space-y-2">
              {topic.template.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Level 4 — Common Traps */}
        {isL4 && topic.traps?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-warning" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Common Traps</p>
            </div>
            <ul className="space-y-1.5">
              {topic.traps.map((trap, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-warning text-xs mt-0.5 shrink-0">⚠</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trend Chart */}
        {stats && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Accuracy Trend (14 days)</p>
            <TrendChart topicAttempts={topicAttempts} />
          </div>
        )}

        {/* Children (for L2 and L3) */}
        {!isL4 && children.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {topic.level === 2 ? 'Core Concepts' : 'Problem Types'}
            </p>
            <div className="space-y-1">
              {children.map((child) => {
                const cs = topicStats[child.id];
                return (
                  <button key={child.id} onClick={() => navigate(`/topic/${child.id}`)}
                    className="w-full flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{child.name}</span>
                      {child.difficulty && <DifficultyDots difficulty={child.difficulty} />}
                    </div>
                    <AccuracyBadge accuracy={cs?.accuracy ?? null} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Weak sub-topics */}
        {!isL4 && weakChildren.length > 0 && (
          <div className="bg-danger/5 border border-danger/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-danger" />
              <p className="text-xs font-bold uppercase tracking-widest text-danger/70">Weak Subtopics</p>
            </div>
            {weakChildren.map((c) => {
              const cs = topicStats[c.id];
              return (
                <button key={c.id} onClick={() => navigate(`/topic/${c.id}`)}
                  className="w-full flex items-center justify-between py-2 border-b border-danger/10 last:border-0">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <AccuracyBadge accuracy={cs.accuracy} />
                </button>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2.5">
          <button onClick={() => navigate(`/practice?topic=${topicId}`)}
            className="w-full bg-primary text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
            <Zap size={15} />
            {isL4 ? 'Practice This Type' : 'Practice This Topic'}
          </button>
          {isL4 && topic.parentId && (
            <button onClick={() => navigate(`/topic/${topic.parentId}`)}
              className="w-full bg-gray-100 text-gray-600 text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2">
              <BookOpen size={14} />
              Review Parent Concept
            </button>
          )}
          <button onClick={() => navigate('/map')}
            className="w-full bg-gray-100 text-gray-600 text-sm font-medium py-3 rounded-xl">
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}
