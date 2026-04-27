import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { vibrateSuccess, vibrateError } from '../utils/haptics';
import { useStore } from '../store/useStore';
import { getTopicById, getBreadcrumb } from '../data/topics';
import { getAdaptiveQuestions, getQuestionsByTopic } from '../data/questions';
import { formatTime } from '../utils/stats';
// Issue #8 fix: import shared constant instead of defining it locally.
import { PER_QUESTION_SECONDS } from '../utils/constants';



// ─── TimerBar ─────────────────────────────────────────────────────────────────
function TimerBar({ timeLeft, total, danger }) {
  const pct = total > 0 ? (timeLeft / total) * 100 : 0;
  const color = danger || pct < 20 ? 'bg-danger' : pct < 50 ? 'bg-warning' : 'bg-success';
  return (
    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── ChoiceButton ─────────────────────────────────────────────────────────────
function ChoiceButton({ label, text, state, onClick, disabled }) {
  const base = 'w-full text-left px-4 py-3.5 rounded-2xl border-2 flex items-start gap-3 transition-all duration-300 active:scale-[0.98]';
  const styles = {
    null:    'border-gray-200 bg-white text-gray-700',
    selected:'border-primary bg-primary/5 text-primary',
    correct: 'border-success bg-success/10 text-success',
    wrong:   'border-danger  bg-danger/10  text-danger',
    reveal:  'border-success bg-success/10 text-success',
  };
  const dotStyles = {
    null:    'border-gray-300 bg-white',
    selected:'border-primary bg-primary',
    correct: 'border-success bg-success',
    wrong:   'border-danger  bg-danger',
    reveal:  'border-success bg-success',
  };
  const s = state ?? 'null';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[s]} ${disabled ? 'cursor-default' : ''}`}
    >
      <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${dotStyles[s]}`}>
        {(s === 'correct' || s === 'reveal') && <CheckCircle size={12} className="text-white" />}
        {s === 'wrong'    && <XCircle   size={12} className="text-white" />}
        {s === 'selected' && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="text-sm leading-snug font-medium">
        <span className="font-bold mr-1">{label}.</span>{text}
      </span>
    </button>
  );
}

