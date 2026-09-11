import { useState, useEffect, useCallback, useRef } from 'react';
import type { Play } from '../types';
import { SIMPLE_PLAYS } from '../data/simplePlays';
import { POST_PLAYS } from '../data/postPlays';
import { SHOOTER_PLAYS } from '../data/shooterPlays';
import PlayAnimation from './PlayAnimation';
import Court3D from './Court3D';

export default function PostTacticsBoard() {
  const [playCategory, setPlayCategory] = useState<'simple' | 'post' | 'shooter'>('simple');
  const [selectedPlayId, setSelectedPlayId] = useState<string>(SIMPLE_PLAYS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 1 = normal (2200ms), 1.5 = fast (1500ms)
  const [viewDimension, setViewDimension] = useState<'3d' | '2d'>('3d');
  const timerRef = useRef<number | null>(null);

  const currentPlayList =
    playCategory === 'simple'
      ? SIMPLE_PLAYS
      : playCategory === 'post'
      ? POST_PLAYS
      : SHOOTER_PLAYS;

  const activePlay: Play = currentPlayList.find((p) => p.id === selectedPlayId) || currentPlayList[0];
  const totalSteps = activePlay.steps.length;
  const currentStep = activePlay.steps[currentStepIndex];
  const previousStep = currentStepIndex > 0 ? activePlay.steps[currentStepIndex - 1] : undefined;

  // Change play
  const handleSelectPlay = (id: string) => {
    setSelectedPlayId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < totalSteps - 1) return prev + 1;
      return 0; // loop
    });
  }, [totalSteps]);

  const handlePrev = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(2300 / playSpeed);
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            return 0; // loop back to step 1
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, playSpeed, totalSteps]);

  const getHeading = () => {
    if (playCategory === 'simple') return '極簡必勝實戰戰術模擬器';
    if (playCategory === 'post') return '低位傳接動態推演模擬器';
    return '45 度射手無球跑位模擬器';
  };

  const getSubtext = () => {
    if (playCategory === 'simple') {
      return '越簡單越致命！精選 5 套最容易上手、只需 2-3 步即可在實戰或街頭打球立刻得分的王道戰術。支援 3D 自由旋轉與 2D 俯瞰切換！';
    }
    if (playCategory === 'post') {
      return '精確模擬側翼傳球角度、中鋒卡位封鎖點 (Seal Point)、目標手 (Target Hand) 與擊地彈跳點 (Bounce Point)。支援 3D 自由旋轉與後衛主觀視角！';
    }
    return '專為靈活射手打造：利用急停減速 (Deceleration)、貼身擦過掩護與 0.45 秒快速出手，撕裂對手防線！';
  };

  return (
    <div className="post-tactics-section">
      {/* Header Banner */}
      <div className="tactics-header-block">
        <div className="tactics-title-wrap">
          <span className="section-pill">🏀 互動戰術板 Interactive Board</span>
          <h2 className="tactics-heading">{getHeading()}</h2>
          <p className="tactics-subtext">{getSubtext()}</p>
        </div>

        {/* Category Toggle Bar */}
        <div className="board-category-switcher">
          <button
            className={`cat-tab-btn ${playCategory === 'simple' ? 'active' : ''}`}
            onClick={() => {
              setPlayCategory('simple');
              setSelectedPlayId(SIMPLE_PLAYS[0].id);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
          >
            ⚡ 極簡必勝戰術 (5 套)
          </button>

          <button
            className={`cat-tab-btn ${playCategory === 'post' ? 'active' : ''}`}
            onClick={() => {
              setPlayCategory('post');
              setSelectedPlayId(POST_PLAYS[0].id);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
          >
            🏀 低位餵球與卡位 (5 套)
          </button>

          <button
            className={`cat-tab-btn ${playCategory === 'shooter' ? 'active' : ''}`}
            onClick={() => {
              setPlayCategory('shooter');
              setSelectedPlayId(SHOOTER_PLAYS[0].id);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
          >
            🎯 45° 射手跑位 (4 套)
          </button>
        </div>

        {/* Play Picker Pills */}
        <div className="play-pills-scroll">
          {currentPlayList.map((play, idx) => {
            const isActive = play.id === activePlay.id;
            return (
              <button
                key={play.id}
                onClick={() => handleSelectPlay(play.id)}
                className={`play-pill-btn ${isActive ? 'active' : ''}`}
              >
                <span className="pill-num">0{idx + 1}</span>
                <span className="pill-title">{play.nameZh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Board Grid */}
      <div className="tactics-board-grid">
        {/* Left: 3D or 2D Basketball Court */}
        <div className="tactics-court-container">
          <div className="court-top-badge">
            <div className="court-badge-left">
              <span className="live-indicator">
                <span className="pulse-dot"></span>
                {isPlaying ? '戰術推演中 AUTO PLAY' : '單步解說模式 STEP MODE'}
              </span>
              <span className="court-play-name">{activePlay.nameZh}</span>
            </div>

            {/* 2D / 3D Dimension Switcher */}
            <div className="dimension-toggle-pill">
              <button
                className={`dim-btn ${viewDimension === '3d' ? 'active' : ''}`}
                onClick={() => setViewDimension('3d')}
              >
                🏀 3D 實景
              </button>
              <button
                className={`dim-btn ${viewDimension === '2d' ? 'active' : ''}`}
                onClick={() => setViewDimension('2d')}
              >
                📋 2D 戰術板
              </button>
            </div>
          </div>

          <div className="court-inner-box">
            {viewDimension === '3d' ? (
              <Court3D
                step={currentStep}
                previousStep={previousStep}
                animate={true}
                isPlaying={isPlaying}
              />
            ) : (
              <PlayAnimation
                step={currentStep}
                previousStep={previousStep}
                animate={true}
                playType="offense"
                courtView="half"
              />
            )}
          </div>

          {/* Quick Annotation Legend */}
          <div className="court-legend">
            <div className="legend-item">
              <span className="legend-icon target-icon">🎯</span>
              <span>目標手 (Target Hand)</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon bounce-icon">🏀</span>
              <span>2/3 擊地點</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon seal-icon">🔒</span>
              <span>卡位鎖腳 (Seal Point)</span>
            </div>
            <div className="legend-item">
              <span className="legend-line pass-line"></span>
              <span>傳球路線 (Pass)</span>
            </div>
            <div className="legend-item">
              <span className="legend-line move-line"></span>
              <span>跑位空切 (Cut)</span>
            </div>
          </div>
        </div>

        {/* Right: Step Breakdown & Controls */}
        <div className="tactics-info-panel">
          {/* Controls Bar */}
          <div className="control-bar-modern">
            <div className="ctrl-buttons-group">
              <button
                className="ctrl-btn-primary"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? '暫停' : '播放戰術推演'}
              >
                <span className="btn-icon">{isPlaying ? '⏸' : '▶'}</span>
                <span>{isPlaying ? '暫停' : '播放推演'}</span>
              </button>

              <button
                className="ctrl-btn-secondary"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                title="上一步"
              >
                ◀ 上一步
              </button>

              <button
                className="ctrl-btn-secondary"
                onClick={handleNext}
                title="下一步"
              >
                下一步 ▶
              </button>

              <button
                className="ctrl-btn-icon-only"
                onClick={handleReset}
                title="重置為第一步"
              >
                ⏮
              </button>
            </div>

            {/* Speed Toggle */}
            <div className="speed-toggle">
              <span className="speed-label">速度:</span>
              <button
                className={`speed-chip ${playSpeed === 1 ? 'active' : ''}`}
                onClick={() => setPlaySpeed(1)}
              >
                1.0x
              </button>
              <button
                className={`speed-chip ${playSpeed === 1.5 ? 'active' : ''}`}
                onClick={() => setPlaySpeed(1.5)}
              >
                1.5x
              </button>
            </div>
          </div>

          {/* Step Timeline Indicator */}
          <div className="step-timeline-container">
            <div className="timeline-dots">
              {activePlay.steps.map((_, idx) => (
                <button
                  key={idx}
                  className={`timeline-dot-btn ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setIsPlaying(false);
                  }}
                >
                  <span className="dot-circle">{idx + 1}</span>
                  <span className="dot-label">Step {idx + 1}</span>
                </button>
              ))}
            </div>
            <div
              className="timeline-progress-bar"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Current Step Detailed Card */}
          <div className="step-detail-card">
            <div className="card-step-header">
              <span className="badge-step-tag">Step {currentStepIndex + 1} of {totalSteps}</span>
              <h3 className="card-step-title">{currentStep.labelZh || currentStep.label}</h3>
              <p className="card-step-title-en">{currentStep.label}</p>
            </div>

            <div className="card-step-body">
              <p className="step-desc-zh">{currentStep.descriptionZh}</p>
              <p className="step-desc-en">{currentStep.description}</p>
            </div>

            {/* Tactical Pro Alert Note */}
            {currentStep.keyNoteZh && (
              <div className="tactical-callout">
                <div className="callout-icon">💡</div>
                <div className="callout-content">
                  <div className="callout-title">實戰教練叮嚀 (Coach's Note)</div>
                  <div className="callout-text">{currentStep.keyNoteZh}</div>
                </div>
              </div>
            )}
          </div>

          {/* Tactical Context Box */}
          <div className="tactics-meta-box">
            <div className="meta-row">
              <span className="meta-k">戰術核心理念:</span>
              <span className="meta-v">{activePlay.descriptionZh}</span>
            </div>
            <div className="meta-tags-list">
              <span className="tag-chip">#PassAwayFromDefender</span>
              <span className="tag-chip">#PostSeal</span>
              <span className="tag-chip">#TargetHand</span>
              <span className="tag-chip">#BounceFeed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
