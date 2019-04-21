export enum Side {
    Top = "TOP",
    Bottom = "BOTTOM"
}

export type Seconds = number;

export type Milliseconds = number;

export interface TimerOptions {
  delay: Seconds;
  startingTime: Seconds;
};