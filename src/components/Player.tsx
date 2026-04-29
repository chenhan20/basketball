import type { PlayerState } from '../types';

const RADIUS = 20;

const POSITION_COLORS: Record<string, { fill: string; stroke: string }> = {
  offense: { fill: '#1565C0', stroke: '#90CAF9' },
  defense: { fill: '#B71C1C', stroke: '#EF9A9A' },
};

interface PlayerProps {
  player: PlayerState;
  animate?: boolean;
}

export default function Player({ player, animate = true }: PlayerProps) {
  const { fill, stroke } = POSITION_COLORS[player.team];

  return (
    <g
      transform={`translate(${player.x}, ${player.y})`}
      style={{ transition: animate ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
    >
      {/* Shadow */}
      <circle cx={2} cy={2} r={RADIUS} fill="rgba(0,0,0,0.35)" />

      {/* Player circle */}
      <circle
        r={RADIUS}
        fill={fill}
        stroke={stroke}
        strokeWidth={2.5}
      />

      {/* Ball indicator */}
      {player.hasBall && (
        <circle
          r={RADIUS + 5}
          fill="none"
          stroke="#FF9800"
          strokeWidth={3}
          strokeDasharray="4 3"
        />
      )}

      {/* Position label */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight="700"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
        fill="white"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {player.position}
      </text>
    </g>
  );
}
