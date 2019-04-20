import React, { Component } from 'react';
import { toDurationString } from './utils';
import { Side, Seconds, Milliseconds } from './types';

interface IProps {
  time: number;
  side: Side;
  active: boolean
  onClickHandler: (side: Side) => () => void;
  countdownStartTime?: Milliseconds;
}

interface IState {
  displayedTime: Seconds;
}

class TimeDisplay extends Component<IProps, IState> {
  state: IState = {
    displayedTime: Math.ceil(this.props.time / 1000)
  }
  componentDidMount() {
    const { active, countdownStartTime, time } = this.props;
    const { displayedTime } = this.state;
    setInterval(() => {
      if (countdownStartTime && active) {
        console.log('checking if should update time');
        let calculatedDisplayTime: Seconds = Math.ceil((time - Date.now() + countdownStartTime) / 1000);
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }

      }
    }, 30);
  }

  render() {
    console.log('rendering a time display');
    const { time, side, onClickHandler, active } = this.props;
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

export default TimeDisplay;
