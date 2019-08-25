import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import ClockContainer from "./components/clock/ClockContainer";
import ConfirmationDialog from "./components/ConfirmationDialog";
import SettingsMenu from "./components/settings/SettingsMenu";
import { GameLifecycle, IncrementType, IPreset, ISettings } from "./types";

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
  resetDialogIsOpen: boolean;
  presets: IPreset[];
  settings: ISettings;
}

class App extends Component<any, IState> {
  public storedPresets = getStoredPresets();
  public storedSettings = getStoredSettings();

  public state: IState = {
    gameLifecycle: GameLifecycle.NotStarted,
    presets: this.storedPresets,
    resetDialogIsOpen: false,
    settingsIsOpen: false,
    settings: this.storedSettings,
  };

  public componentDidUpdate() {
    if (this.state.numberOfComponentsDoneResetting === 6) {
      this.setState({
        gameLifecycle: GameLifecycle.NotStarted,
        numberOfComponentsDoneResetting: undefined,
      });
    }
  }

  public render() {
    const {
      gameLifecycle,
      settingsIsOpen,
      resetDialogIsOpen,
      presets,
      settings,
    } = this.state;

    const selectedPreset =
      getPresetById(settings.selected, presets) || WEIRD_DEFAULT_PRESET;
    return (
      <div className="App">
        <ClockContainer
          gameLifecycle={gameLifecycle}
          setGameLifecycle={this.setGameLifecycle}
          selectedPreset={selectedPreset}
          onClickSettingsButton={this.openSettings}
          onClickPauseButton={this.pauseGame}
          openConfirmResetDialog={this.openConfirmResetDialog}
          onResetGame={() => {}}
          updateGameLifecycle={this.updateGameLifecycle}
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
        {resetDialogIsOpen && (
          <ConfirmationDialog
            open={resetDialogIsOpen}
            handleYes={this.handleYes}
            handleNo={this.handleNo}
            text={"Are you sure you want to reset the clock?"}
          />
        )}
      </div>
    );
  }

  private onThisComponentDoneResetting = () => {
    this.setState(
      state => ({
        numberOfComponentsDoneResetting: state.numberOfComponentsDoneResetting
          ? state.numberOfComponentsDoneResetting + 1
          : 1,
      }),
      () => {
        // tslint:disable-next-line:no-console
        console.log(
          "numberDoneResetting is",
          this.state.numberOfComponentsDoneResetting,
        );
      },
    );
  };

  private updateGameLifecycle = (gameLifecycle: GameLifecycle) => {
    this.setGameLifecycle(gameLifecycle);
  };

  private pauseGame = () => {
    this.setState({ gameLifecycle: GameLifecycle.Paused });
  };

  private setGameLifecycle = (gameLifecycle: GameLifecycle) => {
    this.setState({ gameLifecycle });
  };

  private handleYes = () => {
    this.setState({
      gameLifecycle: GameLifecycle.Resetting,
      resetDialogIsOpen: false,
    });
  };

  private handleNo = () => {
    // do nothing
  };

  private openConfirmResetDialog = () => {
    this.pauseGame();
    this.setState({ resetDialogIsOpen: true });
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

  private updatePresets = (newPresets: IPreset[]) => {
    savePresetsInLocalStorage(newPresets);
    this.setState({ presets: newPresets }, () => {
      const oldSelection = this.state.settings.selected;
      if (
        !this.state.presets.filter(preset => preset.id === oldSelection).length
      ) {
        this.setSelectedPreset(this.state.presets[0].id);
      }
    });
  };

  private closeSettings = () => {
    this.setState({ settingsIsOpen: false });
  };

  private openSettings = () => {
    this.setState(state => ({ settingsIsOpen: !state.settingsIsOpen }));
  };
}

export default App;
