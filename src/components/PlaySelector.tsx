import { useMemo, useState } from 'react';
import type { Play, PlayType } from '../types';

interface PlaySelectorProps {
  plays: Play[];
  selectedPlayId: string;
  onSelect: (play: Play) => void;
}

type SelectableCategory = Exclude<PlayType, 'sandbox'>;

const CATEGORY_META: Record<SelectableCategory, { label: string; labelZh: string; hintZh: string }> = {
  offense: {
    label: 'Offense',
    labelZh: '進攻',
    hintZh: '擋拆、空切、分球與破區域',
  },
  defense: {
    label: 'Defense',
    labelZh: '防守',
    hintZh: '區域輪轉、協防與回補',
  },
};

const TYPE_COLORS: Record<PlayType, { badge: string; label: string; labelZh: string }> = {
  offense: { badge: '#1565C0', label: 'Offense', labelZh: '進攻' },
  defense: { badge: '#B71C1C', label: 'Defense', labelZh: '防守' },
  sandbox: { badge: '#6E40C9', label: 'Board', labelZh: '自由板' },
};

export default function PlaySelector({
  plays,
  selectedPlayId,
  onSelect,
}: PlaySelectorProps) {
  const selectedPlay = plays.find((play) => play.id === selectedPlayId);
  const initialCategory = selectedPlay?.type === 'defense' ? 'defense' : 'offense';
  const [activeCategory, setActiveCategory] = useState<SelectableCategory>(initialCategory);

  const groupedPlays = useMemo(() => ({
    offense: plays.filter((play) => play.type === 'offense'),
    defense: plays.filter((play) => play.type === 'defense'),
    sandbox: plays.find((play) => play.type === 'sandbox'),
  }), [plays]);

  const categoryPlays = groupedPlays[activeCategory];

  return (
    <aside className="play-selector" aria-label="Play selection panel">
      <h2 className="panel-title">📋 戰術分類 · Plays</h2>

      <div className="category-tabs" role="tablist" aria-label="Tactic categories">
        {(['offense', 'defense'] as SelectableCategory[]).map((type) => {
          const meta = CATEGORY_META[type];
          const selected = activeCategory === type;
          return (
            <button
              key={type}
              type="button"
              className={`category-card ${selected ? 'active' : ''}`}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveCategory(type)}
            >
              <span className="category-card-main">
                <span className="category-card-zh" lang="zh-Hant">{meta.labelZh}</span>
                <span className="category-card-en">{meta.label}</span>
              </span>
              <span className="category-card-hint" lang="zh-Hant">{meta.hintZh}</span>
              <span className="category-card-count">{groupedPlays[type].length} 項</span>
            </button>
          );
        })}
      </div>

      <div className="play-group-header active-category-heading">
        <span className="play-group-label">{CATEGORY_META[activeCategory].label}</span>
        <span className="play-group-label-zh" lang="zh-Hant">{CATEGORY_META[activeCategory].labelZh}戰術</span>
      </div>

      <ul className="play-list" role="listbox" aria-label="Available plays">
        {categoryPlays.map((play) => (
          <PlayItem
            key={play.id}
            play={play}
            selected={play.id === selectedPlayId}
            onSelect={onSelect}
          />
        ))}
      </ul>

      {groupedPlays.sandbox && (
        <div className="sandbox-shortcut">
          <div className="play-group-header">
            <span className="play-group-label">Board</span>
            <span className="play-group-label-zh" lang="zh-Hant">自由板</span>
          </div>
          <ul className="play-list sandbox-list" role="listbox" aria-label="Free tactics board">
            <PlayItem
              play={groupedPlays.sandbox}
              selected={groupedPlays.sandbox.id === selectedPlayId}
              onSelect={onSelect}
            />
          </ul>
        </div>
      )}

      <Legend />
    </aside>
  );
}

function PlayItem({ play, selected, onSelect }: { play: Play; selected: boolean; onSelect: (play: Play) => void }) {
  const { badge, label, labelZh } = TYPE_COLORS[play.type];

  return (
    <li
      className={`play-item ${selected ? 'selected' : ''}`}
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(play)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(play);
        }
      }}
    >
      <div className="play-item-header">
        <span className="play-name">
          {play.name}
          {play.nameZh && <span className="play-name-zh" lang="zh-Hant">{play.nameZh}</span>}
        </span>
        <span className="play-type-badge" style={{ background: badge }}>
          {label} · <span lang="zh-Hant">{labelZh}</span>
        </span>
      </div>
      <p className="play-description">{play.description}</p>
      {play.descriptionZh && (
        <p className="play-description play-description-zh" lang="zh-Hant">
          {play.descriptionZh}
        </p>
      )}
      <span className="play-steps-count">
        {play.steps.length} steps · {play.steps.length} 步
      </span>
    </li>
  );
}

function Legend() {
  return (
    <div className="legend">
      <h3 className="legend-title">Legend · 圖例</h3>
      <div className="legend-items">
        <div className="legend-item">
          <svg width={20} height={20}>
            <circle cx={10} cy={10} r={9} fill="#1565C0" stroke="#90CAF9" strokeWidth={2} />
          </svg>
          <span>Offense · 進攻</span>
        </div>
        <div className="legend-item">
          <svg width={20} height={20}>
            <circle cx={10} cy={10} r={9} fill="#B71C1C" stroke="#EF9A9A" strokeWidth={2} />
          </svg>
          <span>Defense · 防守</span>
        </div>
        <div className="legend-item">
          <svg width={28} height={14}>
            <line x1={0} y1={7} x2={22} y2={7} stroke="#76FF03" strokeWidth={2.5} />
            <polygon points="20,3 28,7 20,11" fill="#76FF03" />
          </svg>
          <span>Run · 跑動</span>
        </div>
        <div className="legend-item">
          <svg width={28} height={14}>
            <line x1={0} y1={7} x2={22} y2={7} stroke="#FFD740" strokeWidth={2.5} strokeDasharray="5 3" />
            <polygon points="20,3 28,7 20,11" fill="#FFD740" />
          </svg>
          <span>Cut · 空切</span>
        </div>
        <div className="legend-item">
          <svg width={28} height={14}>
            <line x1={0} y1={7} x2={22} y2={7} stroke="#E040FB" strokeWidth={2.5} />
            <polygon points="20,3 28,7 20,11" fill="#E040FB" />
          </svg>
          <span>Screen · 掩護</span>
        </div>
        <div className="legend-item">
          <svg width={28} height={14}>
            <line x1={0} y1={7} x2={22} y2={7} stroke="#00E5FF" strokeWidth={2.5} strokeDasharray="6 4" />
            <polygon points="20,3 28,7 20,11" fill="#00E5FF" />
          </svg>
          <span>Pass · 傳球</span>
        </div>
        <div className="legend-item">
          <svg width={20} height={20}>
            <circle cx={10} cy={10} r={8} fill="none" stroke="#FF9800" strokeWidth={2.5} strokeDasharray="4 3" />
          </svg>
          <span>Has ball · 持球</span>
        </div>
        <div className="legend-item">
          <svg width={20} height={20} aria-hidden="true">
            <circle cx={10} cy={10} r={7} fill="#1565C0" stroke="#90CAF9" strokeWidth={1.5} />
            <path d="M10 3 L10 17 M3 10 L17 10" stroke="#fff" strokeWidth={1.5} />
          </svg>
          <span>Drag any player · 可拖曳球員</span>
        </div>
      </div>
    </div>
  );
}