// ─── FeedbackCard ─────────────────────────────────────────────────────────────
function FeedbackCard({ correct, question }) {
  if (correct) {
    return (
      <div className="bg-success/10 border border-success/30 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle size={16} className="text-success" />
          <p className="text-sm font-bold text-success">Correct!</p>
        </div>
        {question.trap && (
          <div className="flex items-start gap-2 mt-2">
            <AlertTriangle size={13} className="text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-warning">Watch out for: </span>
              {question.trap}
            </p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="bg-danger/5 border border-danger/20 rounded-2xl px-4 py-3 space-y-3">
      <div className="flex items-center gap-2">
        <XCircle size={16} className="text-danger" />
        <p className="text-sm font-bold text-danger">Incorrect</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Solution</p>
        <p className="text-sm text-gray-700 leading-relaxed">{question.solution}</p>
      </div>
      {question.trap && (
        <div className="pt-2 border-t border-danger/10 flex items-start gap-2">
          <AlertTriangle size={13} className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-warning">Common trap: </span>
            {question.trap}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function PracticeSessionScreen() {
  const navigate = useNavigate();
  const { currentSession, logAttempt, clearCurrentSession, topicStats } = useStore();

  useEffect(() => {
    if (!currentSession) navigate('/practice', { replace: true });
  }, [currentSession, navigate]);

  const session       = currentSession ?? { topicId: '', mode: 'practice', totalQuestions: 10 };
  const { topicId, mode, totalQuestions } = session;
  const topic         = getTopicById(topicId);
  const breadcrumb    = getBreadcrumb(topicId).slice(0, -1);

  // ── build question pool once ────────────────────────────────────────────────
  const questionsRef = useRef(null);
  if (!questionsRef.current) {
    let pool = topicId
      ? getAdaptiveQuestions([topicId], topicStats, totalQuestions)
      : [];
    if (!pool.length && topicId) pool = getQuestionsByTopic(topicId).slice(0, totalQuestions);
    if (!pool.length) {
      pool = Array.from({ length: totalQuestions }, (_, i) => ({
        id: `placeholder-${i}`, topicId,
        stem: 'No questions found for this topic yet. More questions coming soon!',
        choices: ['A. Understood', 'B. Got it', 'C. OK', 'D. Continue'],
        answerIndex: 0,
        solution: 'Questions for this topic will be added in future updates.',
        trap: null, category: topic?.category ?? 'MSTE', difficulty: 1,
      }));
    }
    while (pool.length < totalQuestions) pool = [...pool, ...pool].slice(0, totalQuestions);
    questionsRef.current = pool.slice(0, totalQuestions);
  }
  const questions = questionsRef.current;

  // ── component state ─────────────────────────────────────────────────────────
  const [qIndex, setQIndex]           = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [submitted, setSubmitted]     = useState(false);
  const [timeLeft, setTimeLeft]       = useState(PER_QUESTION_SECONDS);
  const [results, setResults]         = useState([]);
  const [showExit, setShowExit]       = useState(false);
  const [flashClass, setFlashClass]   = useState('');

  const questionStartRef = useRef(Date.now());
  const timerRef         = useRef(null);
  const autoAdvRef       = useRef(null);
  const submittedRef     = useRef(false); // avoids stale closure in timer
  // Issue #3 fix: resultsRef mirrors results state so advance() always has
  // the latest array even when called from a stale closure (e.g., Next button).
  const resultsRef       = useRef([]);

  const currentQ = questions[qIndex];
  const isTimed  = mode === 'mini_test';
  const isLastQ  = qIndex >= totalQuestions - 1;

  // ── timer management ────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    submittedRef.current = false;
    setSubmitted(false);
    setSelectedIdx(null);
    setFlashClass('');
    setTimeLeft(PER_QUESTION_SECONDS);
    questionStartRef.current = Date.now();
    // Issue #3 fix: reset resultsRef in sync with results state when a new
    // question starts. (results state is reset implicitly to its prior value;
    // the ref must not drift out of sync.)

    if (!isTimed) return;
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          if (!submittedRef.current) doSubmit(null, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { stopTimer(); clearTimeout(autoAdvRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex]);

  // ── submit answer ───────────────────────────────────────────────────────────
  function doSubmit(choiceIdx, timedOut = false) {
    if (submittedRef.current) return;
    submittedRef.current = true;
    stopTimer();

    const elapsed  = Math.round((Date.now() - questionStartRef.current) / 1000);
    const correct  = !timedOut && choiceIdx === currentQ.answerIndex;
    const timeSecs = timedOut ? PER_QUESTION_SECONDS : Math.min(elapsed, PER_QUESTION_SECONDS);

    setSelectedIdx(choiceIdx);
    setSubmitted(true);

    // Haptics + flash
    if (correct) { vibrateSuccess();           setFlashClass('flash-correct'); }
    else         { vibrateError(); setFlashClass('flash-wrong');   }
    setTimeout(() => setFlashClass(''), 600);

    logAttempt(currentQ.topicId ?? topicId, correct, timeSecs);

    const result = {
      questionId: currentQ.id, topicId: currentQ.topicId ?? topicId,
      correct, timeSeconds: timeSecs,
      userAnswerIndex: timedOut ? null : choiceIdx,
      correctAnswerIndex: currentQ.answerIndex,
      question: currentQ,
    };

    // Issue #2 fix: separate state update from side effect — no IIFE needed.
    // Compute the new value, set it in state, keep resultsRef in sync, then
    // schedule the auto-advance side effect using the same computed value.
    const newResults = [...results, result];
    setResults(newResults);
    // Issue #3 fix: keep resultsRef in sync immediately after computing newResults.
    resultsRef.current = newResults;
    if (correct) {
      autoAdvRef.current = setTimeout(() => advance(newResults), 1500);
    }
  }

  function advance(latestResults) {
    clearTimeout(autoAdvRef.current);
    // Issue #3 fix: fall back to resultsRef.current instead of the stale
    // results closure — resultsRef is always kept in sync by doSubmit.
    const finalResults = latestResults ?? resultsRef.current;
    if (qIndex >= totalQuestions - 1) {
      doFinish(finalResults);
    } else {
      setQIndex((i) => i + 1);
    }
  }

  function doFinish(finalResults) {
    clearCurrentSession();
    navigate('/practice/summary', {
      state: { results: finalResults ?? resultsRef.current, topicId, mode, totalQuestions },
    });
  }

  function handleExitConfirm() {
    stopTimer();
    clearTimeout(autoAdvRef.current);
    clearCurrentSession();
    navigate('/practice');
  }

  if (!currentSession || !currentQ) return null;

  // ── choice state for rendering ──────────────────────────────────────────────
  function choiceState(idx) {
    if (!submitted) return selectedIdx === idx ? 'selected' : null;
    if (idx === currentQ.answerIndex) return 'correct';
    if (idx === selectedIdx && idx !== currentQ.answerIndex) return 'wrong';
    return null;
  }

  const answeredCorrectly = submitted && selectedIdx === currentQ.answerIndex;
  const timerDanger       = isTimed && timeLeft <= 15;

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${flashClass}`}>

      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setShowExit(true)} className="w-8 h-8 flex items-center justify-center text-white/70 -ml-1">
            <X size={20} />
          </button>

          <div className="text-center max-w-[200px]">
            {breadcrumb.length > 0 && (
              <p className="text-white/50 text-[11px] truncate">
                {breadcrumb.map((t) => t.name).join(' › ')}
              </p>
            )}
            <p className="text-white font-bold text-sm truncate">{topic?.name ?? 'Practice'}</p>
          </div>

          <div className="flex items-center gap-1.5">
            {isTimed && (
              <span className={`text-xs font-mono tabular-nums flex items-center gap-0.5 ${timerDanger ? 'text-danger font-bold' : 'text-white/70'}`}>
                <Clock size={10} />{formatTime(timeLeft)}
              </span>
            )}
            <span className="text-xs text-white/50">{qIndex + 1}/{totalQuestions}</span>
          </div>
        </div>

        <TimerBar timeLeft={isTimed ? timeLeft : PER_QUESTION_SECONDS} total={PER_QUESTION_SECONDS} danger={timerDanger} />

        {/* progress dots */}
        <div className="flex gap-1 mt-2.5 justify-center flex-wrap">
          {Array.from({ length: totalQuestions }).map((_, i) => {
            const r = results[i];
            const isCur = i === qIndex;
            return (
              <span key={i} className={`rounded-full transition-all ${
                r
                  ? r.correct ? 'w-2 h-2 bg-success' : 'w-2 h-2 bg-danger'
                  : isCur ? 'w-3 h-2 bg-white' : 'w-2 h-2 bg-white/25'
              }`} />
            );
          })}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              topic?.category === 'MSTE' ? 'bg-primary/10 text-primary' :
              topic?.category === 'HGE'  ? 'bg-accent/10 text-accent' :
                                           'bg-success/10 text-success'
            }`}>{topic?.category}</span>
            {isTimed && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-warning/10 text-warning flex items-center gap-1">
                <Clock size={10} />Timed
              </span>
            )}
            {currentQ.difficulty && (
              <span className="text-[10px] text-gray-400 ml-auto">
                {'●'.repeat(currentQ.difficulty)}{'○'.repeat(5 - currentQ.difficulty)}
              </span>
            )}
          </div>
          <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{currentQ.stem}</p>
        </div>

        {/* Choices */}
        <div className="space-y-2.5 mb-4">
          {currentQ.choices.map((choice, idx) => {
            const label = String.fromCharCode(65 + idx);
            const text  = choice.replace(/^[A-D]\.\s*/, '');
            return (
              <ChoiceButton
                key={idx}
                label={label}
                text={text}
                state={choiceState(idx)}
                onClick={() => !submitted && doSubmit(idx)}
                disabled={submitted}
              />
            );
          })}
        </div>

        {/* Feedback */}
        {submitted && (
          <div className="mb-4 animate-in fade-in duration-300">
            <FeedbackCard correct={answeredCorrectly} question={currentQ} />
          </div>
        )}

        {/* Manual next — shown only on wrong or timed-out */}
        {submitted && !answeredCorrectly && (
          <button
            onClick={() => advance()}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
          >
            {isLastQ ? 'See Results' : 'Next Question'}
            <ChevronRight size={18} />
          </button>
        )}

        {/* Practice mode hint */}
        {!submitted && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {isTimed ? `${formatTime(timeLeft)} to answer` : 'Tap a choice to submit'}
          </p>
        )}
      </div>

      {/* Exit modal */}
      {showExit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[420px] rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">Exit Session?</h2>
            <p className="text-sm text-gray-400 mb-6">
              {results.length} of {totalQuestions} answered — progress will be saved.
            </p>
            <button onClick={handleExitConfirm} className="w-full py-3.5 rounded-2xl bg-danger text-white font-bold mb-3">
              Exit Session
            </button>
            <button onClick={() => setShowExit(false)} className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-semibold">
              Keep Going
            </button>
          </div>
        </div>
      )}

      {/* Flash animation styles */}
      <style>{`
        @keyframes flashGreen {
          0%   { background-color: rgb(42 157 143 / 0%); }
          30%  { background-color: rgb(42 157 143 / 15%); }
          100% { background-color: rgb(42 157 143 / 0%); }
        }
        @keyframes flashRed {
          0%   { background-color: rgb(230 57 70 / 0%); }
          30%  { background-color: rgb(230 57 70 / 15%); }
          100% { background-color: rgb(230 57 70 / 0%); }
        }
        .flash-correct { animation: flashGreen 0.6s ease-out; }
        .flash-wrong   { animation: flashRed   0.6s ease-out; }
      `}</style>
    </div>
  );
}
