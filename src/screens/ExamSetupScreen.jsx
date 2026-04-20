import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ClipboardList, Clock, Hash, ShieldAlert } from 'lucide-react';
import { getLevel2Topics } from '../data/topics';

// ─── Question generator ──────────────────────────────────────────────────────
const ANSWERS = ['A', 'B', 'C', 'D'];

function generateQuestions(type, count) {
  const level2 = getLevel2Topics();

  let pool;
  if (type === 'Full') {
    const mste = level2.filter((t) => t.category === 'MSTE');
    const hge  = level2.filter((t) => t.category === 'HGE');
    const sec  = level2.filter((t) => t.category === 'SEC');

    const expand = (arr, n) => {
      const out = [];
      while (out.length < n) out.push(...arr.sort(() => Math.random() - 0.5));
      return out.slice(0, n);
    };

    const perCat = Math.floor(count / 3);
    const rem    = count % 3;
    pool = [
      ...expand(mste, perCat + (rem > 0 ? 1 : 0)),
      ...expand(hge,  perCat + (rem > 1 ? 1 : 0)),
      ...expand(sec,  perCat),
    ].sort(() => Math.random() - 0.5);
  } else {
    const filtered = level2.filter((t) => t.category === type);
    const out = [];
    while (out.length < count) out.push(...filtered.sort(() => Math.random() - 0.5));
    pool = out.slice(0, count);
  }

  return pool.map((topic, i) => ({
    id: i + 1,
    topicId: topic.id,
    category: topic.category,
    correctAnswer: ANSWERS[Math.floor(Math.random() * 4)],
  }));
}

// ─── Sub-components ──────────────────────────────────────────────────────────
const EXAM_TYPES = [
  {
    id: 'MSTE',
    label: 'MSTE',
    sub: 'Math, Surveying & Transportation',
    color: 'border-primary',
    dot: 'bg-primary',
  },
  {
    id: 'HGE',
    label: 'HGE',
    sub: 'Hydraulics & Geotechnical Eng.',
    color: 'border-accent',
    dot: 'bg-accent',
  },
  {
    id: 'SEC',
    label: 'SEC',
    sub: 'Structural Eng. & Construction',
    color: 'border-success',
    dot: 'bg-success',
  },
  {
    id: 'Full',
    label: 'Full Board',
    sub: 'All three subjects combined',
    color: 'border-warning',
    dot: 'bg-warning',
  },
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

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ExamSetupScreen() {
  const navigate = useNavigate();

  const [examType,    setExamType]    = useState('Full');
  const [duration,    setDuration]    = useState(120);
  const [qCount,      setQCount]      = useState(50);
  const [strictMode,  setStrictMode]  = useState(false);

  function handleStart() {
    const questions = generateQuestions(examType, qCount);
    const examConfig = {
      type: examType,
      durationMinutes: duration,
      questionCount: qCount,
      strictMode,
      questions,
    };
    navigate('/exam/session', { state: { examConfig } });
  }

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full bg-white/10 text-white/80"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-white text-lg font-bold tracking-tight">Board Exam Simulator</h1>
            <p className="text-white/60 text-xs mt-0.5">Configure your exam conditions</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Exam Scope */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={ClipboardList} label="Exam Scope" />
          <div className="space-y-2">
            {EXAM_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setExamType(t.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  examType === t.id
                    ? `${t.color} bg-gray-50`
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.dot} ${examType !== t.id ? 'opacity-30' : ''}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${examType === t.id ? 'text-primary' : 'text-gray-700'}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{t.sub}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    examType === t.id ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  {examType === t.id && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={Clock} label="Duration" />
          <PillGroup
            options={[
              { value: 60,  label: '1 hour' },
              { value: 120, label: '2 hours' },
              { value: 180, label: '3 hours' },
            ]}
            value={duration}
            onChange={setDuration}
          />
        </div>

        {/* Question Count */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <SectionLabel icon={Hash} label="Questions" />
          <PillGroup
            options={[
              { value: 30,  label: '30 items' },
              { value: 50,  label: '50 items' },
              { value: 100, label: '100 items' },
            ]}
            value={qCount}
            onChange={setQCount}
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
                  Disables exit once the exam starts. Forces full completion.
                </p>
              </div>
            </div>
            {/* Toggle */}
            <button
              onClick={() => setStrictMode((v) => !v)}
              className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors shrink-0 mt-0.5 ${
                strictMode ? 'bg-danger' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  strictMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 p-4">
        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
        >
          <ClipboardList size={16} />
          Start Exam — {qCount} items / {duration / 60}hr
        </button>
      </div>
    </div>
  );
}
