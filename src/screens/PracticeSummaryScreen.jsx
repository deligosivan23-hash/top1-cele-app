import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle, XCircle, RotateCcw, BarChart2, Home,
  ChevronDown, ChevronUp, AlertTriangle, Clock,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById } from '../data/topics';
import AccuracyBadge from '../components/AccuracyBadge';
import { formatTime, getAccuracyTextClass, getAccuracyBgClass, getMasteryLabel } from '../utils/stats';

// ── Wrong answer review card ──────────────────────────────────────────────────
function WrongAnswerCard({ result, number }) {
  const [open, setOpen] = useState(false);
  const q = result.question;
  if (!q) return null;

  const correctLabel = q.choices?.[result.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, '') ?? '—';
  const yourLabel    = result.userAnswerIndex != null
    ? (q.choices?.[result.userAnswerIndex]?.replace(/^[A-D]\.\s*/, '') ?? 'No answer')
    : 'Timed out';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* header row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="w-7 h-7 rounded-full bg-danger/10 text-danger text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 leading-snug line-clamp-2">{q.stem}</p>
          <p className="text-xs text-danger mt-1 font-medium">Your answer: {yourLabel}</p>
        </div>
        <span className="text-gray-400 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* expanded solution */}
      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Correct Answer</p>
            <p className="text-sm text-success font-semibold">
              {String.fromCharCode(65 + result.correctAnswerIndex)}. {correctLabel}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Solution</p>
            <p className="text-sm text-gray-700 leading-relaxed">{q.solution}</p>
          </div>
          {q.trap && (
            <div className="flex items-start gap-2 bg-warning/5 rounded-xl px-3 py-2.5">
              <AlertTriangle size={13} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-warning">Trap: </span>{q.trap}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function PracticeSummaryScreen() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { clearCurrentSession, setCurrentSession } = useStore();

  const state          = location.state;
  const results        = state?.results        ?? null;
  const topicId        = state?.topicId        ?? null;
  const mode           = state?.mode           ?? 'practice';
  const totalQuestions = state?.totalQuestions ?? 10;

  if (!results || !topicId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-500 text-sm mb-6">Session data not found.</p>
        <button onClick={() => navigate('/')} className="bg-primary text-white px-6 py-3 rounded-2xl font-bold">
          Go Home
        </button>
      </div>
    );
  }

  const topic       = getTopicById(topicId);
  const parentTopic = topic?.parentId ? getTopicById(topic.parentId) : null;

  const correctCount  = results.filter((r) => r.correct).length;
  const wrongCount    = results.length - correctCount;
  const accuracy      = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
  const avgSeconds    = results.length > 0
    ? Math.round(results.reduce((s, r) => s + r.timeSeconds, 0) / results.length) : 0;

  const accuracyTextClass = getAccuracyTextClass(accuracy);
  const accuracyBgClass   = getAccuracyBgClass(accuracy);

  const wrongResults = results.filter((r) => !r.correct && r.question);

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
      <div className="bg-primary px-4 pt-12 pb-6 text-center">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
          {mode === 'mini_test' ? 'Timed Session' : 'Practice Session'}
        </p>
        <h1 className="text-white font-bold text-xl">Session Complete</h1>
      </div>

      <div className="px-4 pt-5 pb-28 space-y-4 overflow-y-auto">

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="font-bold text-primary text-lg leading-tight">{topic?.name}</p>
          {parentTopic && <p className="text-xs text-gray-400 mt-0.5">{parentTopic.name}</p>}

          <div className="flex flex-col items-center py-5">
            <p className={`text-6xl font-black leading-none ${accuracyTextClass}`}>
              {accuracy}<span className="text-3xl">%</span>
            </p>
            <div className="mt-3">
              <AccuracyBadge accuracy={accuracy} showLabel />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4">
            <div>
              <p className="text-xl font-black text-success">{correctCount}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Correct</p>
            </div>
            <div>
              <p className="text-xl font-black text-danger">{wrongCount}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Wrong</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-black text-gray-700 flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />{formatTime(avgSeconds)}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">Avg / Q</p>
            </div>
          </div>
        </div>

        {/* Mastery bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">Mastery Progress</p>
            <p className={`text-sm font-bold ${accuracyTextClass}`}>{accuracy}%</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${accuracyBgClass}`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{getMasteryLabel(accuracy)}</p>

          {/* 90% target line indicator */}
          <div className="relative h-3 mt-3 bg-gray-50 rounded-full border border-gray-100">
            <div className="absolute left-[90%] top-0 h-full w-0.5 bg-primary/40 rounded-full" />
            <div
              className={`h-full rounded-full ${accuracyBgClass}`}
              style={{ width: `${accuracy}%`, maxWidth: '100%' }}
            />
            <span className="absolute right-0 -top-5 text-[10px] text-primary/60 font-bold">90% goal</span>
          </div>
        </div>

        {/* Question breakdown dots */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Question Breakdown</p>
          <div className="flex flex-wrap gap-2">
            {results.map((r, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${r.correct ? 'bg-success' : 'bg-danger'}`}
                title={`Q${i + 1}: ${r.correct ? 'Correct' : 'Wrong'} (${r.timeSeconds}s)`}
              >
                {r.correct ? <CheckCircle size={14} /> : <XCircle size={14} />}
              </div>
            ))}
          </div>
          {/* Per-question times */}
          <div className="flex flex-wrap gap-2 mt-2">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col items-center" style={{ minWidth: 32 }}>
                <span className={`text-[10px] tabular-nums ${r.timeSeconds >= 75 ? 'text-warning' : 'text-gray-400'}`}>
                  {r.timeSeconds}s
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wrong answers review */}
        {wrongResults.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
              Review Wrong Answers ({wrongResults.length})
            </p>
            <div className="space-y-2">
              {wrongResults.map((r, i) => (
                <WrongAnswerCard key={r.questionId ?? i} result={r} number={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handlePracticeAgain}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-sm active:scale-[0.98] transition-transform"
          >
            <RotateCcw size={18} /> Practice Again
          </button>
          <button
            onClick={() => navigate(`/topic/${topicId}`)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border-2 border-primary text-primary font-bold text-base active:scale-[0.98] transition-transform"
          >
            <BarChart2 size={18} /> View Topic Stats
          </button>
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-gray-500 font-semibold text-sm active:opacity-70"
          >
            <Home size={16} /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
