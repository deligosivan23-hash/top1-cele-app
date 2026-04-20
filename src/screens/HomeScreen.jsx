import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Play, ChevronRight, Flame, Clock, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById } from '../data/topics';
import { getAccuracyTextClass, getTodayAttempts, getTodayStudyTime } from '../utils/stats';
import AccuracyBadge from '../components/AccuracyBadge';

// ─── Reset modal ─────────────────────────────────────────────────────────────
function ResetModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] p-6 pb-10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">Settings</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={18} className="text-danger mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-danger">Reset All Data</p>
              <p className="text-xs text-gray-500 mt-0.5">
                This will permanently delete all your practice attempts, exam results, and progress. This cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-xl bg-danger text-white font-semibold text-sm"
        >
          Reset Everything
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 mt-2 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-5">
        <BookOpenIllustration />
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">You're all set!</h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        No practice data yet. Start your first session and track your journey to Top 1.
      </p>
      <button
        onClick={() => navigate('/practice')}
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md"
      >
        <Play size={16} />
        Start your first practice
      </button>
    </div>
  );
}

function BookOpenIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M5 8h13a2 2 0 012 2v20a2 2 0 01-2 2H5V8z" fill="#457b9d" opacity="0.3"/>
      <path d="M35 8H22a2 2 0 00-2 2v20a2 2 0 002 2h13V8z" fill="#457b9d" opacity="0.5"/>
      <path d="M20 10v20" stroke="#1d3557" strokeWidth="1.5"/>
    </svg>
  );
}

// ─── Today's Plan Card ───────────────────────────────────────────────────────
function TodayPlanCard({ studyTasks, navigate }) {
  const topTasks = studyTasks.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-warning" />
          <h2 className="font-bold text-primary text-sm">Today's Plan</h2>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {topTasks.filter((t) => t.doneCount >= t.targetCount).length}/{topTasks.length} done
        </span>
      </div>

      <div className="space-y-2.5">
        {topTasks.map((task) => {
          const topic = getTopicById(task.topicId);
          const progress = Math.min(task.doneCount / task.targetCount, 1);
          const done = task.doneCount >= task.targetCount;

          return (
            <div key={task.topicId}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${done ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                  {topic?.name ?? task.topicId}
                </span>
                <span className="text-xs text-gray-400 font-medium tabular-nums">
                  {task.doneCount}/{task.targetCount}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${done ? 'bg-success' : 'bg-accent'}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          const firstIncomplete = topTasks.find((t) => t.doneCount < t.targetCount);
          if (firstIncomplete) {
            navigate(`/practice?topic=${firstIncomplete.topicId}`);
          } else {
            navigate('/practice');
          }
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl text-sm font-semibold"
      >
        <Play size={14} />
        Start Plan
      </button>
    </div>
  );
}

// ─── Weak Topics Card ────────────────────────────────────────────────────────
function WeakTopicsCard({ topicStats, navigate }) {
  const weakTopics = Object.values(topicStats)
    .filter((s) => s.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  if (weakTopics.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle size={18} className="text-success" />
          <h2 className="font-bold text-primary text-sm">Weak Topics</h2>
        </div>
        <p className="text-xs text-gray-400">No weak topics (below 70%) yet. Keep it up!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-primary text-sm">Weak Topics</h2>
        <button
          onClick={() => navigate('/stats')}
          className="text-xs text-accent font-medium flex items-center gap-0.5"
        >
          View All <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-2">
        {weakTopics.map((stat) => {
          const topic = getTopicById(stat.topicId);
          return (
            <div
              key={stat.topicId}
              className="flex items-center justify-between py-1.5"
              onClick={() => navigate(`/topic/${stat.topicId}`)}
            >
              <span className="text-xs font-medium text-gray-700 flex-1 mr-2">
                {topic?.name ?? stat.topicId}
              </span>
              <AccuracyBadge accuracy={stat.accuracy} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Progress Today Card ─────────────────────────────────────────────────────
function ProgressTodayCard({ attempts }) {
  const todayAttempts = getTodayAttempts(attempts);
  const studyMinutes = getTodayStudyTime(attempts);
  const correctToday = todayAttempts.filter((a) => a.correct).length;
  const accuracy =
    todayAttempts.length > 0
      ? Math.round((correctToday / todayAttempts.length) * 100)
      : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-accent" />
        <h2 className="font-bold text-primary text-sm">Progress Today</h2>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-surface rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">{todayAttempts.length}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Problems</p>
        </div>
        <div className="bg-surface rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">{studyMinutes}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Minutes</p>
        </div>
        <div className="bg-surface rounded-xl p-3 text-center">
          <p
            className={`text-2xl font-bold ${
              accuracy === null ? 'text-gray-300' : getAccuracyTextClass(accuracy)
            }`}
          >
            {accuracy === null ? '—' : `${accuracy}%`}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Accuracy</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main HomeScreen ─────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigate = useNavigate();
  const { attempts, topicStats, studyTasks, resetAll } = useStore();
  const [showReset, setShowReset] = useState(false);

  const hasData = attempts.length > 0;

  const today = new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  function handleReset() {
    resetAll();
    setShowReset(false);
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">CE Top 1</h1>
            <p className="text-white/60 text-xs mt-0.5">{today}</p>
          </div>
          <button
            onClick={() => setShowReset(true)}
            className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 -mt-3">
        {/* Accent top card strip */}
        <div className="bg-accent rounded-2xl shadow-md p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Flame size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">CELE Tracker</p>
            <p className="text-white/70 text-xs">Philippine Civil Engineering Board Exam</p>
          </div>
        </div>

        {!hasData ? (
          <EmptyState navigate={navigate} />
        ) : (
          <>
            <TodayPlanCard studyTasks={studyTasks} navigate={navigate} />
            <WeakTopicsCard topicStats={topicStats} navigate={navigate} />
            <ProgressTodayCard attempts={attempts} />
          </>
        )}
      </div>

      {/* Reset Modal */}
      {showReset && (
        <ResetModal onClose={() => setShowReset(false)} onConfirm={handleReset} />
      )}
    </div>
  );
}
