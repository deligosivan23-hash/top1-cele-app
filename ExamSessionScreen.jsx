import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flag, ChevronLeft, ChevronRight, AlertTriangle, X } from 'lucide-react';
import { getTopicById } from '../data/topics';
import { useStore } from '../store/useStore';

// ─── Timer helpers ───────────────────────────────────────────────────────────
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const CATEGORY_COLORS = {
  MSTE: { bg: 'bg-primary/10', text: 'text-primary',  border: 'border-primary/30' },
  HGE:  { bg: 'bg-accent/10',  text: 'text-accent',   border: 'border-accent/30'  },
  SEC:  { bg: 'bg-success/10', text: 'text-success',  border: 'border-success/30' },
};

// ─── Exit Confirm Modal ──────────────────────────────────────────────────────
function ExitModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] p-6 pb-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={20} className="text-warning" />
          <h2 className="text-base font-bold text-primary">Exit Exam?</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Your progress will be saved and scored up to your current question. This cannot be undone.
        </p>
        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-xl bg-danger text-white font-semibold text-sm mb-2"
        >
          Exit &amp; Score Now
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm"
        >
          Continue Exam
        </button>
      </div>
    </div>
  );
}

// ─── Question dot strip ──────────────────────────────────────────────────────
function QuestionDots({ questions, current, answers, flagged }) {
  // Show a compact scrollable dot row
  return (
    <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
      {questions.map((_, i) => {
        const answered = answers[i]?.selected;
        const isFlagged = flagged.has(i);
        const isCurrent = i === current;

        let cls = 'w-2 h-2 rounded-full shrink-0 transition-all ';
        if (isCurrent) cls += 'w-3 h-3 bg-primary ring-2 ring-primary/30';
        else if (isFlagged && answered) cls += 'bg-warning';
        else if (answered) cls += 'bg-success';
        else cls += 'bg-gray-200';

        return <div key={i} className={cls} />;
      })}
    </div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ExamSessionScreen() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { saveExamResult } = useStore();

  // Redirect if no config passed
  const examConfig = location.state?.examConfig ?? null;

  const [currentQ,   setCurrentQ]   = useState(0);  // 0-indexed
  const [answers,    setAnswers]     = useState({});  // { [index]: { selected: 'A'|'B'|'C'|'D' } }
  const [flagged,    setFlagged]     = useState(new Set());
  const [timeLeft,   setTimeLeft]    = useState(() => (examConfig?.durationMinutes ?? 120) * 60);
  const [done,       setDone]        = useState(false);
  const [showExit,   setShowExit]    = useState(false);

  const doneRef = useRef(false);

  // Redirect guard
  useEffect(() => {
    if (!examConfig) navigate('/exam', { replace: true });
  }, [examConfig, navigate]);

  // Countdown timer
  useEffect(() => {
    if (!examConfig || done) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            setDone(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examConfig]);

  // Navigate to results when done flag set
  const finishExam = useCallback(
    (forcedAnswers) => {
      const finalAnswers = forcedAnswers ?? answers;
      const questions = examConfig.questions;

      // Compute results
      let totalCorrect = 0;
      const byCat = {
        MSTE: { correct: 0, total: 0 },
        HGE:  { correct: 0, total: 0 },
        SEC:  { correct: 0, total: 0 },
      };
      const byTopic = {};

      questions.forEach((q, i) => {
        const selected = finalAnswers[i]?.selected;
        const isCorrect = selected !== undefined && selected === q.correctAnswer;
        if (isCorrect) totalCorrect++;

        const cat = q.category;
        if (byCat[cat]) {
          byCat[cat].total++;
          if (isCorrect) byCat[cat].correct++;
        }

        if (!byTopic[q.topicId]) byTopic[q.topicId] = { correct: 0, total: 0, topicId: q.topicId };
        byTopic[q.topicId].total++;
        if (isCorrect) byTopic[q.topicId].correct++;
      });

      const overall    = Math.round((totalCorrect / questions.length) * 100);
      const scoreMste  = byCat.MSTE.total > 0 ? Math.round((byCat.MSTE.correct / byCat.MSTE.total) * 100) : null;
      const scoreHge   = byCat.HGE.total  > 0 ? Math.round((byCat.HGE.correct  / byCat.HGE.total)  * 100) : null;
      const scoreSec   = byCat.SEC.total  > 0 ? Math.round((byCat.SEC.correct  / byCat.SEC.total)  * 100) : null;

      const weakAreas = Object.values(byTopic)
        .filter((t) => t.total >= 2)
        .map((t) => ({ ...t, accuracy: Math.round((t.correct / t.total) * 100) }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 3);

      const durationUsed = examConfig.durationMinutes - Math.ceil(timeLeft / 60);

      const result = {
        type: examConfig.type,
        questionCount: questions.length,
        durationMinutes: Math.max(1, durationUsed),
        overall,
        scoreMste,
        scoreHge,
        scoreSec,
        totalCorrect,
        weakAreas,
      };

      saveExamResult(result);
      navigate('/exam/results', { state: { result }, replace: true });
    },
    [answers, examConfig, timeLeft, saveExamResult, navigate]
  );

  useEffect(() => {
    if (done) finishExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (!examConfig) return null;

  const { questions, strictMode } = examConfig;
  const question   = questions[currentQ];
  const topic      = getTopicById(question.topicId);
  const catColors  = CATEGORY_COLORS[question.category] ?? CATEGORY_COLORS.MSTE;
  const isLast     = currentQ === questions.length - 1;
  const answered   = answers[currentQ]?.selected;
  const isFlagged  = flagged.has(currentQ);
  const isLowTime  = timeLeft < 600; // < 10 min

  function selectAnswer(letter) {
    setAnswers((prev) => ({ ...prev, [currentQ]: { selected: letter } }));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ)) next.delete(currentQ);
      else next.add(currentQ);
      return next;
    });
  }

  function handleFinish() {
    if (!doneRef.current) {
      doneRef.current = true;
      finishExam();
    }
  }

  function handleExitConfirm() {
    setShowExit(false);
    handleFinish();
  }

  const answeredCount = Object.keys(answers).length;
  const flaggedCount  = flagged.size;

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* ── Top bar ── */}
      <div className="px-4 pt-10 pb-3">
        <div className="flex items-center justify-between mb-2">
          {/* Timer */}
          <div className={`font-mono text-3xl font-black tracking-tight ${isLowTime ? 'text-red-400' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </div>

          {/* Counter + Exit */}
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm font-medium">
              Q{currentQ + 1} / {questions.length}
            </span>
            {!strictMode && (
              <button
                onClick={() => setShowExit(true)}
                className="p-1.5 rounded-full bg-white/10 text-white/70"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/40 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Dot strip */}
        <div className="mt-2">
          <QuestionDots
            questions={questions}
            current={currentQ}
            answers={answers}
            flagged={flagged}
          />
        </div>
      </div>

      {/* ── Question card ── */}
      <div className="flex-1 bg-surface rounded-t-3xl px-4 pt-5 pb-6">
        {/* Category + topic */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${catColors.bg} ${catColors.text} ${catColors.border}`}>
            {question.category}
          </span>
          <span className="text-xs text-gray-400 font-medium truncate">{topic?.name ?? question.topicId}</span>
          <button
            onClick={toggleFlag}
            className={`ml-auto p-1.5 rounded-full transition-colors ${
              isFlagged ? 'bg-warning/20 text-warning' : 'bg-gray-100 text-gray-300'
            }`}
          >
            <Flag size={15} />
          </button>
        </div>

        {/* Placeholder question card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 min-h-[120px] flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Question {currentQ + 1}</p>
          <p className="text-sm font-semibold text-primary leading-relaxed">
            Read the problem in your reviewer.<br />Solve on paper, then mark your answer below.
          </p>
        </div>

        {/* A/B/C/D buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {['A', 'B', 'C', 'D'].map((letter) => {
            const isSelected = answered === letter;
            return (
              <button
                key={letter}
                onClick={() => selectAnswer(letter)}
                className={`py-3.5 rounded-2xl font-bold text-base border-2 transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-accent'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Footer: answered counter + prev/next */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">
            {answeredCount}/{questions.length} answered
            {flaggedCount > 0 && (
              <span className="ml-2 text-warning">· {flaggedCount} flagged</span>
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            {isLast ? (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-xl bg-success text-white font-bold text-sm"
              >
                Finish Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQ((q) => Math.min(questions.length - 1, q + 1))}
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Exit modal ── */}
      {showExit && (
        <ExitModal onCancel={() => setShowExit(false)} onConfirm={handleExitConfirm} />
      )}
    </div>
  );
}
