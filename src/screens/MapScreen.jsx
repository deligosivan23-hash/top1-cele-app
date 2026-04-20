import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight, BookOpen } from 'lucide-react';
import { topics, getChildren, getLevel2Topics } from '../data/topics';
import { useStore } from '../store/useStore';
import AccuracyBadge from '../components/AccuracyBadge';

// ─── helpers ────────────────────────────────────────────────────────────────

function countMastered(topicIds, topicStats) {
  return topicIds.filter((id) => {
    const s = topicStats[id];
    return s && s.accuracy >= 86;
  }).length;
}

function getL2Descendants(topicId) {
  // level-1 → its level-2 children
  return getChildren(topicId).map((t) => t.id);
}

function getL2ForL0(l0Id) {
  // level-0 → all level-2 descendants
  const l1s = getChildren(l0Id);
  return l1s.flatMap((l1) => getL2Descendants(l1.id));
}

// category accent colours
const BORDER_COLOR = {
  mste: 'border-primary',
  hge: 'border-accent',
  sec: 'border-success',
};

const HEADER_DOT = {
  mste: 'bg-primary',
  hge: 'bg-accent',
  sec: 'bg-success',
};

// ─── Row components ──────────────────────────────────────────────────────────

function Level0Row({ topic, expanded, onToggle, masteredCount, totalCount }) {
  const borderClass = BORDER_COLOR[topic.id] ?? 'border-gray-300';
  const dotClass = HEADER_DOT[topic.id] ?? 'bg-gray-400';

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-3.5 border-l-4 ${borderClass} bg-white rounded-t-2xl focus:outline-none`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
      <span className="flex-1 text-left font-bold text-gray-900 text-sm tracking-wide uppercase">
        {topic.name}
      </span>
      <span className="text-xs text-gray-400 mr-1">
        {masteredCount}/{totalCount} mastered
      </span>
      {expanded ? (
        <ChevronUp size={15} className="text-gray-400 shrink-0" />
      ) : (
        <ChevronDown size={15} className="text-gray-400 shrink-0" />
      )}
    </button>
  );
}

function Level1Row({ topic, expanded, onToggle, masteredCount, totalCount, isLast }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-2 px-4 py-3 ml-2 focus:outline-none ${
        !isLast ? 'border-b border-gray-50' : ''
      }`}
    >
      <span className="flex-1 text-left font-medium text-gray-700 text-sm">
        {topic.name}
      </span>
      <span className="text-xs text-gray-400 mr-1">
        {masteredCount}/{totalCount}
      </span>
      {expanded ? (
        <ChevronDown size={14} className="text-gray-400 shrink-0" />
      ) : (
        <ChevronRight size={14} className="text-gray-400 shrink-0" />
      )}
    </button>
  );
}

function Level2Row({ topic, accuracy, isLast, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(topic.id)}
      className={`w-full flex items-center gap-2 px-4 py-2.5 ml-5 focus:outline-none ${
        !isLast ? 'border-b border-gray-50' : ''
      }`}
    >
      <span className="flex-1 text-left text-gray-600 text-sm font-normal">
        {topic.fullName ?? topic.name}
      </span>
      <AccuracyBadge accuracy={accuracy ?? null} />
    </button>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function MapScreen() {
  const navigate = useNavigate();
  const { topicStats } = useStore();

  // all level-0 topics
  const l0Topics = topics.filter((t) => t.level === 0);

  // initial expand state: all L0 expanded, all L1 collapsed
  const [expandedL0, setExpandedL0] = useState(
    () => new Set(l0Topics.map((t) => t.id))
  );
  const [expandedL1, setExpandedL1] = useState(() => new Set());

  function toggleL0(id) {
    setExpandedL0((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleL1(id) {
    setExpandedL1((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* ── Header ── */}
      <div className="bg-primary pt-12 pb-5 px-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} className="text-white/70" />
          <h1 className="text-white font-bold text-xl tracking-tight">Knowledge Map</h1>
        </div>
        <p className="text-white/60 text-sm">CELE Topics Overview</p>
      </div>

      {/* ── Tree ── */}
      <div className="px-4 pt-4">
        {l0Topics.map((l0) => {
          const l0IsExpanded = expandedL0.has(l0.id);
          const l1s = getChildren(l0.id);
          const l2Ids = getL2ForL0(l0.id);
          const l0Mastered = countMastered(l2Ids, topicStats);

          return (
            <div key={l0.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 overflow-hidden">
              {/* Level 0 header row */}
              <Level0Row
                topic={l0}
                expanded={l0IsExpanded}
                onToggle={() => toggleL0(l0.id)}
                masteredCount={l0Mastered}
                totalCount={l2Ids.length}
              />

              {/* Level 1 + Level 2 children */}
              {l0IsExpanded && (
                <div className="border-t border-gray-50">
                  {l1s.map((l1, l1Idx) => {
                    const l1IsExpanded = expandedL1.has(l1.id);
                    const l2s = getChildren(l1.id);
                    const l2Ids = l2s.map((t) => t.id);
                    const l1Mastered = countMastered(l2Ids, topicStats);
                    const isLastL1 = l1Idx === l1s.length - 1;

                    return (
                      <div key={l1.id} className={!isLastL1 ? 'border-b border-gray-50' : ''}>
                        <Level1Row
                          topic={l1}
                          expanded={l1IsExpanded}
                          onToggle={() => toggleL1(l1.id)}
                          masteredCount={l1Mastered}
                          totalCount={l2s.length}
                          isLast={true}
                        />

                        {l1IsExpanded && (
                          <div className="border-t border-gray-50 bg-gray-50/40">
                            {l2s.map((l2, l2Idx) => {
                              const stats = topicStats[l2.id];
                              return (
                                <Level2Row
                                  key={l2.id}
                                  topic={l2}
                                  accuracy={stats?.accuracy ?? null}
                                  isLast={l2Idx === l2s.length - 1}
                                  onNavigate={(id) => navigate(`/topic/${id}`)}
                                />
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
