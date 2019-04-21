import React, { Component } from 'react';
import './App.css';
import ChessClock from './ChessClock';
import { TimerOptions } from './types';

const OPTIONS: TimerOptions = {
  delay: 3,
  startingTime: 60 * 1000,
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <ChessClock
          className="leftClock"
          options={OPTIONS}
        />
        <ChessClock
          className="rightClock"
          options={OPTIONS}
        />

        />
      </div>
    );
  }
}

export default App;
