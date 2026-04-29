/**
 * playEngine
 * ----------
 * Pure, framework-agnostic logic for advancing a `Play` through time and
 * computing the current frame (per-player position + active narration +
 * defensive assignment map).
 *
 * Design goals:
 *
 *   - **Pure functions over time.** `frameAt(play, t)` returns the full
 *     visual state for any timestamp `t`. Animation state (rAF, paused,
 *     etc.) lives in the React hook, never here. This makes scrubbing,
 *     testing and replay trivial.
 *
 *   - **Reusable.** No DOM or React imports. Could be reused with canvas
 *     or even a server-side renderer.
 *
 *   - **Performant.** Each `frameAt` call is O(players + active moves);
 *     no allocation per RAF tick beyond the returned frame object.
 *
 *   - **Defensive rotation aware.** Help / recover / switch actions are
 *     applied step-by-step to maintain a `assignments` map of
 *     defender -> offensive player they are guarding right now. This
 *     drives the dotted "guard line" rendered on the court.
 */

import type {
  DefensiveAction,
  Movement,
  Play,
  PlayerDef,
  Point,
  Step,
} from './types';

export interface FramePlayer extends PlayerDef {
  pos: Point;
  /** True if this player is moving in the current step. */
  moving: boolean;
}

export interface Frame {
  /** Seconds elapsed from start. */
  time: number;
  /** Total play duration in seconds. */
  total: number;
  /** Index of the step currently playing. */
  stepIndex: number;
  /** Progress within the current step, 0..1. */
  stepProgress: number;
  /** Narration for the current step. */
  note?: string;
  /** Per-player visual state, keyed by player id. */
  players: Record<string, FramePlayer>;
  /** defender id -> offensive player id currently being guarded.
   *  Reflects help / switch state at this moment in time. */
  assignments: Record<string, string>;
  /** Position of every player at the start of the current step.
   *  Useful for drawing the trajectory of the active step from a
   *  stable origin (so the path doesn't slide as the player moves). */
  stepStartPositions: Record<string, Point>;
}

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------

