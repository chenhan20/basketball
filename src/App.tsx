import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { plays } from './data/plays';
import type { Play, PlayStep, PlayerState } from './types';
import PlayAnimation from './components/PlayAnimation';
import PlaySelector from './components/PlaySelector';
import Controls from './components/Controls';

const AUTO_PLAY_INTERVAL = 1800; // ms between steps

/** Per-player position override, keyed by `${stepIndex}:${playerId}`. */
type Overrides = Record<string, { x: number; y: number }>;

function applyOverrides(step: PlayStep, overrides: Overrides, stepIndex: number): PlayStep {
  let changed = false;
  const players: PlayerState[] = step.players.map((p) => {
    const o = overrides[`${stepIndex}:${p.id}`];
    if (!o) return p;
    changed = true;
    return { ...p, x: o.x, y: o.y };
  });
  return changed ? { ...step, players } : step;
}

function App() {
  const [selectedPlay, setSelectedPlay] = useState<Play>(plays[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  // Drag overrides reset whenever a different play is selected.
  const [overrides, setOverrides] = useState<Overrides>({});

  const totalSteps = selectedPlay.steps.length;
  const isSandbox = selectedPlay.type === 'sandbox';

  const goToStep = useCallback(
    (step: number) => {
      setAnimate(true);
      setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
    },
    [totalSteps],
  );

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, totalSteps, goToStep]);

  const handlePrev = () => goToStep(currentStep - 1);

  const handleReset = () => {
    setIsPlaying(false);
    setAnimate(false);
    setCurrentStep(0);
    setOverrides({});
  };

  const handlePlayPause = () => setIsPlaying((p) => !p);

  const handleSelectPlay = (play: Play) => {
    setSelectedPlay(play);
    setIsPlaying(false);
    setAnimate(false);
    setCurrentStep(0);
    setOverrides({});
  };

  // Auto-play timer (disabled in sandbox mode).
  useEffect(() => {
    if (!isPlaying || isSandbox) return;
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          setAnimate(true);
          return prev + 1;
        }
        setIsPlaying(false);
        return prev;
      });
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying, totalSteps, isSandbox]);

  // Update a player's position from a drag interaction.
  const handlePlayerDrag = useCallback(
    (id: number, x: number, y: number) => {
      // Disable transitions for instantaneous tracking while dragging.
      setAnimate(false);
      setOverrides((prev) => ({ ...prev, [`${currentStep}:${id}`]: { x, y } }));
    },
    [currentStep],
  );

  // Clear overrides for the current step (used in sandbox / per-step reset).
  const handleResetPositions = () => {
    setAnimate(true);
    setOverrides((prev) => {
      const next: Overrides = {};
      for (const k of Object.keys(prev)) {
        if (!k.startsWith(`${currentStep}:`)) next[k] = prev[k];
      }
      return next;
    });
  };

  const baseStep = selectedPlay.steps[currentStep];
  const step = useMemo(
    () => applyOverrides(baseStep, overrides, currentStep),
    [baseStep, overrides, currentStep],
  );
  const hasOverridesForStep = useMemo(
    () => Object.keys(overrides).some((k) => k.startsWith(`${currentStep}:`)),
    [overrides, currentStep],
  );

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <span className="header-icon">🏀</span>
        <h1 className="header-title">Basketball Tactics</h1>
        <span className="header-sub">Visualize plays &amp; rotations · drag any player</span>
      </header>

      {/* ── Main layout ── */}
      <div className="app-body">
        {/* Left sidebar */}
        <PlaySelector
          plays={plays}
          selectedPlayId={selectedPlay.id}
          onSelect={handleSelectPlay}
        />

        {/* Right content */}
        <main className="main-content">
          {/* Step info */}
          <div className="step-info">
            <h2 className="step-title">{step.label}</h2>
            <p className="step-desc">{step.description}</p>
          </div>

          {/* Court */}
          <PlayAnimation
            step={step}
            animate={animate}
            onPlayerDrag={handlePlayerDrag}
            onPlayerDragEnd={() => setAnimate(true)}
          />

          {/* Controls */}
          {isSandbox ? (
            <div className="controls">
              <div className="controls-buttons">
                <button
                  className="ctrl-btn play-btn"
                  onClick={handleResetPositions}
                  disabled={!hasOverridesForStep}
                  title="Reset all players to the starting layout"
                  aria-label="Reset positions"
                >
                  ↺
                </button>
              </div>
              <span className="step-label">
                {hasOverridesForStep
                  ? 'Custom layout · drag players freely'
                  : 'Drag any player to begin sketching'}
              </span>
            </div>
          ) : (
            <Controls
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              onPrev={handlePrev}
              onNext={handleNext}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              hasOverrides={hasOverridesForStep}
              onResetPositions={handleResetPositions}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
