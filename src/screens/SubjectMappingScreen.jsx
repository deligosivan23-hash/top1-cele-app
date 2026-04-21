import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronLeft, Plus, X, Check, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { universitySubjects } from '../data/subjects';
import { getLevel2Topics, getLevel3Topics, getTopicById } from '../data/topics';
import { useStore } from '../store/useStore';

const YEAR_LABELS = { 1: 'Year 1', 2: 'Year 2', 3: 'Year 3', 4: 'Year 4' };

// ── Add Custom Subject Sheet ─────────────────────────────────────────────────
function AddCustomSheet({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState(1);
  const [sem, setSem] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const l2 = getLevel2Topics();
  const l3 = getLevel3Topics();
  const all = [...l2, ...l3];
  const filtered = search.trim()
    ? all.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : all;

  function toggleId(id) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function handleAdd() {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), yearLevel: year, semester: sem, coveredTopicIds: selectedIds });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-[420px] flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-primary text-base">Add Custom Subject</h2>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto px-5 py-4 space-y-4 flex-1">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Subject Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              placeholder="e.g. Engineering Economics" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Year Level</label>
              <select value={year} onChange={(e) => setYear(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                {[1,2,3,4].map((y) => <option key={y} value={y}>Year {y}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Semester</label>
              <select value={sem} onChange={(e) => setSem(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">
              Topics Covered ({selectedIds.length} selected)
            </label>
            <div className="relative mb-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="Search topics..." />
            </div>
            <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 max-h-48 overflow-y-auto">
              {filtered.slice(0, 40).map((t) => (
                <button key={t.id} onClick={() => toggleId(t.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50">
                  <div>
                    <span className="text-xs font-medium text-gray-700">{t.name}</span>
                    <span className="text-[10px] text-gray-400 ml-1.5">L{t.level} · {t.category}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2
                    ${selectedIds.includes(t.id) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                    {selectedIds.includes(t.id) && <Check size={11} className="text-white" />}
                  </div>
                </button>
              ))}
              {filtered.length === 0 && <p className="text-xs text-gray-400 px-3 py-3">No topics found</p>}
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 pt-3 border-t border-gray-100 shrink-0">
          <button onClick={handleAdd} disabled={!name.trim()}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl text-sm disabled:opacity-40">
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Subject Row ──────────────────────────────────────────────────────────────
function SubjectRow({ subject, enrolled, onToggle, onRemove, custom }) {
  const [expanded, setExpanded] = useState(false);
  const coveredNames = subject.coveredTopicIds
    .slice(0, 6)
    .map((id) => getTopicById(id)?.name)
    .filter(Boolean);

  return (
    <div className={`border-b border-gray-50 last:border-0 ${subject.isMinor ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => !subject.isMinor && onToggle(subject.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
            ${enrolled ? 'bg-primary border-primary' : 'border-gray-300'}
            ${subject.isMinor ? 'opacity-40 cursor-default' : 'cursor-pointer'}`}>
          {enrolled && <Check size={13} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0" onClick={() => subject.coveredTopicIds.length > 0 && setExpanded(!expanded)}>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-800 truncate">{subject.name}</span>
            {subject.isMinor && (
              <span className="text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide">Minor</span>
            )}
            {custom && (
              <span className="text-[9px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide">Custom</span>
            )}
          </div>
          {subject.coveredTopicIds.length > 0 && (
            <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
              {subject.coveredTopicIds.length} topic{subject.coveredTopicIds.length !== 1 ? 's' : ''} covered
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            SEM {subject.semester}
          </span>
          {custom && (
            <button onClick={() => onRemove(subject.id)} className="p-1 text-gray-300 hover:text-danger">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {expanded && coveredNames.length > 0 && (
        <div className="px-4 pb-3 ml-9">
          <div className="flex flex-wrap gap-1">
            {coveredNames.map((n) => (
              <span key={n} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{n}</span>
            ))}
            {subject.coveredTopicIds.length > 6 && (
              <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                +{subject.coveredTopicIds.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function SubjectMappingScreen() {
  const navigate = useNavigate();
  const { enrolledSubjectIds, toggleSubjectEnrollment, customSubjects, addCustomSubject, removeCustomSubject } = useStore();
  const [showMinor, setShowMinor] = useState(false);
  const [showAddSheet, setShowAddSheet] = useState(false);

  const allSubjects = [...universitySubjects, ...customSubjects];
  const visibleSubjects = showMinor ? allSubjects : allSubjects.filter((s) => !s.isMinor);

  const byYear = useMemo(() => {
    const map = {};
    for (let y = 1; y <= 4; y++) {
      map[y] = { 1: [], 2: [] };
    }
    visibleSubjects.forEach((s) => {
      const yr = s.yearLevel;
      const sm = s.semester;
      if (!map[yr]) map[yr] = {};
      if (!map[yr][sm]) map[yr][sm] = [];
      map[yr][sm].push(s);
    });
    return map;
  }, [visibleSubjects]);

  const enrolledCount = enrolledSubjectIds.length;
  const unlockedTopicIds = useMemo(() => {
    const ids = new Set();
    allSubjects.filter((s) => enrolledSubjectIds.includes(s.id))
      .forEach((s) => s.coveredTopicIds.forEach((id) => ids.add(id)));
    return ids;
  }, [enrolledSubjectIds, allSubjects]);

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 text-sm mb-3">
          <ChevronLeft size={18} /><span>Back</span>
        </button>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={20} className="text-white/80" />
          <h1 className="text-white font-bold text-xl">Subject Map</h1>
        </div>
        <p className="text-white/60 text-sm">Track which CELE topics your courses cover</p>
      </div>

      {/* Summary Bar */}
      <div className="px-4 py-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Enrolled Subjects</p>
              <p className="text-2xl font-black text-primary mt-0.5">{enrolledCount}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Topics Unlocked</p>
              <p className="text-2xl font-black text-success mt-0.5">{unlockedTopicIds.size}</p>
            </div>
            <button
              onClick={() => setShowMinor(!showMinor)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${showMinor ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
              {showMinor ? 'Hide Minor' : 'Show Minor'}
            </button>
          </div>
        </div>
      </div>

      {/* Year Groups */}
      <div className="px-4 space-y-3 pb-3">
        {[1, 2, 3, 4].map((yr) => {
          const yearSubs = [...(byYear[yr]?.[1] ?? []), ...(byYear[yr]?.[2] ?? [])];
          if (yearSubs.length === 0) return null;
          return (
            <div key={yr} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{YEAR_LABELS[yr]}</span>
              </div>
              {[1, 2].map((sem) => {
                const subs = byYear[yr]?.[sem] ?? [];
                if (subs.length === 0) return null;
                return (
                  <div key={sem}>
                    <div className="px-4 py-1.5 border-b border-gray-50">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Semester {sem}</span>
                    </div>
                    {subs.map((subject) => (
                      <SubjectRow
                        key={subject.id}
                        subject={subject}
                        enrolled={enrolledSubjectIds.includes(subject.id)}
                        onToggle={toggleSubjectEnrollment}
                        onRemove={removeCustomSubject}
                        custom={!!subject.id.startsWith('custom-')}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Add Custom Subject */}
      <div className="px-4">
        <button onClick={() => setShowAddSheet(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
          <Plus size={16} />
          Add Custom Subject
        </button>
      </div>

      {showAddSheet && (
        <AddCustomSheet
          onClose={() => setShowAddSheet(false)}
          onAdd={addCustomSubject}
        />
      )}
    </div>
  );
}
