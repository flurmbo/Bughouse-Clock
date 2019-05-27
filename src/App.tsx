import React, { Component } from 'react';
import './App.css';
import ChessClock from './ChessClock';
import ButtonTray from './ButtonTray';
import { TimerOptions, GameState } from './types';

const OPTIONS: TimerOptions = {
  delay: 5,
  startingTime: 5 * 60
}

interface IState {
  gameState: GameState;
  timerOptions: TimerOptions;
}

class App extends Component<any, IState> {
  state: IState = {
    gameState: GameState.NotStarted,
    timerOptions: OPTIONS
  }

  onTimesUp = () => {
    this.setState({ gameState: GameState.GameOver });
    const onTimesUpSound = new Audio('onTimesUp.mp3');
    onTimesUpSound.play();
  }

  onStartGame = () => {
    this.setState({gameState: GameState.InProgress});
  }

  resetClocks = () => {
    alert("I'm sorry Dave. I'm afraid I can't do that.");
  }
  
  render() {
    const { gameState, timerOptions } = this.state
    return (
      <div className="App">
        <ChessClock
          className="LeftClock"
          options={OPTIONS}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
        />
        <ButtonTray
          timerRunning={gameState == GameState.InProgress}
          resetClocks={this.resetClocks}
        />
        <ChessClock
          className="RightClock"
          options={OPTIONS}
          onTimesUp={this.onTimesUp}
          onStartGame={this.onStartGame}
          gameState={gameState}
        />
      </div>
    );
  }
}

export default App;
