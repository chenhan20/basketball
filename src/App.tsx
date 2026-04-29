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
  const [transitionFromStep, setTransitionFromStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  // Drag overrides reset whenever a different play is selected.
  const [overrides, setOverrides] = useState<Overrides>({});

  const totalSteps = selectedPlay.steps.length;
  const isSandbox = selectedPlay.type === 'sandbox';

  const goToStep = useCallback(
    (step: number) => {
      const nextStep = Math.max(0, Math.min(step, totalSteps - 1));
      setAnimate(true);
      setTransitionFromStep(nextStep === currentStep ? null : currentStep);
      setCurrentStep(nextStep);
    },
    [currentStep, totalSteps],
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
    setTransitionFromStep(null);
    setCurrentStep(0);
    setOverrides({});
  };

  const handlePlayPause = () => setIsPlaying((p) => !p);

  const handleSelectPlay = (play: Play) => {
    setSelectedPlay(play);
    setIsPlaying(play.type !== 'sandbox');
    setAnimate(false);
    setTransitionFromStep(null);
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
          setTransitionFromStep(prev);
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
  const basePreviousStep =
    transitionFromStep === null ? undefined : selectedPlay.steps[transitionFromStep];
  const step = useMemo(
    () => applyOverrides(baseStep, overrides, currentStep),
    [baseStep, overrides, currentStep],
  );
  const previousStep = useMemo(
    () => (
      basePreviousStep === undefined || transitionFromStep === null
        ? undefined
        : applyOverrides(basePreviousStep, overrides, transitionFromStep)
    ),
    [basePreviousStep, overrides, transitionFromStep],
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
        <h1 className="header-title">
          Orange Team Tactics
          <span className="header-title-zh" lang="zh-Hant">橘隊戰術總覽</span>
        </h1>
        <span className="header-sub">
          Win keys, positions, SAFE, and three-lane fast break
          <span className="header-sub-zh" lang="zh-Hant">鎖死小G · 限制 Paul · 打快攻 · 防守回第一</span>
        </span>
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
          <section className="play-overview" aria-label="Selected play overview">
            <div>
              <p className="play-overview-kicker" lang="zh-Hant">目前教學</p>
              <h2 className="play-overview-title">
                {selectedPlay.nameZh ? (
                  <>
                    <span lang="zh-Hant">{selectedPlay.nameZh}</span>
                    <span>{selectedPlay.name}</span>
                  </>
                ) : (
                  selectedPlay.name
                )}
              </h2>
            </div>
            <div className="play-overview-copy">
              {selectedPlay.descriptionZh && (
                <p lang="zh-Hant">{selectedPlay.descriptionZh}</p>
              )}
              <p>{selectedPlay.description}</p>
            </div>
          </section>

          {/* Step info */}
          <div className="step-info">
            <h2 className="step-title">
              {step.labelZh ? (
                <>
                  <span lang="zh-Hant">{step.labelZh}</span>
                  <span className="step-title-en">{step.label}</span>
                </>
              ) : (
                step.label
              )}
            </h2>
            {step.descriptionZh && (
              <p className="step-desc step-desc-zh" lang="zh-Hant">
                {step.descriptionZh}
              </p>
            )}
            <p className="step-desc step-desc-en">{step.description}</p>
          </div>

          {/* Court */}
          <PlayAnimation
            step={step}
            previousStep={previousStep}
            animate={animate}
            playType={selectedPlay.type}
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
                  title="Reset all players to the starting layout / 重設所有球員回起始位置"
                  aria-label="Reset positions / 重設位置"
                >
                  ↺
                </button>
              </div>
              <span className="step-label">
                {hasOverridesForStep
                  ? 'Custom layout · drag players freely / 自訂陣型 · 自由拖曳球員'
                  : 'Drag any player to begin sketching / 拖曳任何球員開始繪製戰術'}
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
