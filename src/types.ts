export enum Side {
  Top = "TOP",
  Bottom = "BOTTOM"
}

export enum GameState {
  NotStarted = "NOT_STARTED",
  Paused = "PAUSED",
  InProgress = "IN_PROGRESS",
  GameOver = "GAME_OVER"
}
export type Seconds = number;

export type Milliseconds = number;

export interface TimerOptions {
  delay: Seconds;
  startingTime: Seconds;
}
