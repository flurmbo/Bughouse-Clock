import React, { Component } from 'react';
import { toDurationString } from './utils';
import { Side, Seconds, Milliseconds, TimerOptions, GameState } from './types';

interface IProps {
  side: Side;
  options: TimerOptions;
  onClickHandler: (side: Side) => () => void;
  onTimesUp: () => void;
  gameState: GameState;
  isItMyTurn: boolean;
  className: string;
}

interface IState {
  displayedTime: Seconds;
  timeLeft: Milliseconds;
  delayTimeoutID?: number;
  countdownStartTime?: Milliseconds;
  countingDown?: boolean
}

class ChessClockFace extends Component<IProps, IState> {
  state: IState = {
    displayedTime: this.props.options.startingTime,
    timeLeft: this.props.options.startingTime * 1000
  }
  componentDidMount() {
    setInterval(() => {
      const { side, isItMyTurn } = this.props;
      const { displayedTime, timeLeft, countdownStartTime } = this.state;
      if (countdownStartTime && isItMyTurn) {
        let calculatedDisplayTime: Seconds =
          Math.ceil((timeLeft - Date.now() + countdownStartTime) / 1000);
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }
      }
    }, 30);
  }

  componentDidUpdate(prevProps: IProps) {
    const { side, isItMyTurn } = this.props;
    if (!prevProps.isItMyTurn && isItMyTurn) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(this.onDelayElapsed, 1000 * this.props.options.delay);
      this.setState({
        countingDown: false,
        delayTimeoutID: delayTimeoutID
      });
    } else if (prevProps.isItMyTurn && !isItMyTurn) {
      // end our turn
      this.setState((prevState) => {
        if (prevState.countdownStartTime) {
          return {
            timeLeft: (prevState.timeLeft - Date.now() + prevState.countdownStartTime),
            countdownStartTime: undefined,
            countingDown: false,
            delayTimeoutID: undefined
          }
        } else {
          clearTimeout(prevState.delayTimeoutID);
          return {
            timeLeft: prevState.timeLeft,
            countingDown: false,
            delayTimeoutID: undefined
          }
        }
      });
    } else if (this.state.displayedTime === 0 ) {
      this.props.onTimesUp();
    }
  }

  onDelayElapsed = () => {
    this.setState({
      countdownStartTime: Date.now(),
      countingDown: true
    });
  }

  render() {
    const { side, onClickHandler, isItMyTurn, className } = this.props;
    const { displayedTime } = this.state;
    return (
     <div
      className={className + (isItMyTurn ? ' active' : '')}
      onClick={onClickHandler(side)}
     >
       { toDurationString(displayedTime) }
     </div>
    )
  };
}

export default ChessClockFace;
