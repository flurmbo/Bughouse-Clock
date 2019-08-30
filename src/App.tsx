import React, { Component } from "react";
import "./App.css";
import ClockContainer from "./components/clock/ClockContainer";
import SettingsMenu from "./components/settings/SettingsMenu";
import { GameLifecycle, IPreset, ISettings, PresetsAction } from "./types";

import {
  getPresetById,
  getStoredPresets,
  getStoredSettings,
  savePresetsInLocalStorage,
  saveSettingsInLocalStorage,
  WEIRD_DEFAULT_PRESET,
} from "./utils";

interface IState {
  gameLifecycle: GameLifecycle;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
  presets: IPreset[];
  settings: ISettings;
}

class App extends Component<any, IState> {
  public storedPresets = getStoredPresets();
  public storedSettings = getStoredSettings();

  public state: IState = {
    gameLifecycle: GameLifecycle.NotStarted,
    presets: this.storedPresets,
    settingsIsOpen: false,
    settings: this.storedSettings,
  };

  public render() {
    const { gameLifecycle, settingsIsOpen, presets, settings } = this.state;
    const selectedPreset =
      getPresetById(settings.selected, presets) || WEIRD_DEFAULT_PRESET;
    return (
      <div className="App">
        <ClockContainer
          gameLifecycle={gameLifecycle}
          setGameLifecycle={this.setGameLifecycle}
          selectedPreset={selectedPreset}
          openSettings={this.openSettings}
          updateGameLifecycle={this.updateGameLifecycle}
          singleTap={this.state.settings.singleTap}
        />
        {settingsIsOpen && (
          <SettingsMenu
            open={settingsIsOpen}
            selectedPreset={settings.selected}
            setSelectedPreset={this.setSelectedPreset}
            presets={presets}
            settings={settings}
            setSettings={this.setSettings}
            updatePresets={this.updatePresets}
            closeSettings={this.closeSettings}
          />
        )}
      </div>
    );
  }

  private updateGameLifecycle = (gameLifecycle: GameLifecycle) => {
    this.setGameLifecycle(gameLifecycle);
  };

  private setGameLifecycle = (gameLifecycle: GameLifecycle) => {
    this.setState({ gameLifecycle });
  };

  private onTimesUp = () => {
    this.setState({ gameLifecycle: GameLifecycle.GameOver });
    const onTimesUpSound = new Audio("onTimesUp.mp3");
    onTimesUpSound.play();
  };

  // ***** SETTINGS METHODS *****
  private setSettings = (settings: Partial<ISettings>) => {
    this.setState(
      prevState => {
        return {
          settings: { ...prevState.settings, ...settings },
        };
      },
      () => {
        saveSettingsInLocalStorage(this.state.settings);
      },
    );
  };

  private setSelectedPreset = (presetId: string) => {
    this.setState(
      state => {
        return {
          settings: { ...state.settings, ...{ selected: presetId } },
        };
      },
      () => {
        saveSettingsInLocalStorage(this.state.settings);
      },
    );
  };

  private updatePresets = (
    action: PresetsAction,
    payload: { preset: IPreset },
  ) => {
    // savePresetsInLocalStorage(newPresets);
    // this.setState({ presets: newPresets }, () => {
    //   const oldSelection = this.state.settings.selected;
    //   if (
    //     !this.state.presets.filter(preset => preset.id === oldSelection).length
    //   ) {
    //     this.setSelectedPreset(this.state.presets[0].id);
    //   }
    // });
    switch (action) {
      case PresetsAction.AddPreset:
        this.setState(
          prevState => {
            return { presets: [payload.preset, ...prevState.presets] };
          },
          () => {
            savePresetsInLocalStorage(this.state.presets);
            if (payload.preset.text) {
              this.setSelectedPreset(payload.preset.id);
            }
          },
        );
        break;
      case PresetsAction.EditPreset:
        this.setState(
          prevState => {
            return {
              presets: prevState.presets.map(preset => {
                if (preset.id !== payload.preset.id) {
                  return preset;
                } else {
                  return payload.preset;
                }
              }),
            };
          },
          () => {
            savePresetsInLocalStorage(this.state.presets);
            this.setSelectedPreset(payload.preset.id);
          },
        );
        break;
      case PresetsAction.DeletePreset:
        this.setState(
          prevState => {
            return {
              presets: prevState.presets.filter(
                preset => preset.id !== payload.preset.id,
              ),
            };
          },
          () => {
            savePresetsInLocalStorage(this.state.presets);
            if (
              !this.state.presets.filter(
                preset => preset.id === this.state.settings.selected,
              ).length
            ) {
              this.setSelectedPreset(this.state.presets[0].id);
            }
          },
        );
        break;
    }
  };

  private closeSettings = () => {
    this.setState({ settingsIsOpen: false });
  };

  private openSettings = () => {
    this.setState(state => ({ settingsIsOpen: !state.settingsIsOpen }));
  };
}

export default App;
