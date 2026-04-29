/**
 * Player
 * ------
 * Renders a single player as a colored circle with a label.
 *
 * Smooth motion: the SVG `<g>` element uses a CSS transform with a
 * short `transition` so frame-to-frame jitter from rAF drift looks
 * silky instead of stepped. The position itself is updated by rAF
 * inside the engine; the CSS transition just smooths between frames.
 */

import type { FramePlayer } from '../engine/playEngine';
import { SCALE, toSvg } from './court-geometry';

const COLORS = {
  offense: { fill: '#1f6feb', stroke: '#0a2f6b', text: '#ffffff' },
  defense: { fill: '#d93025', stroke: '#6b0a0a', text: '#ffffff' },
};

export interface PlayerProps {
  player: FramePlayer;
  highlight?: boolean;
}

export function Player({ player, highlight }: PlayerProps) {
  const { x, y } = toSvg(player.pos);
  const palette = COLORS[player.team];
  const r = SCALE * 1.4;

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px)`,
        // Smoothing: rAF already updates the position frequently. A very
        // short transition removes the visible "step" if the browser
        // skips a frame, without introducing perceptible lag.
        transition: 'transform 60ms linear',
      }}
    >
      {highlight && (
        <circle
          r={r + 4}
          fill="none"
          stroke="#facc15"
          strokeWidth={2}
          opacity={0.9}
        />
      )}
      <circle
        r={r}
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth={1.5}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={SCALE * 1.1}
        fontWeight={700}
        fill={palette.text}
        style={{ userSelect: 'none' }}
      >
        {player.label}
      </text>
    </g>
  );
}
