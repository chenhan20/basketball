export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type TeamType = 'offense' | 'defense';
export type MovementType = 'run' | 'cut' | 'screen' | 'dribble';
export type PlayType = 'offense' | 'defense' | 'sandbox';

export interface PlayerState {
  id: number;
  position: Position;
  team: TeamType;
  x: number;
  y: number;
  hasBall?: boolean;
}

export interface Movement {
  playerId: number;
  toX: number;
  toY: number;
  type: MovementType;
}

export interface Pass {
  fromPlayerId: number;
  toPlayerId: number;
}

export interface PlayStep {
  label: string;
  description: string;
  /** Optional Traditional Chinese label, shown beside the English label. */
  labelZh?: string;
  /** Optional Traditional Chinese description, shown beside the English description. */
  descriptionZh?: string;
  players: PlayerState[];
  movements?: Movement[];
  passes?: Pass[];
}

export interface Play {
  id: string;
  name: string;
  description: string;
  /** Optional Traditional Chinese name, shown beside the English name. */
  nameZh?: string;
  /** Optional Traditional Chinese description, shown beside the English description. */
  descriptionZh?: string;
  type: PlayType;
  steps: PlayStep[];
}
