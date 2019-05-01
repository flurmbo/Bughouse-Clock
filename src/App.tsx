import React, { Component } from 'react';
import './App.css';
import ChessClock from './ChessClock';
import { TimerOptions, GameState } from './types';

const OPTIONS: TimerOptions = {
  delay: 3,
  startingTime: 60
}

interface IState {
  gameState: GameState;
  timerOptions: TimerOptions;
}

class App extends Component<IState> {
  state: IState = {
    gameState: GameState.NotStarted,
    timerOptions: OPTIONS
  }

  onTimesUp = () => {
    this.setState({ gameState: GameState.GameOver });
  }
  
  render() {
    const { gameState, timerOptions } = this.state
    return (
      <div className="App">
        <ChessClock
          className="leftClock"
          options={OPTIONS}
          onTimesUp={this.onTimesUp}
          gameState={gameState}
        />
        <ChessClock
          className="rightClock"
          options={OPTIONS}
          onTimesUp={this.onTimesUp}
          gameState={gameState}
        />
      </div>
    );
  }
}

export default App;
