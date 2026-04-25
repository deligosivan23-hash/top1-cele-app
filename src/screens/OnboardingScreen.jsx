import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, ChevronRight, Check, Zap, Award, AlertCircle } from 'lucide-react';
import { universitySubjects } from '../data/subjects';
import { useStore } from '../store/useStore';

// ─── helpers ──────────────────────────────────────────────────────────────────
function getSubjectsForYear(year) {
  return universitySubjects.filter((s) => s.yearLevel <= year && !s.isMinor);
}

function countUnlockedTopics(subjectIds) {
  const allIds = universitySubjects.filter((s) => subjectIds.includes(s.id)).flatMap((s) => s.coveredTopicIds);
  return new Set(allIds).size;
}

function countByCategory(subjectIds, category) {
  // proxy: count topic IDs that contain category hint
  const catPrefixes = { MSTE: ['alg-','trig-','ageo-','diff-','int-','de-','stat-','plane-','geo-c','geo-g','engsurvey','comp-','hwy-','traf-','pave-','surv','trans'], HGE: ['prop-','fstat-','dyn-','pipe-','open-','hydro-','mach-','soil-','class-u','class-a','comp-p','comp-fi','perm-','cons-','shear-','found-'], SEC: ['anal-','rc-','steel-','timber-','pm-','est-','mat-'] };
  const prefixes = catPrefixes[category] || [];
  const allIds = universitySubjects.filter((s) => subjectIds.includes(s.id)).flatMap((s) => s.coveredTopicIds);
  const unique = [...new Set(allIds)];
  return unique.filter((id) => prefixes.some((p) => id.startsWith(p))).length;
}

