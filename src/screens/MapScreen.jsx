import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Layers, GraduationCap, Lock } from 'lucide-react';
import { topics, getChildren } from '../data/topics';
import { universitySubjects } from '../data/subjects';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';

const BORDER_COLOR = { mste: 'border-primary', hge: 'border-accent', sec: 'border-success' };
const DOT_COLOR    = { mste: 'bg-primary',      hge: 'bg-accent',     sec: 'bg-success' };

function DifficultyDots({ difficulty }) {
  if (!difficulty) return null;
  return (
    <span className="flex gap-0.5 items-center shrink-0">
      {[1,2,3,4,5].map((d) => (
        <span key={d} className={`w-1.5 h-1.5 rounded-full ${d <= difficulty ? 'bg-warning' : 'bg-gray-200'}`} />
      ))}
    </span>
  );
}

function TopicIcon({ topicId, unlockedIds }) {
  if (unlockedIds.has(topicId)) return <GraduationCap size={12} className="text-success shrink-0" />;
  return <Lock size={11} className="text-gray-300 shrink-0" />;
}

export default function MapScreen() {
  const navigate = useNavigate();
  const { topicStats, enrolledSubjectIds, customSubjects } = useStore();
  const [filter, setFilter] = useState('all'); // all | weak | untested
  const [expandedL0, setExpandedL0] = useState(() => new Set());
  const [expandedL1, setExpandedL1] = useState(() => new Set());
  const [expandedL2, setExpandedL2] = useState(() => new Set());
  const [expandedL3, setExpandedL3] = useState(() => new Set());

  // Compute unlocked topic IDs from enrolled subjects
  const unlockedIds = useMemo(() => {
    const ids = new Set();
    const allSubjects = [...universitySubjects, ...customSubjects];
    allSubjects.filter((s) => enrolledSubjectIds.includes(s.id))
      .forEach((s) => s.coveredTopicIds.forEach((id) => ids.add(id)));
    return ids;
  }, [enrolledSubjectIds, customSubjects]);

  function toggle(setter, id) {
    setter((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }

  function matchesFilter(topicId) {
    if (filter === 'all') return true;
    const s = topicStats[topicId];
    if (filter === 'untested') return !s;
    if (filter === 'weak') return s && s.accuracy < 70;
    return true;
  }

  function subtreeMatchesFilter(topicId) {
    if (matchesFilter(topicId)) return true;
    const children = getChildren(topicId);
    return children.some((c) => subtreeMatchesFilter(c.id));
  }

  const l0Topics = topics.filter((t) => t.level === 0);

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4">
        <div className="flex items-center gap-2 mb-1">
          <Layers size={18} className="text-white/70" />
          <h1 className="text-white font-bold text-xl">Knowledge Map</h1>
        </div>
        <p className="text-white/60 text-sm">Tap any level to expand</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        {['all','weak','untested'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors
              ${filter === f ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
            {f === 'all' ? 'All Topics' : f === 'weak' ? '🔴 Weak (<70%)' : '⚪ Untested'}
          </button>
        ))}
      </div>

      {/* Tree */}
      <div className="px-4 pt-4 space-y-3">
        {l0Topics.map((l0) => {
          const l1s = getChildren(l0.id);
          const allL2 = l1s.flatMap((l1) => getChildren(l1.id));
          const masteredL2 = allL2.filter((t) => { const s = topicStats[t.id]; return s && s.accuracy >= 86; }).length;
          const visible = filter === 'all' || subtreeMatchesFilter(l0.id);
          if (!visible) return null;
          const isOpen = expandedL0.has(l0.id);

          return (
            <div key={l0.id} className={`bg-white rounded-2xl shadow-sm border-l-4 ${BORDER_COLOR[l0.id] ?? 'border-gray-300'} border border-gray-100 overflow-hidden`}>
              {/* L0 Row */}
              <button onClick={() => toggle(setExpandedL0, l0.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 focus:outline-none">
                <span className={`w-2 h-2 rounded-full shrink-0 ${DOT_COLOR[l0.id] ?? 'bg-gray-400'}`} />
                <span className="flex-1 text-left font-bold text-gray-900 text-sm tracking-wide uppercase">{l0.name}</span>
                <span className="text-xs text-gray-400 mr-1">{masteredL2}/{allL2.length} mastered</span>
                <ChevronDown size={15} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="border-t border-gray-50">
                  {l1s.map((l1, l1i) => {
                    const l2s = getChildren(l1.id);
                    const mastL1 = l2s.filter((t) => { const s = topicStats[t.id]; return s && s.accuracy >= 86; }).length;
                    const l1Open = expandedL1.has(l1.id);
                    const l1Visible = filter === 'all' || subtreeMatchesFilter(l1.id);
                    if (!l1Visible) return null;
                    return (
                      <div key={l1.id} className={l1i < l1s.length - 1 ? 'border-b border-gray-50' : ''}>
                        {/* L1 Row */}
                        <button onClick={() => toggle(setExpandedL1, l1.id)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 ml-2 focus:outline-none">
                          <span className="flex-1 text-left font-semibold text-gray-700 text-sm">{l1.name}</span>
                          <span className="text-xs text-gray-400 mr-1">{mastL1}/{l2s.length}</span>
                          <ChevronRight size={14} className={`text-gray-400 transition-transform ${l1Open ? 'rotate-90' : ''}`} />
                        </button>

                        {l1Open && (
                          <div className="bg-gray-50/40 border-t border-gray-50">
                            {l2s.map((l2) => {
                              const l2Visible = filter === 'all' || subtreeMatchesFilter(l2.id);
                              if (!l2Visible) return null;
                              const l2Stats = topicStats[l2.id];
                              const l2Open = expandedL2.has(l2.id);
                              const l3s = getChildren(l2.id);
                              return (
                                <div key={l2.id} className="border-b border-gray-50 last:border-0">
                                  {/* L2 Row */}
                                  <div className="flex items-center gap-2 px-4 py-2.5 ml-4">
                                    <TopicIcon topicId={l2.id} unlockedIds={unlockedIds} />
                                    <button onClick={() => l3s.length > 0 ? toggle(setExpandedL2, l2.id) : navigate(`/topic/${l2.id}`)}
                                      className="flex-1 text-left text-gray-600 text-sm focus:outline-none">
                                      {l2.name}
                                    </button>
                                    <AccuracyBadge accuracy={l2Stats?.accuracy ?? null} />
                                    {l3s.length > 0 && (
                                      <button onClick={() => toggle(setExpandedL2, l2.id)} className="focus:outline-none">
                                        <ChevronRight size={13} className={`text-gray-400 transition-transform ${l2Open ? 'rotate-90' : ''}`} />
                                      </button>
                                    )}
                                    <button onClick={() => navigate(`/topic/${l2.id}`)}
                                      className="text-[10px] text-accent font-medium shrink-0">
                                      Detail
                                    </button>
                                  </div>

                                  {l2Open && l3s.length > 0 && (
                                    <div className="border-t border-gray-50 bg-white/80">
                                      {l3s.map((l3) => {
                                        const l3Visible = filter === 'all' || subtreeMatchesFilter(l3.id);
                                        if (!l3Visible) return null;
                                        const l3Stats = topicStats[l3.id];
                                        const l3Open = expandedL3.has(l3.id);
                                        const l4s = getChildren(l3.id);
                                        return (
                                          <div key={l3.id} className="border-b border-gray-50 last:border-0">
                                            {/* L3 Row */}
                                            <div className="flex items-center gap-2 px-4 py-2 ml-8">
                                              <TopicIcon topicId={l3.id} unlockedIds={unlockedIds} />
                                              <button onClick={() => l4s.length > 0 ? toggle(setExpandedL3, l3.id) : navigate(`/topic/${l3.id}`)}
                                                className="flex-1 text-left text-gray-500 text-xs font-medium focus:outline-none">
                                                {l3.name}
                                              </button>
                                              <AccuracyBadge accuracy={l3Stats?.accuracy ?? null} />
                                              {l4s.length > 0 && (
                                                <button onClick={() => toggle(setExpandedL3, l3.id)} className="focus:outline-none">
                                                  <ChevronRight size={12} className={`text-gray-300 transition-transform ${l3Open ? 'rotate-90' : ''}`} />
                                                </button>
                                              )}
                                            </div>

                                            {l3Open && l4s.length > 0 && (
                                              <div className="border-t border-gray-50 bg-gray-50/60">
                                                {l4s.map((l4) => {
                                                  const l4Stats = topicStats[l4.id];
                                                  const l4Visible = filter === 'all' || matchesFilter(l4.id);
                                                  if (!l4Visible) return null;
                                                  return (
                                                    <button key={l4.id}
                                                      onClick={() => navigate(`/topic/${l4.id}`)}
                                                      className="w-full flex items-center gap-2 px-4 py-2 ml-12 text-left border-b border-gray-50 last:border-0 focus:outline-none hover:bg-gray-50">
                                                      <span className="flex-1 text-gray-500 text-[11px]">{l4.name}</span>
                                                      <DifficultyDots difficulty={l4.difficulty} />
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
      </div>
    </div>
  );
}
