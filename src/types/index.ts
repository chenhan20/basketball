export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type TeamType = 'offense' | 'defense';
export type MovementType = 'run' | 'cut' | 'screen';
export type PlayType = 'offense' | 'defense';

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
  players: PlayerState[];
  movements?: Movement[];
  passes?: Pass[];
}

export interface Play {
  id: string;
  name: string;
  description: string;
  type: PlayType;
  steps: PlayStep[];
}
