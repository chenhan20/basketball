interface ControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export default function Controls({
  currentStep,
  totalSteps,
  isPlaying,
  onPrev,
  onNext,
  onPlayPause,
  onReset,
}: ControlsProps) {
  return (
    <div className="controls">
      <div className="controls-buttons">
        <button
          className="ctrl-btn"
          onClick={onReset}
          title="Reset to first step"
          aria-label="Reset"
        >
          ⏮
        </button>

        <button
          className="ctrl-btn"
          onClick={onPrev}
          disabled={currentStep === 0}
          title="Previous step"
          aria-label="Previous step"
        >
          ◀
        </button>

        <button
          className={`ctrl-btn play-btn ${isPlaying ? 'active' : ''}`}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          className="ctrl-btn"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          title="Next step"
          aria-label="Next step"
        >
          ▶
        </button>
      </div>

      <div className="step-indicator" aria-live="polite">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`step-dot ${i === currentStep ? 'active' : ''}`}
          />
        ))}
        <span className="step-label">
          Step {currentStep + 1} / {totalSteps}
        </span>
      </div>
    </div>
  );
}
