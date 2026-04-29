/**
 * App
 * ---
 * Single-page tactic explainer.
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────────┐
 *   │  Header (title + play picker)                        │
 *   ├───────────────────────────┬──────────────────────────┤
 *   │  Court (SVG, animated)    │  Coaching panel          │
 *   │                           │   - description          │
 *   │                           │   - current step note    │
 *   │                           │   - active D-rotation    │
 *   │                           │   - bullet steps         │
 *   ├───────────────────────────┴──────────────────────────┤
 *   │  Transport (play / pause / scrub / speed)            │
 *   └──────────────────────────────────────────────────────┘
 */

import { useMemo, useState } from 'react';
import { Court } from './components/Court';
import { Path } from './components/Path';
import { Player } from './components/Player';
import { toSvg } from './components/court-geometry';
import type { Play } from './engine/types';
import { usePlay } from './hooks/usePlay';
import pickAndRoll from './plays/pick_and_roll.json';
import zoneDefense from './plays/zone_defense.json';

const PLAYS: Play[] = [pickAndRoll as Play, zoneDefense as Play];

export function App() {
  const [playId, setPlayId] = useState<string>(PLAYS[0].id);
  const playDef = useMemo(
    () => PLAYS.find((p) => p.id === playId) ?? PLAYS[0],
    [playId],
  );

  const {
    frame,
    isPlaying,
    speed,
    toggle,
    seek,
    setSpeed,
    reset,
  } = usePlay(playDef);

  const currentStep = playDef.steps[frame.stepIndex];

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>🏀 Basketball Tactics Visualizer</h1>
          <p className="subtitle">
            Animated, JSON-defined plays — built with React + SVG +{' '}
            <code>requestAnimationFrame</code>.
          </p>
        </div>
        <select
          aria-label="Choose a play"
          className="play-picker"
          value={playId}
          onChange={(e) => setPlayId(e.target.value)}
        >
          {PLAYS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.category === 'offense' ? '🔵' : '🔴'} {p.name}
            </option>
          ))}
        </select>
      </header>

      <main className="main">
        <section className="court-wrap" aria-label="Court visualization">
          <Court>
            {/* Trajectories for the currently active step. Anchored to
                the step's start position so the line stays put while
                the player moves along it. */}
            {currentStep.moves.map((m) => {
              const start = frame.stepStartPositions[m.player];
              if (!start) return null;
              return (
                <Path
                  key={`${frame.stepIndex}-${m.player}`}
                  from={start}
                  move={m}
                />
              );
            })}

            {/* Defensive assignment guard-lines. */}
            {Object.entries(frame.assignments).map(([defId, offId]) => {
              const d = frame.players[defId];
              const o = frame.players[offId];
              if (!d || !o) return null;
              const ds = toSvg(d.pos);
              const os = toSvg(o.pos);
              return (
                <line
                  key={`assign-${defId}`}
                  x1={ds.x}
                  y1={ds.y}
                  x2={os.x}
                  y2={os.y}
                  stroke="#d93025"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                />
              );
            })}

            {/* Players (offense first so defense draws on top of guard lines) */}
            {Object.values(frame.players).map((p) => (
              <Player key={p.id} player={p} highlight={p.moving} />
            ))}
          </Court>
        </section>

        <aside className="panel">
          <h2>{playDef.name}</h2>
          <p className="desc">{playDef.description}</p>

          <div className="step-now" aria-live="polite">
            <div className="step-label">
              Step {frame.stepIndex + 1} / {playDef.steps.length}
            </div>
            <div className="step-note">{frame.note ?? '—'}</div>
            {currentStep.actions && currentStep.actions.length > 0 && (
              <ul className="actions">
                {currentStep.actions.map((a, i) => (
                  <li key={i}>
                    <ActionBadge kind={a.kind} /> {describeAction(a)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h3>Coaching points</h3>
          <ol className="coaching">
            {playDef.coaching.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>

          <h3>Legend</h3>
          <ul className="legend">
            <li><span className="dot off" /> Offense</li>
            <li><span className="dot def" /> Defense</li>
            <li><span className="line dribble" /> Dribble</li>
            <li><span className="line cut" /> Cut / pass</li>
            <li><span className="line screen" /> Screen</li>
            <li><span className="line guard" /> Defensive assignment</li>
          </ul>
        </aside>
      </main>

      <footer className="transport">
        <button onClick={toggle} className="primary">
          {isPlaying ? 'Pause' : frame.time >= frame.total ? 'Replay' : 'Play'}
        </button>
        <button onClick={reset}>Reset</button>
        <input
          type="range"
          min={0}
          max={frame.total}
          step={0.05}
          value={frame.time}
          onChange={(e) => seek(parseFloat(e.target.value))}
          aria-label="Scrub timeline"
        />
        <span className="time">
          {frame.time.toFixed(1)}s / {frame.total.toFixed(1)}s
        </span>
        <label className="speed">
          Speed
          <select
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </label>
      </footer>
    </div>
  );
}

function ActionBadge({ kind }: { kind: 'help' | 'recover' | 'switch' }) {
  const cls = `badge badge-${kind}`;
  return <span className={cls}>{kind.toUpperCase()}</span>;
}

function describeAction(a: {
  kind: 'help' | 'recover' | 'switch';
  defender?: string;
  helpOn?: string;
  defenderA?: string;
  defenderB?: string;
}): string {
  switch (a.kind) {
    case 'help':
      return `${a.defender} leaves his man to help on ${a.helpOn}`;
    case 'recover':
      return `${a.defender} sprints back to his original assignment`;
    case 'switch':
      return `${a.defenderA} and ${a.defenderB} swap assignments`;
  }
}
