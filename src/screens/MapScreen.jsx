import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown, ChevronRight, Layers, GraduationCap,
  Lock, Search, Play, X,
} from 'lucide-react';
import { topics, getChildren } from '../data/topics';
import { universitySubjects } from '../data/subjects';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';

// ── Constants ──────────────────────────────────────────────────────────────
const BORDER_COLOR = { mste: 'border-primary', hge: 'border-accent', sec: 'border-success' };
const DOT_COLOR    = { mste: 'bg-primary',      hge: 'bg-accent',     sec: 'bg-success'    };
const CAT_LABEL    = { mste: 'MSTE', hge: 'HGE', sec: 'SEC' };

// ── Helpers ────────────────────────────────────────────────────────────────

/** Recursively collect all L3 descendants of a node */
function collectL3Descendants(topicId) {
  const children = getChildren(topicId);
  if (!children.length) return [];
  const result = [];
  children.forEach((c) => {
    if (c.level === 3) {
      result.push(c.id);
    } else {
      result.push(...collectL3Descendants(c.id));
    }
  });
  return result;
}

/** Aggregate accuracy across a set of L3 topic IDs */
function branchMastery(l3Ids, topicStats) {
  const attempted = l3Ids.filter((id) => topicStats[id]?.attempts > 0);
  if (!attempted.length) return { pct: null, tested: 0, total: l3Ids.length };
  const avg = Math.round(
    attempted.reduce((s, id) => s + (topicStats[id]?.accuracy ?? 0), 0) / attempted.length
  );
  return { pct: avg, tested: attempted.length, total: l3Ids.length };
}

