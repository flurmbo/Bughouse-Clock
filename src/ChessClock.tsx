import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import { Side } from './Side';

interface IProps {
  className: string;
  startingTime: number;
}

interface IState {
  running: boolean;
  timeTop: number;
  timeBottom: number;
  turn?: Side;
}
class ChessClock extends Component<IProps, IState> {
  state: IState = {
    running: false,
    timeTop: this.props.startingTime,
    timeBottom: this.props.startingTime
  }

/*  onClickHandler(side: Side) {
    return () => {
      console.log('we have started');
    }
  }

  startTimerOnClickhandler(side: Side) {
    return () => {
      this.setState((state) => ({
        running: true,
        turnIsTop: !isTop
      }));
      console.log(`you clicked the ${ (isTop) ? 'top' : 'bottom'}`);
    }
  }

  startTimerOnClickhandler = this.startTimerOnClickhandler.bind(this);
*/
  render() {
    const { className } = this.props;
    const { timeTop, timeBottom, running } = this.state;
    return (
      <div className={className}>
        <TimeDisplay 
          time={timeTop}
          side={Side.Top}
          //onClickHandler={(running) ? this.onClickHandler : this.startTimerOnClickhandler}

        />
        <TimeDisplay
          time={timeBottom}
					side={Side.Bottom}
          //onClickHandler={(running) ? this.onClickHandler : this.startTimerOnClickhandler}
        />
      </div>
    )
  };
}

export default ChessClock;
