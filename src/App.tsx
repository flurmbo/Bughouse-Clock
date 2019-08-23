import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import ButtonTray from "./components/clock/ButtonTray";
import ChessClock from "./components/clock/ChessClock";
import ConfirmationDialog from "./components/ConfirmationDialog";
import SettingsMenu from "./components/settings/SettingsMenu";
import { GameState, IncrementType, IPreset, ISettings } from "./types";
import {
  getPresetById,
  getStoredPresets,
  getStoredSettings,
  savePresetsInLocalStorage,
  saveSettingsInLocalStorage,
} from "./utils";

interface IState {
  gameState: GameState;
  selectedPreset: IPreset;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
  resetDialogIsOpen: boolean;
  presets: IPreset[];
  settings: ISettings;
}

class App extends Component<any, IState> {
  public storedPresets = getStoredPresets();
  public storedSettings = getStoredSettings();
  public selectedPreset = getPresetById(
    this.storedSettings.selected,
    this.storedPresets,
  );
  public selectedTimerOptions = {};

  public state: IState = {
    gameState: GameState.NotStarted,
    presets: this.storedPresets,
    resetDialogIsOpen: false,
    settingsIsOpen: false,
    selectedPreset: this.selectedPreset,
    settings: this.storedSettings,
  };

  public componentDidUpdate() {
    if (this.state.numberOfComponentsDoneResetting === 6) {
      this.setState({
        gameState: GameState.NotStarted,
        numberOfComponentsDoneResetting: undefined,
      });
    }
  }

  public render() {
    const {
      gameState,
      settingsIsOpen,
      resetDialogIsOpen,
      presets,
      selectedPreset,
      settings,
    } = this.state;
    return (
      <div className="App">
        <ChessClock
          className="LeftClock"
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
          selectedPreset={selectedPreset}
          onThisComponentDoneResetting={this.onThisComponentDoneResetting}
        />
        <ButtonTray
          gameState={gameState}
          onResetGame={this.resetGame}
          onClickPauseButton={this.pauseGame}
          onClickSettingsButton={this.openSettings}
          openConfirmResetDialog={this.openConfirmResetDialog}
        />
        <ChessClock
          className="RightClock"
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
          selectedPreset={selectedPreset}
          onThisComponentDoneResetting={this.onThisComponentDoneResetting}
        />
        {settingsIsOpen && (
          <SettingsMenu
            open={settingsIsOpen}
            selectedPreset={selectedPreset.id}
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

  private updatePresets = (newPresets: IPreset[]) => {
    savePresetsInLocalStorage(newPresets);
    this.setState({ presets: newPresets });
  };
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

  private onStartGame = () => {
    this.setState({ gameState: GameState.InProgress });
  };

  private resetGame = () => {
    this.setState({ gameState: GameState.Resetting });
  };

  private pauseGame = () => {
    this.setState({ gameState: GameState.Paused });
  };

  private openSettings = () => {
    this.setState(state => ({ settingsIsOpen: !state.settingsIsOpen }));
  };

  private handleYes = () => {
    this.setState({ gameState: GameState.Resetting, resetDialogIsOpen: false });
  };

  private handleNo = () => {
    // do nothing
  };

  private closeSettings = () => {
    this.setState({ settingsIsOpen: false });
  };
  private openConfirmResetDialog = () => {
    this.pauseGame();
    this.setState({ resetDialogIsOpen: true });
  };

  private onTimesUp = () => {
    this.setState({ gameState: GameState.GameOver });
    const onTimesUpSound = new Audio("onTimesUp.mp3");
    onTimesUpSound.play();
  };

  private setSettings = (settings: Partial<ISettings>) => {
    this.setState(
      prevState => {
        return {
          settings: { ...prevState.settings, settings },
        };
      },
      () => {
        saveSettingsInLocalStorage(this.state.settings);
      },
    );
  };

  private setSelectedPreset = (presetId: string) => {
    this.setState(state => {
      return {
        selectedPreset: getPresetById(presetId, state.presets),
      };
    });
  };

  // private setTimerOptions = (
  //   newTimerOptions: Partial<ITimerOptions>,
  //   reset = true,
  // ) => {
  //   return () =>
  //     this.setState(state => ({
  //       gameState: reset ? GameState.Resetting : state.gameState,
  //       settingsIsOpen: !reset,
  //       timerOptions: { ...state.timerOptions, ...newTimerOptions },
  //     }));
  //   // tslint:disable-next-line: semicolon
  // };
}

export default App;
