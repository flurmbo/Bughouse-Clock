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
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ITurnState {
  left: Side | undefined;
  right: Side | undefined;
}
