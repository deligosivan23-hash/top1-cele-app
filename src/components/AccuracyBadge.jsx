import { getAccuracyBgClass, getMasteryLabel } from '../utils/stats';

export default function AccuracyBadge({ accuracy, showLabel = false }) {
  if (accuracy === null || accuracy === undefined || isNaN(accuracy)) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
        {showLabel ? 'Untested' : '—'}
      </span>
    );
  }

  const classes = getAccuracyBgClass(accuracy);

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${classes}`}>
      {showLabel ? getMasteryLabel(accuracy) : `${accuracy}%`}
    </span>
  );
}
