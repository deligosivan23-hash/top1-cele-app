/**
 * SkeletonCard — pulsing placeholder for loading states.
 * Usage:
 *   <SkeletonCard lines={3} />
 *   <SkeletonCard lines={1} height="h-24" />
 */
export default function SkeletonCard({ lines = 3, height = null, className = '' }) {
  if (height) {
    return <div className={`skeleton rounded-2xl ${height} ${className}`} />;
  }
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3 ${className}`}>
      <div className="skeleton h-4 w-2/3 rounded-lg" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className={`skeleton h-3 rounded-lg ${i === lines - 2 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  );
}
