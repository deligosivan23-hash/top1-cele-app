import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLevel2Topics, getLevel3Topics } from '../data/topics';
import { getAdaptivePracticeQueue } from '../utils/adaptive';

function buildSeedData() {
  const now = Date.now();
  const day = 86400000;
  const seedAttempts = [
    ...Array.from({ length: 12 }, (_, i) => ({ id: `seed-alg-${i}`, topicId: 'alg-linear', correct: i < 5, timeSeconds: 90 + Math.floor(Math.random() * 60), timestamp: now - day * 2 - i * 3600000 })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `seed-hyd-${i}`, topicId: 'dyn-bernoulli', correct: i < 6, timeSeconds: 120 + Math.floor(Math.random() * 60), timestamp: now - day * 1 - i * 3600000 })),
    ...Array.from({ length: 8 },  (_, i) => ({ id: `seed-rc-${i}`,  topicId: 'rc-beams',  correct: i < 5, timeSeconds: 100 + Math.floor(Math.random() * 50), timestamp: now - day * 3 - i * 3600000 })),
    ...Array.from({ length: 15 }, (_, i) => ({ id: `seed-trig-${i}`,topicId: 'trig-identities', correct: i < 12, timeSeconds: 75 + Math.floor(Math.random() * 45), timestamp: now - day * 1 - i * 1800000 })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `seed-shear-${i}`,topicId: 'shear-mohr', correct: i < 9, timeSeconds: 85 + Math.floor(Math.random() * 40), timestamp: now - day * 0.5 - i * 1800000 })),
    ...Array.from({ length: 6 },  (_, i) => ({ id: `seed-today-${i}`,topicId: 'diff-maxmin', correct: i < 5, timeSeconds: 80, timestamp: now - i * 600000 })),
  ];
  const groups = {};
  seedAttempts.forEach((a) => { if (!groups[a.topicId]) groups[a.topicId] = []; groups[a.topicId].push(a); });
  const seedStats = {};
  Object.entries(groups).forEach(([topicId, atts]) => {
    const correct = atts.filter((a) => a.correct).length;
    seedStats[topicId] = { topicId, attempts: atts.length, correct, accuracy: Math.round((correct / atts.length) * 100), avgTime: Math.round(atts.reduce((s, a) => s + a.timeSeconds, 0) / atts.length), lastPracticed: Math.max(...atts.map((a) => a.timestamp)) };
  });
  return { seedAttempts, seedStats };
}

function recomputeTopicStats(attempts) {
  const groups = {};
  attempts.forEach((a) => { if (!groups[a.topicId]) groups[a.topicId] = []; groups[a.topicId].push(a); });
  const stats = {};
  Object.entries(groups).forEach(([topicId, atts]) => {
    const correct = atts.filter((a) => a.correct).length;
    stats[topicId] = { topicId, attempts: atts.length, correct, accuracy: Math.round((correct / atts.length) * 100), avgTime: Math.round(atts.reduce((s, a) => s + a.timeSeconds, 0) / atts.length), lastPracticed: Math.max(...atts.map((a) => a.timestamp)) };
  });
  return stats;
}

/**
 * Adaptive daily plan — 5 tasks: 4 practice + 1 mini-test closer.
 * Uses getAdaptivePracticeQueue for ordering; falls back to Level 2 sort.
 */
function buildDailyPlan(topicStats, attempts, enrolledSubjectIds) {
  try {
    const queue = getAdaptivePracticeQueue(topicStats, attempts ?? [], enrolledSubjectIds ?? [], 5);
    const tasks = queue.map((topicId, i) => ({
      topicId,
      targetCount: 10,
      doneCount: 0,
      type: i === queue.length - 1 ? 'mini_test' : 'practice',
    }));
    if (tasks.length > 0) return tasks;
  } catch (_) {
    // fallback below
  }
  // Fallback: naive Level 2 accuracy sort (3 tasks)
  const level2 = getLevel2Topics();
  const scored = level2.map((t) => { const s = topicStats[t.id]; return { topicId: t.id, accuracy: s ? s.accuracy : -1 }; });
  scored.sort((a, b) => { if (a.accuracy === -1 && b.accuracy !== -1) return -1; if (b.accuracy === -1 && a.accuracy !== -1) return 1; return a.accuracy - b.accuracy; });
  return scored.slice(0, 3).map((item, i) => ({ topicId: item.topicId, targetCount: 10, doneCount: 0, type: i === 2 ? 'mini_test' : 'practice' }));
}

