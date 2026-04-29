import type { PlayStep } from '../types';
import Court from './Court';
import Player from './Player';
import { ArrowDefs, MovementArrow, PassArrow } from './Arrow';

const VIEWBOX_W = 940;
const VIEWBOX_H = 500;

interface PlayAnimationProps {
  step: PlayStep;
  animate: boolean;
}

export default function PlayAnimation({ step, animate }: PlayAnimationProps) {
  const offensePlayers = step.players.filter((p) => p.team === 'offense');
  const defensePlayers = step.players.filter((p) => p.team === 'defense');

  return (
    <div className="court-wrapper">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="court-svg"
        role="img"
        aria-label="Basketball court visualization"
      >
        <ArrowDefs />

        {/* Court */}
        <Court />

        {/* Movement arrows (under players) */}
        {step.movements?.map((m, i) => (
          <MovementArrow key={i} movement={m} players={step.players} />
        ))}

        {/* Pass arrows */}
        {step.passes?.map((p, i) => (
          <PassArrow key={i} pass={p} players={step.players} />
        ))}

        {/* Defense players */}
        {defensePlayers.map((p) => (
          <Player key={p.id} player={p} animate={animate} />
        ))}

        {/* Offense players (rendered on top) */}
        {offensePlayers.map((p) => (
          <Player key={p.id} player={p} animate={animate} />
        ))}
      </svg>
    </div>
  );
}
