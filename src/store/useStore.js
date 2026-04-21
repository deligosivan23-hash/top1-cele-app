import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLevel2Topics } from '../data/topics';

function buildSeedData() {
  const now = Date.now();
  const day = 86400000;
  const seedAttempts = [
    ...Array.from({ length: 12 }, (_, i) => ({ id: `seed-alg-${i}`, topicId: 'math-alg', correct: i < 5, timeSeconds: 90 + Math.floor(Math.random() * 60), timestamp: now - day * 2 - i * 3600000 })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `seed-hyd-${i}`, topicId: 'hyd-dyn', correct: i < 6, timeSeconds: 120 + Math.floor(Math.random() * 60), timestamp: now - day * 1 - i * 3600000 })),
    ...Array.from({ length: 8 },  (_, i) => ({ id: `seed-rc-${i}`,  topicId: 'str-rc',  correct: i < 5, timeSeconds: 100 + Math.floor(Math.random() * 50), timestamp: now - day * 3 - i * 3600000 })),
    ...Array.from({ length: 15 }, (_, i) => ({ id: `seed-trig-${i}`,topicId: 'math-trig',correct: i < 12,timeSeconds: 75  + Math.floor(Math.random() * 45), timestamp: now - day * 1 - i * 1800000 })),
    ...Array.from({ length: 10 }, (_, i) => ({ id: `seed-shear-${i}`,topicId:'geo-shear',correct: i < 9, timeSeconds: 85  + Math.floor(Math.random() * 40), timestamp: now - day * 0.5 - i * 1800000 })),
    ...Array.from({ length: 6 },  (_, i) => ({ id: `seed-today-${i}`,topicId:'math-trig',correct: i < 5, timeSeconds: 80, timestamp: now - i * 600000 })),
  ];
  const topicGroups = {};
  seedAttempts.forEach((a) => { if (!topicGroups[a.topicId]) topicGroups[a.topicId] = []; topicGroups[a.topicId].push(a); });
  const seedStats = {};
  Object.entries(topicGroups).forEach(([topicId, atts]) => {
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

function buildDailyPlan(topicStats) {
  const level2 = getLevel2Topics();
  const scored = level2.map((t) => { const s = topicStats[t.id]; return { topicId: t.id, accuracy: s ? s.accuracy : -1, attempts: s ? s.attempts : 0 }; });
  scored.sort((a, b) => { if (a.accuracy === -1 && b.accuracy !== -1) return -1; if (b.accuracy === -1 && a.accuracy !== -1) return 1; return a.accuracy - b.accuracy; });
  return scored.slice(0, 3).map((item) => ({ topicId: item.topicId, targetCount: item.accuracy < 0 ? 10 : item.accuracy < 70 ? 15 : 10, doneCount: 0, type: item.accuracy < 70 ? 'mini_test' : 'practice' }));
}

const { seedAttempts, seedStats } = buildSeedData();

export const useStore = create(
  persist(
    (set, get) => ({
      attempts: seedAttempts,
      topicStats: seedStats,
      examResults: [],
      studyTasks: buildDailyPlan(seedStats),
      lastPlanDate: new Date().toDateString(),
      _seeded: true,

      // University mapping state
      enrolledSubjectIds: [],
      customSubjects: [],

      logAttempt(topicId, correct, timeSeconds) {
        const newAttempt = { id: `${topicId}-${Date.now()}-${Math.random().toString(36).slice(2)}`, topicId, correct, timeSeconds, timestamp: Date.now() };
        set((state) => {
          const attempts = [...state.attempts, newAttempt];
          const topicStats = recomputeTopicStats(attempts);
          const studyTasks = state.studyTasks.map((task) => task.topicId === topicId ? { ...task, doneCount: task.doneCount + 1 } : task);
          return { attempts, topicStats, studyTasks };
        });
      },

      saveExamResult(result) {
        set((state) => ({ examResults: [...state.examResults, { ...result, id: `exam-${Date.now()}`, date: new Date().toISOString() }] }));
      },

      generateDailyPlan() {
        const { topicStats } = get();
        set({ studyTasks: buildDailyPlan(topicStats), lastPlanDate: new Date().toDateString() });
      },

      resetAll() {
        set({ attempts: [], topicStats: {}, examResults: [], studyTasks: [], lastPlanDate: null, _seeded: false, enrolledSubjectIds: [], customSubjects: [] });
      },

      // Subject enrollment
      toggleSubjectEnrollment(subjectId) {
        set((state) => {
          const ids = state.enrolledSubjectIds;
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

      // Current session (transient)
      currentSession: null,
      setCurrentSession(config) { set({ currentSession: config }); },
      clearCurrentSession() { set({ currentSession: null }); },
    }),
    {
      name: 'cele-tracker-v1',
      partialize: (state) => ({
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
