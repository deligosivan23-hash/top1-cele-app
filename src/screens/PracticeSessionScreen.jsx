import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTopicById } from '../data/topics';

function formatCountdown(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PracticeSessionScreen() {
  const navigate = useNavigate();
  const { currentSession, logAttempt, clearCurrentSession } = useStore();

  // Redirect if no session config
  useEffect(() => {
    if (!currentSession) navigate('/practice', { replace: true });
  }, [currentSession, navigate]);

  const session = currentSession ?? { topicId: '', mode: 'practice', totalQuestions: 10 };
  const { topicId, mode, totalQuestions } = session;
  const topic = getTopicById(topicId);
  const parentTopic = topic?.parentId ? getTopicById(topic.parentId) : null;

  const TOTAL_TIME = totalQuestions * 45; // seconds for mini_test

  const [currentQ, setCurrentQ] = useState(1); // 1-indexed
  const [results, setResults] = useState([]);   // { correct, timeSeconds }
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [answered, setAnswered] = useState(false); // prevent double-tap

  const questionStartRef = useRef(Date.now());

  // Mini test global countdown
  useEffect(() => {
    if (mode !== 'mini_test') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-finish with remaining questions marked wrong
          finishSession(results, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function finishSession(finalResults, timedOut = false) {
    // If timed out, fill remaining questions as wrong
    let paddedResults = [...finalResults];
    const remaining = totalQuestions - paddedResults.length;
    for (let i = 0; i < remaining; i++) {
      paddedResults.push({ correct: false, timeSeconds: 0 });
      logAttempt(topicId, false, 0);
    }
    clearCurrentSession();
    navigate('/practice/summary', {
      state: { results: paddedResults, topicId, mode, totalQuestions },
    });
  }

  function handleAnswer(correct) {
    if (answered) return;
    setAnswered(true);

    const timeSeconds = Math.round((Date.now() - questionStartRef.current) / 1000);
    logAttempt(topicId, correct, timeSeconds);
    const newResult = { correct, timeSeconds };
    const newResults = [...results, newResult];

    if (currentQ >= totalQuestions) {
      finishSession(newResults);
    } else {
      setResults(newResults);
      setCurrentQ((q) => q + 1);
      questionStartRef.current = Date.now();
      setAnswered(false);
    }
  }

  function handleExitConfirm() {
    clearCurrentSession();
    navigate('/practice');
  }

  const timerPercent = mode === 'mini_test' ? (timeLeft / TOTAL_TIME) * 100 : 100;

  const categoryColors = {
    MSTE: { pill: 'bg-primary/10 text-primary', border: 'border-primary/20' },
    HGE:  { pill: 'bg-accent/10 text-accent',   border: 'border-accent/20' },
    SEC:  { pill: 'bg-success/10 text-success',  border: 'border-success/20' },
  };
  const colors = categoryColors[topic?.category] ?? categoryColors.MSTE;

  if (!currentSession) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowExitModal(true)}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Exit session"
          >
            <X size={22} />
          </button>

          <p className="text-white font-bold text-base truncate max-w-[200px]">
            {topic?.name ?? 'Practice'}
          </p>

          <span className="text-white/60 text-sm font-medium tabular-nums">
            {currentQ}/{totalQuestions}
          </span>
        </div>

        {/* Mini test timer bar */}
        {mode === 'mini_test' && (
          <div className="mt-4">
            <div className="bg-white/20 h-1 w-full rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-[width] duration-1000 ease-linear"
                style={{ width: `${timerPercent}%` }}
              />
            </div>
            <p className="text-white/60 text-xs mt-1 tabular-nums">
              {formatCountdown(timeLeft)} remaining
            </p>
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-28">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-5 relative overflow-hidden">
          {/* Decorative Q number */}
          <p className="absolute top-3 right-4 text-6xl font-black text-primary/[0.07] select-none pointer-events-none leading-none">
            Q{currentQ}
          </p>

          {/* Category badge */}
          <div className="mb-4">
            <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${colors.pill}`}>
              {topic?.category ?? ''}
            </span>
          </div>

          {/* Parent / topic context */}
          {parentTopic && (
            <p className="text-xs text-gray-400 mb-1">{parentTopic.name}</p>
          )}
          <p className="text-sm font-semibold text-gray-600 mb-5">{topic?.name}</p>

          {/* Instruction */}
          <p className="text-base font-medium text-gray-700 text-center leading-snug">
            {mode === 'practice'
              ? 'Did you get this one right?'
              : 'Mark your answer:'}
          </p>
        </div>

        {/* Answer Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(true)}
            disabled={answered}
            className="
              flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl
              bg-success text-white font-bold text-base shadow-sm
              active:scale-[0.97] transition-transform
              disabled:opacity-60
            "
          >
            <CheckCircle size={26} />
            <span>Correct</span>
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={answered}
            className="
              flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl
              bg-danger text-white font-bold text-base shadow-sm
              active:scale-[0.97] transition-transform
              disabled:opacity-60
            "
          >
            <XCircle size={26} />
            <span>Wrong</span>
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
          {Array.from({ length: totalQuestions }).map((_, i) => {
            const res = results[i];
            const isCurrent = i === currentQ - 1;
            return (
              <div
                key={i}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${res
                    ? res.correct
                      ? 'bg-success'
                      : 'bg-danger'
                    : isCurrent
                      ? 'bg-primary'
                      : 'bg-gray-200'}
                `}
              />
            );
          })}
        </div>
      </div>

      {/* Exit Confirm Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[420px] rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">Exit Session?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your progress so far will be saved.
            </p>
            <button
              onClick={handleExitConfirm}
              className="w-full py-3.5 rounded-2xl bg-danger text-white font-bold mb-3"
            >
              Exit
            </button>
            <button
              onClick={() => setShowExitModal(false)}
              className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-semibold"
            >
              Keep Going
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
