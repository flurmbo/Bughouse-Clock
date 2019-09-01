import React, { Component } from "react";
import "./App.css";
import ClockContainer from "./components/clock/ClockContainer";
import SettingsMenu from "./components/settings/SettingsMenu";
import WelcomeDialog from "./components/WelcomeDialog";
import { GameLifecycle, IPreset, ISettings, PresetsAction } from "./types";

import {
  getPresetById,
  getStoredPresets,
  getStoredSettings,
  isFirstUse,
  savePresetsInLocalStorage,
  saveSettingsInLocalStorage,
  WEIRD_DEFAULT_PRESET,
} from "./utils";

import Hammer from "hammerjs";

interface IState {
  gameLifecycle: GameLifecycle;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
  presets: IPreset[];
  settings: ISettings;
  welcomeDialogIsOpen: boolean;
  swipedRecently: boolean;
}

class App extends Component<any, IState> {
  public firstUse = isFirstUse();
  public storedPresets = getStoredPresets();
  public storedSettings = getStoredSettings();

  public state: IState = {
    gameLifecycle: GameLifecycle.NotStarted,
    presets: this.storedPresets,
    settingsIsOpen: false,
    settings: this.storedSettings,
    welcomeDialogIsOpen: this.firstUse,
    swipedRecently: false,
  };

  constructor(props: any) {
    super(props);
    const root = document.getElementById("root");
    if (root) {
      const hammer = new Hammer(root);
      hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
      hammer.on("swipe", e => {
        this.setState({ swipedRecently: true });
        window.setTimeout(() => {
          console.log("setting state");
          this.setState({ swipedRecently: false });
        }, 1000);
      });
    }
  }

  public render() {
    const {
      gameLifecycle,
      settingsIsOpen,
      presets,
      settings,
      welcomeDialogIsOpen,
    } = this.state;
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
          swipedRecently={this.state.swipedRecently}
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
        {welcomeDialogIsOpen && (
          <WelcomeDialog
            open={welcomeDialogIsOpen}
            setOpen={this.setWelcomeDialogIsOpen}
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

  private setWelcomeDialogIsOpen = (isOpen: boolean) => {
    this.setState({ welcomeDialogIsOpen: isOpen });
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
