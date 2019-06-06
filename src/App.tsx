import React, { Component } from "react";
import "./App.css";
import ChessClock from "./ChessClock";
import ButtonTray from "./ButtonTray";
import SettingsMenu from "./SettingsMenu";
import { TimerOptions, GameState } from "./types";

const OPTIONS: TimerOptions = {
  delay: 5,
  startingTime: 5 * 60
};

interface IState {
  gameState: GameState;
  timerOptions: TimerOptions;
  settingsIsOpen: boolean;
  numberOfComponentsDoneResetting?: number;
}

class App extends Component<any, IState> {
  state: IState = {
    gameState: GameState.NotStarted,
    timerOptions: OPTIONS,
    settingsIsOpen: false
  };

  onTimesUp = () => {
    this.setState({ gameState: GameState.GameOver });
    const onTimesUpSound = new Audio("onTimesUp.mp3");
    onTimesUpSound.play();
  };

  onStartGame = () => {
    this.setState({ gameState: GameState.InProgress });
  };

  resetGame = () => {
    this.pauseGame();
    // TODO: open confirm dialog
    this.setState({ gameState: GameState.Resetting });
  };

  pauseGame = () => {
    this.setState({ gameState: GameState.Paused });
  };

  openSettings = () => {
    this.setState(state => ({ settingsIsOpen: !state.settingsIsOpen }));
  };

  setTimerOptions = (timerOptions: TimerOptions) => {
    return () =>
      this.setState({
        timerOptions,
        settingsIsOpen: false,
        gameState: GameState.NotStarted
      });
  };
  render() {
    const { gameState, timerOptions, settingsIsOpen } = this.state;
    return (
      <div className="App">
        <ChessClock
          className="LeftClock"
          options={timerOptions}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
        />
        <ButtonTray
          gameState={gameState}
          onClickResetButton={this.resetGame}
          onClickPauseButton={this.pauseGame}
          onClickSettingsButton={this.openSettings}
        />
        <ChessClock
          className="RightClock"
          options={timerOptions}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
        />
        <SettingsMenu
          open={settingsIsOpen}
          setTimerOptions={this.setTimerOptions}
        />
      </div>
    );
  }
}

export default App;
