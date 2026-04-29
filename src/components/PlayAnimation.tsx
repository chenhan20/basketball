import type { CourtView, MovementType, PlayStep, PlayerState, PlayType } from '../types';
import Court from './Court';
import Player from './Player';
import { ArrowDefs, MovementArrow, MovementPath, PassArrow, PassPath } from './Arrow';

const VIEWBOX_W = 470;
const FULL_VIEWBOX_W = VIEWBOX_W * 2;
const VIEWBOX_H = 500;
// Half-court coordinate units (470 x 500): ignore sub-3px movements, which are visually indistinguishable at normal zoom.
const MIN_VISIBLE_MOVEMENT = 3;
// Half-court coordinate units (470 x 500): authored arrows are hand-positioned, so allow a 6px matching tolerance.
const MOVEMENT_MATCH_THRESHOLD = 6;

interface PlayAnimationProps {
  step: PlayStep;
  previousStep?: PlayStep;
  animate: boolean;
  playType?: PlayType;
  courtView?: CourtView;
  /** When provided, players become draggable and this is invoked with svg-space coords. */
  onPlayerDrag?: (id: number, x: number, y: number) => void;
  onPlayerDragEnd?: () => void;
}

export default function PlayAnimation({
  step,
  previousStep,
  animate,
  playType,
  courtView = 'half',
  onPlayerDrag,
  onPlayerDragEnd,
}: PlayAnimationProps) {
  const offensePlayers = step.players.filter((p) => p.team === 'offense');
  const defensePlayers = step.players.filter((p) => p.team === 'defense');
  const draggable = !!onPlayerDrag;
  const viewBoxW = courtView === 'full' ? FULL_VIEWBOX_W : VIEWBOX_W;

  // For offense plays show only offense arrows; for defense plays show only defense arrows.
  const teamFilter = (playerId: number) => {
    if (playType === 'offense') return step.players.find((p) => p.id === playerId)?.team === 'offense';
    if (playType === 'defense') return step.players.find((p) => p.id === playerId)?.team === 'defense';
    return true;
  };
  const filteredMovements = step.movements?.filter((m) => teamFilter(m.playerId));
  const filteredPasses = step.passes?.filter((p) => teamFilter(p.fromPlayerId) && teamFilter(p.toPlayerId));

  const isTransitioning = animate && previousStep;
  const movedPlayers = isTransitioning
    ? step.players
      .map((player) => {
        // In typed plays, only animate the relevant team's players.
        if (!teamFilter(player.id)) return null;
        const previous = previousStep.players.find((p) => p.id === player.id);
        if (!previous) return null;
        const distance = Math.hypot(player.x - previous.x, player.y - previous.y);
        if (distance < MIN_VISIBLE_MOVEMENT) return null;
        return {
          player,
          previous,
          movementType: inferMovementType(previousStep, player),
        };
      })
      .filter((item): item is {
        player: PlayerState;
        previous: PlayerState;
        movementType: MovementType;
      } => item !== null)
    : [];
  const ballTransition = isTransitioning
    ? getBallTransition(previousStep.players, step.players)
    : null;

  return (
    <div className="court-wrapper">
      <svg
        viewBox={`0 0 ${viewBoxW} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="court-svg"
        role="img"
        aria-label="Basketball court visualization"
      >
        <ArrowDefs />

        {/* Court */}
        <Court view={courtView} />

        {isTransitioning ? (
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
            {filteredMovements?.map((m, i) => (
              <MovementArrow key={i} movement={m} players={step.players} className="preview-path" />
            ))}

            {filteredPasses?.map((p, i) => (
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
  currentPlayer: PlayerState,
): MovementType {
  const authoredMovement = previousStep.movements?.find(
    (movement) =>
      movement.playerId === currentPlayer.id &&
      Math.hypot(movement.toX - currentPlayer.x, movement.toY - currentPlayer.y) <
        MOVEMENT_MATCH_THRESHOLD,
  );
  if (authoredMovement) return authoredMovement.type;
  return currentPlayer.team === 'defense' ? 'run' : 'cut';
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
      <circle
        r={20}
        fill="rgba(139, 148, 158, 0.12)"
        stroke="rgba(201, 209, 217, 0.8)"
        strokeWidth={2.5}
        strokeDasharray="5 4"
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight="700"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
        fill="#c9d1d9"
      >
        {player.position}
      </text>
    </g>
  );
}
