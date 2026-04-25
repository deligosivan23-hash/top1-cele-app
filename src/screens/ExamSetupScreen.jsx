import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Clock, Hash, ShieldAlert, AlertCircle } from 'lucide-react';
import { getQuestionsByCategory, getRandomQuestions } from '../data/questions';
import { getLevel3Topics } from '../data/topics';

// ── Question generator using real question bank ────────────────────────────
function generateExamQuestions(type, count) {
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  if (type === 'Full') {
    // Equal split across categories, fill gaps with available questions
    const perCat = Math.floor(count / 3);
    const rem    = count % 3;
    const mste   = shuffle(getQuestionsByCategory('MSTE')).slice(0, perCat + (rem > 0 ? 1 : 0));
    const hge    = shuffle(getQuestionsByCategory('HGE')).slice(0, perCat + (rem > 1 ? 1 : 0));
    const sec    = shuffle(getQuestionsByCategory('SEC')).slice(0, perCat);
    return shuffle([...mste, ...hge, ...sec]).slice(0, count);
  }

  const pool = shuffle(getQuestionsByCategory(type));
  // If pool smaller than count, recycle with shuffle
  let result = [];
  while (result.length < count) result = result.concat(shuffle(pool));
  return result.slice(0, count);
}

// ── Sub-components ─────────────────────────────────────────────────────────
const EXAM_TYPES = [
  { id: 'MSTE', label: 'MSTE', sub: 'Mathematics, Surveying & Transportation', color: 'border-primary', dot: 'bg-primary' },
  { id: 'HGE',  label: 'HGE',  sub: 'Hydraulics & Geotechnical Engineering',   color: 'border-accent',  dot: 'bg-accent'  },
  { id: 'SEC',  label: 'SEC',  sub: 'Structural Engineering & Construction',    color: 'border-success', dot: 'bg-success' },
  { id: 'Full', label: 'Full Board', sub: 'All three subjects combined',        color: 'border-warning', dot: 'bg-warning' },
];

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={15} className="text-accent" />
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            value === opt.value
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function ExamSetupScreen() {
  const navigate = useNavigate();

  const [examType,   setExamType]   = useState('Full');
  const [duration,   setDuration]   = useState(120);
  const [qCount,     setQCount]     = useState(50);
  const [strictMode, setStrictMode] = useState(false);

  // Show available question counts per category
  const availMSTE = getQuestionsByCategory('MSTE').length;
  const availHGE  = getQuestionsByCategory('HGE').length;
  const availSEC  = getQuestionsByCategory('SEC').length;

  function handleStart() {
    const questions = generateExamQuestions(examType, qCount);
    navigate('/exam/session', {
      state: {
        examConfig: {
          type: examType,
          durationMinutes: duration,
          questionCount: qCount,
          strictMode,
          questions,        // full question objects with stem, choices, answerIndex, etc.
        },
      },
    });
  }

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <h1 className="text-white text-xl font-bold">Board Exam Simulator</h1>
        <p className="text-white/60 text-sm mt-0.5">Configure your exam conditions</p>
      </div>

      {/* Bank size info banner */}
      <div className="mx-4 mt-4 bg-accent/10 border border-accent/20 rounded-xl px-4 py-2.5 flex items-start gap-2">
        <AlertCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
        <p className="text-xs text-accent">
          Question bank: <span className="font-bold">{availMSTE} MSTE</span> · <span className="font-bold">{availHGE} HGE</span> · <span className="font-bold">{availSEC} SEC</span>. Questions recycle if count exceeds bank size.
        </p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Exam Scope */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={ClipboardList} label="Exam Scope" />
          <div className="space-y-2">
            {EXAM_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setExamType(t.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  examType === t.id ? `${t.color} bg-gray-50` : 'border-gray-100 bg-white'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.dot} ${examType !== t.id ? 'opacity-30' : ''}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${examType === t.id ? 'text-primary' : 'text-gray-700'}`}>{t.label}</p>
                  <p className="text-xs text-gray-400 truncate">{t.sub}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${examType === t.id ? 'border-primary' : 'border-gray-300'}`}>
                  {examType === t.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={Clock} label="Duration" />
          <PillGroup
            options={[{ value: 60, label: '1 hour' }, { value: 120, label: '2 hours' }, { value: 180, label: '3 hours' }]}
            value={duration}
            onChange={(v) => setDuration(Number(v))}
          />
        </div>

        {/* Question Count */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={Hash} label="Questions" />
          <PillGroup
            options={[{ value: 20, label: '20 items' }, { value: 50, label: '50 items' }, { value: 100, label: '100 items' }]}
            value={qCount}
            onChange={(v) => setQCount(Number(v))}
          />
        </div>

        {/* Strict Mode */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <ShieldAlert size={18} className={strictMode ? 'text-danger mt-0.5' : 'text-gray-300 mt-0.5'} />
              <div>
                <p className="text-sm font-bold text-primary">Strict Mode</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Disables Prev button, question grid, and exit. Forces full exam completion.
                </p>
              </div>
            </div>
            <button
              onClick={() => setStrictMode((v) => !v)}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors shrink-0 mt-0.5 ${strictMode ? 'bg-danger' : 'bg-gray-200'}`}
            >
              <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${strictMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 p-4">
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <ClipboardList size={18} />
          Start Exam — {qCount} items · {duration / 60}hr
        </button>
      </div>
    </div>
  );
}
