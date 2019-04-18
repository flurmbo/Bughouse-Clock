import React, { Component } from 'react';
import './App.css';
import ChessClock from './ChessClock';
const STARTING_TIME = 60;

interface IProps {};
interface IState {
  time: number;
}

class App extends Component<IProps, IState> {
  state: IState = {
    time: STARTING_TIME
  }


  componentDidMount() {
    this.setState({time: 30});
    setInterval(this.decrementTime.bind(this), 1000);
  }

  decrementTime() {
    this.setState((state) => ({
      time: state.time - 1
    }));
  }
  render() {
    const { time } = this.state;
    return (
      <div className="App">
        <ChessClock
          className="leftClock"
          startingTime={STARTING_TIME}
        />
        <ChessClock
          className="rightClock"
          startingTime={STARTING_TIME}
        />
      </div>
    );
  }
}

export default App;
