import React, { Component } from 'react';
import { toDurationString } from './utils';
import { Side, Seconds, Milliseconds, TimerOptions } from './types';

interface IProps {
  side: Side;
  active: boolean;
  options: TimerOptions;
  onClickHandler: (side: Side) => () => void;
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
    displayedTime: Math.ceil(this.props.options.startingTime / 1000),
    timeLeft: this.props.options.startingTime * 1000
  }
  componentDidMount() {
    setInterval(() => {
      const { active } = this.props;
      const { displayedTime, timeLeft, countdownStartTime } = this.state;
      if (countdownStartTime && active) {
        let calculatedDisplayTime: Seconds = 
          Math.ceil((timeLeft - Date.now() + countdownStartTime) / 1000);
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }
      }
    }, 30);
  }

  componentDidUpdate(prevProps: IProps) {
    const { active } = this.props;
    if (!prevProps.active && active) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(() => {
        this.setState({
          countdownStartTime: Date.now(),
          countingDown: true
        });
      }, this.props.options.delay);
      this.setState({
        countingDown: false,
        delayTimeoutID: delayTimeoutID
      });
    } else if (prevProps.active && !active) {
      // end our turn
    }
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
