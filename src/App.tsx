import React, { Component } from "react";
import "./App.css";
import ChessClock from "./components/clock/ChessClock";
import ButtonTray from "./components/clock/ButtonTray";
import SettingsMenu from "./components/settings/SettingsMenu";
import { TimerOptions, GameState, Preset } from "./types";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { v4 as uuid } from "uuid";

const OPTIONS: TimerOptions = {
  delay: 5,
  startingTime: 5 * 60,
  fullScreen: false,
  singleTap: false,
};
const STARTING_PRESETS: Preset[] = [
  { text: "5|5", delay: 5, startingTime: 5 * 60, id: uuid() },
  { text: "2|2", delay: 2, startingTime: 2 * 60, id: uuid() },
];
interface IState {
  gameState: GameState;
  timerOptions: TimerOptions;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
  resetDialogIsOpen: boolean;
  presets: Preset[];
}

class App extends Component<any, IState> {
  state: IState = {
    gameState: GameState.NotStarted,
    timerOptions: OPTIONS,
    settingsIsOpen: false,
    resetDialogIsOpen: false,
    presets: STARTING_PRESETS,
  };

  onTimesUp = () => {
    this.setState({ gameState: GameState.GameOver });
    const onTimesUpSound = new Audio("onTimesUp.mp3");
    onTimesUpSound.play();
  };
  updatePresets = (newPresets: Preset[]) => {
    this.setState({ presets: newPresets });
  };
  onThisComponentDoneResetting = () => {
    this.setState(
      state => ({
        numberOfComponentsDoneResetting: state.numberOfComponentsDoneResetting
          ? state.numberOfComponentsDoneResetting + 1
          : 1,
      }),
      () => {
        console.log(
          "numberDoneResetting is",
          this.state.numberOfComponentsDoneResetting
        );
      }
    );
  };

  onStartGame = () => {
    this.setState({ gameState: GameState.InProgress });
  };

  resetGame = () => {
    this.setState({ gameState: GameState.Resetting });
  };

  pauseGame = () => {
    this.setState({ gameState: GameState.Paused });
  };

  openSettings = () => {
    this.setState(state => ({ settingsIsOpen: !state.settingsIsOpen }));
  };

  handleYes = () => {
    this.setState({ gameState: GameState.Resetting, resetDialogIsOpen: false });
  };

  handleNo = () => {};

  closeSettings = () => {
    this.setState({ settingsIsOpen: false });
  };
  openConfirmResetDialog = () => {
    this.pauseGame();
    this.setState({ resetDialogIsOpen: true });
  };
  setTimerOptions = (newTimerOptions: Partial<TimerOptions>, reset = true) => {
    return () =>
      this.setState(state => ({
        timerOptions: { ...state.timerOptions, ...newTimerOptions },
        settingsIsOpen: !reset,
        gameState: reset ? GameState.Resetting : state.gameState,
      }));
  };

  componentDidUpdate() {
    if (this.state.timerOptions.fullScreen) {
    }
    if (this.state.numberOfComponentsDoneResetting === 6) {
      this.setState({
        numberOfComponentsDoneResetting: undefined,
        gameState: GameState.NotStarted,
      });
    }
  }

  render() {
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
}

export default App;
