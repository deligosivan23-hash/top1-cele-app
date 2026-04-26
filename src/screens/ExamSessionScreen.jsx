// Fixing Critical Bug #1 (timer guard), Critical Bug #2 (stale closure),
// Major Bug #5 (hardcoded 90s logAttempt time), and Minor Issue #7
// (remove local formatTime — now imported from ../utils/stats).

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flag, ChevronLeft, ChevronRight, SkipForward, Grid, X, AlertTriangle, Check, Clock } from 'lucide-react';
import { getTopicById } from '../data/topics';
import { useStore } from '../store/useStore';
import { formatTime } from '../utils/stats';

const CAT_COLORS = {
  MSTE: 'bg-primary/10 text-primary border-primary/30',
  HGE:  'bg-accent/10 text-accent border-accent/30',
  SEC:  'bg-success/10 text-success border-success/30',
};

// ── Question Grid Modal ────────────────────────────────────────────────────
function QuestionGrid({ questions, current, answers, flagged, skipped, onJump, onClose, strictMode }) {
  const stats = {
    answered: Object.values(answers).filter(a => a !== null).length,
    flagged:  flagged.size,
    skipped:  skipped.size,
    unanswered: questions.length - Object.values(answers).filter(a => a !== null).length,
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] mx-auto max-h-[80vh] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <h2 className="text-base font-bold text-primary">Question Overview</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* legend */}
        <div className="px-5 pb-3 flex gap-3 flex-wrap flex-shrink-0">
          {[
            { color: 'bg-success',  label: 'Answered' },
            { color: 'bg-warning',  label: 'Flagged'  },
            { color: 'bg-accent',   label: 'Skipped'  },
            { color: 'bg-gray-200', label: 'Unseen'   },
            { color: 'bg-primary ring-2 ring-primary/40', label: 'Current' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm ${color}`} />
              <span className="text-[11px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* summary chips */}
        <div className="px-5 pb-3 flex gap-2 flex-shrink-0">
          <span className="text-xs bg-success/10 text-success font-semibold px-2.5 py-1 rounded-full">{stats.answered} answered</span>
          {stats.flagged  > 0 && <span className="text-xs bg-warning/10 text-warning font-semibold px-2.5 py-1 rounded-full">{stats.flagged} flagged</span>}
          {stats.skipped  > 0 && <span className="text-xs bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">{stats.skipped} skipped</span>}
          {stats.unanswered > 0 && <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2.5 py-1 rounded-full">{stats.unanswered} left</span>}
        </div>

        {/* grid */}
        <div className="overflow-y-auto px-5 pb-6 flex-1">
          <div className="grid grid-cols-8 gap-1.5">
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== null && answers[i] !== undefined;
              const isFlagged  = flagged.has(i);
              const isSkipped  = skipped.has(i);
              const isCurrent  = i === current;

              let bg = 'bg-gray-100 text-gray-500';
              if (isCurrent)        bg = 'bg-primary text-white ring-2 ring-primary/40';
              else if (isFlagged && isAnswered) bg = 'bg-warning text-white';
              else if (isFlagged)   bg = 'bg-warning/40 text-warning';
              else if (isSkipped)   bg = 'bg-accent/20 text-accent';
              else if (isAnswered)  bg = 'bg-success text-white';

              return (
                <button
                  key={i}
                  onClick={() => { onJump(i); onClose(); }}
                  className={`aspect-square rounded-lg text-[11px] font-bold flex items-center justify-center transition-transform active:scale-90 ${bg}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Exit Confirm Modal ─────────────────────────────────────────────────────
function ExitModal({ answeredCount, total, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] p-5 pb-10 shadow-2xl">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle size={20} className="text-warning" />
          <h2 className="text-base font-bold text-primary">Submit Exam?</h2>
        </div>
        <p className="text-sm text-gray-500 mb-1 leading-relaxed">
          You have answered <span className="font-bold text-primary">{answeredCount}</span> of <span className="font-bold">{total}</span> questions.
        </p>
        <p className="text-xs text-gray-400 mb-6">Unanswered questions will be marked as wrong.</p>
        <button onClick={onConfirm} className="w-full py-3.5 rounded-2xl bg-danger text-white font-bold mb-3">
          Submit &amp; Score Now
        </button>
        <button onClick={onCancel} className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-semibold">
          Continue Exam
        </button>
      </div>
    </div>
  );
}

// ── Choice Button ──────────────────────────────────────────────────────────
function ChoiceBtn({ label, text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 flex items-start gap-3 transition-all active:scale-[0.98] ${
        selected
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-gray-200 bg-white text-gray-700'
      }`}
    >
      <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
        selected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
      }`}>
        {selected && <Check size={11} className="text-white" />}
      </span>
      <span className="text-sm leading-snug font-medium">
        <span className="font-bold mr-1">{label}.</span>{text}
      </span>
    </button>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function ExamSessionScreen() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { saveExamResult, logAttempt } = useStore();

  const examConfig = location.state?.examConfig ?? null;

  useEffect(() => {
    if (!examConfig) navigate('/exam', { replace: true });
  }, [examConfig, navigate]);

  const totalSecs = (examConfig?.durationMinutes ?? 120) * 60;

  const [currentQ,  setCurrentQ]  = useState(0);
  const [answers,   setAnswers]    = useState({});   // { [idx]: answerIndex | null }
  const [flagged,   setFlagged]    = useState(new Set());
  const [skipped,   setSkipped]    = useState(new Set());
  const [timeLeft,  setTimeLeft]   = useState(totalSecs);
  const [showGrid,  setShowGrid]   = useState(false);
  const [showExit,  setShowExit]   = useState(false);

  const doneRef     = useRef(false);
  const timerRef    = useRef(null);
  // Bug #2 fix: refs keep answers and timeLeft current across all closures
  const answersRef  = useRef({});
  const timeLeftRef = useRef(totalSecs);

  // Keep answersRef in sync with answers state
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // ── Finish & score ────────────────────────────────────────────────────────
  // Bug #1 fix: finishExam owns the doneRef lifecycle — checks before setting.
  // Bug #2 fix: reads answersRef.current / timeLeftRef.current, never stale.
  // Bug #5 fix: avg time per question replaces hardcoded 90s constant.
  const finishExam = useCallback((forcedAnswers) => {
    if (doneRef.current) return;   // check first — Bug #1
    doneRef.current = true;        // then set
    clearInterval(timerRef.current);

    const finalAnswers   = forcedAnswers ?? answersRef.current;
    const qs             = examConfig.questions;
    const timeUsedSecs   = Math.max(60, totalSecs - timeLeftRef.current);
    const timeUsedMins   = Math.max(1, Math.round(timeUsedSecs / 60));
    // Bug #5: realistic per-question time (≥ 30 s floor)
    const avgTimePerQuestion = Math.max(30, Math.round(timeUsedSecs / qs.length));

    let totalCorrect = 0;
    const byCat   = { MSTE:{correct:0,total:0}, HGE:{correct:0,total:0}, SEC:{correct:0,total:0} };
    const byTopic = {};
    const questionResults = [];

    qs.forEach((q, i) => {
      const selected  = finalAnswers[i] ?? null;
      const isCorrect = selected !== null && selected === q.answerIndex;
      if (isCorrect) totalCorrect++;

      const cat = q.category ?? 'MSTE';
      if (byCat[cat]) { byCat[cat].total++; if (isCorrect) byCat[cat].correct++; }

      const tid = q.topicId;
      if (!byTopic[tid]) byTopic[tid] = { correct:0, total:0, topicId:tid };
      byTopic[tid].total++;
      if (isCorrect) byTopic[tid].correct++;

      logAttempt(tid, isCorrect, avgTimePerQuestion);
      questionResults.push({ question: q, selected, correct: isCorrect });
    });

    const overall   = Math.round((totalCorrect / qs.length) * 100);
    const scoreMste = byCat.MSTE.total > 0 ? Math.round((byCat.MSTE.correct / byCat.MSTE.total) * 100) : null;
    const scoreHge  = byCat.HGE.total  > 0 ? Math.round((byCat.HGE.correct  / byCat.HGE.total)  * 100) : null;
    const scoreSec  = byCat.SEC.total  > 0 ? Math.round((byCat.SEC.correct  / byCat.SEC.total)  * 100) : null;

    const weakTopics = Object.values(byTopic)
      .filter((t) => t.total >= 1)
      .map((t) => ({ ...t, accuracy: Math.round((t.correct / t.total) * 100) }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const result = {
      type: examConfig.type,
      questionCount: qs.length,
      durationMinutes: timeUsedMins,
      overall,
      scoreMste, scoreHge, scoreSec,
      totalCorrect,
      weakTopics,
      questionResults,
      byCat,
    };

    saveExamResult(result);
    navigate('/exam/results', { state: { result }, replace: true });
  // Bug #2 fix: answers/timeLeft removed from deps; values come from refs.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examConfig, totalSecs, saveExamResult, logAttempt, navigate]);

  // ── Countdown ────────────────────────────────────────────────────────────
  // Bug #1 fix: timer does NOT set doneRef — finishExam owns that entirely.
  // Bug #2 fix: timeLeftRef kept in sync inside the setter.
  useEffect(() => {
    if (!examConfig) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timeLeftRef.current = 0;
          finishExam();   // finishExam owns the doneRef lifecycle
          return 0;
        }
        const next = prev - 1;
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examConfig]);

  if (!examConfig) return null;

  const { questions, strictMode } = examConfig;
  const q         = questions[currentQ];
  const topic     = getTopicById(q.topicId);
  const isFirst   = currentQ === 0;
  const isLast    = currentQ === questions.length - 1;
  const answered  = answers[currentQ];
  const isFlagged = flagged.has(currentQ);
  const isSkipped = skipped.has(currentQ);
  const isLowTime = timeLeft < 600;
  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;

  // ── Actions ──────────────────────────────────────────────────────────────
  function selectAnswer(idx) {
    setAnswers((prev) => ({ ...prev, [currentQ]: idx }));
    setSkipped((prev) => { const n = new Set(prev); n.delete(currentQ); return n; });
  }

  function toggleFlag() {
    setFlagged((prev) => { const n = new Set(prev); n.has(currentQ) ? n.delete(currentQ) : n.add(currentQ); return n; });
  }

  function handleSkip() {
    setSkipped((prev) => { const n = new Set(prev); n.add(currentQ); return n; });
    if (!isLast) setCurrentQ((i) => i + 1);
    else setShowExit(true);
  }

  function goNext() { if (!isLast) setCurrentQ((i) => i + 1); else setShowExit(true); }
  function goPrev() { if (!isFirst && !strictMode) setCurrentQ((i) => i - 1); }
  function jumpTo(i) { setCurrentQ(i); }

  function handleFinishConfirm() {
    setShowExit(false);
    finishExam(answersRef.current);
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col">

      {/* ── Top bar ── */}
      <div className="px-4 pt-10 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 font-mono text-2xl font-black tracking-tight ${isLowTime ? 'text-red-300' : 'text-white'}`}>
            <Clock size={18} className={isLowTime ? 'text-red-300' : 'text-white/60'} />
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm font-medium tabular-nums">
              {currentQ + 1} / {questions.length}
            </span>
            {!strictMode && (
              <button
                onClick={() => setShowGrid(true)}
                className="p-1.5 rounded-full bg-white/10 text-white/80 active:bg-white/20"
                aria-label="Question overview"
              >
                <Grid size={17} />
              </button>
            )}
            {!strictMode && (
              <button
                onClick={() => setShowExit(true)}
                className="p-1.5 rounded-full bg-white/10 text-white/80 active:bg-white/20"
                aria-label="Submit exam"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/50 rounded-full transition-all duration-300"
            style={{ width: `${((answeredCount) / questions.length) * 100}%` }}
          />
        </div>

        {/* Mini dot strip */}
        <div className="flex gap-0.5 overflow-x-auto mt-2 no-scrollbar">
          {questions.map((_, i) => {
            const isAns  = answers[i] !== null && answers[i] !== undefined;
            const isFl   = flagged.has(i);
            const isSk   = skipped.has(i);
            const isCur  = i === currentQ;
            let cls = 'w-2 h-2 rounded-full shrink-0 transition-all ';
            if (isCur)  cls += 'w-3 bg-white';
            else if (isFl && isAns) cls += 'bg-warning';
            else if (isFl)          cls += 'bg-warning/50';
            else if (isSk)          cls += 'bg-accent/60';
            else if (isAns)         cls += 'bg-success';
            else                    cls += 'bg-white/20';
            return <div key={i} className={cls} />;
          })}
        </div>
      </div>

      {/* ── Question card area ── */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl overflow-y-auto">
        <div className="px-4 pt-5 pb-32">

          {/* Category + topic + flag */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${CAT_COLORS[q.category] ?? CAT_COLORS.MSTE}`}>
              {q.category}
            </span>
            <span className="text-xs text-gray-400 font-medium truncate flex-1">{topic?.name ?? q.topicId}</span>
            {q.difficulty && (
              <span className="text-[10px] text-gray-400">{'●'.repeat(q.difficulty)}{'○'.repeat(5 - q.difficulty)}</span>
            )}
            <button
              onClick={toggleFlag}
              className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${isFlagged ? 'bg-warning/20 text-warning' : 'bg-gray-200 text-gray-400'}`}
              aria-label={isFlagged ? 'Unflag' : 'Flag for review'}
            >
              <Flag size={14} />
            </button>
          </div>

          {/* Question stem */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
            {isSkipped && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">Skipped — come back to this</span>
              </div>
            )}
            <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{q.stem}</p>
          </div>

          {/* Choices */}
          <div className="space-y-2.5">
            {q.choices.map((choice, idx) => {
              const label = String.fromCharCode(65 + idx);
              const text  = choice.replace(/^[A-D]\.\s*/, '');
              return (
                <ChoiceBtn
                  key={idx}
                  label={label}
                  text={text}
                  selected={answered === idx}
                  onClick={() => selectAnswer(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom nav bar ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2 z-30">
        <button
          onClick={goPrev}
          disabled={isFirst || strictMode}
          className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 disabled:opacity-30 active:bg-gray-200 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleSkip}
          className="flex-1 h-11 rounded-2xl bg-accent/10 text-accent font-semibold text-sm flex items-center justify-center gap-1.5 active:bg-accent/20 transition-colors"
        >
          <SkipForward size={15} /> Skip
        </button>

        <span className="text-xs text-gray-400 font-medium px-1 whitespace-nowrap tabular-nums">
          {answeredCount}/{questions.length}
        </span>

        {isLast ? (
          <button
            onClick={() => setShowExit(true)}
            className="flex-1 h-11 rounded-2xl bg-success text-white font-bold text-sm flex items-center justify-center active:bg-success/90 transition-colors"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={goNext}
            className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white active:bg-primary/90 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* ── Question Grid Modal ── */}
      {showGrid && !strictMode && (
        <QuestionGrid
          questions={questions}
          current={currentQ}
          answers={answers}
          flagged={flagged}
          skipped={skipped}
          onJump={jumpTo}
          onClose={() => setShowGrid(false)}
          strictMode={strictMode}
        />
      )}

      {/* ── Exit / Submit Modal ── */}
      {showExit && (
        <ExitModal
          answeredCount={answeredCount}
          total={questions.length}
          onCancel={() => setShowExit(false)}
          onConfirm={handleFinishConfirm}
        />
      )}
    </div>
  );
}