/** Highlight matching substring in a name */
function HighlightedText({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-warning/30 text-warning rounded px-0.5 not-italic font-bold">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

/** Mastery badge shown on collapsed L0/L1 nodes */
function MasteryBadge({ pct, tested, total }) {
  if (pct === null) return (
    <span className="text-[10px] text-gray-400">{tested}/{total} tested</span>
  );
  const cls = pct >= 86 ? 'text-success' : pct >= 70 ? 'text-warning' : 'text-danger';
  return (
    <span className={`text-[10px] font-bold ${cls} tabular-nums`}>
      {pct}% <span className="text-gray-400 font-normal">({tested}/{total})</span>
    </span>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function TopicIcon({ topicId, unlockedIds }) {
  if (unlockedIds.has(topicId)) return <GraduationCap size={12} className="text-success shrink-0" />;
  return <Lock size={11} className="text-gray-300 shrink-0" />;
}

function DrillButton({ topicId, onDrill }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onDrill(topicId); }}
      className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 active:bg-primary/20 active:scale-90 transition-all"
      aria-label="Quick practice"
      title="Start 10-question drill"
    >
      <Play size={10} fill="currentColor" />
    </button>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function MapScreen() {
  const navigate = useNavigate();
  const { topicStats, enrolledSubjectIds, customSubjects, setCurrentSession } = useStore();

  const [filter,      setFilter]      = useState('all');
  const [query,       setQuery]       = useState('');
  const [expandedL0,  setExpandedL0]  = useState(() => new Set());
  const [expandedL1,  setExpandedL1]  = useState(() => new Set());
  const [expandedL2,  setExpandedL2]  = useState(() => new Set());
  const [expandedL3,  setExpandedL3]  = useState(() => new Set());
  const searchRef = useRef(null);

  // ── Unlocked IDs ──────────────────────────────────────────────────────────
  const unlockedIds = useMemo(() => {
    const ids = new Set();
    const all = [...universitySubjects, ...(customSubjects ?? [])];
    all.filter((s) => enrolledSubjectIds.includes(s.id))
       .forEach((s) => s.coveredTopicIds.forEach((id) => ids.add(id)));
    return ids;
  }, [enrolledSubjectIds, customSubjects]);

  // ── Branch L3 maps (computed once) ───────────────────────────────────────
  const branchL3Map = useMemo(() => {
    const map = {};
    topics.forEach((t) => {
      if (t.level <= 2) map[t.id] = collectL3Descendants(t.id);
    });
    return map;
  }, []);

  // ── Search: derive which topic IDs match ──────────────────────────────────
  const q = query.trim().toLowerCase();

  const matchingIds = useMemo(() => {
    if (!q) return null; // null = no filter active
    return new Set(
      topics.filter((t) => t.name.toLowerCase().includes(q)).map((t) => t.id)
    );
  }, [q]);

  // For search: collect all ancestor IDs of matching nodes
  const ancestorIds = useMemo(() => {
    if (!matchingIds) return null;
    const ancestors = new Set();
    topics.forEach((t) => {
      if (!matchingIds.has(t.id)) return;
      // Walk up the tree via parentId
      let cur = t;
      while (cur?.parentId) {
        ancestors.add(cur.parentId);
        cur = topics.find((x) => x.id === cur.parentId);
      }
    });
    return ancestors;
  }, [matchingIds]);

  // Auto-expand branches that contain search matches
  useEffect(() => {
    if (!matchingIds || !ancestorIds) return;
    // Expand all ancestors
    const l0s = new Set(), l1s = new Set(), l2s = new Set(), l3s = new Set();
    ancestorIds.forEach((id) => {
      const t = topics.find((x) => x.id === id);
      if (!t) return;
      if (t.level === 0) l0s.add(id);
      else if (t.level === 1) l1s.add(id);
      else if (t.level === 2) l2s.add(id);
      else if (t.level === 3) l3s.add(id);
    });
    if (l0s.size) setExpandedL0((p) => new Set([...p, ...l0s]));
    if (l1s.size) setExpandedL1((p) => new Set([...p, ...l1s]));
    if (l2s.size) setExpandedL2((p) => new Set([...p, ...l2s]));
    if (l3s.size) setExpandedL3((p) => new Set([...p, ...l3s]));
  }, [matchingIds, ancestorIds]);

  // ── Visibility helpers ────────────────────────────────────────────────────
  function visibleInFilter(topicId) {
    if (filter === 'all') return true;
    const s = topicStats[topicId];
    if (filter === 'untested') return !s;
    if (filter === 'weak') return s && s.accuracy < 70;
    return true;
  }

  function subtreeMatchesFilter(topicId) {
    if (visibleInFilter(topicId)) return true;
    return getChildren(topicId).some((c) => subtreeMatchesFilter(c.id));
  }

  function visibleInSearch(topicId) {
    if (!matchingIds) return true; // no search active
    // Show if this topic matches OR is an ancestor of a match
    return matchingIds.has(topicId) || (ancestorIds?.has(topicId) ?? false);
  }

  function nodeVisible(topicId) {
    return visibleInSearch(topicId) && subtreeMatchesFilter(topicId);
  }

  // ── Toggle helpers ────────────────────────────────────────────────────────
  function toggle(setter, id) {
    setter((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Drill: launch 10-question practice session ────────────────────────────
  const handleDrill = useCallback((topicId) => {
    setCurrentSession({ topicId, mode: 'practice', totalQuestions: 10 });
    navigate('/practice/session');
  }, [setCurrentSession, navigate]);

  // ── L0 topics ─────────────────────────────────────────────────────────────
  const l0Topics = topics.filter((t) => t.level === 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4">
        <div className="flex items-center gap-2 mb-1">
          <Layers size={18} className="text-white/70" />
          <h1 className="text-white font-bold text-xl">Knowledge Map</h1>
        </div>
        <p className="text-white/60 text-xs">Tap to expand · ▶ to drill instantly</p>
      </div>

      {/* Sticky controls bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">

        {/* Search input */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="w-full pl-8 pr-8 py-2 text-sm bg-gray-100 rounded-xl border border-transparent focus:border-primary/30 focus:outline-none focus:bg-white transition-colors"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); searchRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 active:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>
          {q && matchingIds && (
            <p className="text-[10px] text-gray-400 mt-1 px-1">
              {matchingIds.size === 0 ? 'No topics found' : `${matchingIds.size} topic${matchingIds.size !== 1 ? 's' : ''} found`}
            </p>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'all',      label: 'All Topics' },
            { id: 'weak',     label: '🔴 Weak (<70%)' },
            { id: 'untested', label: '⚪ Untested' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tree */}
      <div className="px-4 pt-4 space-y-3">
        {l0Topics.map((l0) => {
          if (!nodeVisible(l0.id)) return null;
          const l1s      = getChildren(l0.id);
          const l3Ids    = branchL3Map[l0.id] ?? [];
          const mastery  = branchMastery(l3Ids, topicStats);
          const isOpen   = expandedL0.has(l0.id);
          const catKey   = l0.id; // mste | hge | sec

          return (
            <div
              key={l0.id}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${BORDER_COLOR[catKey] ?? 'border-gray-300'} overflow-hidden`}
            >
              {/* ── L0 Row ── */}
              <button
                onClick={() => toggle(setExpandedL0, l0.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5"
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOT_COLOR[catKey] ?? 'bg-gray-400'}`} />
                <span className="flex-1 text-left font-black text-gray-900 text-sm tracking-wide uppercase">
                  <HighlightedText text={l0.name} query={q} />
                </span>
                {/* Branch mastery — shown when collapsed */}
                {!isOpen && (
                  <MasteryBadge pct={mastery.pct} tested={mastery.tested} total={mastery.total} />
                )}
                {isOpen && (
                  <span className="text-[10px] text-gray-400">{CAT_LABEL[catKey]}</span>
                )}
                <ChevronDown size={15} className={`text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="border-t border-gray-50">
                  {l1s.map((l1, l1i) => {
                    if (!nodeVisible(l1.id)) return null;
                    const l2s     = getChildren(l1.id);
                    const l3IdsL1 = branchL3Map[l1.id] ?? [];
                    const mastL1  = branchMastery(l3IdsL1, topicStats);
                    const l1Open  = expandedL1.has(l1.id);

                    return (
                      <div key={l1.id} className={l1i < l1s.length - 1 ? 'border-b border-gray-50' : ''}>

                        {/* ── L1 Row ── */}
                        <button
                          onClick={() => toggle(setExpandedL1, l1.id)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 pl-7"
                        >
                          <span className="flex-1 text-left font-semibold text-gray-700 text-sm">
                            <HighlightedText text={l1.name} query={q} />
                          </span>
                          {/* Branch mastery — shown when collapsed */}
                          {!l1Open && (
                            <MasteryBadge pct={mastL1.pct} tested={mastL1.tested} total={mastL1.total} />
                          )}
                          <ChevronRight size={14} className={`text-gray-400 transition-transform shrink-0 ${l1Open ? 'rotate-90' : ''}`} />
                        </button>

                        {l1Open && (
                          <div className="bg-gray-50/40 border-t border-gray-50">
                            {l2s.map((l2) => {
                              if (!nodeVisible(l2.id)) return null;
                              const l2Stats = topicStats[l2.id];
                              const l2Open  = expandedL2.has(l2.id);
                              const l3s     = getChildren(l2.id);
                              const l3IdsL2 = branchL3Map[l2.id] ?? [];
                              const mastL2  = branchMastery(l3IdsL2, topicStats);

                              return (
                                <div key={l2.id} className="border-b border-gray-50 last:border-0">

                                  {/* ── L2 Row ── */}
                                  <div className="flex items-center gap-2 px-4 py-2.5 pl-10">
                                    <TopicIcon topicId={l2.id} unlockedIds={unlockedIds} />

                                    <button
                                      onClick={() => l3s.length > 0 ? toggle(setExpandedL2, l2.id) : navigate(`/topic/${l2.id}`)}
                                      className="flex-1 text-left text-gray-600 text-sm min-w-0"
                                    >
                                      <span className="truncate block">
                                        <HighlightedText text={l2.name} query={q} />
                                      </span>
                                    </button>

                                    {/* When collapsed, show branch mastery; when open, show direct accuracy */}
                                    {l3s.length > 0 && !l2Open ? (
                                      <MasteryBadge pct={mastL2.pct} tested={mastL2.tested} total={mastL2.total} />
                                    ) : (
                                      <AccuracyBadge accuracy={l2Stats?.accuracy ?? null} />
                                    )}

                                    {l3s.length > 0 && (
                                      <button onClick={() => toggle(setExpandedL2, l2.id)} className="shrink-0">
                                        <ChevronRight size={13} className={`text-gray-400 transition-transform ${l2Open ? 'rotate-90' : ''}`} />
                                      </button>
                                    )}

                                    <button
                                      onClick={() => navigate(`/topic/${l2.id}`)}
                                      className="text-[10px] text-accent font-semibold shrink-0"
                                    >
                                      Detail
                                    </button>
                                  </div>

                                  {l2Open && l3s.length > 0 && (
                                    <div className="border-t border-gray-50 bg-white/80">
                                      {l3s.map((l3) => {
                                        if (!nodeVisible(l3.id)) return null;
                                        const l3Stats = topicStats[l3.id];
                                        const l3Open  = expandedL3.has(l3.id);
                                        const l4s     = getChildren(l3.id);
                                        const isMatch = matchingIds?.has(l3.id);

                                        return (
                                          <div key={l3.id} className="border-b border-gray-50 last:border-0">

                                            {/* ── L3 Row ── */}
                                            <div className={`flex items-center gap-2 px-4 py-2 pl-14 ${isMatch && q ? 'bg-warning/5' : ''}`}>
                                              <TopicIcon topicId={l3.id} unlockedIds={unlockedIds} />

                                              <button
                                                onClick={() => navigate(`/topic/${l3.id}`)}
                                                className="flex-1 text-left text-gray-500 text-xs font-medium min-w-0"
                                              >
                                                <span className="truncate block">
                                                  <HighlightedText text={l3.name} query={q} />
                                                </span>
                                              </button>

                                              <AccuracyBadge accuracy={l3Stats?.accuracy ?? null} />

                                              {/* ── Drill button ── */}
                                              <DrillButton topicId={l3.id} onDrill={handleDrill} />

                                              {l4s.length > 0 && (
                                                <button onClick={() => toggle(setExpandedL3, l3.id)} className="shrink-0">
                                                  <ChevronRight size={12} className={`text-gray-300 transition-transform ${l3Open ? 'rotate-90' : ''}`} />
                                                </button>
                                              )}
                                            </div>

                                            {l3Open && l4s.length > 0 && (
                                              <div className="border-t border-gray-50 bg-gray-50/60">
                                                {l4s.map((l4) => {
                                                  if (filter !== 'all' && !subtreeMatchesFilter(l4.id)) return null;
                                                  if (!visibleInSearch(l4.id)) return null;
                                                  const l4Stats = topicStats[l4.id];
                                                  return (
                                                    <button
                                                      key={l4.id}
                                                      onClick={() => navigate(`/topic/${l4.id}`)}
                                                      className="w-full flex items-center gap-2 px-4 py-2 pl-[72px] text-left border-b border-gray-50 last:border-0 active:bg-gray-100"
                                                    >
                                                      <span className="flex-1 text-gray-500 text-[11px] truncate">
                                                        <HighlightedText text={l4.name} query={q} />
                                                      </span>
                                                      <AccuracyBadge accuracy={l4Stats?.accuracy ?? null} />
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state for search with no results */}
        {q && matchingIds?.size === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Search size={32} className="text-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-500">No topics match "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try a shorter term or check spelling</p>
            </div>
            <button
              onClick={() => setQuery('')}
              className="text-xs text-primary font-semibold px-4 py-2 rounded-xl bg-primary/10 active:bg-primary/20"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Empty state for filter with no results */}
        {!q && filter !== 'all' && !l0Topics.some((l0) => nodeVisible(l0.id)) && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="text-3xl">{filter === 'weak' ? '🎉' : '📚'}</span>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {filter === 'weak' ? 'No weak topics found!' : 'No untested topics found!'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {filter === 'weak'
                  ? 'All attempted topics are ≥70% — keep drilling!'
                  : 'Every enrolled topic has been practiced at least once.'}
              </p>
            </div>
            <button
              onClick={() => setFilter('all')}
              className="text-xs text-primary font-semibold px-4 py-2 rounded-xl bg-primary/10"
            >
              Show All Topics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
