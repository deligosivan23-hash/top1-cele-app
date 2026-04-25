import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Target, CheckCircle2, Clock,
  CalendarDays, AlertTriangle, ListChecks, Zap, BookOpen,
  TrendingUp, Play, BarChart2,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { getTopicById, getChildren, getBreadcrumb } from '../data/topics';
import { getQuestionsByTopic } from '../data/questions';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';
import { getAccuracyTextClass, getAccuracyBgClass, getMasteryLabel, getDailyAccuracy } from '../utils/stats';

// ── Chart helpers ──────────────────────────────────────────────────────────
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
      {d.accuracy !== null
        ? (<><p className="text-gray-500">Accuracy: <span className="font-bold">{d.accuracy}%</span></p>
            <p className="text-gray-500">Items: <span className="font-bold">{d.count}</span></p></>)
        : <p className="text-gray-400">No attempts</p>}
    </div>
  );
}

function TrendChart({ topicAttempts }) {
  const data = getDailyAccuracy(topicAttempts, 14);
  const hasData = data.some((d) => d.accuracy !== null);
  if (!hasData) return (
    <div className="h-[80px] flex items-center justify-center">
      <p className="text-sm text-gray-300">No data yet — start practicing!</p>
    </div>
  );
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} margin={{ top: 4, right: 0, left: -28, bottom: 0 }} barCategoryGap="30%">
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
        <Bar dataKey="accuracy" radius={[3, 3, 0, 0]}>
          {data.map((entry, idx) => <Cell key={idx} fill={barColor(entry.accuracy)} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── MiniStat ───────────────────────────────────────────────────────────────
function MiniStat({ icon: Icon, label, value, color = 'text-gray-700' }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <Icon size={14} className="text-gray-400" />
      <span className={`text-base font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-400 text-center leading-tight">{label}</span>
    </div>
  );
}

// ── FrequencyBadge ─────────────────────────────────────────────────────────
function FrequencyBadge({ freq }) {
  const map = {
    high:   { label: 'HIGH FREQ',   cls: 'bg-danger/10 text-danger border-danger/20' },
    medium: { label: 'MEDIUM FREQ', cls: 'bg-warning/10 text-warning border-warning/20' },
    low:    { label: 'LOW FREQ',    cls: 'bg-gray-100 text-gray-400 border-gray-200' },
  };
  const { label, cls } = map[freq] ?? map.low;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

// ── ProblemTypeCard ────────────────────────────────────────────────────────
function ProblemTypeCard({ pt, topicId, onPractice }) {
  const [open, setOpen] = useState(false);
  const hasQs = getQuestionsByTopic(topicId).length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* header row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-800">{pt.name}</p>
            <FrequencyBadge freq={pt.boardFrequency} />
          </div>
        </div>
        <span className="text-gray-300 flex-shrink-0">
          {open ? <ChevronLeft size={16} className="rotate-90" /> : <ChevronRight size={16} />}
        </span>
      </button>

      {/* expanded body */}
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-4">

          {/* Solve template */}
          {pt.template?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ListChecks size={13} className="text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Solve Template</p>
              </div>
              <ol className="space-y-1.5">
                {pt.template.map((step, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Common traps */}
          {pt.traps?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={13} className="text-warning" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Common Traps</p>
              </div>
              <ul className="space-y-1.5">
                {pt.traps.map((trap, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-warning text-xs mt-0.5 flex-shrink-0">⚠</span>
                    <span className="text-sm text-gray-600 leading-relaxed">{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practice this type button */}
          <button
            onClick={() => onPractice(topicId)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
              hasQs
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-400 cursor-default'
            }`}
          >
            <Play size={14} />
            {hasQs ? 'Practice This Type →' : 'Questions coming soon'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── SubtopicChip ───────────────────────────────────────────────────────────
function SubtopicChip({ topic, stats, onClick }) {
  const acc = stats?.accuracy ?? null;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all active:scale-[0.97] ${
        acc === null
          ? 'bg-white border-gray-200 text-gray-600'
          : acc >= 70
            ? 'bg-success/5 border-success/20 text-success'
            : 'bg-danger/5 border-danger/20 text-danger'
      }`}
    >
      <span className="text-xs font-semibold truncate max-w-[120px]">{topic.name}</span>
      <AccuracyBadge accuracy={acc} />
    </button>
  );
}

// ── Empty practice state ───────────────────────────────────────────────────
function EmptyState({ onPractice }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
        <BarChart2 size={24} className="text-gray-300" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">No practice data yet</p>
        <p className="text-xs text-gray-400 mt-1">Attempt questions to track your mastery</p>
      </div>
      <button
        onClick={onPractice}
        className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
      >
        Start Practice
      </button>
    </div>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────
export default function TopicDetailScreen() {
  const { topicId } = useParams();
  const navigate    = useNavigate();
  const { topicStats, attempts, setCurrentSession } = useStore();

  const topic = getTopicById(topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-gray-500 text-sm">Topic not found.</p>
        <button onClick={() => navigate('/map')} className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-xl">
          Back to Map
        </button>
      </div>
    );
  }

  const breadcrumb     = getBreadcrumb(topicId);
  const stats          = topicStats[topicId];
  const acc            = stats?.accuracy ?? null;
  const topicAttempts  = (attempts ?? []).filter((a) => a.topicId === topicId);
  const l3Children     = getChildren(topicId).filter((c) => c.level === 3);   // for L2
  const l4Children     = getChildren(topicId).filter((c) => c.level === 4);   // for L3 (old schema)
  const problemTypes   = topic.problemTypes ?? [];                              // new schema
  const questionCount  = getQuestionsByTopic(topicId).length;

  const isL2 = topic.level === 2;
  const isL3 = topic.level === 3;
  const isL4 = topic.level === 4;

  // Count weak children for badge
  const weakL3 = l3Children.filter((c) => { const s = topicStats[c.id]; return s && s.accuracy < 70; });

  function startQuickPractice(targetId = topicId) {
    setCurrentSession({ topicId: targetId, mode: 'practice', totalQuestions: 10 });
    navigate('/practice/session');
  }

  function startTimedPractice(targetId = topicId) {
    setCurrentSession({ topicId: targetId, mode: 'mini_test', totalQuestions: 10 });
    navigate('/practice/session');
  }

  // Category color
  const catColor =
    topic.category === 'MSTE' ? 'text-primary' :
    topic.category === 'HGE'  ? 'text-accent'  :
    topic.category === 'SEC'  ? 'text-success'  : 'text-gray-500';

  return (
    <div className="min-h-screen bg-gray-50 pb-32">

      {/* ── Header ── */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 text-sm mb-3 active:opacity-60">
          <ChevronLeft size={18} /><span>Back</span>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 flex-wrap mb-2 min-h-[18px]">
          {breadcrumb.slice(0, -1).map((t, i) => (
            <span key={t.id} className="flex items-center gap-1">
              {i > 0 && <span className="text-white/30 text-xs">›</span>}
              <button
                onClick={() => navigate(`/topic/${t.id}`)}
                className="text-white/50 text-xs hover:text-white/80 transition-colors"
              >
                {t.name}
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h1 className="text-white font-bold text-xl leading-tight flex-1">{topic.name}</h1>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/15 ${catColor} shrink-0 self-start mt-0.5`}>
            {topic.category}
          </span>
        </div>

        {/* Question count badge */}
        <div className="flex items-center gap-3 mt-2">
          {questionCount > 0 ? (
            <span className="text-[11px] text-white/60 font-medium">
              {questionCount} board question{questionCount !== 1 ? 's' : ''} in bank
            </span>
          ) : (
            <span className="text-[11px] text-white/40">No questions in bank yet</span>
          )}
          {isL3 && problemTypes.length > 0 && (
            <span className="text-[11px] text-accent font-semibold">
              {problemTypes.length} problem type{problemTypes.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ── Mastery card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {!stats ? (
            <EmptyState onPractice={() => startQuickPractice()} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <AccuracyBadge accuracy={acc} showLabel />
                  <p className="text-xs text-gray-400 mt-1">{getMasteryLabel(acc)}</p>
                </div>
                <span className={`text-5xl font-black ${getAccuracyTextClass(acc)}`}>
                  {acc}%
                </span>
              </div>

              {/* mastery progress bar */}
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    acc >= 86 ? 'bg-success' : acc >= 70 ? 'bg-warning' : 'bg-danger'
                  }`}
                  style={{ width: `${acc}%` }}
                />
                {/* 70% marker */}
                <div className="absolute top-0 h-full w-px bg-warning/50" style={{ left: '70%' }} />
                {/* 90% marker */}
                <div className="absolute top-0 h-full w-px bg-success/70" style={{ left: '90%' }} />
              </div>

              <div className="flex items-start divide-x divide-gray-100">
                <MiniStat icon={Target}      label="attempts" value={stats.attempts ?? 0} color="text-gray-800" />
                <MiniStat icon={CheckCircle2} label="correct"  value={stats.correct ?? 0}  color="text-success"  />
                <MiniStat icon={Clock}        label="avg time" value={stats.avgTime ? `${stats.avgTime}s` : '—'} color="text-gray-800" />
              </div>

              {stats.lastPracticed && (
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-50">
                  <CalendarDays size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Last practiced: <span className="text-gray-600 font-medium">
                      {new Date(stats.lastPracticed).toLocaleDateString('en-PH', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── 14-day trend chart ── */}
        {stats && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Accuracy Trend (14 days)</p>
            </div>
            <TrendChart topicAttempts={topicAttempts} />
            {/* reference lines legend */}
            <div className="flex gap-4 mt-1 justify-center">
              {[{ color: 'bg-success', label: '≥86% Mastered' }, { color: 'bg-warning', label: '70–85%' }, { color: 'bg-danger', label: '<70% Weak' }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-sm ${color}`} />
                  <span className="text-[10px] text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Level 2 — Sub-topics (Level 3 children) ── */}
        {isL2 && l3Children.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Core Concepts</p>
              {weakL3.length > 0 && (
                <span className="text-[11px] font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                  {weakL3.length} weak
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {l3Children.map((child) => (
                <SubtopicChip
                  key={child.id}
                  topic={child}
                  stats={topicStats[child.id]}
                  onClick={() => navigate(`/topic/${child.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Level 3 — Problem Types ── */}
        {isL3 && problemTypes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 px-1">
              <ListChecks size={14} className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Problem Types ({problemTypes.length})
              </p>
            </div>
            <div className="space-y-2">
              {problemTypes.map((pt) => (
                <ProblemTypeCard
                  key={pt.id}
                  pt={pt}
                  topicId={topicId}
                  onPractice={startQuickPractice}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Level 4 (legacy) — Solution Template ── */}
        {isL4 && topic.template?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={16} className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Solution Template</p>
            </div>
            <ol className="space-y-2">
              {topic.template.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Level 4 — Traps ── */}
        {isL4 && topic.traps?.length > 0 && (
          <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-warning" />
              <p className="text-xs font-bold uppercase tracking-widest text-warning/70">Common Traps</p>
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

        {/* ── Level 3 — old-style L4 children (problem type nodes) ── */}
        {isL3 && l4Children.length > 0 && problemTypes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Problem Types</p>
            <div className="space-y-1">
              {l4Children.map((child) => {
                const cs = topicStats[child.id];
                return (
                  <button
                    key={child.id}
                    onClick={() => navigate(`/topic/${child.id}`)}
                    className="w-full flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 px-1 active:bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{child.name}</span>
                    <AccuracyBadge accuracy={cs?.accuracy ?? null} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Practice shortcuts ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Actions</p>

          <button
            onClick={() => startQuickPractice()}
            disabled={questionCount === 0}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-transform"
          >
            <Zap size={16} />
            {isL4 ? 'Practice This Type' : `Practice ${topic.name}`}
          </button>

          <button
            onClick={() => startTimedPractice()}
            disabled={questionCount === 0}
            className="w-full bg-warning/10 text-warning border border-warning/20 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-40 active:scale-[0.98] transition-transform"
          >
            <Clock size={14} />
            Timed Mini-Test (10 Qs)
          </button>

          {isL4 && topic.parentId && (
            <button
              onClick={() => navigate(`/topic/${topic.parentId}`)}
              className="w-full bg-gray-100 text-gray-600 font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm active:bg-gray-200 transition-colors"
            >
              <BookOpen size={14} />
              Review Parent Concept
            </button>
          )}

          <button
            onClick={() => navigate('/map')}
            className="w-full bg-gray-100 text-gray-500 font-medium py-3 rounded-xl text-sm active:bg-gray-200 transition-colors"
          >
            Back to Topic Map
          </button>
        </div>

      </div>

      {/* ── Fixed Quick Practice button ── */}
      {questionCount > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3 z-20">
          <button
            onClick={() => startQuickPractice()}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md"
          >
            <Play size={16} />
            Practice {topic.name} →
          </button>
        </div>
      )}
    </div>
  );
}
