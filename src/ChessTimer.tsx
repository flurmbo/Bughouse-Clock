import React, { Component } from 'react';
import { toDurationString } from './utils';
import { Side, Seconds, Milliseconds, TimerOptions, GameState } from './types';

interface IProps {
  side: Side;
  options: TimerOptions;
  onClickHandler: (side: Side) => () => void;
  onTimesUp: () => void;
  gameState: GameState;
  whoseTurnItIs?: Side;
}

interface IState {
  displayedTime: Seconds;
  timeLeft: Milliseconds;
  delayTimeoutID?: number;
  countdownStartTime?: Milliseconds;
  countingDown?: boolean
}

class ChessTimer extends Component<IProps, IState> {
  state: IState = {
    displayedTime: this.props.options.startingTime, 
    timeLeft: this.props.options.startingTime * 1000
  }
  componentDidMount() {
    setInterval(() => {
      const { side, whoseTurnItIs } = this.props;
      const { displayedTime, timeLeft, countdownStartTime } = this.state;
      if (countdownStartTime && whoseTurnItIs && whoseTurnItIs === side) {
        let calculatedDisplayTime: Seconds = 
          Math.ceil((timeLeft - Date.now() + countdownStartTime) / 1000);
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }
      }
    }, 30);
  }

  componentDidUpdate(prevProps: IProps) {
    const { side, whoseTurnItIs } = this.props;
    if (whoseTurnItIs && prevProps.whoseTurnItIs && whoseTurnItIs !== prevProps.whoseTurnItIs) {
      
    }
    if (!prevProps.active && active) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(this.onDelayElapsed, 1000 * this.props.options.delay);
      this.setState({
        countingDown: false,
        delayTimeoutID: delayTimeoutID
      });
    } else if (prevProps.active && !active) {
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
    const { side, onClickHandler, active } = this.props;
    const { displayedTime } = this.state;
    let className = (
      ((side === Side.Top) ? "timer top" : "timer bottom") +
      (active ? ' active' : '')
    );
    return (
     <div 
      className={className}
      onClick={onClickHandler(side)}
     >
       { toDurationString(displayedTime) }
     </div>
    )
  };
}

export default ChessTimer;
