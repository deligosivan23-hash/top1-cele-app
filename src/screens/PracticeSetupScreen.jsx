import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Zap, ChevronDown, Timer, BookOpen } from 'lucide-react';
import { topics, getChildren, getLevel2Topics, getTopicById } from '../data/topics';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';

const CATEGORIES = [
  { id: 'all',  label: 'All',  color: 'bg-gray-100 text-gray-600' },
  { id: 'MSTE', label: 'MSTE', color: 'bg-primary/10 text-primary' },
  { id: 'HGE',  label: 'HGE',  color: 'bg-accent/10 text-accent'  },
  { id: 'SEC',  label: 'SEC',  color: 'bg-success/10 text-success' },
];

const QUESTION_COUNTS = [5, 10, 15, 20];

function SelectRow({ label, value, onChange, options, disabled }) {
  return (
    <div className={`${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary pr-9"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function PracticeSetupScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { topicStats, setCurrentSession } = useStore();

  // Pre-select from query param
  const preselect = searchParams.get('topic');

  const [category, setCategory]   = useState('all');
  const [l2Id, setL2Id]           = useState('');
  const [l3Id, setL3Id]           = useState('');
  const [l4Id, setL4Id]           = useState('');
  const [count, setCount]         = useState(10);
  const [timedMode, setTimedMode] = useState(false);

  // If a topic was passed in the URL, pre-populate the selectors
  useEffect(() => {
    if (!preselect) return;
    const topic = getTopicById(preselect);
    if (!topic) return;

    if (topic.level === 2) {
      setCategory(topic.category);
      setL2Id(topic.id);
    } else if (topic.level === 3) {
      const l2 = getTopicById(topic.parentId);
      if (l2) { setCategory(l2.category); setL2Id(l2.id); }
      setL3Id(topic.id);
    } else if (topic.level === 4) {
      const l3 = getTopicById(topic.parentId);
      const l2 = l3 ? getTopicById(l3.parentId) : null;
      if (l2) { setCategory(l2.category); setL2Id(l2.id); }
      if (l3) setL3Id(l3.id);
      setL4Id(topic.id);
    }
  }, [preselect]);

  // Reset downstream when a parent changes
  useEffect(() => { setL2Id(''); setL3Id(''); setL4Id(''); }, [category]);
  useEffect(() => { setL3Id(''); setL4Id(''); }, [l2Id]);
  useEffect(() => { setL4Id(''); }, [l3Id]);

  // Filtered Level 2 list
  const l2Options = useMemo(() => {
    const all = getLevel2Topics();
    const filtered = category === 'all' ? all : all.filter((t) => t.category === category);
    return [{ value: '', label: 'All topics in category' }, ...filtered.map((t) => ({ value: t.id, label: t.name }))];
  }, [category]);

  // Level 3 options (children of selected L2)
  const l3Options = useMemo(() => {
    if (!l2Id) return [];
    const children = getChildren(l2Id);
    if (children.length === 0) return [];
    return [{ value: '', label: 'All subtopics' }, ...children.map((t) => ({ value: t.id, label: t.name }))];
  }, [l2Id]);

  // Level 4 options (children of selected L3)
  const l4Options = useMemo(() => {
    if (!l3Id) return [];
    const children = getChildren(l3Id);
    if (children.length === 0) return [];
    return [{ value: '', label: 'All problem types' }, ...children.map((t) => ({ value: t.id, label: `${t.name}${t.difficulty ? ` (Lv${t.difficulty})` : ''}` }))];
  }, [l3Id]);

  // Determine the effective topic for the session
  const effectiveTopicId = l4Id || l3Id || l2Id || (() => {
    if (category === 'all') return getLevel2Topics()[0]?.id ?? '';
    const l2 = getLevel2Topics().filter((t) => t.category === category);
    return l2[0]?.id ?? '';
  })();

  // Preview: what topic will be practiced
  const previewTopic = getTopicById(effectiveTopicId);
  const previewStats = previewTopic ? topicStats[previewTopic.id] : null;

  function handleStart() {
    if (!effectiveTopicId) return;
    const config = {
      topicId: effectiveTopicId,
      mode: 'practice',
      totalQuestions: count,
      timedMode,
    };
    setCurrentSession(config);
    navigate('/practice/session');
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} className="text-white/70" />
          <h1 className="text-white font-bold text-xl">Practice Setup</h1>
        </div>
        <p className="text-white/60 text-sm">Configure your drill session</p>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Step 1 — Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Step 1 — Subject Category</p>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
                  ${category === cat.id ? cat.color + ' ring-2 ring-offset-1 ring-primary/30' : 'bg-gray-50 text-gray-500'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Level 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Step 2 — Topic</p>
          <SelectRow
            label="Level 2 Topic"
            value={l2Id}
            onChange={setL2Id}
            options={l2Options}
          />

          {/* Step 3 — Level 3 (optional) */}
          {l3Options.length > 0 && (
            <div className="mt-3">
              <SelectRow
                label="Level 3 Core Concept (Optional)"
                value={l3Id}
                onChange={setL3Id}
                options={l3Options}
              />
            </div>
          )}

          {/* Step 4 — Level 4 (optional) */}
          {l4Options.length > 0 && l3Id && (
            <div className="mt-3">
              <SelectRow
                label="Level 4 Problem Type (Optional)"
                value={l4Id}
                onChange={setL4Id}
                options={l4Options}
              />
            </div>
          )}
        </div>

        {/* Session options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Session Options</p>

          {/* Question count */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Questions</label>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((n) => (
                <button key={n} onClick={() => setCount(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors
                    ${count === n ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Timed mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Timed Mode</p>
                <p className="text-xs text-gray-400">Track solve time per question</p>
              </div>
            </div>
            <button onClick={() => setTimedMode(!timedMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${timedMode ? 'bg-primary' : 'bg-gray-200'}`}>
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${timedMode ? 'left-6' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Preview */}
        {previewTopic && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Session Preview</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{previewTopic.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {count} questions · {timedMode ? 'Timed' : 'Untimed'} · {previewTopic.category}
                </p>
              </div>
              <AccuracyBadge accuracy={previewStats?.accuracy ?? null} />
            </div>
            {previewTopic.level === 4 && previewTopic.difficulty && (
              <div className="flex items-center gap-1 mt-2">
                {[1,2,3,4,5].map((d) => (
                  <span key={d} className={`w-2 h-2 rounded-full ${d <= previewTopic.difficulty ? 'bg-warning' : 'bg-gray-200'}`} />
                ))}
                <span className="text-xs text-gray-400 ml-1">Difficulty {previewTopic.difficulty}/5</span>
              </div>
            )}
          </div>
        )}

        {/* Start button */}
        <button onClick={handleStart} disabled={!effectiveTopicId}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 disabled:opacity-40 shadow-md active:scale-[0.98] transition-transform">
          <Zap size={18} />
          Start Session
        </button>

        {/* Exam Mode shortcut */}
        <button onClick={() => navigate('/exam')}
          className="w-full bg-white border border-gray-200 text-gray-600 font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2">
          📋 Switch to Full Exam Mode
        </button>
      </div>
    </div>
  );
}
