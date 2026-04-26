// ─── Accuracy color class ───────────────────────────────────────────────────
export function getAccuracyColor(accuracy) {
  if (accuracy === null || accuracy === undefined || isNaN(accuracy)) return 'gray';
  if (accuracy < 70) return 'danger';
  if (accuracy <= 85) return 'warning';
  return 'success';
}

// Tailwind text color class based on accuracy
export function getAccuracyTextClass(accuracy) {
  const color = getAccuracyColor(accuracy);
  if (color === 'danger') return 'text-danger';
  if (color === 'warning') return 'text-warning';
  if (color === 'success') return 'text-success';
  return 'text-gray-400';
}

// Tailwind bg color class based on accuracy
export function getAccuracyBgClass(accuracy) {
  const color = getAccuracyColor(accuracy);
  if (color === 'danger') return 'bg-red-100 text-danger';
  if (color === 'warning') return 'bg-orange-100 text-warning';
  if (color === 'success') return 'bg-teal-100 text-success';
  return 'bg-gray-100 text-gray-400';
}

// ─── Mastery label ──────────────────────────────────────────────────────────
export function getMasteryLabel(accuracy) {
  if (accuracy === null || accuracy === undefined || isNaN(accuracy)) return 'Untested';
  if (accuracy < 70) return 'Needs Work';
  if (accuracy <= 85) return 'Developing';
  return 'Mastered';
}

// ─── Compute stats for a single topic from raw attempts array ───────────────
export function getTopicStats(topicId, attempts) {
  const topicAttempts = attempts.filter((a) => a.topicId === topicId);
  if (topicAttempts.length === 0) return null;

  const correct = topicAttempts.filter((a) => a.correct).length;
  const accuracy = Math.round((correct / topicAttempts.length) * 100);
  const avgTime =
    topicAttempts.reduce((sum, a) => sum + (a.timeSeconds || 0), 0) /
    topicAttempts.length;
  const lastPracticed = topicAttempts.reduce((latest, a) =>
    a.timestamp > latest ? a.timestamp : latest,
    topicAttempts[0].timestamp
  );

  return {
    topicId,
    attempts: topicAttempts.length,
    correct,
    accuracy,
    avgTime: Math.round(avgTime),
    lastPracticed,
  };
}

// ─── Get all attempts logged today ──────────────────────────────────────────
export function getTodayAttempts(attempts) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return attempts.filter((a) => new Date(a.timestamp) >= today);
}

// ─── Get weak topics sorted by accuracy ascending ───────────────────────────
export function getWeakTopics(topicStats, limit = 5) {
  return Object.values(topicStats)
    .filter((s) => s.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}

// ─── Get today's study time in minutes ──────────────────────────────────────
export function getTodayStudyTime(attempts) {
  const todayAttempts = getTodayAttempts(attempts);
  const totalSeconds = todayAttempts.reduce((sum, a) => sum + (a.timeSeconds || 0), 0);
  return Math.round(totalSeconds / 60);
}

// ─── Format seconds to mm:ss or h:mm:ss ─────────────────────────────────────
export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Compute per-day accuracy for last N days (for charts) ──────────────────
export function getDailyAccuracy(attempts, days = 14) {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const next = new Date(date);
    next.setDate(next.getDate() + 1);

    const dayAttempts = attempts.filter((a) => {
      const t = new Date(a.timestamp);
      return t >= date && t < next;
    });

    const label = date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
    if (dayAttempts.length === 0) {
      result.push({ date: label, accuracy: null, count: 0 });
    } else {
      const correct = dayAttempts.filter((a) => a.correct).length;
      result.push({
        date: label,
        accuracy: Math.round((correct / dayAttempts.length) * 100),
        count: dayAttempts.length,
      });
    }
  }
  return result;
}

// ─── Compute per-day average solve time for last N days (for charts) ────────
export function getDailyAvgTime(attempts, days = 14) {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const next = new Date(date);
    next.setDate(next.getDate() + 1);

    const dayAttempts = attempts.filter((a) => {
      const t = new Date(a.timestamp);
      return t >= date && t < next;
    });

    const label = date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
    if (dayAttempts.length === 0) {
      result.push({ date: label, avgTime: null, count: 0 });
    } else {
      const totalSeconds = dayAttempts.reduce((sum, a) => sum + (a.timeSeconds || 0), 0);
      result.push({
        date: label,
        avgTime: Math.round(totalSeconds / dayAttempts.length),
        count: dayAttempts.length,
      });
    }
  }
  return result;
}
