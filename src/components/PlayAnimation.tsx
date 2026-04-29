import type { MovementType, PlayStep, PlayerState } from '../types';
import Court from './Court';
import Player from './Player';
import { ArrowDefs, MovementArrow, MovementPath, PassArrow, PassPath } from './Arrow';

const VIEWBOX_W = 940;
const VIEWBOX_H = 500;

interface PlayAnimationProps {
  step: PlayStep;
  previousStep?: PlayStep;
  animate: boolean;
  /** When provided, players become draggable and this is invoked with svg-space coords. */
  onPlayerDrag?: (id: number, x: number, y: number) => void;
  onPlayerDragEnd?: () => void;
}

export default function PlayAnimation({
  step,
  previousStep,
  animate,
  onPlayerDrag,
  onPlayerDragEnd,
}: PlayAnimationProps) {
  const offensePlayers = step.players.filter((p) => p.team === 'offense');
  const defensePlayers = step.players.filter((p) => p.team === 'defense');
  const draggable = !!onPlayerDrag;
  const transitionCue = animate && previousStep;
  const movedPlayers = transitionCue
    ? step.players
      .map((player) => {
        const previous = previousStep.players.find((p) => p.id === player.id);
        if (!previous) return null;
        const distance = Math.hypot(player.x - previous.x, player.y - previous.y);
        if (distance < 3) return null;
        return {
          player,
          previous,
          movementType: inferMovementType(previousStep, player, previous),
        };
      })
      .filter((item): item is {
        player: PlayerState;
        previous: PlayerState;
        movementType: MovementType;
      } => item !== null)
    : [];
  const ballTransition = transitionCue ? getBallTransition(previousStep.players, step.players) : null;

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

        {transitionCue ? (
          <>
            {/* Previous-position ghosts show where the action started. */}
            {movedPlayers.map(({ previous }) => (
              <PlayerGhost key={`ghost-${previous.id}`} player={previous} />
            ))}

            {/* Actual transition paths for the current step. */}
            {movedPlayers.map(({ player, previous, movementType }) => (
              <MovementPath
                key={`transition-${player.id}`}
                fromX={previous.x}
                fromY={previous.y}
                toX={player.x}
                toY={player.y}
                type={movementType}
                className="action-path action-path-move"
              />
            ))}

            {ballTransition && (
              <PassPath
                fromX={ballTransition.from.x}
                fromY={ballTransition.from.y}
                toX={ballTransition.to.x}
                toY={ballTransition.to.y}
                className="action-path action-path-pass"
              />
            )}
          </>
        ) : (
          <>
            {/* First step: show the planned next action as a preview. */}
            {step.movements?.map((m, i) => (
              <MovementArrow key={i} movement={m} players={step.players} className="preview-path" />
            ))}

            {step.passes?.map((p, i) => (
              <PassArrow key={i} pass={p} players={step.players} className="preview-path" />
            ))}
          </>
        )}

        {/* Defense players */}
        {defensePlayers.map((p) => (
          <Player
            key={p.id}
            player={p}
            animate={animate}
            draggable={draggable}
            onDrag={onPlayerDrag}
            onDragEnd={onPlayerDragEnd}
          />
        ))}

        {/* Offense players (rendered on top) */}
        {offensePlayers.map((p) => (
          <Player
            key={p.id}
            player={p}
            animate={animate}
            draggable={draggable}
            onDrag={onPlayerDrag}
            onDragEnd={onPlayerDragEnd}
          />
        ))}
      </svg>
    </div>
  );
}

function inferMovementType(
  previousStep: PlayStep,
  player: PlayerState,
  previous: PlayerState,
): MovementType {
  const authoredMovement = previousStep.movements?.find(
    (movement) =>
      movement.playerId === player.id &&
      Math.hypot(movement.toX - player.x, movement.toY - player.y) < 6,
  );
  if (authoredMovement) return authoredMovement.type;
  return player.team === 'defense' || previous.team === 'defense' ? 'run' : 'cut';
}

function getBallTransition(previousPlayers: PlayerState[], currentPlayers: PlayerState[]) {
  const from = previousPlayers.find((player) => player.hasBall);
  const to = currentPlayers.find((player) => player.hasBall);
  if (!from || !to || from.id === to.id) return null;
  return { from, to };
}

function PlayerGhost({ player }: { player: PlayerState }) {
  return (
    <g
      className="player-ghost"
      transform={`translate(${player.x}, ${player.y})`}
      aria-hidden="true"
    >
      <circle r={20} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight="700"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
      >
        {player.position}
      </text>
    </g>
  );
}
