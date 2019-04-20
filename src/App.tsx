import React, { Component } from 'react';
import './App.css';
import ChessClock from './ChessClock';
const STARTING_TIME = 60 * 1000;
const DELAY = 3;

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChessClock
          className="leftClock"
          startingTime={STARTING_TIME}
          delay={DELAY}
        />
        <ChessClock
          className="rightClock"
          startingTime={STARTING_TIME}
          delay={DELAY}
        />
      </div>
    );
  }
}

export default App;
