# 🏀 Basketball Tactics Visualizer

A single-page web app that animates basketball plays defined as JSON.
Built with **React + TypeScript + SVG** and driven by
`requestAnimationFrame` — no canvas, no setInterval, no animation libs.

## Features

- **Smooth player animation** — pure-function engine (`frameAt(play, t)`)
  driven by a single rAF loop, with per-movement easing curves
  (`cut`, `dribble`, `screen`, `straight`) and optional quadratic-Bezier
  control points for curved paths.
- **Defensive rotation logic** — first-class `help` / `recover` /
  `switch` actions in the play DSL. The engine maintains a live
  `defender → offensive player` assignment map shown on the court as
  dotted "guard lines".
- **JSON-defined plays** — drop a new file in `src/plays/` and you have
  a new tactic. Two are included:
  - `pick_and_roll.json` — high P&R with a defensive switch.
  - `zone_defense.json` — 2-3 zone with help & recover on a skip pass.
- **Single-page explainer** — narration, coaching points, step
  counter, transport bar (play / pause / scrub / 0.5×–2× speed),
  legend.

## Architecture

```
src/
├── components/
│   ├── Court.tsx            ← SVG half-court (lines, arcs, rim)
│   ├── Player.tsx           ← Animated SVG player chip
│   ├── Path.tsx             ← Trajectory line / arrow / screen cap
│   └── court-geometry.ts    ← feet ↔ pixel conversion
├── engine/
│   ├── playEngine.ts        ← Pure animation core (compile + frameAt + rAF runner)
│   └── types.ts             ← Play / Step / Movement / DefensiveAction
├── hooks/
│   └── usePlay.ts           ← React glue around the engine
├── plays/
│   ├── pick_and_roll.json
│   └── zone_defense.json
├── App.tsx                  ← Single-page UI
├── main.tsx
└── styles.css
```

### The engine (`playEngine.ts`)

`compile(play)` walks the script once, producing per-step start/end
positions and the assignment map after each step's defensive actions.
Each rAF tick then calls `frameAt(compiled, t)` which is `O(players)`
and allocates only the returned frame object — no scanning the script,
no allocations per move.

The runner is just a thin rAF wrapper that exposes `start`/`stop` and
calls `onTick(time)` with a wall-clock-derived seconds value, so
playback speed is independent of frame rate.

### Defining a play

```json
{
  "id": "my_play",
  "name": "My Play",
  "category": "offense",
  "description": "...",
  "coaching": ["Step 1: ...", "Step 2: ..."],
  "players": [
    { "id": "o1", "team": "offense", "role": "PG", "label": "1",
      "start": { "x": 25, "y": 30 } }
  ],
  "steps": [
    {
      "duration": 1.5,
      "note": "1 attacks the gap.",
      "moves": [
        { "player": "o1", "to": { "x": 20, "y": 18 },
          "curve": "dribble", "control": { "x": 23, "y": 26 } }
      ],
      "actions": [
        { "kind": "switch", "defenderA": "d1", "defenderB": "d5" }
      ]
    }
  ]
}
```

Coordinates are in **feet** with the origin at the bottom-left of an
NBA half-court (50 ft × 47 ft). The Y axis points up the floor, away
from the baseline.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```
