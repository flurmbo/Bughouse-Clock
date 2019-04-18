import React, { Component } from 'react';
import { toDurationString } from './utils';
import { Side } from './Side';

interface IProps {
  time: number;
  side: Side;
}

interface IState {

}

class TimeDisplay extends Component<IProps, IState> {

  render() {
    const { time, side } = this.props;
    return (
     <div 
      className={(side === Side.Top) ? "timer top" : "timer bottom"}
     >
       { toDurationString(time) }
     </div>
    )
  };
}

export default TimeDisplay;
