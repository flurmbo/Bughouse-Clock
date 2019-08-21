import { v4 as uuid } from "uuid";
import { IDuration, IPreset, Seconds, Side, IncrementType } from "./types";

declare let window: any;
const LOCAL_STORAGE_ITEM = "bughouseTimerPresets2";
const DEFAULT_PRESETS: IPreset[] = [
  {
    text: "5|5",
    increment: 5,
    startingTime: 5 * 60,
    incrementType: IncrementType.Delay,
    id: uuid(),
  },
  {
    text: "2|2",
    increment: 2,
    startingTime: 2 * 60,
    incrementType: IncrementType.Delay,
    id: uuid(),
  },
];
function toDurationString(seconds: Seconds): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function otherSide(side: Side) {
  return side === Side.Top ? Side.Bottom : Side.Top;
}

function isCordova() {
  return !!window.cordova;
}

function getStoredPresets(): IPreset[] {
  const data = localStorage.getItem(LOCAL_STORAGE_ITEM);
  if (data) {
    return JSON.parse(data);
  } else {
    return DEFAULT_PRESETS;
  }
}

function savePresetsInLocalStorage(presets: IPreset[]) {
  localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(presets));
}

function secondsToDuration(secs: number): IDuration {
  const hours = Math.floor(secs / 3600);
  const remainder = secs - hours * 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder - minutes * 60;
  return { hours, minutes, seconds };
}

function durationToSeconds({ hours, minutes, seconds }: IDuration): number {
  return hours * 3600 + minutes * 60 + seconds;
}

export {
  toDurationString,
  otherSide,
  isCordova,
  getStoredPresets,
  savePresetsInLocalStorage,
  secondsToDuration,
  durationToSeconds,
};