// ─── step components ───────────────────────────────────────────────────────────
function StepWelcome({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-primary text-white relative overflow-hidden">
      {/* background rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* icon */}
        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
          <Award size={40} className="text-white" />
        </div>

        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">CELE Top 1 Tracker</p>
        <h1 className="text-3xl font-bold leading-tight mb-4">
          Train like a Top 1.<br />Become one.
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mb-10">
          A ruthless training system that tracks every board exam topic,
          exposes your weaknesses, and builds the mastery you need to place
          Top 1 in the Philippine CELE.
        </p>

        <div className="flex flex-col gap-3 w-full text-left mb-10">
          {[
            { icon: Target, text: 'Adaptive practice that hunts your weak spots' },
            { icon: Zap,    text: 'Real board-exam-style questions with full solutions' },
            { icon: BookOpen, text: 'Tracks every topic your curriculum has covered' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-accent" />
              </div>
              <p className="text-white/80 text-sm">{text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Get Started <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepYearLevel({ selected, onSelect, onNext }) {
  const years = [
    { year: 1, label: 'Year 1', sub: 'Freshman', subjects: getSubjectsForYear(1).length },
    { year: 2, label: 'Year 2', sub: 'Sophomore', subjects: getSubjectsForYear(2).length },
    { year: 3, label: 'Year 3', sub: 'Junior', subjects: getSubjectsForYear(3).length },
    { year: 4, label: 'Year 4', sub: 'Senior', subjects: getSubjectsForYear(4).length },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-primary pt-12 pb-6 px-5">
        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Step 1 of 3</p>
        <h2 className="text-white text-2xl font-bold">What year are you in?</h2>
        <p className="text-white/60 text-sm mt-1">We'll pre-load the subjects you've already taken.</p>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-3">
        {years.map(({ year, label, sub, subjects }) => {
          const isSelected = selected === year;
          return (
            <button
              key={year}
              onClick={() => onSelect(year)}
              className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all active:scale-98 ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                {year}
              </div>
              <div className="flex-1">
                <p className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-gray-800'}`}>{label} — {sub}</p>
                <p className="text-xs text-gray-400 mt-0.5">{subjects} engineering subjects unlocked</p>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="px-5 pb-8">
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 active:scale-95 transition-all"
        >
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepSubjectReview({ yearLevel, selectedIds, onToggle, onNext }) {
  const subjectsByYear = [1, 2, 3, 4]
    .filter((y) => y <= yearLevel)
    .map((y) => ({
      year: y,
      subjects: universitySubjects.filter((s) => s.yearLevel === y && !s.isMinor),
    }));

  const unlockedCount = countUnlockedTopics(selectedIds);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-primary pt-12 pb-6 px-5">
        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Step 2 of 3</p>
        <h2 className="text-white text-2xl font-bold">Confirm your subjects</h2>
        <div className="mt-3 bg-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <Zap size={16} className="text-accent flex-shrink-0" />
          <p className="text-white text-sm font-semibold">{unlockedCount} board topics unlocked</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-32">
        {subjectsByYear.map(({ year, subjects }) => (
          <div key={year}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Year {year}</p>
            <div className="flex flex-col gap-2">
              {subjects.map((s) => {
                const checked = selectedIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => onToggle(s.id)}
                    className={`w-full px-4 py-3 rounded-xl border text-left flex items-center gap-3 transition-all active:scale-98 ${
                      checked
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                      {checked && <Check size={12} className="text-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${checked ? 'text-primary' : 'text-gray-700'}`}>{s.name}</p>
                      <p className="text-xs text-gray-400">{s.coveredTopicIds.length} board topics</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-100 px-5 py-4">
        <button
          onClick={onNext}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          Confirm My Subjects <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepReady({ selectedIds, onStart }) {
  const total  = countUnlockedTopics(selectedIds);
  const mste   = countByCategory(selectedIds, 'MSTE');
  const hge    = countByCategory(selectedIds, 'HGE');
  const sec    = countByCategory(selectedIds, 'SEC');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-primary pt-12 pb-6 px-5">
        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Step 3 of 3</p>
        <h2 className="text-white text-2xl font-bold">You're ready.</h2>
        <p className="text-white/60 text-sm mt-1">Your training system has been configured.</p>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col">
        {/* big stat */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center mb-5">
          <p className="text-5xl font-bold text-primary mb-1">{total}</p>
          <p className="text-sm text-gray-500">board exam topics unlocked across MSTE, HGE & SEC</p>
        </div>

        {/* category pills */}
        <div className="flex gap-3 mb-6">
          {[
            { label: 'MSTE', count: mste, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'HGE',  count: hge,  color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'SEC',  count: sec,  color: 'bg-orange-50 text-orange-700 border-orange-200' },
          ].map(({ label, count, color }) => (
            <div key={label} className={`flex-1 rounded-xl border py-3 text-center ${color}`}>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3 mb-6">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800 mb-0.5">Top 1 requires 90%+ performance</p>
            <p className="text-xs text-amber-700">Practice every day. Track every mistake. The board exam rewards consistency, not cramming.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {[
            'Daily adaptive practice targets your weak topics',
            'Timed exam simulations build real test-day stamina',
            'Performance analytics predict your board exam score',
          ].map((tip) => (
            <div key={tip} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-success" />
              </div>
              <p className="text-sm text-gray-600">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-8">
        <button
          onClick={onStart}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          Start Training <Zap size={18} className="text-accent" />
        </button>
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { completeOnboarding, toggleSubjectEnrollment, enrolledSubjectIds } = useStore();

  const [step, setStep] = useState(0);
  const [yearLevel, setYearLevel] = useState(null);
  const [localSelectedIds, setLocalSelectedIds] = useState([]);

  // When year level changes, auto-select all subjects for that year and below
  function handleYearSelect(year) {
    setYearLevel(year);
    const ids = universitySubjects
      .filter((s) => s.yearLevel <= year && !s.isMinor)
      .map((s) => s.id);
    setLocalSelectedIds(ids);
  }

  function handleToggle(subjectId) {
    setLocalSelectedIds((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  }

  function handleStart() {
    // Apply selections to the store
    completeOnboarding(localSelectedIds);
    navigate('/', { replace: true });
  }

  const steps = [
    <StepWelcome key="welcome" onNext={() => setStep(1)} />,
    <StepYearLevel key="year" selected={yearLevel} onSelect={handleYearSelect} onNext={() => setStep(2)} />,
    <StepSubjectReview key="subjects" yearLevel={yearLevel} selectedIds={localSelectedIds} onToggle={handleToggle} onNext={() => setStep(3)} />,
    <StepReady key="ready" selectedIds={localSelectedIds} onStart={handleStart} />,
  ];

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-screen overflow-x-hidden">
      {steps[step]}
    </div>
  );
}
