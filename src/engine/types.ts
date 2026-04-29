/**
 * Type definitions describing a play.
 *
 * A `Play` is a JSON-serializable description of a basketball tactic,
 * built out of an ordered list of `Step`s. Each step moves a subset of
 * players to new positions over a duration, optionally annotated with
 * defensive `actions` (help / recover / switch) and a textual note that
 * is shown to the viewer while the step plays.
 */

export type TeamId = 'offense' | 'defense';

/** Player roles, mostly used for color / labeling. */
export type Role = 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'X';

/** A point on the court. Coordinates are in court units (feet).
 *  The court rendered by `<Court />` is 50 ft wide x 47 ft long
 *  (an NBA half court). */
export interface Point {
  x: number;
  y: number;
}

export interface PlayerDef {
  id: string;
  team: TeamId;
  role: Role;
  /** Display label, e.g. "1" for the point guard, "X1" for his defender. */
  label: string;
  /** Starting position, in court units. */
  start: Point;
}

/**
 * Defensive rotations.
 *
 * - `help`     : defender leaves his man to help on the ball / a cutter.
 *                The `helpOn` field stores who he is helping on, so we
 *                can later snap back ("recover") to his original man.
 * - `recover`  : defender returns to his original assignment.
 * - `switch`   : two defenders permanently swap assignments.
 */
export type DefensiveAction =
  | { kind: 'help'; defender: string; helpOn: string }
  | { kind: 'recover'; defender: string }
  | { kind: 'switch'; defenderA: string; defenderB: string };

export interface Movement {
  /** Player id being moved. */
  player: string;
  /** Destination point. */
  to: Point;
  /**
   * Movement curve.
   * - `straight`  : linear interpolation
   * - `cut`       : sharp ease-out (quick acceleration, soft stop)
   * - `screen`    : ease-in-out (deliberate, plants on arrival)
   * - `dribble`   : ease-in-out, slightly slower visually
   */
  curve?: 'straight' | 'cut' | 'screen' | 'dribble';
  /**
   * Optional control point for a curved path (quadratic Bezier).
   * If omitted, the movement is a straight segment.
   */
  control?: Point;
}

export interface Step {
  /** Step duration in seconds. */
  duration: number;
  /** Player movements during this step. */
  moves: Movement[];
  /** Defensive rotations triggered at the start of this step. */
  actions?: DefensiveAction[];
  /** Narration shown while this step plays. */
  note?: string;
}

export interface Play {
  id: string;
  name: string;
  category: 'offense' | 'defense';
  description: string;
  /** Long-form coaching notes shown next to the visualization. */
  coaching: string[];
  players: PlayerDef[];
  steps: Step[];
}
