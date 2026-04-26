import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings, Play, ChevronRight, Flame, Clock,
  CheckCircle, X, AlertTriangle, GraduationCap, Zap,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById, getLevel2Topics } from '../data/topics';
import { universitySubjects } from '../data/subjects';
import {
  getAccuracyTextClass, getTodayAttempts, getTodayStudyTime,
} from '../utils/stats';
import {
  getBoardReadinessScore, getReadinessBand,
  getFalseConfidenceTopics, getPredictedScore,
} from '../utils/adaptive';
import AccuracyBadge from '../components/AccuracyBadge';
import StreakCelebration from '../components/StreakCelebration';

// ── Streak ─────────────────────────────────────────────────────────────────
function computeStreak(attempts) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const day = new Date(today); day.setDate(today.getDate() - i); day.setHours(0, 0, 0, 0);
    const next = new Date(day); next.setDate(day.getDate() + 1);
    const has  = attempts.some((a) => { const t = new Date(a.timestamp); return t >= day && t < next; });
    if (!has) break;
    streak++;
  }
  return streak;
}

// ── Board Readiness Ring ───────────────────────────────────────────────────
function ReadinessRing({ score, band, predicted }) {
  const radius  = 46;
  const circ    = 2 * Math.PI * radius;
  const fill    = (Math.min(score, 100) / 100) * circ;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-3">
      <div className="flex items-center gap-4">
        {/* SVG ring */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 104 104" className="w-full h-full -rotate-90">
            <circle cx="52" cy="52" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="52" cy="52" r={radius}
              fill="none"
              stroke={band.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${fill} ${circ}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-black ${band.textClass}`}>{score}</span>
            <span className="text-[9px] text-gray-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* right side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Board Readiness</p>
          </div>
          <p className={`text-base font-bold ${band.textClass} mb-2`}>{band.label}</p>

          {/* predicted scores */}
          <div className="space-y-1.5">
            {[
              { cat: 'MSTE', score: predicted.MSTE, color: 'bg-primary' },
              { cat: 'HGE',  score: predicted.HGE,  color: 'bg-accent'  },
              { cat: 'SEC',  score: predicted.SEC,   color: 'bg-success' },
            ].map(({ cat, score: s, color }) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-500 w-8 shrink-0">{cat}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  {s !== null && (
                    <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${s}%` }} />
                  )}
                </div>
                <span className={`text-[10px] font-bold w-7 text-right ${s !== null ? getAccuracyTextClass(s) : 'text-gray-300'}`}>
                  {s !== null ? `${s}%` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 90% target note */}
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <p className="text-xs text-gray-400">Top 1 target: <span className="font-bold text-primary">score ≥ 90</span></p>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          score >= 80 ? 'bg-success/10 text-success' :
          score >= 60 ? 'bg-accent/10 text-accent'   :
          score >= 40 ? 'bg-warning/10 text-warning' :
                        'bg-danger/10 text-danger'
        }`}>
          {score >= 80 ? '🔥 Elite' : score >= 60 ? '📈 Growing' : score >= 40 ? '⚠ Gap' : '🚨 Critical'}
        </span>
      </div>
    </div>
  );
}

// ── False Confidence Alert ─────────────────────────────────────────────────
function FalseConfidenceAlert({ topics, navigate, setCurrentSession }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || topics.length === 0) return null;

  return (
    <div className="bg-warning/10 border border-warning/30 rounded-2xl p-4 mb-3">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-warning flex-shrink-0" />
          <p className="text-sm font-bold text-warning">False Confidence Zones</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-0.5 text-warning/50 hover:text-warning/80 flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>
      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
        You score fine untimed — but <span className="font-bold">fail under time pressure</span>. These topics will cost you points on exam day:
      </p>
      <div className="space-y-2 mb-3">
        {topics.slice(0, 3).map((t) => {
          const topic = getTopicById(t.topicId);
          return (
            <div key={t.topicId} className="flex items-center justify-between">
              <button
                onClick={() => navigate(`/topic/${t.topicId}`)}
                className="text-xs font-semibold text-gray-700 truncate mr-2 hover:text-primary"
              >
                {topic?.name ?? t.topicId}
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-gray-400">untimed <span className="font-bold text-success">{t.untimedAccuracy}%</span></span>
                <span className="text-[10px] text-gray-400">timed <span className="font-bold text-danger">{t.timedAccuracy}%</span></span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (topics[0]) {
            setCurrentSession({ topicId: topics[0].topicId, mode: 'mini_test', totalQuestions: 10 });
            navigate('/practice/session');
          }
        }}
        className="w-full bg-warning text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <Zap size={14} /> Train These Now
      </button>
    </div>
  );
}

// ── Today's Plan Card ──────────────────────────────────────────────────────
function TodayPlanCard({ studyTasks, navigate, setCurrentSession }) {
  const tasks = studyTasks.slice(0, 5);
  const done  = tasks.filter((t) => t.doneCount >= t.targetCount).length;

  function startNext() {
    const first = tasks.find((t) => t.doneCount < t.targetCount);
    if (first) {
      setCurrentSession({ topicId: first.topicId, mode: first.type, totalQuestions: first.targetCount });
      navigate('/practice/session');
    } else {
      navigate('/practice');
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-warning" />
          <h2 className="font-bold text-primary text-sm">Today's Adaptive Plan</h2>
        </div>
        <span className="text-xs text-gray-400 font-medium">{done}/{tasks.length} done</span>
      </div>

      <div className="space-y-2.5 mb-4">
        {tasks.map((task) => {
          const topic    = getTopicById(task.topicId);
          const progress = Math.min(task.doneCount / task.targetCount, 1);
          const isDone   = task.doneCount >= task.targetCount;
          return (
            <div key={task.topicId}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-medium ${isDone ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                    {topic?.name ?? task.topicId}
                  </span>
                  {task.type === 'mini_test' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-warning/15 text-warning">TIMED</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 tabular-nums">{task.doneCount}/{task.targetCount}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isDone ? 'bg-success' : task.type === 'mini_test' ? 'bg-warning' : 'bg-accent'}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={startNext}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-transform"
      >
        <Play size={14} />{done === tasks.length ? 'Plan Complete — Keep Going' : 'Continue Plan'}
      </button>
    </div>
  );
}

// ── University Progress Card ───────────────────────────────────────────────
function UniversityProgressCard({ enrolledSubjectIds, customSubjects, navigate }) {
  const allSubjects = [...universitySubjects, ...customSubjects];
  const l2Total     = getLevel2Topics().length;

  const unlockedIds = useMemo(() => {
    const ids = new Set();
    allSubjects.filter((s) => enrolledSubjectIds.includes(s.id)).forEach((s) => s.coveredTopicIds.forEach((id) => ids.add(id)));
    return ids;
  }, [enrolledSubjectIds, customSubjects]);

  const l2Covered = getLevel2Topics().filter((t) => unlockedIds.has(t.id)).length;
  const pct = Math.round((l2Covered / l2Total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-success" />
          <h2 className="font-bold text-primary text-sm">Curriculum Coverage</h2>
        </div>
        <button onClick={() => navigate('/subjects')} className="text-xs text-accent font-semibold flex items-center gap-0.5">
          Manage <ChevronRight size={12} />
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-2">
        <span className="font-bold text-gray-800">{l2Covered}</span> / {l2Total} topics unlocked from your courses
      </p>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-success rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      {enrolledSubjectIds.length === 0 && (
        <p className="text-xs text-gray-400 mt-2">Tap "Manage" to mark your enrolled subjects.</p>
      )}
    </div>
  );
}

// ── Weak Topics Card ───────────────────────────────────────────────────────
function WeakTopicsCard({ topicStats, navigate }) {
  const weak = Object.values(topicStats).filter((s) => s.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  if (weak.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle size={16} className="text-success" />
          <h2 className="font-bold text-primary text-sm">Weak Topics</h2>
        </div>
        <p className="text-xs text-gray-400">No topics below 70% accuracy. Keep it up!</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-primary text-sm">Weak Topics</h2>
        <button onClick={() => navigate('/stats')} className="text-xs text-accent font-medium flex items-center gap-0.5">
          View All <ChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-2">
        {weak.map((stat) => {
          const topic = getTopicById(stat.topicId);
          return (
            <button key={stat.topicId} onClick={() => navigate(`/topic/${stat.topicId}`)} className="w-full flex items-center justify-between py-1.5 active:opacity-70">
              <span className="text-xs font-medium text-gray-700 flex-1 mr-2 text-left truncate">{topic?.name ?? stat.topicId}</span>
              <AccuracyBadge accuracy={stat.accuracy} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Progress Today Card ────────────────────────────────────────────────────
function ProgressTodayCard({ attempts }) {
  const todayAttempts = getTodayAttempts(attempts);
  const studyMinutes  = getTodayStudyTime(attempts);
  const correct       = todayAttempts.filter((a) => a.correct).length;
  const accuracy      = todayAttempts.length > 0 ? Math.round((correct / todayAttempts.length) * 100) : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-accent" />
        <h2 className="font-bold text-primary text-sm">Progress Today</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: todayAttempts.length, label: 'Problems', color: 'text-primary' },
          { value: studyMinutes,         label: 'Minutes',  color: 'text-primary' },
          { value: accuracy !== null ? `${accuracy}%` : '—', label: 'Accuracy', color: accuracy !== null ? getAccuracyTextClass(accuracy) : 'text-gray-300' },
        ].map(({ value, label, color }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reset Modal ────────────────────────────────────────────────────────────
function ResetModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] p-6 pb-10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">Settings</h2>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={18} className="text-danger mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-danger">Reset All Data</p>
              <p className="text-xs text-gray-500 mt-0.5">Permanently deletes all practice, exam results, and progress. Cannot be undone.</p>
            </div>
          </div>
        </div>
        <button onClick={onConfirm} className="w-full py-3 rounded-xl bg-danger text-white font-semibold text-sm">Reset Everything</button>
        <button onClick={onClose} className="w-full py-3 mt-2 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigate = useNavigate();
  const { attempts, topicStats, studyTasks, resetAll, enrolledSubjectIds, customSubjects, setCurrentSession } = useStore();
  const lastPlanDate      = useStore((s) => s.lastPlanDate);
  const generateDailyPlan = useStore((s) => s.generateDailyPlan);
  const [showReset, setShowReset] = useState(false);

  // Bug #4 fix: check lastPlanDate against today on every mount so returning
  // the next morning always triggers a fresh plan, even if Zustand had already
  // hydrated the previous day's value from localStorage before this effect ran.
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPlanDate !== today) {
      generateDailyPlan();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const streak      = computeStreak(attempts);
  const hasData     = attempts.length > 0;
  const today       = new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' });

  // Adaptive metrics — memoised so they don't recompute every render
  const readinessScore    = useMemo(() => getBoardReadinessScore(attempts, topicStats, enrolledSubjectIds), [attempts, topicStats, enrolledSubjectIds]);
  const readinessBand     = useMemo(() => getReadinessBand(readinessScore), [readinessScore]);
  const predictedScores   = useMemo(() => getPredictedScore(attempts, topicStats), [attempts, topicStats]);
  const falseConfTopics   = useMemo(() => getFalseConfidenceTopics(attempts, topicStats), [attempts, topicStats]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Streak milestone confetti — fires on multiples of 5 */}
      <StreakCelebration active={streak > 0 && streak % 5 === 0} />

      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">CE Top 1</h1>
            <p className="text-white/60 text-xs mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
              <Flame size={14} className="text-warning" />
              {streak > 0
                ? <span className="text-white text-xs font-bold">{streak}d streak</span>
                : <span className="text-white/60 text-xs">No streak</span>}
            </div>
            <button onClick={() => setShowReset(true)} className="p-2 rounded-full bg-white/10 text-white/80">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Board Readiness Ring — always shown */}
        <ReadinessRing score={readinessScore} band={readinessBand} predicted={predictedScores} />

        {!hasData ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap size={28} className="text-primary" />
            </div>
            <h2 className="text-lg font-bold text-primary mb-2">Ready to train?</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              No practice data yet. Start your first session and track your journey to Top 1.
            </p>
            <button
              onClick={() => navigate('/practice')}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md active:scale-[0.98] transition-transform"
            >
              <Play size={16} /> Start First Practice
            </button>
          </div>
        ) : (
          <>
            {/* False confidence alert — only when data exists */}
            <FalseConfidenceAlert
              topics={falseConfTopics}
              navigate={navigate}
              setCurrentSession={setCurrentSession}
            />

            <TodayPlanCard studyTasks={studyTasks} navigate={navigate} setCurrentSession={setCurrentSession} />
            <UniversityProgressCard enrolledSubjectIds={enrolledSubjectIds} customSubjects={customSubjects} navigate={navigate} />
            <WeakTopicsCard topicStats={topicStats} navigate={navigate} />
            <ProgressTodayCard attempts={attempts} />
          </>
        )}
      </div>

      {showReset && (
        <ResetModal
          onClose={() => setShowReset(false)}
          onConfirm={() => { resetAll(); setShowReset(false); }}
        />
      )}
    </div>
  );
}
