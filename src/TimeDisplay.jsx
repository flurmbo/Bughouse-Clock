import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeDisplay extends Component {
  static propTypes = {
    time: PropTypes.number,
    onClickHandler: PropTypes.func
  }

  render() {
    const { time, onClickHandler, isTop } = this.props;
    return (
     <div 
      className={(isTop) ? "timer top" : "timer bottom"}
      onClick={onClickHandler}
     >
       { time } seconds remaining.
     </div>
    )
  };
}

export default TimeDisplay;