const { seedAttempts, seedStats } = buildSeedData();

export const useStore = create(
  persist(
    (set, get) => ({
      hasOnboarded: false,

      completeOnboarding(subjectIds) {
        set({ hasOnboarded: true, enrolledSubjectIds: subjectIds });
        const { topicStats, attempts } = get();
        set({ studyTasks: buildDailyPlan(topicStats, attempts, subjectIds) });
      },

      attempts: seedAttempts,
      topicStats: seedStats,
      examResults: [],
      studyTasks: buildDailyPlan(seedStats, seedAttempts, []),
      lastPlanDate: new Date().toDateString(),
      _seeded: true,
      enrolledSubjectIds: [],
      customSubjects: [],

      logAttempt(topicId, correct, timeSeconds) {
        const newAttempt = { id: `${topicId}-${Date.now()}-${Math.random().toString(36).slice(2)}`, topicId, correct, timeSeconds, timestamp: Date.now() };
        set((state) => {
          const attempts   = [...state.attempts, newAttempt];
          const topicStats = recomputeTopicStats(attempts);
          const studyTasks = state.studyTasks.map((task) => task.topicId === topicId ? { ...task, doneCount: task.doneCount + 1 } : task);
          return { attempts, topicStats, studyTasks };
        });
      },

      saveExamResult(result) {
        set((state) => ({ examResults: [...state.examResults, { ...result, id: `exam-${Date.now()}`, date: new Date().toISOString() }] }));
      },

      generateDailyPlan() {
        const { topicStats, attempts, enrolledSubjectIds } = get();
        set({ studyTasks: buildDailyPlan(topicStats, attempts, enrolledSubjectIds), lastPlanDate: new Date().toDateString() });
      },

      resetAll() {
        set({ attempts: [], topicStats: {}, examResults: [], studyTasks: [], lastPlanDate: null, _seeded: false, enrolledSubjectIds: [], customSubjects: [], hasOnboarded: false });
      },

      toggleSubjectEnrollment(subjectId) {
        set((state) => {
          const ids  = state.enrolledSubjectIds;
          const next = ids.includes(subjectId) ? ids.filter((id) => id !== subjectId) : [...ids, subjectId];
          return { enrolledSubjectIds: next };
        });
      },

      addCustomSubject(subject) {
        const id = `custom-${Date.now()}`;
        set((state) => ({ customSubjects: [...state.customSubjects, { ...subject, id, isMinor: false }] }));
      },

      removeCustomSubject(subjectId) {
        set((state) => ({ customSubjects: state.customSubjects.filter((s) => s.id !== subjectId), enrolledSubjectIds: state.enrolledSubjectIds.filter((id) => id !== subjectId) }));
      },

      currentSession: null,
      setCurrentSession(config) { set({ currentSession: config }); },
      clearCurrentSession() { set({ currentSession: null }); },
    }),
    {
      name: 'cele-tracker-v2',
      partialize: (state) => ({
        hasOnboarded: state.hasOnboarded,
        attempts: state.attempts,
        topicStats: state.topicStats,
        examResults: state.examResults,
        studyTasks: state.studyTasks,
        lastPlanDate: state.lastPlanDate,
        _seeded: state._seeded,
        enrolledSubjectIds: state.enrolledSubjectIds,
        customSubjects: state.customSubjects,
      }),
    }
  )
);
