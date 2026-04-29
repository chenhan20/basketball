/**
 * Path
 * ----
 * Renders the trajectory a player will travel during a step, so the
 * viewer can preview where the move is going. Supports straight
 * segments and quadratic Bezier curves.
 *
 * Different stroke styles distinguish the type of movement:
 *   - cut      : solid line with arrow (fast offensive cut)
 *   - dribble  : wavy / dashed line (player dribbles the ball)
 *   - screen   : short bar with a perpendicular cap (sets a screen)
 *   - straight : thin solid (default / generic motion)
 */

import type { Movement, Point } from '../engine/types';
import { toSvg } from './court-geometry';

export interface PathProps {
  from: Point;
  move: Movement;
  /** Color override (default chosen from the curve type). */
  color?: string;
}

const STYLE: Record<NonNullable<Movement['curve']>, { color: string; dash?: string }> = {
  straight: { color: '#1f6feb' },
  cut: { color: '#1f6feb' },
  dribble: { color: '#0a7d3a', dash: '6 4' },
  screen: { color: '#a05a00' },
};

export function Path({ from, move, color }: PathProps) {
  const curve = move.curve ?? 'straight';
  const style = STYLE[curve];
  const stroke = color ?? style.color;
  const a = toSvg(from);
  const b = toSvg(move.to);
  const c = move.control ? toSvg(move.control) : undefined;

  const d = c
    ? `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`
    : `M ${a.x} ${a.y} L ${b.x} ${b.y}`;

  // Marker id must be unique enough between renders; we use the move's
  // destination + curve type to keep it stable and React-friendly.
  const markerId = `arrow-${stroke.replace('#', '')}`;

  return (
    <g>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={stroke} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={style.dash}
        markerEnd={curve === 'screen' ? undefined : `url(#${markerId})`}
        opacity={0.85}
      />
      {curve === 'screen' && <ScreenCap at={b} />}
    </g>
  );
}

function ScreenCap({ at }: { at: { x: number; y: number } }) {
  // A short perpendicular bar indicating the screener's chest plane.
  return (
    <line
      x1={at.x - 8}
      y1={at.y}
      x2={at.x + 8}
      y2={at.y}
      stroke="#a05a00"
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}
