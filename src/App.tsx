import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { plays } from './data/plays';
import type { Play } from './types';
import PlayAnimation from './components/PlayAnimation';
import PlaySelector from './components/PlaySelector';
import Controls from './components/Controls';

const AUTO_PLAY_INTERVAL = 1800; // ms between steps

function App() {
  const [selectedPlay, setSelectedPlay] = useState<Play>(plays[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);

  const totalSteps = selectedPlay.steps.length;

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
  };

  const handlePlayPause = () => setIsPlaying((p) => !p);

  const handleSelectPlay = (play: Play) => {
    setSelectedPlay(play);
    setIsPlaying(false);
    setAnimate(false);
    setCurrentStep(0);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
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
  }, [isPlaying, totalSteps]);

  const step = selectedPlay.steps[currentStep];

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <span className="header-icon">🏀</span>
        <h1 className="header-title">Basketball Tactics</h1>
        <span className="header-sub">Visualize plays &amp; rotations</span>
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
          <PlayAnimation step={step} animate={animate} />

          {/* Controls */}
          <Controls
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onPrev={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
