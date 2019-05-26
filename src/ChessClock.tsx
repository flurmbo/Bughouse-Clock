import React, { Component } from 'react';
import ChessClockFace from './ChessClockFace';
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
    const { className, options, onTimesUp, gameState } = this.props;
    const { running, whoseTurnItIs, countdownStartTime } = this.state;
    return (
      <React.Fragment>
        <ChessClockFace
          options={options}
          className= {'timer top' + className}
          side={Side.Top}
          onClickHandler={this.onClickHandler}
          isItMyTurn={whoseTurnItIs === Side.Top} 
          onTimesUp={onTimesUp}
          gameState={gameState}
        />
        <ChessClockFace
          options={options}
          className={'timer bottom' + className}
          side={Side.Bottom}
          onClickHandler={this.onClickHandler}
          isItMyTurn={whoseTurnItIs === Side.Bottom} 
          onTimesUp={onTimesUp}
          gameState={gameState}
        />
      </React.Fragment>
    )
  };
}

export default ChessClock;
