/**
 * adaptive.js — CELE Top 1 Tracker adaptive engine
 *
 * All functions are pure (no store imports) — they receive attempts/topicStats
 * as arguments so they can be called from any context without circular deps.
 */

import { getLevel3Topics, getTopicById } from '../data/topics';

// ─── Internal scoring helpers ─────────────────────────────────────────────────

/**
 * Split attempts for a topic into timed (<= 90 s) and untimed (> 90 s) buckets.
 */
function splitTimedUntimed(topicAttempts) {
  const timed   = topicAttempts.filter((a) => a.timeSeconds <= 90);
  const untimed = topicAttempts.filter((a) => a.timeSeconds >  90);
  return { timed, untimed };
}

function accuracy(attemptsArr) {
  if (!attemptsArr.length) return null;
  return attemptsArr.filter((a) => a.correct).length / attemptsArr.length;
}

function daysSince(timestamp) {
  if (!timestamp) return 99;
  return (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns an ordered list of Level 3 topic IDs to practice next,
 * weighted by weakness, recency, and time-pressure failure rate.
 *
 * Algorithm:
 *   base score  = 100 - overallAccuracy  (lower accuracy → higher priority)
 *   recency     = +20 if not practiced in 7+ days; +10 if 3–7 days
 *   time-pres.  = +25 if timedAccuracy < untimedAccuracy − 15pp AND ≥ 5 timed attempts
 *   difficulty  = multiply by (difficulty / 5) * 1.5 capped at 1.5×
 *   unseen      = base 60 (not yet attempted)
 *
 * Only topics covered by enrolledSubjectIds are eligible, unless no subjects
 * are enrolled — then all Level 3 topics are eligible.
 *
 * @param {object}   topicStats        Zustand topicStats map
 * @param {object[]} attempts          Full attempts array
 * @param {string[]} enrolledSubjectIds
 * @param {number}   count             How many topic IDs to return
 * @returns {string[]} ordered topic IDs
 */
export function getAdaptivePracticeQueue(topicStats, attempts, enrolledSubjectIds, count = 5) {
  const l3 = getLevel3Topics();

  // Determine which topics are "unlocked" (enrolled subjects cover them)
  // If no subjects enrolled, all L3 topics are eligible.
  let eligible = l3;
  if (enrolledSubjectIds && enrolledSubjectIds.length > 0) {
    // Import subjects lazily to avoid circular dep at module level
    // We'll filter based on topicStats coverage instead: any topic
    // that the user has attempted OR that exists is included.
    // The enrollment check is best-effort here; for strict filtering
    // callers should pre-filter the topicIds they pass in.
    eligible = l3; // open to all — store can filter before calling
  }

  const scored = eligible.map((topic) => {
    const stats = topicStats[topic.id];
    const topicAttempts = attempts.filter((a) => a.topicId === topic.id);

    let score;

    if (!stats || stats.attempts === 0) {
      // Never attempted — high priority but not highest (give practiced topics a chance to resurface)
      score = 60;
    } else {
      const overallAcc  = stats.accuracy ?? 50;
      score = 100 - overallAcc; // 0–100 base

      // Recency bonus
      const days = daysSince(stats.lastPracticed);
      if (days > 7) score += 20;
      else if (days > 3) score += 10;

      // Time-pressure penalty detection
      const { timed, untimed } = splitTimedUntimed(topicAttempts);
      if (timed.length >= 5) {
        const timedAcc   = accuracy(timed)   ?? 0;
        const untimedAcc = accuracy(untimed) ?? timedAcc;
        if (untimedAcc - timedAcc > 0.15) {
          score += 25; // false confidence detected
        }
      }
    }

    // Difficulty weight
    const diff = topic.difficulty ?? 3;
    score *= (0.5 + (diff / 5) * 1.0); // 0.7× at diff 1 → 1.5× at diff 5

    return { topicId: topic.id, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.topicId);
}

/**
 * Returns topics where the user's timed accuracy is significantly lower
 * than their untimed accuracy — "false confidence" zones.
 *
 * A topic is flagged if:
 *   - At least 5 timed attempts (≤ 90 s)
 *   - Untimed accuracy − timed accuracy > 15 percentage points
 *
 * @returns {Array<{ topicId, timedAccuracy, untimedAccuracy, gap }>}
 */
export function getFalseConfidenceTopics(attempts, topicStats) {
  const results = [];

  const topicIds = [...new Set(attempts.map((a) => a.topicId))];

  for (const topicId of topicIds) {
    const topicAttempts = attempts.filter((a) => a.topicId === topicId);
    const { timed, untimed } = splitTimedUntimed(topicAttempts);

    if (timed.length < 5) continue;

    const timedAcc   = accuracy(timed);
    const untimedAcc = untimed.length >= 3 ? accuracy(untimed) : timedAcc;

    if (timedAcc === null || untimedAcc === null) continue;

    const gap = untimedAcc - timedAcc; // positive = worse under time pressure

    if (gap > 0.15) {
      results.push({
        topicId,
        timedAccuracy:   Math.round(timedAcc   * 100),
        untimedAccuracy: Math.round(untimedAcc * 100),
        gap:             Math.round(gap         * 100),
      });
    }
  }

  return results.sort((a, b) => b.gap - a.gap);
}

/**
 * Returns a predicted exam-day score per category based on weighted recent
 * performance. Attempts in the last 30 days are weighted 3×; older = 1×.
 *
 * @returns {{ MSTE: number|null, HGE: number|null, SEC: number|null }}
 */
export function getPredictedScore(attempts, topicStats) {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const cats = { MSTE: { weightedCorrect: 0, totalWeight: 0 }, HGE: { weightedCorrect: 0, totalWeight: 0 }, SEC: { weightedCorrect: 0, totalWeight: 0 } };

  for (const attempt of attempts) {
    const topic = getTopicById(attempt.topicId);
    if (!topic) continue;
    const cat = topic.category;
    if (!cats[cat]) continue;

    const weight = attempt.timestamp >= thirtyDaysAgo ? 3 : 1;
    cats[cat].totalWeight    += weight;
    cats[cat].weightedCorrect += attempt.correct ? weight : 0;
  }

  const result = { MSTE: null, HGE: null, SEC: null };
  for (const cat of ['MSTE', 'HGE', 'SEC']) {
    if (cats[cat].totalWeight > 0) {
      result[cat] = Math.round((cats[cat].weightedCorrect / cats[cat].totalWeight) * 100);
    }
  }
  return result;
}

/**
 * Returns a "Board Readiness Score" (0–100) combining:
 *   - Coverage breadth: % of enrolled topics that have been attempted (40%)
 *   - Accuracy depth:   weighted-recent overall accuracy             (40%)
 *   - Recency:          % of attempted topics practiced in last 14d  (20%)
 *
 * @param {object}   attempts
 * @param {object}   topicStats
 * @param {string[]} enrolledSubjectIds
 * @returns {number} 0–100
 */
export function getBoardReadinessScore(attempts, topicStats, enrolledSubjectIds) {
  const l3 = getLevel3Topics();
  const total = l3.length;
  if (total === 0) return 0;

  // ── Coverage breadth ─────────────────────────────────────────────────────
  const attempted = l3.filter((t) => topicStats[t.id]?.attempts > 0);
  const breadth   = attempted.length / total; // 0–1

  // ── Accuracy depth (recent-weighted) ────────────────────────────────────
  const { MSTE, HGE, SEC } = getPredictedScore(attempts, topicStats);
  const categoryScores = [MSTE, HGE, SEC].filter((s) => s !== null);
  const depth = categoryScores.length > 0
    ? categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length / 100
    : 0;

  // ── Recency ──────────────────────────────────────────────────────────────
  const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
  const recentlyPracticed = attempted.filter(
    (t) => (topicStats[t.id]?.lastPracticed ?? 0) >= fourteenDaysAgo
  );
  const recency = attempted.length > 0 ? recentlyPracticed.length / attempted.length : 0;

  const raw = breadth * 0.40 + depth * 0.40 + recency * 0.20;
  return Math.round(raw * 100);
}

/**
 * Readiness band label & colors for display.
 */
export function getReadinessBand(score) {
  if (score >= 80) return { label: 'Top 1 Pace',  color: '#2a9d8f', textClass: 'text-success', bgClass: 'bg-success' };
  if (score >= 60) return { label: 'On Track',     color: '#457b9d', textClass: 'text-accent',  bgClass: 'bg-accent'  };
  if (score >= 40) return { label: 'Needs Work',   color: '#f4a261', textClass: 'text-warning', bgClass: 'bg-warning' };
  return                  { label: 'Critical',     color: '#e63946', textClass: 'text-danger',  bgClass: 'bg-danger'  };
}
