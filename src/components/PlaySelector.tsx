import type { Play } from '../types';

interface PlaySelectorProps {
  plays: Play[];
  selectedPlayId: string;
  onSelect: (play: Play) => void;
}

const TYPE_COLORS = {
  offense: { badge: '#1565C0', label: 'Offense', labelZh: '進攻' },
  defense: { badge: '#B71C1C', label: 'Defense', labelZh: '防守' },
  sandbox: { badge: '#6E40C9', label: 'Sandbox', labelZh: '自由板' },
};

const GROUP_LABELS: Record<string, { en: string; zh: string }> = {
  offense: { en: 'Offense Plays', zh: '進攻戰術' },
  defense: { en: 'Defense Plays', zh: '防守戰術' },
  sandbox: { en: 'Sandbox', zh: '自由板' },
};

export default function PlaySelector({
  plays,
  selectedPlayId,
  onSelect,
}: PlaySelectorProps) {
  // Group plays by type while preserving the authored order within each group.
  const groups: { type: string; items: Play[] }[] = [];
  for (const play of plays) {
    const last = groups[groups.length - 1];
    if (last && last.type === play.type) {
      last.items.push(play);
    } else {
      groups.push({ type: play.type, items: [play] });
    }
  }

  return (
    <aside className="play-selector" aria-label="Play selection panel">
      <h2 className="panel-title">📋 Plays · 戰術列表</h2>

      <ul className="play-list" role="listbox" aria-label="Available plays">
        {groups.map(({ type, items }) => (
          <li key={type} className="play-group">
            <div className="play-group-header">
              <span className="play-group-label">{GROUP_LABELS[type].en}</span>
              <span className="play-group-label-zh" lang="zh-Hant">{GROUP_LABELS[type].zh}</span>
            </div>
            <ul className="play-group-list">
              {items.map((play) => {
                const { badge, label, labelZh } = TYPE_COLORS[play.type];
                const isSelected = play.id === selectedPlayId;

                return (
                  <li
                    key={play.id}
                    className={`play-item ${isSelected ? 'selected' : ''}`}
                    role="option"
                    aria-selected={isSelected}
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
                      <span
                        className="play-type-badge"
                        style={{ background: badge }}
                      >
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
              })}
            </ul>
          </li>
        ))}
      </ul>

      {/* Legend */}
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
    </aside>
  );
}