const easings = {
  straight: (t: number) => t,
  // ease-out cubic: fast start, soft stop (matches a basketball cut)
  cut: (t: number) => 1 - Math.pow(1 - t, 3),
  // ease-in-out cubic: deliberate, plants on arrival (setting a screen)
  screen: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  // ease-in-out quadratic, slightly softer (a controlled dribble)
  dribble: (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
} as const;

function ease(curve: Movement['curve'], t: number): number {
  return easings[curve ?? 'straight'](Math.min(1, Math.max(0, t)));
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

/** Quadratic Bezier point at parameter t. */
function quad(a: Point, c: Point, b: Point, t: number): Point {
  const omt = 1 - t;
  return {
    x: omt * omt * a.x + 2 * omt * t * c.x + t * t * b.x,
    y: omt * omt * a.y + 2 * omt * t * c.y + t * t * b.y,
  };
}

/**
 * Position along a single movement, given normalized (eased) progress.
 */
function positionFor(
  from: Point,
  move: Movement,
  easedProgress: number,
): Point {
  if (move.control) {
    return quad(from, move.control, move.to, easedProgress);
  }
  return lerpPoint(from, move.to, easedProgress);
}

// ---------------------------------------------------------------------------
// Defensive assignments
// ---------------------------------------------------------------------------

/**
 * Build the initial defender -> offensive player assignment map by
 * pairing defenders to their nearest offensive player at the start.
 *
 * This is a convention chosen for simplicity: in the JSON the matchups
 * are made explicit by placing each defender right next to his man.
 */
export function initialAssignments(players: PlayerDef[]): Record<string, string> {
  const offense = players.filter((p) => p.team === 'offense');
  const defense = players.filter((p) => p.team === 'defense');
  const assignments: Record<string, string> = {};
  for (const d of defense) {
    let best: PlayerDef | undefined;
    let bestDist = Infinity;
    for (const o of offense) {
      const dx = d.start.x - o.start.x;
      const dy = d.start.y - o.start.y;
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) {
        bestDist = dist;
        best = o;
      }
    }
    if (best) assignments[d.id] = best.id;
  }
  return assignments;
}

/** Apply a single defensive action to the assignment map (immutably). */
function applyAction(
  assignments: Record<string, string>,
  initial: Record<string, string>,
  action: DefensiveAction,
): Record<string, string> {
  const next = { ...assignments };
  switch (action.kind) {
    case 'help':
      next[action.defender] = action.helpOn;
      return next;
    case 'recover':
      next[action.defender] = initial[action.defender];
      return next;
    case 'switch': {
      const a = next[action.defenderA];
      const b = next[action.defenderB];
      next[action.defenderA] = b;
      next[action.defenderB] = a;
      return next;
    }
  }
}

// ---------------------------------------------------------------------------
// Per-step caching
// ---------------------------------------------------------------------------

interface StepFrame {
  /** Position of every player at the *start* of this step. */
  startPositions: Record<string, Point>;
  /** Position of every player at the *end* of this step. */
  endPositions: Record<string, Point>;
  /** Defender->offense assignment map after this step's actions are applied. */
  assignmentsAfter: Record<string, string>;
}

interface CompiledPlay {
  play: Play;
  steps: StepFrame[];
  /** Cumulative time at the *end* of step i (steps[i].endTime). */
  endTimes: number[];
  total: number;
  initialAssignments: Record<string, string>;
}

/**
 * Pre-compute per-step start/end positions and the assignment map after
 * each step. This makes `frameAt` O(players) per call and avoids
 * re-walking the whole script every frame.
 */
export function compile(play: Play): CompiledPlay {
  const initialAssign = initialAssignments(play.players);

  const startPositions: Record<string, Point> = {};
  for (const p of play.players) startPositions[p.id] = p.start;

  const stepFrames: StepFrame[] = [];
  const endTimes: number[] = [];
  let elapsed = 0;
  let cursor: Record<string, Point> = startPositions;
  let assigns = initialAssign;

  for (const step of play.steps) {
    // Apply this step's defensive actions at the *start* of the step.
    if (step.actions) {
      for (const a of step.actions) {
        assigns = applyAction(assigns, initialAssign, a);
      }
    }

    const stepStart = cursor;
    const stepEnd: Record<string, Point> = { ...cursor };
    for (const m of step.moves) stepEnd[m.player] = m.to;

    stepFrames.push({
      startPositions: stepStart,
      endPositions: stepEnd,
      assignmentsAfter: assigns,
    });
    elapsed += step.duration;
    endTimes.push(elapsed);
    cursor = stepEnd;
  }

  return {
    play,
    steps: stepFrames,
    endTimes,
    total: elapsed,
    initialAssignments: initialAssign,
  };
}

// ---------------------------------------------------------------------------
// Frame computation
// ---------------------------------------------------------------------------

/** Find the index of the step currently active at time `t`. */
function findStep(endTimes: number[], t: number): number {
  // Linear scan is fine: a play has a handful of steps. If this ever
  // grows large, switch to binary search.
  for (let i = 0; i < endTimes.length; i++) {
    if (t < endTimes[i]) return i;
  }
  return endTimes.length - 1;
}

/**
 * Compute the visual state of the play at time `t` (clamped to [0, total]).
 */
export function frameAt(compiled: CompiledPlay, time: number): Frame {
  const total = compiled.total;
  const t = Math.min(Math.max(time, 0), total);
  const stepIndex = findStep(compiled.endTimes, t);
  const step: Step = compiled.play.steps[stepIndex];
  const sf = compiled.steps[stepIndex];

  const stepStartTime =
    stepIndex === 0 ? 0 : compiled.endTimes[stepIndex - 1];
  const rawProgress =
    step.duration === 0 ? 1 : (t - stepStartTime) / step.duration;
  const stepProgress = Math.min(1, Math.max(0, rawProgress));

  // Build a quick lookup of per-player movement curve in this step.
  const moveByPlayer: Record<string, Movement> = {};
  for (const m of step.moves) moveByPlayer[m.player] = m;

  const players: Record<string, FramePlayer> = {};
  for (const def of compiled.play.players) {
    const from = sf.startPositions[def.id];
    const move = moveByPlayer[def.id];
    let pos: Point;
    let moving = false;
    if (move) {
      pos = positionFor(from, move, ease(move.curve, stepProgress));
      moving = stepProgress > 0 && stepProgress < 1;
    } else {
      pos = from;
    }
    players[def.id] = { ...def, pos, moving };
  }

  return {
    time: t,
    total,
    stepIndex,
    stepProgress,
    note: step.note,
    players,
    assignments: sf.assignmentsAfter,
    stepStartPositions: sf.startPositions,
  };
}

// ---------------------------------------------------------------------------
// rAF runner
// ---------------------------------------------------------------------------

export interface RunnerOptions {
  /** Called every animation frame with the current play time (seconds). */
  onTick: (time: number) => void;
  /** Optional playback speed multiplier (default 1). */
  speed?: number;
  /** Optional max time; the runner stops itself when reached. */
  duration?: number;
  /** Called once when playback reaches `duration`. */
  onEnd?: () => void;
}

export interface Runner {
  start: (fromTime?: number) => void;
  stop: () => void;
  isRunning: () => boolean;
}

/**
 * Lightweight requestAnimationFrame loop.
 *
 * Uses real wall-clock deltas (so playback speed is independent of frame
 * rate) and exposes `start` / `stop` for the React hook to drive.
 */
export function createRunner(options: RunnerOptions): Runner {
  let raf = 0;
  let running = false;
  let lastTs = 0;
  let time = 0;

  const tick = (ts: number) => {
    if (!running) return;
    if (lastTs === 0) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    // Read speed each tick so callers can adjust it on the fly via a getter.
    time += dt * (options.speed ?? 1);
    if (options.duration !== undefined && time >= options.duration) {
      time = options.duration;
      options.onTick(time);
      running = false;
      options.onEnd?.();
      return;
    }
    options.onTick(time);
    raf = requestAnimationFrame(tick);
  };

  return {
    start(fromTime = 0) {
      if (running) return;
      time = fromTime;
      lastTs = 0;
      running = true;
      raf = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
    isRunning() {
      return running;
    },
  };
}
