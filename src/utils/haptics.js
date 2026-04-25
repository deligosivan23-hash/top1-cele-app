/**
 * haptics.js — vibration utility for CELE Top 1 Tracker
 * Wraps navigator.vibrate with a try/catch so it never throws
 * on browsers/devices that don't support it.
 */

/** Short success pulse (correct answer) */
export function vibrateSuccess() {
  try { navigator.vibrate?.(50); } catch (_) {}
}

/** Double-tap error pattern (wrong answer) */
export function vibrateError() {
  try { navigator.vibrate?.([100, 50, 100]); } catch (_) {}
}

/** Celebratory long buzz (streak milestone, exam pass) */
export function vibrateCelebrate() {
  try { navigator.vibrate?.([80, 40, 80, 40, 160]); } catch (_) {}
}
