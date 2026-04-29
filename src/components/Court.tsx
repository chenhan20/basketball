// Court dimensions: 940 x 500 (94ft × 50ft, 10px = 1ft)
// Left basket:  (52.5, 250)
// Right basket: (887.5, 250)

const COURT_W = 940;
const COURT_H = 500;

// Three-point arc parameters
const LEFT_BASKET_X = 52.5;
const RIGHT_BASKET_X = 887.5;
const BASKET_Y = 250;
const ARC_RADIUS = 237.5; // 23.75ft
const CORNER_THREE_Y_TOP = 30;    // 22ft from basket centre
const CORNER_THREE_Y_BOT = 470;
const ARC_JOIN_X_LEFT  = 142;   // x where arc meets corner three (left)
const ARC_JOIN_X_RIGHT = 798;   // mirror on right

// Paint dimensions
const PAINT_LENGTH = 190; // 19ft
const PAINT_HALF_W = 60;  // 6ft each side → 12ft total

// Free-throw circle
const FT_RADIUS = 60; // 6ft

// Restricted area
const RA_RADIUS = 40; // 4ft

// Backboard half-width (3ft)
const BB_HALF = 15;

export default function Court() {
  const paintTopY    = BASKET_Y - PAINT_HALF_W; // 190
  const paintBotY    = BASKET_Y + PAINT_HALF_W; // 310
  const leftFTX      = PAINT_LENGTH;             // 190
  const rightFTX     = COURT_W - PAINT_LENGTH;   // 750

  return (
    <g>
      {/* ── Court fill ── */}
      <rect x={0} y={0} width={COURT_W} height={COURT_H} fill="#c68a4a" />

      {/* ── Paint areas ── */}
      <rect
        x={0} y={paintTopY}
        width={PAINT_LENGTH} height={PAINT_HALF_W * 2}
        fill="#a0723a" stroke="white" strokeWidth={2}
      />
      <rect
        x={rightFTX} y={paintTopY}
        width={PAINT_LENGTH} height={PAINT_HALF_W * 2}
        fill="#a0723a" stroke="white" strokeWidth={2}
      />

      {/* ── Court boundary ── */}
      <rect
        x={0} y={0} width={COURT_W} height={COURT_H}
        fill="none" stroke="white" strokeWidth={3}
      />

      {/* ── Half-court line ── */}
      <line x1={COURT_W / 2} y1={0} x2={COURT_W / 2} y2={COURT_H} stroke="white" strokeWidth={2} />

      {/* ── Centre circle ── */}
      <circle cx={COURT_W / 2} cy={BASKET_Y} r={FT_RADIUS} fill="none" stroke="white" strokeWidth={2} />

      {/* ── Three-point lines ──
            Left:  M 0 470 L ARC_JOIN_X_LEFT 470  arc→  ARC_JOIN_X_LEFT 30  L 0 30
            Right: mirror */}
      <path
        d={`M 0 ${CORNER_THREE_Y_BOT}
            L ${ARC_JOIN_X_LEFT} ${CORNER_THREE_Y_BOT}
            A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${ARC_JOIN_X_LEFT} ${CORNER_THREE_Y_TOP}
            L 0 ${CORNER_THREE_Y_TOP}`}
        fill="none" stroke="white" strokeWidth={2}
      />
      <path
        d={`M ${COURT_W} ${CORNER_THREE_Y_BOT}
            L ${ARC_JOIN_X_RIGHT} ${CORNER_THREE_Y_BOT}
            A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${ARC_JOIN_X_RIGHT} ${CORNER_THREE_Y_TOP}
            L ${COURT_W} ${CORNER_THREE_Y_TOP}`}
        fill="none" stroke="white" strokeWidth={2}
      />

      {/* ── Free-throw circles ──
            Right half = solid; left half = dashed */}
      {/* Left FT circle */}
      <path
        d={`M ${leftFTX} ${paintTopY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 1 ${leftFTX} ${paintBotY}`}
        fill="none" stroke="white" strokeWidth={2}
      />
      <path
        d={`M ${leftFTX} ${paintBotY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 1 ${leftFTX} ${paintTopY}`}
        fill="none" stroke="white" strokeWidth={2} strokeDasharray="8 6"
      />
      {/* Right FT circle */}
      <path
        d={`M ${rightFTX} ${paintTopY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 0 ${rightFTX} ${paintBotY}`}
        fill="none" stroke="white" strokeWidth={2}
      />
      <path
        d={`M ${rightFTX} ${paintBotY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 0 ${rightFTX} ${paintTopY}`}
        fill="none" stroke="white" strokeWidth={2} strokeDasharray="8 6"
      />

      {/* ── Restricted-area arcs ── */}
      <path
        d={`M ${LEFT_BASKET_X} ${BASKET_Y - RA_RADIUS}
            A ${RA_RADIUS} ${RA_RADIUS} 0 0 1 ${LEFT_BASKET_X} ${BASKET_Y + RA_RADIUS}`}
        fill="none" stroke="white" strokeWidth={2}
      />
      <path
        d={`M ${RIGHT_BASKET_X} ${BASKET_Y - RA_RADIUS}
            A ${RA_RADIUS} ${RA_RADIUS} 0 0 0 ${RIGHT_BASKET_X} ${BASKET_Y + RA_RADIUS}`}
        fill="none" stroke="white" strokeWidth={2}
      />

      {/* ── Backboards ── */}
      <line
        x1={43} y1={BASKET_Y - BB_HALF}
        x2={43} y2={BASKET_Y + BB_HALF}
        stroke="white" strokeWidth={3}
      />
      <line
        x1={897} y1={BASKET_Y - BB_HALF}
        x2={897} y2={BASKET_Y + BB_HALF}
        stroke="white" strokeWidth={3}
      />

      {/* ── Baskets (rims) ── */}
      <circle cx={LEFT_BASKET_X}  cy={BASKET_Y} r={9} fill="none" stroke="#FF6B00" strokeWidth={2.5} />
      <circle cx={RIGHT_BASKET_X} cy={BASKET_Y} r={9} fill="none" stroke="#FF6B00" strokeWidth={2.5} />

      {/* ── Lane hash marks (left) ── */}
      {[220, 240, 260, 280].map((y) => (
        <g key={y}>
          <line x1={0}    y1={y} x2={8}   y2={y} stroke="white" strokeWidth={1.5} />
          <line x1={0}    y1={COURT_H - y} x2={8}   y2={COURT_H - y} stroke="white" strokeWidth={1.5} />
          <line x1={COURT_W}    y1={y} x2={COURT_W - 8}   y2={y} stroke="white" strokeWidth={1.5} />
          <line x1={COURT_W}    y1={COURT_H - y} x2={COURT_W - 8}   y2={COURT_H - y} stroke="white" strokeWidth={1.5} />
        </g>
      ))}
    </g>
  );
}
