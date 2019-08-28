import { v4 as uuid } from "uuid";
import {
  IDuration,
  IncrementType,
  IPreset,
  ISettings,
  Seconds,
  Side,
} from "./types";

declare let window: any;
const LOCAL_STORAGE_PRESETS_ITEM = "bughouseTiasdfmerPresets17";
const LOCAL_STORAGE_SETTINGS_ITEM = "bughouseTimerSelectes1sss7";
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

const DEFAULT_SETTINGS = {
  selected: DEFAULT_PRESETS[0].id,
  fullScreen: false,
  singleTap: false,
};
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
  const data = localStorage.getItem(LOCAL_STORAGE_PRESETS_ITEM);
  if (data) {
    return JSON.parse(data);
  } else {
    return DEFAULT_PRESETS;
  }
}

function savePresetsInLocalStorage(presets: IPreset[]) {
  const namedPresets = presets.filter(preset => preset.text);
  localStorage.setItem(
    LOCAL_STORAGE_PRESETS_ITEM,
    JSON.stringify(namedPresets),
  );
}

function getStoredSettings(): ISettings {
  const data = localStorage.getItem(LOCAL_STORAGE_SETTINGS_ITEM);
  if (data) {
    return JSON.parse(data);
  } else {
    return DEFAULT_SETTINGS;
  }
}

function saveSettingsInLocalStorage(settings: ISettings) {
  localStorage.setItem(LOCAL_STORAGE_SETTINGS_ITEM, JSON.stringify(settings));
}

function secondsToDuration(secs: number): IDuration {
  const hours = Math.floor(secs / 3600);
  const remainder = secs - hours * 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder - minutes * 60;
  return { hours, minutes, seconds };
}

function durationToSeconds({ hours, minutes, seconds }: IDuration): number {
  return (hours || 0) * 3600 + minutes * 60 + seconds;
}

function getPresetById(id: string, presets: IPreset[]): IPreset | undefined {
  const foundPreset = presets.find(preset => preset.id === id);
  return foundPreset;
}

export const WEIRD_DEFAULT_PRESET = {
  text: "lololo",
  increment: 100,
  incrementType: IncrementType.Delay,
  startingTime: 9999,
  id: "hymynameis",
};

export const sideToIdentifier = (side: Side): "top" | "bottom" => {
  return side === Side.Top ? "top" : "bottom";
};

export {
  toDurationString,
  otherSide,
  isCordova,
  getStoredPresets,
  savePresetsInLocalStorage,
  getStoredSettings,
  saveSettingsInLocalStorage,
  secondsToDuration,
  durationToSeconds,
  getPresetById,
};
