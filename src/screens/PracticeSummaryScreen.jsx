import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, BarChart2, Home, ListChecks, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById } from '../data/topics';
import AccuracyBadge from '../components/AccuracyBadge';
import { formatTime, getAccuracyTextClass, getAccuracyBgClass, getMasteryLabel } from '../utils/stats';

export default function PracticeSummaryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCurrentSession, setCurrentSession } = useStore();

  const state           = location.state;
  const results         = state?.results ?? null;
  const topicId         = state?.topicId ?? null;
  const mode            = state?.mode ?? 'practice';
  const totalQuestions  = state?.totalQuestions ?? 10;

  useEffect(() => { if (!results || !topicId) return; }, [results, topicId]);

  if (!results || !topicId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-500 text-sm mb-6">Session data not found.</p>
        <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-3 rounded-2xl font-bold">Go Home</button>
      </div>
    );
  }

  const topic       = getTopicById(topicId);
  const parentTopic = topic?.parentId ? getTopicById(topic.parentId) : null;

  const correctCount = results.filter((r) => r.correct).length;
  const wrongCount   = results.length - correctCount;
  const accuracy     = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
  const totalTime    = results.reduce((sum, r) => sum + r.timeSeconds, 0);
  const avgSeconds   = results.length > 0 ? Math.round(totalTime / results.length) : 0;

  const accuracyTextClass = getAccuracyTextClass(accuracy);
  const accuracyBgClass   = getAccuracyBgClass(accuracy);

  // Is this a Level 4 topic? Show template card if yes.
  const isL4 = topic?.level === 4;
  const hasTemplate = isL4 && topic?.template?.length > 0;
  const hasTraps    = isL4 && topic?.traps?.length > 0;

  function handlePracticeAgain() {
    setCurrentSession({ topicId, mode, totalQuestions });
    navigate('/practice/session');
  }

  function handleGoHome() {
    clearCurrentSession();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6 flex items-center justify-center">
        <h1 className="text-white font-bold text-lg">Session Complete</h1>
      </div>

      <div className="px-4 pt-5 pb-28 space-y-4 overflow-y-auto">

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="font-bold text-primary text-lg leading-tight">{topic?.name}</p>
          {parentTopic && <p className="text-xs text-gray-400 mt-0.5">{parentTopic.name}</p>}

          <div className="flex flex-col items-center py-5">
            <p className={`text-6xl font-black leading-none ${accuracyTextClass}`}>
              {accuracy}<span className="text-3xl">%</span>
            </p>
            <div className="mt-3"><AccuracyBadge accuracy={accuracy} showLabel /></div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xl font-black text-success">{correctCount}</p><p className="text-[11px] text-gray-400 mt-0.5">Correct</p></div>
              <div><p className="text-xl font-black text-danger">{wrongCount}</p><p className="text-[11px] text-gray-400 mt-0.5">Wrong</p></div>
              <div><p className="text-xl font-black text-gray-700">{formatTime(avgSeconds)}</p><p className="text-[11px] text-gray-400 mt-0.5">Avg Time</p></div>
            </div>
          </div>
        </div>

        {/* Mastery Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">Mastery Progress</p>
            <p className={`text-sm font-bold ${accuracyTextClass}`}>{accuracy}%</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${accuracyBgClass}`} style={{ width: `${accuracy}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{getMasteryLabel(accuracy)}</p>
        </div>

        {/* Question Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Question Breakdown</p>
          <div className="flex flex-wrap gap-2">
            {results.map((r, i) => (
              <div key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${r.correct ? 'bg-success' : 'bg-danger'}`}
                title={`Q${i+1}: ${r.correct ? 'Correct' : 'Wrong'} (${r.timeSeconds}s)`}>
                {r.correct ? <CheckCircle size={14} /> : <XCircle size={14} />}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col items-center" style={{ minWidth: 32 }}>
                <span className="text-[10px] text-gray-400">{r.timeSeconds}s</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Level 4: Solve Template Card ── */}
        {hasTemplate && (
          <div className="bg-white rounded-2xl shadow-sm border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={16} className="text-primary" />
              <p className="text-sm font-bold text-primary">📋 Solve Template</p>
            </div>
            <p className="text-xs text-gray-400 mb-3">Review your approach for <span className="font-semibold text-gray-600">{topic.name}</span></p>
            <ol className="space-y-2">
              {topic.template.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            {hasTraps && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle size={13} className="text-warning" />
                  <p className="text-xs font-bold text-warning/80 uppercase tracking-wider">Watch Out For</p>
                </div>
                <ul className="space-y-1.5">
                  {topic.traps.map((trap, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-warning text-xs mt-0.5 shrink-0">⚠</span>
                      <span className="text-xs text-gray-600">{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3 pt-2">
          <button onClick={handlePracticeAgain}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-sm active:scale-[0.98] transition-transform">
            <RotateCcw size={18} />Practice Again
          </button>
          <button onClick={() => navigate(`/topic/${topicId}`)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border-2 border-primary text-primary font-bold text-base active:scale-[0.98] transition-transform">
            <BarChart2 size={18} />View Topic Stats
          </button>
          <button onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-gray-500 font-semibold text-sm active:opacity-70 transition-opacity">
            <Home size={16} />Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
