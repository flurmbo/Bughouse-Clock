import React, { Component } from 'react';
import ChessTimer from './ChessTimer';
import { Side, TimerOptions } from './types';
import { otherSide } from './utils';

interface IProps {
  className: string;
  options: TimerOptions;
}

interface IState {
  running: boolean;
  turnStartTime?: number;
  whoseTurnItIs?: Side;
  countdownStartTime?: number;
}

class ChessClock extends Component<IProps, IState> {
  state: IState = {
    running: false
  }

  onClickHandler = (side: Side)  => {
    return () => {
      if (this.state.running && this.state.whoseTurnItIs === side) {
        // End our turn
        this.setState((state) => {
          return {
            whoseTurnItIs: otherSide(side),
          }
        });
        this.startTurn(otherSide(side));
      } else if (!this.state.running) {
        // Begin timing by starting other player's turn
        this.setState(() => {
          return {
            running: true,
            whoseTurnItIs: otherSide(side)
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
    const { className, options } = this.props;
    const { running, whoseTurnItIs, countdownStartTime } = this.state;
    return (
      <div className={className}>
        <ChessTimer 
          options={options}
          side={Side.Top}
          onClickHandler={this.onClickHandler}
          active={whoseTurnItIs === Side.Top} 
          countdownStartTime={countdownStartTime}
        />
        <ChessTimer
          options-{options}
          side={Side.Bottom}
          onClickHandler={this.onClickHandler}
          active={whoseTurnItIs === Side.Bottom} 
          countdownStartTime={countdownStartTime}
        />
      </div>
    )
  };
}

export default ChessClock;
