import type { Play, PlayerState } from '../types';

// Court dimensions: 940 x 500 (94ft x 50ft, 10px = 1ft)
// Left basket at (52.5, 250), Right basket at (887.5, 250)
// Offense attacks LEFT basket in these plays.

// ─────────────────────────────────────────────
// Play 1: Pick and Roll (Offense)
// ─────────────────────────────────────────────
const pickAndRoll: Play = {
  id: 'pick-and-roll',
  name: 'Pick & Roll',
  description: 'Center sets a ball-screen for the PG at the elbow. PG attacks off the screen while C rolls hard to the basket.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Initial Setup',
      description: 'Players spread the floor. PG has the ball at the top of the key. C is at the low block preparing to set the screen.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 5, toX: 248, toY: 263, type: 'screen' },
      ],
    },
    {
      label: 'Step 2 · Screen Set',
      description: 'C moves up to set the screen at the elbow. PG dribbles toward the screen.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 248, y: 263 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 258, y: 270 },
      ],
      movements: [
        { playerId: 1, toX: 248, toY: 248, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · PG Uses Screen',
      description: 'PG dribbles off the screen. D1 is momentarily impeded. C immediately rolls toward the basket.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 248, y: 248, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 248, y: 263 },
        { id: 6, position: 'PG', team: 'defense', x: 263, y: 270 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 258, y: 270 },
      ],
      movements: [
        { playerId: 1, toX: 158, toY: 238, type: 'run' },
        { playerId: 5, toX: 135, toY: 285, type: 'cut' },
      ],
    },
    {
      label: 'Step 4 · Finish (Read & React)',
      description: 'PG penetrates the paint, C is rolling. Read the help: if D5 helps → drop the pass to C for a layup; if the wing defender collapses → kick to SG/SF for three.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 158, y: 238, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 135, y: 285 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 280 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 145, y: 275 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 5 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 2: Horns Set / Motion Offense (Offense)
// ─────────────────────────────────────────────
const motionOffense: Play = {
  id: 'motion-offense',
  name: 'Horns Motion',
  description: 'A versatile horns-set that flows into motion offense. Both bigs (PF, C) start at the elbows, creating multiple options: drive, pull-up, or kick-out.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Horns Setup',
      description: 'PG at the top of the key with the ball. PF and C at the elbows. SG and SF wide on the wings.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 195, y: 195 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 255 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 208, y: 200 },
        { id: 10, position: 'C', team: 'defense', x: 208, y: 300 },
      ],
      movements: [
        { playerId: 1, toX: 245, toY: 220, type: 'run' },
        { playerId: 4, toX: 168, toY: 175, type: 'cut' },
      ],
    },
    {
      label: "Step 2 · Drive Right",
      description: "PG attacks the right elbow off PF's shoulder. PF flares to the three-point line. SF cuts to the weak-side elbow.",
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 245, y: 220, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 258, y: 228 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 208, y: 300 },
      ],
      movements: [
        { playerId: 1, toX: 160, toY: 200, type: 'run' },
        { playerId: 5, toX: 145, toY: 290, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Kick-out or Finish',
      description: 'PG has penetrated the lane. SG is open on the wing for a kick-out three. C is rolling to the basket for a lob.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 160, y: 200, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 145, y: 290 },
        { id: 6, position: 'PG', team: 'defense', x: 170, y: 208 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 155, y: 280 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Corner Three',
      description: 'SG receives the kick-out pass. D7 collapsed helping on the drive, leaving SG open for the corner three.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 160, y: 200 },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 145, y: 290 },
        { id: 6, position: 'PG', team: 'defense', x: 170, y: 208 },
        { id: 7, position: 'SG', team: 'defense', x: 175, y: 190 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 155, y: 280 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 3: Baseline Cut (繞底) — Offense
// ─────────────────────────────────────────────
const baselineCut: Play = {
  id: 'baseline-cut',
  name: 'Baseline Cut (繞底)',
  description: 'Weak-side wing cuts hard along the baseline to the rim. If the defender ball-watches, the cutter is wide open for a layup.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · 4-out 1-in Setup',
      description: 'PG at the top with the ball. SG on the strong-side wing. SF in the weak-side corner. PF on the weak-side wing. C on the strong-side block.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 430 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 410 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      movements: [
        { playerId: 1, toX: 200, toY: 150, type: 'run' },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 2 · Ball Swings to the Wing',
      description: 'PG passes to SG on the strong-side wing. The defense shifts its eyes to the ball — perfect time for the weak-side cut.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 430 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 380 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      movements: [
        { playerId: 3, toX: 60, toY: 285, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Baseline Cut',
      description: 'SF sprints along the baseline behind C, who acts as a natural screen. D8 is caught ball-watching and trails badly.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 285 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 165, y: 360 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      passes: [
        { fromPlayerId: 2, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 4 · Layup at the Rim',
      description: 'SG hits SF on the move for a finish at the rim. Key teaching point: the cutter must time the cut to arrive AS the pass is thrown.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 285, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 175, y: 340 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 4: Drive & Kick (切傳) — Offense
// ─────────────────────────────────────────────
const driveAndKick: Play = {
  id: 'drive-and-kick',
  name: 'Drive & Kick (切傳)',
  description: 'PG attacks the lane forcing the defense to collapse, then kicks the ball out to a spot-up shooter for an open three.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · 5-out Spacing',
      description: 'All five offensive players are outside the arc. Maximum spacing means a single drive forces a real help decision.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      movements: [
        { playerId: 1, toX: 180, toY: 230, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Hard Drive',
      description: 'PG attacks the gap and turns the corner. The lane is now open and defenders must decide whether to help.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      movements: [
        { playerId: 7, toX: 175, toY: 200, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Defense Collapses',
      description: "D7 sinks to help on the drive, leaving SG wide open in the wing. Don't force the layup — make the right read.",
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 175, y: 200 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Open Three',
      description: 'SG catches and shoots before the closeout arrives. If D7 recovers in time, swing it again to PF in the corner.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 195, y: 155 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 5: Backdoor Cut (45度反跑) — Offense
// ─────────────────────────────────────────────
const backdoorCut: Play = {
  id: 'backdoor-cut',
  name: 'Backdoor Cut (反跑)',
  description: 'Counter to over-aggressive denial defense. The wing fakes a v-cut up to the ball, then sprints back-door to the rim.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Pressure Setup',
      description: 'Defense is playing high pressure ("上") — every off-ball defender is in a deny stance, hand in the passing lane.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      movements: [
        { playerId: 2, toX: 245, toY: 145, type: 'cut' },
      ],
    },
    {
      label: 'Step 2 · V-Cut (Sell the Pop-out)',
      description: 'SG steps UP toward the ball as if asking for a wing pass. The denying defender (D7) sprints higher to deny.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 245, y: 145 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 268, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      movements: [
        { playerId: 2, toX: 95, toY: 220, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Sprint Backdoor',
      description: 'SG plants and explodes back-door behind D7 toward the basket. PG sees the cut and lifts the ball for a bounce pass.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 95,  y: 220 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 240, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Layup',
      description: 'SG catches the bounce pass at the rim for an open layup. Rule: the harder they deny, the more open the back-door.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 75,  y: 240, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 220, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 6: 2-3 Zone Defense
// ─────────────────────────────────────────────
const zoneDefense23: Play = {
  id: 'zone-defense-2-3',
  name: '2-3 Zone Defense',
  description: 'A 2-3 zone with two guards up top and three players along the baseline. The zone shifts as the offense moves the ball.',
  type: 'defense',
  steps: [
    {
      label: 'Step 1 · 2-3 Zone Set',
      description: 'Two guards (D1, D2) cover the perimeter. Three defenders (D3, D4, D5) protect the paint and baseline area.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 278, y: 210 },
        { id: 7, position: 'SG', team: 'defense', x: 278, y: 290 },
        { id: 8, position: 'SF', team: 'defense', x: 165, y: 180 },
        { id: 9, position: 'C',  team: 'defense', x: 130, y: 250 },
        { id: 10, position: 'PF', team: 'defense', x: 165, y: 320 },
      ],
      movements: [
        { playerId: 1, toX: 220, toY: 158, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Ball Swings to Wing',
      description: 'Offense swings the ball to the right wing. D1 closes out hard. The bottom three shift right to cut off baseline drives.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 310, y: 250 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 230, y: 162 },
        { id: 7, position: 'SG', team: 'defense', x: 278, y: 278 },
        { id: 8, position: 'SF', team: 'defense', x: 148, y: 163 },
        { id: 9, position: 'C',  team: 'defense', x: 130, y: 230 },
        { id: 10, position: 'PF', team: 'defense', x: 160, y: 295 },
      ],
      movements: [
        { playerId: 1, toX: 90, toY: 100, type: 'run' },
        { playerId: 8, toX: 110, toY: 140, type: 'run' },
        { playerId: 9, toX: 120, toY: 210, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Corner Rotation',
      description: 'Ball enters the corner. D3 sprints to close out. D5 slides to cover the paint. Zone sags to eliminate easy baskets.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 90,  y: 100, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 310, y: 250 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 158 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 240, y: 185 },
        { id: 7, position: 'SG', team: 'defense', x: 265, y: 278 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 108 },
        { id: 9, position: 'C',  team: 'defense', x: 120, y: 210 },
        { id: 10, position: 'PF', team: 'defense', x: 148, y: 288 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 7: Beat 2-3 Zone — High Post Touch (Offense vs Zone)
// ─────────────────────────────────────────────
const beatZoneHighPost: Play = {
  id: 'beat-zone-high-post',
  name: 'Vs 2-3 · High Post',
  description: 'Best single rule against a 2-3 zone: get the ball to the free-throw line. From there the offense can shoot, hit a cutter, or dump to the corner.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Zone Recognition',
      description: 'Defense is in a 2-3 zone. Two guards up top, three defenders along the baseline. The high post (free-throw line) is the soft spot.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 250, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 300 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      movements: [
        { playerId: 5, toX: 195, toY: 250, type: 'cut' },
      ],
    },
    {
      label: 'Step 2 · Flash to High Post',
      description: 'C flashes into the gap between the two top defenders, sitting at the free-throw line — the seam of the zone.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 300 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 5 },
      ],
    },
    {
      label: 'Step 3 · Catch & Read',
      description: 'C catches at the free-throw line. The bottom-middle defender (D9) MUST step up. Three reads: shoot, hit the corner shooter, or feed a cutter.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250, hasBall: true },
        { id: 6, position: 'PG', team: 'defense', x: 250, y: 215 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 285 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 165, y: 240 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 5, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 4 · Corner Shot',
      description: 'C dumps the ball to SF in the corner. The bottom defender D10 cannot recover in time — wide-open three from the weakest spot in the zone.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 250, y: 215 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 285 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 165, y: 240 },
        { id: 10, position: 'C', team: 'defense', x: 140, y: 400 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 8: Beat 2-3 Zone — Ball Swing (Skip-Reversal)
// ─────────────────────────────────────────────
const beatZoneBallSwing: Play = {
  id: 'beat-zone-ball-swing',
  name: 'Vs 2-3 · Ball Swing',
  description: 'Move the ball faster than the zone can shift. Side-to-side reversals (and a skip pass) force the bottom defenders to scramble — eventually a shooter is open.',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Overload One Side',
      description: 'PG starts on the right wing with the ball. SG, C, and PF are stacked on the strong side to draw the zone over.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470 },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 230, y: 165 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 290 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 130 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 360 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 2 · Quick Reversal',
      description: 'PG reverses the ball to SF on the opposite wing. The whole zone has to shift; the bottom defenders are scrambling.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470 },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 145, y: 350 },
      ],
      passes: [
        { fromPlayerId: 3, toPlayerId: 4 },
      ],
    },
    {
      label: 'Step 3 · Skip to the Corner',
      description: 'SF immediately skips a pass to PF in the weak-side corner. The bottom defender is two slides late — corner is open.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 175, y: 380 },
      ],
    },
    {
      label: 'Step 4 · Open Corner Three',
      description: 'PF rises into the corner three before D10 can close out. Rule: ball moves faster than feet — keep swinging until the defense breaks.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 100, y: 430 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 9: Man-to-Man Help Defense
// ─────────────────────────────────────────────
const helpDefense: Play = {
  id: 'help-defense',
  name: 'Help Defense',
  description: 'Man-to-man defense with proper help rotations. When the ball penetrates, weak-side defenders rotate to stop the drive.',
  type: 'defense',
  steps: [
    {
      label: 'Step 1 · Man-to-Man Setup',
      description: 'Each defender guards their assigned player. Ball is at the top with the PG. Defenders are in deny/gap positions.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 1, toX: 195, toY: 235, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Drive Penetration',
      description: 'PG beats D1 off the dribble and drives into the lane. D5 must help! D4 rotates to replace D5.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 195, y: 235, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 255 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 10, toX: 160, toY: 248, type: 'run' },
        { playerId: 9,  toX: 118, toY: 310, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Help Rotation',
      description: 'D5 steps up to take the charge / cut off the drive. D4 has rotated down to cover the vacated post. D1 sprints back to recover.',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 195, y: 235, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 210, y: 248 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 118, y: 310 },
        { id: 10, position: 'C', team: 'defense', x: 160, y: 248 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 10: Free Tactics Board (Sandbox)
// ─────────────────────────────────────────────
// A single-step play where every player can be dragged anywhere on the floor.
// Useful for drawing your own scheme on top of the standard 10-player layout.
const sandboxPlayers: PlayerState[] = [
  { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
  { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
  { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
  { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
  { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
  { id: 6, position: 'PG', team: 'defense', x: 480, y: 250 },
  { id: 7, position: 'SG', team: 'defense', x: 560, y: 158 },
  { id: 8, position: 'SF', team: 'defense', x: 670, y: 100 },
  { id: 9, position: 'PF', team: 'defense', x: 670, y: 400 },
  { id: 10, position: 'C', team: 'defense', x: 620, y: 250 },
];

const sandbox: Play = {
  id: 'sandbox',
  name: '🎨 Free Tactics Board',
  description: 'Drag any player anywhere on the court to design your own play. Use the reset button to restore the starting lineup.',
  type: 'sandbox',
  steps: [
    {
      label: 'Free Tactics Board',
      description: 'Click and drag any player to move them. There are no preset steps — sketch your own scheme. Hit Reset to restore the default lineup.',
      players: sandboxPlayers,
    },
  ],
};

export const plays: Play[] = [
  pickAndRoll,
  motionOffense,
  baselineCut,
  driveAndKick,
  backdoorCut,
  zoneDefense23,
  beatZoneHighPost,
  beatZoneBallSwing,
  helpDefense,
  sandbox,
];
