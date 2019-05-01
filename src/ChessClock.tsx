import React, { Component } from 'react';
import ChessTimer from './ChessTimer';
import { Side, TimerOptions, GameState } from './types';
import { otherSide } from './utils';

interface IProps {
  className: string;
  options: TimerOptions;
  onTimesUp: () => void;
  gameState: GameState;
}

interface IState {
  running: boolean;
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
      } else if (!this.state.running) {
        // Begin timing by starting other player's turn
        this.setState(() => {
          return {
            running: true,
            whoseTurnItIs: otherSide(side)
          }
       });
      }
    }
  }

  render() {
    console.log('rendering a chess clock');
    const { className, options, onTimesUp, gameState } = this.props;
    const { running, whoseTurnItIs, countdownStartTime } = this.state;
    return (
      <div className={className}>
        <ChessTimer
          options={options}
          side={Side.Top}
          onClickHandler={this.onClickHandler}
          whoseTurnItIs={whoseTurnItIs} 
          onTimesUp={onTimesUp}
          gameState={gameState}
        />
        <ChessTimer
          options={options}
          side={Side.Bottom}
          onClickHandler={this.onClickHandler}
          whoseTurnItIs={whoseTurnItIs} 
          onTimesUp={onTimesUp}
          gameState={gameState}
        />
        />
        />
      </div>
    )
  };
}

export default ChessClock;
