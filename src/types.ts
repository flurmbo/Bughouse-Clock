export enum Side {
  Top = "TOP",
  Bottom = "BOTTOM",
}

export enum GameState {
  NotStarted = "NOT_STARTED",
  Paused = "PAUSED",
  InProgress = "IN_PROGRESS",
  GameOver = "GAME_OVER",
  Resetting = "RESETTING",
}

export enum IncrementType {
  Fischer = "FISCHER",
  Delay = "DELAY",
}

export type Seconds = number;

export type Milliseconds = number;

export interface ITimerOptions {
  increment: Seconds;
  incrementType: IncrementType;
  startingTime: Seconds;
  fullScreen: boolean;
  singleTap: boolean;
}

export interface IPreset {
  text: string;
  increment: number;
  incrementType: IncrementType;
  startingTime: number;
  id: string;
}

export interface IDuration {
  hours: number;
  minutes: number;
  seconds: number;
}
