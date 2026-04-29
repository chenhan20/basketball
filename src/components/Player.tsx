import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { PlayerState } from '../types';

const RADIUS = 20;

const POSITION_COLORS: Record<string, { fill: string; stroke: string }> = {
  offense: { fill: '#1565C0', stroke: '#90CAF9' },
  defense: { fill: '#B71C1C', stroke: '#EF9A9A' },
};

interface PlayerProps {
  player: PlayerState;
  animate?: boolean;
  /** Called while dragging with new svg-space coordinates. */
  onDrag?: (id: number, x: number, y: number) => void;
  /** Called once on drag end. */
  onDragEnd?: () => void;
  /** When true, hover cursor changes to grab. */
  draggable?: boolean;
}

/** Convert client (screen) coordinates to SVG user-space coordinates. */
function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: clientX, y: clientY };
  const transformed = pt.matrixTransform(ctm.inverse());
  return { x: transformed.x, y: transformed.y };
}

export default function Player({
  player,
  animate = true,
  onDrag,
  onDragEnd,
  draggable = false,
}: PlayerProps) {
  const { fill, stroke } = POSITION_COLORS[player.team];
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ dx: 0, dy: 0 });

  const handlePointerDown = (e: ReactPointerEvent<SVGGElement>) => {
    if (!draggable || !onDrag) return;
    e.stopPropagation();
    const svg = (e.currentTarget.ownerSVGElement) as SVGSVGElement | null;
    if (!svg) return;
    const { x, y } = clientToSvg(svg, e.clientX, e.clientY);
    offsetRef.current = { dx: x - player.x, dy: y - player.y };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<SVGGElement>) => {
    if (!dragging || !onDrag) return;
    const svg = (e.currentTarget.ownerSVGElement) as SVGSVGElement | null;
    if (!svg) return;
    const { x, y } = clientToSvg(svg, e.clientX, e.clientY);
    // Clamp inside half-court bounds (470 x 500).
    const nx = Math.max(RADIUS, Math.min(470 - RADIUS, x - offsetRef.current.dx));
    const ny = Math.max(RADIUS, Math.min(500 - RADIUS, y - offsetRef.current.dy));
    onDrag(player.id, nx, ny);
  };

  const handlePointerUp = (e: ReactPointerEvent<SVGGElement>) => {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    onDragEnd?.();
  };

  // While dragging we disable the CSS transition so the player tracks the cursor.
  const transitionStyle = dragging
    ? 'none'
    : animate
      ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)'
      : 'none';

  return (
    <g
      transform={`translate(${player.x}, ${player.y})`}
      style={{
        transition: transitionStyle,
        cursor: draggable ? (dragging ? 'grabbing' : 'grab') : 'default',
        touchAction: draggable ? 'none' : undefined,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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
