import { useEffect, useRef } from 'react';

const COLORS = ['#2a9d8f', '#457b9d', '#f4a261', '#e63946', '#e9c46a', '#1d3557'];

/**
 * Renders a burst of confetti pieces from the center of the screen.
 * Automatically unmounts after the animation completes.
 * Usage: <StreakCelebration key={streak} active={streak > 0 && streak % 5 === 0} />
 */
export default function StreakCelebration({ active }) {
  const pieces = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left: `${10 + (i * 4.5) % 80}%`,
      delay: `${(i * 45) % 400}ms`,
      size: 6 + (i % 3) * 3,
    }))
  );

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.current.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute top-1/3"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
