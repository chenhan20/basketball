import type { Play } from '../types';

interface PlaySelectorProps {
  plays: Play[];
  selectedPlayId: string;
  onSelect: (play: Play) => void;
}

const TYPE_COLORS = {
  offense: { badge: '#1565C0', label: 'Offense' },
  defense: { badge: '#B71C1C', label: 'Defense' },
};

export default function PlaySelector({
  plays,
  selectedPlayId,
  onSelect,
}: PlaySelectorProps) {
  return (
    <aside className="play-selector" aria-label="Play selection panel">
      <h2 className="panel-title">📋 Plays</h2>

      <ul className="play-list" role="listbox" aria-label="Available plays">
        {plays.map((play) => {
          const { badge, label } = TYPE_COLORS[play.type];
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
                <span className="play-name">{play.name}</span>
                <span
                  className="play-type-badge"
                  style={{ background: badge }}
                >
                  {label}
                </span>
              </div>
              <p className="play-description">{play.description}</p>
              <span className="play-steps-count">
                {play.steps.length} steps
              </span>
            </li>
          );
        })}
      </ul>

      {/* Legend */}
      <div className="legend">
        <h3 className="legend-title">Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <svg width={20} height={20}>
              <circle cx={10} cy={10} r={9} fill="#1565C0" stroke="#90CAF9" strokeWidth={2} />
            </svg>
            <span>Offense</span>
          </div>
          <div className="legend-item">
            <svg width={20} height={20}>
              <circle cx={10} cy={10} r={9} fill="#B71C1C" stroke="#EF9A9A" strokeWidth={2} />
            </svg>
            <span>Defense</span>
          </div>
          <div className="legend-item">
            <svg width={28} height={14}>
              <line x1={0} y1={7} x2={22} y2={7} stroke="#76FF03" strokeWidth={2.5} />
              <polygon points="20,3 28,7 20,11" fill="#76FF03" />
            </svg>
            <span>Run</span>
          </div>
          <div className="legend-item">
            <svg width={28} height={14}>
              <line x1={0} y1={7} x2={22} y2={7} stroke="#FFD740" strokeWidth={2.5} strokeDasharray="5 3" />
              <polygon points="20,3 28,7 20,11" fill="#FFD740" />
            </svg>
            <span>Cut</span>
          </div>
          <div className="legend-item">
            <svg width={28} height={14}>
              <line x1={0} y1={7} x2={22} y2={7} stroke="#E040FB" strokeWidth={2.5} />
              <polygon points="20,3 28,7 20,11" fill="#E040FB" />
            </svg>
            <span>Screen</span>
          </div>
          <div className="legend-item">
            <svg width={28} height={14}>
              <line x1={0} y1={7} x2={22} y2={7} stroke="#00E5FF" strokeWidth={2.5} strokeDasharray="6 4" />
              <polygon points="20,3 28,7 20,11" fill="#00E5FF" />
            </svg>
            <span>Pass</span>
          </div>
          <div className="legend-item">
            <svg width={20} height={20}>
              <circle cx={10} cy={10} r={8} fill="none" stroke="#FF9800" strokeWidth={2.5} strokeDasharray="4 3" />
            </svg>
            <span>Has ball</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
