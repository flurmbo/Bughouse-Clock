import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import PropTypes from 'prop-types';

class ChessClock extends Component {
  static propTypes = {
    delay: PropTypes.number,
    startingTime: PropTypes.number
  };

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      running: false,
      timeTop: props.startingTime,
      timeBottom: props.startingTime
    };
  }

  onClickHandler() {
    console.log("you clicked a button!");
  }

  startTimerOnClickhandler() {
    this.setState({ running: true});
    console.log("you started this chess clock!");
  }

  startTimerOnClickhandler = this.startTimerOnClickhandler.bind(this);

  render() {
    const { className } = this.props;
    const { timeTop, timeBottom, running } = this.state;
    return (
      <div className={className}>
        <TimeDisplay 
          className="top timer"
          time={timeTop}
          onClickHandler={(running) ? this.onClickHandler : this.startTimerOnClickhandler}

        />
        <TimeDisplay
          className="bottom timer"
          time={timeBottom}
        />
      </div>
    )
  };
}

export default ChessClock;
