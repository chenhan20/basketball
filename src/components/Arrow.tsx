import type { Movement, Pass, PlayerState, MovementType } from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function angle(x1: number, y1: number, x2: number, y2: number) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function shorten(
  x1: number, y1: number,
  x2: number, y2: number,
  startGap: number,
  endGap: number,
) {
  const a = angle(x1, y1, x2, y2);
  return {
    sx: x1 + Math.cos(a) * startGap,
    sy: y1 + Math.sin(a) * startGap,
    ex: x2 - Math.cos(a) * endGap,
    ey: y2 - Math.sin(a) * endGap,
  };
}

// ── Movement-type styles ──────────────────────────────────────────────────────

const MOVEMENT_STYLES: Record<MovementType, { stroke: string; dash: string }> = {
  run:     { stroke: '#76FF03', dash: 'none' },
  cut:     { stroke: '#FFD740', dash: '6 4' },
  screen:  { stroke: '#E040FB', dash: 'none' },
};

// ── Arrow Marker defs (call once in <defs>) ──────────────────────────────────

export function ArrowDefs() {
  return (
    <defs>
      {/* Movement arrows */}
      {(['run', 'cut', 'screen'] as MovementType[]).map((t) => (
        <marker
          key={t}
          id={`arrow-${t}`}
          markerWidth={8}
          markerHeight={8}
          refX={6}
          refY={3}
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L8,3 z"
            fill={MOVEMENT_STYLES[t].stroke}
          />
        </marker>
      ))}
      {/* Pass arrow */}
      <marker
        id="arrow-pass"
        markerWidth={8}
        markerHeight={8}
        refX={6}
        refY={3}
        orient="auto"
      >
        <path d="M0,0 L0,6 L8,3 z" fill="#00E5FF" />
      </marker>
    </defs>
  );
}

// ── MovementArrow ────────────────────────────────────────────────────────────

interface MovementArrowProps {
  movement: Movement;
  players: PlayerState[];
  className?: string;
}

export function MovementArrow({ movement, players, className }: MovementArrowProps) {
  const player = players.find((p) => p.id === movement.playerId);
  if (!player) return null;

  return (
    <MovementPath
      fromX={player.x}
      fromY={player.y}
      toX={movement.toX}
      toY={movement.toY}
      type={movement.type}
      className={className}
    />
  );
}

interface MovementPathProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  type: MovementType;
  className?: string;
}

export function MovementPath({
  fromX,
  fromY,
  toX,
  toY,
  type,
  className,
}: MovementPathProps) {
  const { stroke, dash } = MOVEMENT_STYLES[type];
  const { sx, sy, ex, ey } = shorten(
    fromX, fromY,
    toX, toY,
    22, 10,
  );

  return (
    <line
      x1={sx} y1={sy}
      x2={ex} y2={ey}
      stroke={stroke}
      strokeWidth={2.5}
      strokeDasharray={dash === 'none' ? undefined : dash}
      markerEnd={`url(#arrow-${type})`}
      opacity={0.9}
      className={className}
    />
  );
}

// ── PassArrow ────────────────────────────────────────────────────────────────

interface PassArrowProps {
  pass: Pass;
  players: PlayerState[];
  className?: string;
}

export function PassArrow({ pass, players, className }: PassArrowProps) {
  const from = players.find((p) => p.id === pass.fromPlayerId);
  const to   = players.find((p) => p.id === pass.toPlayerId);
  if (!from || !to) return null;

  return (
    <PassPath
      fromX={from.x}
      fromY={from.y}
      toX={to.x}
      toY={to.y}
      className={className}
    />
  );
}

interface PassPathProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  className?: string;
}

export function PassPath({ fromX, fromY, toX, toY, className }: PassPathProps) {
  const { sx, sy, ex, ey } = shorten(fromX, fromY, toX, toY, 24, 24);

  // Slight arc via quadratic bezier
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = -(ey - sy) * 0.25;
  const dy =  (ex - sx) * 0.25;
  const qx = mx + dx;
  const qy = my + dy;

  return (
    <path
      d={`M ${sx} ${sy} Q ${qx} ${qy} ${ex} ${ey}`}
      fill="none"
      stroke="#00E5FF"
      strokeWidth={2.5}
      strokeDasharray="8 5"
      markerEnd="url(#arrow-pass)"
      opacity={0.9}
      className={className}
    />
  );
}
