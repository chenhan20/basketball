// Half-court dimensions: 470 x 500 (47ft × 50ft, 10px = 1ft)
// Basket: (52.5, 250). All teaching plays attack this single rim.

const COURT_W = 470;
const COURT_H = 500;
const BASKET_X = 52.5;
const BASKET_Y = 250;
const ARC_RADIUS = 237.5;
const CORNER_THREE_Y_TOP = 30;
const CORNER_THREE_Y_BOT = 470;
const ARC_JOIN_X = 142;
const PAINT_LENGTH = 190;
const PAINT_HALF_W = 60;
const FT_RADIUS = 60;
const RA_RADIUS = 40;
const BB_HALF = 15;

export default function Court() {
  const paintTopY = BASKET_Y - PAINT_HALF_W;
  const paintBotY = BASKET_Y + PAINT_HALF_W;

  return (
    <g>
      <rect x={0} y={0} width={COURT_W} height={COURT_H} fill="#c68a4a" />
      <rect
        x={0}
        y={paintTopY}
        width={PAINT_LENGTH}
        height={PAINT_HALF_W * 2}
        fill="#a0723a"
        stroke="white"
        strokeWidth={2}
      />

      <rect x={0} y={0} width={COURT_W} height={COURT_H} fill="none" stroke="white" strokeWidth={3} />
      <line x1={COURT_W} y1={0} x2={COURT_W} y2={COURT_H} stroke="white" strokeWidth={2} strokeDasharray="10 8" />

      <path
        d={`M 0 ${CORNER_THREE_Y_BOT}
            L ${ARC_JOIN_X} ${CORNER_THREE_Y_BOT}
            A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${ARC_JOIN_X} ${CORNER_THREE_Y_TOP}
            L 0 ${CORNER_THREE_Y_TOP}`}
        fill="none"
        stroke="white"
        strokeWidth={2}
      />

      <path
        d={`M ${PAINT_LENGTH} ${paintTopY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 1 ${PAINT_LENGTH} ${paintBotY}`}
        fill="none"
        stroke="white"
        strokeWidth={2}
      />
      <path
        d={`M ${PAINT_LENGTH} ${paintBotY} A ${FT_RADIUS} ${FT_RADIUS} 0 0 1 ${PAINT_LENGTH} ${paintTopY}`}
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeDasharray="8 6"
      />

      <path
        d={`M ${BASKET_X} ${BASKET_Y - RA_RADIUS}
            A ${RA_RADIUS} ${RA_RADIUS} 0 0 1 ${BASKET_X} ${BASKET_Y + RA_RADIUS}`}
        fill="none"
        stroke="white"
        strokeWidth={2}
      />

      <line x1={43} y1={BASKET_Y - BB_HALF} x2={43} y2={BASKET_Y + BB_HALF} stroke="white" strokeWidth={3} />
      <circle cx={BASKET_X} cy={BASKET_Y} r={9} fill="none" stroke="#FF6B00" strokeWidth={2.5} />

      <circle cx={190} cy={170} r={4} fill="rgba(255,255,255,0.7)" />
      <circle cx={190} cy={330} r={4} fill="rgba(255,255,255,0.7)" />
      <text x={198} y={166} fill="rgba(255,255,255,0.72)" fontSize={12} fontWeight={700}>肘區</text>
      <text x={198} y={336} fill="rgba(255,255,255,0.72)" fontSize={12} fontWeight={700}>肘區</text>
      <text x={80} y={56} fill="rgba(255,255,255,0.72)" fontSize={12} fontWeight={700}>底角</text>
      <text x={80} y={456} fill="rgba(255,255,255,0.72)" fontSize={12} fontWeight={700}>底角</text>
      <text x={320} y={252} fill="rgba(255,255,255,0.72)" fontSize={12} fontWeight={700}>弧頂 / 45°</text>

      {[220, 240, 260, 280].map((y) => (
        <g key={y}>
          <line x1={0} y1={y} x2={8} y2={y} stroke="white" strokeWidth={1.5} />
          <line x1={0} y1={COURT_H - y} x2={8} y2={COURT_H - y} stroke="white" strokeWidth={1.5} />
        </g>
      ))}
    </g>
  );
}
