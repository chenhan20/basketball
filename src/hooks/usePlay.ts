/**
 * usePlay
 * -------
 * Drives a `Play` through time using `playEngine.createRunner`. Returns
 * the current `Frame`, plus playback controls (play/pause/seek/speed).
 *
 * The engine is the source of truth for "what does this look like at
 * time t". This hook is the (small) React glue.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  compile,
  createRunner,
  frameAt,
  type Frame,
} from '../engine/playEngine';
import type { Play } from '../engine/types';

export interface UsePlayResult {
  frame: Frame;
  isPlaying: boolean;
  speed: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setSpeed: (s: number) => void;
  reset: () => void;
}

export function usePlay(playDef: Play): UsePlayResult {
  // Recompile only when the play changes.
  const compiled = useMemo(() => compile(playDef), [playDef]);

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(1);

  // Mutable refs so the runner doesn't need to be recreated on every
  // state change (which would otherwise reset the rAF loop).
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const runnerRef = useRef<ReturnType<typeof createRunner> | null>(null);

  // Recreate the runner whenever the play (and hence its duration) changes.
  useEffect(() => {
    runnerRef.current?.stop();
    const runner = createRunner({
      duration: compiled.total,
      // Speed is read on every tick via the ref so changing it doesn't
      // require restarting the runner.
      get speed() {
        return speedRef.current;
      },
      onTick: (t) => setTime(t),
      onEnd: () => setIsPlaying(false),
    });
    runnerRef.current = runner;
    return () => runner.stop();
  }, [compiled]);

  // Reset time when switching plays.
  useEffect(() => {
    setTime(0);
    setIsPlaying(false);
  }, [compiled]);

  const play = useCallback(() => {
    const runner = runnerRef.current;
    if (!runner) return;
    // If we're at the end, restart from 0.
    const startFrom = time >= compiled.total ? 0 : time;
    runner.start(startFrom);
    setIsPlaying(true);
  }, [time, compiled.total]);

  const pause = useCallback(() => {
    runnerRef.current?.stop();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const seek = useCallback((t: number) => {
    runnerRef.current?.stop();
    setIsPlaying(false);
    setTime(Math.max(0, Math.min(compiled.total, t)));
  }, [compiled.total]);

  const reset = useCallback(() => seek(0), [seek]);

  const setSpeed = useCallback((s: number) => setSpeedState(s), []);

  const frame = useMemo(() => frameAt(compiled, time), [compiled, time]);

  return {
    frame,
    isPlaying,
    speed,
    play,
    pause,
    toggle,
    seek,
    setSpeed,
    reset,
  };
}
