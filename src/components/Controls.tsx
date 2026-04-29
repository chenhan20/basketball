interface ControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  /** When true, the per-step "reset positions" button is enabled. */
  hasOverrides?: boolean;
  /** Restore the current step's player positions to the original layout. */
  onResetPositions?: () => void;
}

export default function Controls({
  currentStep,
  totalSteps,
  isPlaying,
  onPrev,
  onNext,
  onPlayPause,
  onReset,
  hasOverrides = false,
  onResetPositions,
}: ControlsProps) {
  return (
    <div className="controls">
      <div className="controls-buttons">
        <button
          className="ctrl-btn"
          onClick={onReset}
          title="Reset to first step / 回到第一步"
          aria-label="Reset / 重置"
        >
          ⏮
        </button>

        <button
          className="ctrl-btn"
          onClick={onPrev}
          disabled={currentStep === 0}
          title="Previous step / 上一步"
          aria-label="Previous step / 上一步"
        >
          ◀
        </button>

        <button
          className={`ctrl-btn play-btn ${isPlaying ? 'active' : ''}`}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause / 暫停' : 'Auto-play animation / 自動播放動畫'}
          aria-label={isPlaying ? 'Pause / 暫停' : 'Auto-play / 自動播放'}
        >
          <span className="play-btn-icon">{isPlaying ? '⏸' : '▶'}</span>
          <span className="play-btn-text" lang="zh-Hant">{isPlaying ? '暫停' : '自動播放'}</span>
        </button>

        <button
          className="ctrl-btn"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          title="Next step / 下一步"
          aria-label="Next step / 下一步"
        >
          ▶
        </button>

        {onResetPositions && (
          <button
            className="ctrl-btn"
            onClick={onResetPositions}
            disabled={!hasOverrides}
            title="Reset dragged players on this step / 重設此步驟拖曳過的球員"
            aria-label="Reset player positions on this step / 重設此步驟球員位置"
          >
            ↺
          </button>
        )}
      </div>

      <div className="step-indicator" aria-live="polite">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`step-dot ${i === currentStep ? 'active' : ''}`}
          />
        ))}
        <span className="step-label">
          Step {currentStep + 1} / {totalSteps} · 第 {currentStep + 1} / {totalSteps} 步
        </span>
      </div>
    </div>
  );
}
