import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import { Side } from './types';
import { otherSide } from './utils';
interface IProps {
  className: string;
  startingTime: number;
  delay: number;
}

interface IState {
  running: boolean;
  turnStartTime?: number;
  timeTop: number;
  timeBottom: number;
  turnSide?: Side;
  countdownStartTime?: number;
}

class ChessClock extends Component<IProps, IState> {
  state: IState = {
    running: false,
    timeTop: this.props.startingTime,
    timeBottom: this.props.startingTime,
  }

  onClickHandler = (side: Side)  => {
    return () => {
      if (this.state.running) {
        console.log(`you are ${side} and it is ${this.state.turnSide}'s turn`);
      }
      if (this.state.running && this.state.turnSide === side) {
        this.setState((state) => {
          console.log('changing turn');
          return {
            turnSide: otherSide(side),
            countdownStartTime: undefined,
            timeTop: (side === Side.Top && state.countdownStartTime) ? (state.timeTop - Date.now() + state.countdownStartTime) : state.timeTop,
            timeBottom: (side === Side.Bottom && state.countdownStartTime) ? (state.timeBottom - Date.now() + state.countdownStartTime) : state.timeBottom
          }
        });
        this.startTurn(otherSide(side));
      } else if (!this.state.running) {
        this.setState(() => {
          console.log('setting run');
          return {
            running: true,
            turnSide: otherSide(side)
          }
       });
       this.startTurn(otherSide(side));
      }
    }
  }
  
  startTurn = (side: Side) => {
    console.log('calling start turn');
   setTimeout(() => {
    this.setState({ countdownStartTime: Date.now() }); 
   }, 1000 * this.props.delay);
  }

  render() {
    console.log('rendering a chess clock');
    const { className } = this.props;
    const { timeTop, timeBottom, running, turnSide, countdownStartTime } = this.state;
    return (
      <div className={className}>
        <TimeDisplay 
          time={timeTop}
          side={Side.Top}
          onClickHandler={this.onClickHandler}
          active={turnSide === Side.Top} 
          countdownStartTime={countdownStartTime}
        />
        <TimeDisplay
          time={timeBottom}
          side={Side.Bottom}
          onClickHandler={this.onClickHandler}
          active={turnSide === Side.Bottom} 
          countdownStartTime={countdownStartTime}
        />
      </div>
    )
  };
}

export default ChessClock;
