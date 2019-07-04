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

export type Seconds = number;

export type Milliseconds = number;

export interface TimerOptions {
  delay: Seconds;
  startingTime: Seconds;
  fullScreen: boolean;
  singleTap: boolean;
}

export interface Preset {
  text: string;
  delay: number;
  startingTime: number;
  id: string;
}
