export enum Side {
  Top = "TOP",
  Bottom = "BOTTOM",
}

export enum GameLifecycle {
  NotStarted = "NOT_STARTED",
  Paused = "PAUSED",
  InProgress = "IN_PROGRESS",
  GameOver = "GAME_OVER",
  Resetting = "RESETTING",
}

export enum IncrementType {
  Fischer = "FISCHER",
  Delay = "DELAY",
  None = "NONE",
}

export type Seconds = number;

export type Milliseconds = number;

export interface IPreset {
  text: string;
  increment: number;
  incrementType: IncrementType;
  startingTime: number;
  id: string;
}

export interface ISettings {
  selected: string;
  fullScreen: boolean;
  singleTap: boolean;
}

export interface IDuration {
  hours?: number;
  minutes: number;
  seconds: number;
}

export interface IClockState {
  side: Side | undefined;
  turnStartTime: number | undefined;
  flagged: Side | undefined;
  time: {
    top: number;
    bottom: number;
  };
}
export interface IGameState {
  left: IClockState;
  right: IClockState;
}
