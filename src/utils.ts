import { v4 as uuid } from "uuid";
import { IPreset, Seconds, Side } from "./types";

declare let window: any;
const LOCAL_STORAGE_ITEM = "bughouseTimerPresets";
const DEFAULT_PRESETS: IPreset[] = [
  { text: "5|5", delay: 5, startingTime: 5 * 60, id: uuid() },
  { text: "2|2", delay: 2, startingTime: 2 * 60, id: uuid() },
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

export {
  toDurationString,
  otherSide,
  isCordova,
  getStoredPresets,
  savePresetsInLocalStorage,
};
