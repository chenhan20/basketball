/**
 * Court
 * -----
 * SVG rendering of an NBA-style half court. Pure presentational: takes
 * no play data, just renders the lines & arcs at fixed positions
 * defined in `court-geometry`.
 *
 * Children are rendered on top of the court surface so callers can
 * compose `<Court><Path/><Player/></Court>`.
 */

import type { ReactNode } from 'react';
import { COURT, SCALE, SVG_HEIGHT, SVG_WIDTH, fx, fy } from './court-geometry';

export interface CourtProps {
  children?: ReactNode;
}

export function Court({ children }: CourtProps) {
  const rim = COURT.rim;
  const laneLeft = (COURT.width - COURT.laneWidth) / 2; // 17

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      role="img"
      aria-label="Basketball half court"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Court surface */}
      <rect
        x={0}
        y={0}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        fill="#f4d2a3"
      />

      {/* Boundary */}
      <rect
        x={2}
        y={2}
        width={SVG_WIDTH - 4}
        height={SVG_HEIGHT - 4}
        fill="none"
        stroke="#5a3a1b"
        strokeWidth={2}
      />

      {/* Lane (the "key") */}
      <rect
        x={fx(laneLeft)}
        y={fy(COURT.ftLine)}
        width={COURT.laneWidth * SCALE}
        height={COURT.ftLine * SCALE}
        fill="#e0a86b"
        stroke="#5a3a1b"
        strokeWidth={1.5}
      />

      {/* Free-throw circle */}
      <circle
        cx={fx(COURT.width / 2)}
        cy={fy(COURT.ftLine)}
        r={COURT.ftRadius * SCALE}
        fill="none"
        stroke="#5a3a1b"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <circle
        cx={fx(COURT.width / 2)}
        cy={fy(COURT.ftLine)}
        r={COURT.ftRadius * SCALE}
        fill="none"
        stroke="#5a3a1b"
        strokeWidth={1.5}
        // Top half solid (over the lane line)
        strokeDasharray={`${Math.PI * COURT.ftRadius * SCALE} ${
          Math.PI * COURT.ftRadius * SCALE
        }`}
      />

      {/* Three-point arc + corners.
          We draw two straight corner segments, then a circular arc
          centered on the rim that ends where each corner straight ends. */}
      <ThreePointLine />

      {/* Restricted area (semicircle around rim) */}
      <path
        d={`M ${fx(rim.x - 4)} ${fy(rim.y)}
            A ${4 * SCALE} ${4 * SCALE} 0 0 0 ${fx(rim.x + 4)} ${fy(rim.y)}`}
        fill="none"
        stroke="#5a3a1b"
        strokeWidth={1.2}
      />

      {/* Backboard */}
      <line
        x1={fx(rim.x - 3)}
        y1={fy(4)}
        x2={fx(rim.x + 3)}
        y2={fy(4)}
        stroke="#5a3a1b"
        strokeWidth={2}
      />

      {/* Rim */}
      <circle
        cx={fx(rim.x)}
        cy={fy(rim.y)}
        r={0.75 * SCALE}
        fill="none"
        stroke="#c0392b"
        strokeWidth={2}
      />

      {/* Half court line */}
      <line
        x1={2}
        y1={fy(COURT.length)}
        x2={SVG_WIDTH - 2}
        y2={fy(COURT.length)}
        stroke="#5a3a1b"
        strokeWidth={2}
      />

      {children}
    </svg>
  );
}

function ThreePointLine() {
  const rim = COURT.rim;
  const cornerY = COURT.threeCornerY;
  const inset = COURT.cornerInset;
  const r = COURT.threeRadius * SCALE;
  // End points of each corner straight line / arc start
  const leftCornerTop = { x: inset, y: cornerY };
  const rightCornerTop = { x: COURT.width - inset, y: cornerY };

  return (
    <g fill="none" stroke="#5a3a1b" strokeWidth={1.5}>
      {/* Left corner straight */}
      <line
        x1={fx(inset)}
        y1={fy(0)}
        x2={fx(inset)}
        y2={fy(cornerY)}
      />
      {/* Right corner straight */}
      <line
        x1={fx(COURT.width - inset)}
        y1={fy(0)}
        x2={fx(COURT.width - inset)}
        y2={fy(cornerY)}
      />
      {/* Arc from left corner up over the top to right corner */}
      <path
        d={`M ${fx(leftCornerTop.x)} ${fy(leftCornerTop.y)}
            A ${r} ${r} 0 0 0 ${fx(rightCornerTop.x)} ${fy(rightCornerTop.y)}`}
      />
      {/* Center / tip-off circle (decorative) */}
      <circle
        cx={fx(rim.x)}
        cy={fy(COURT.length)}
        r={6 * SCALE}
        fill="none"
        stroke="#5a3a1b"
        strokeWidth={1.5}
      />
    </g>
  );
}
