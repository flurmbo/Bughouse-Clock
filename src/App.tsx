import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import ButtonTray from "./components/clock/ButtonTray";
import ChessClock from "./components/clock/ChessClock";
import ConfirmationDialog from "./components/ConfirmationDialog";
import SettingsMenu from "./components/settings/SettingsMenu";
import { GameState, IPreset, ITimerOptions } from "./types";
import { getStoredPresets, savePresetsInLocalStorage } from "./utils";

const OPTIONS: ITimerOptions = {
  delay: 5,
  fullScreen: false,
  singleTap: false,
  startingTime: 5 * 60,
};

interface IState {
  gameState: GameState;
  timerOptions: ITimerOptions;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
  resetDialogIsOpen: boolean;
  presets: IPreset[];
}

class App extends Component<any, IState> {
  public state: IState = {
    gameState: GameState.NotStarted,
    presets: getStoredPresets(),
    resetDialogIsOpen: false,
    settingsIsOpen: false,
    timerOptions: OPTIONS,
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
      timerOptions,
      settingsIsOpen,
      resetDialogIsOpen,
      presets,
    } = this.state;
    return (
      <div className="App">
        <ChessClock
          className="LeftClock"
          options={timerOptions}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
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
          options={timerOptions}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
          onThisComponentDoneResetting={this.onThisComponentDoneResetting}
        />
        <SettingsMenu
          open={settingsIsOpen}
          setTimerOptions={this.setTimerOptions}
          timerOptions={timerOptions}
          presets={presets}
          updatePresets={this.updatePresets}
          closeSettings={this.closeSettings}
        />
        <ConfirmationDialog
          open={resetDialogIsOpen}
          handleYes={this.handleYes}
          handleNo={this.handleNo}
          text={"Are you sure you want to reset the clock?"}
        />
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
    console.log("we handled no!");
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

  private setTimerOptions = (
    newTimerOptions: Partial<ITimerOptions>,
    reset = true,
  ) => {
    return () =>
      this.setState(state => ({
        gameState: reset ? GameState.Resetting : state.gameState,
        settingsIsOpen: !reset,
        timerOptions: { ...state.timerOptions, ...newTimerOptions },
      }));
  };
}

export default App;
