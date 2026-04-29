import type { Play } from '../types';

// Court dimensions: 940 x 500 (94ft x 50ft, 10px = 1ft)
// Left basket at (52.5, 250), Right basket at (887.5, 250)
// Offense attacks LEFT basket in these plays

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
      label: 'Initial Setup',
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
      label: 'Screen Set',
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
      label: 'PG Uses Screen',
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
      label: 'Finish',
      description: 'PG has penetrated into the paint. C is rolling to the basket. Defender D5 must choose: stay with C or help on PG.',
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
      label: 'Horns Setup',
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
      label: 'Drive Right',
      description: 'PG attacks the right elbow off PF\'s shoulder. PF flares to the three-point line. SF cuts to the weak-side elbow.',
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
      label: 'Kick-out or Finish',
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
      label: 'Corner Three',
      description: 'SG receives the kick-out pass. D7 has collapsed helping on the drive, leaving SG open for the corner three.',
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
// Play 3: 2-3 Zone Defense
// ─────────────────────────────────────────────
const zoneDefense23: Play = {
  id: 'zone-defense-2-3',
  name: '2-3 Zone Defense',
  description: 'A 2-3 zone with two guards up top and three players along the baseline. The zone shifts as the offense moves the ball.',
  type: 'defense',
  steps: [
    {
      label: '2-3 Zone Set',
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
      label: 'Ball Swings to Wing',
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
      label: 'Corner Rotation',
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
// Play 4: Man-to-Man Help Defense
// ─────────────────────────────────────────────
const helpDefense: Play = {
  id: 'help-defense',
  name: 'Help Defense',
  description: 'Man-to-man defense with proper help rotations. When the ball penetrates, weak-side defenders rotate to stop the drive.',
  type: 'defense',
  steps: [
    {
      label: 'Man-to-Man Setup',
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
      label: 'Drive Penetration',
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
      label: 'Help Rotation',
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

export const plays: Play[] = [pickAndRoll, motionOffense, zoneDefense23, helpDefense];
