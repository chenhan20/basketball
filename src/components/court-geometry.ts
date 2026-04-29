/**
 * Court geometry constants and coordinate helpers.
 *
 * The play data is authored in *court units* (feet), with the origin at
 * the bottom-left corner of the half court (baseline-left). The SVG is
 * rendered in *pixels* with the origin at the top-left, so we flip Y.
 *
 * NBA half-court reference dimensions (approx., feet):
 *   - Court width (sideline to sideline): 50
 *   - Half-court length (baseline to half line): 47
 *   - Free-throw line: 19 ft from baseline
 *   - Free-throw circle radius: 6 ft
 *   - Lane width: 16 ft
 *   - 3pt arc radius (top): 23.75 ft from rim center
 *   - 3pt corner: 22 ft, sideline at x=3 ft / x=47 ft
 *   - Rim center: 5.25 ft from baseline, 25 ft from sideline
 */

export const COURT = {
  width: 50,
  length: 47,
  rim: { x: 25, y: 5.25 },
  ftLine: 19,
  ftRadius: 6,
  laneWidth: 16,
  threeRadius: 23.75,
  threeCornerY: 14, // approx. where arc meets the corner straight line
  cornerInset: 3, // distance from sideline to corner 3pt straight portion
} as const;

/** Pixel scale: 1 court foot = SCALE px. */
export const SCALE = 12;

export const SVG_WIDTH = COURT.width * SCALE;
export const SVG_HEIGHT = COURT.length * SCALE;

/** Convert a court point (feet) to SVG pixel coordinates. */
export function toSvg(p: { x: number; y: number }): { x: number; y: number } {
  return { x: p.x * SCALE, y: SVG_HEIGHT - p.y * SCALE };
}

export function fx(x: number): number {
  return x * SCALE;
}
export function fy(y: number): number {
  return SVG_HEIGHT - y * SCALE;
}
