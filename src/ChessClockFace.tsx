import React, { Component } from "react";
import { toDurationString } from "./utils";
import { Side, Seconds, Milliseconds, TimerOptions, GameState } from "./types";

interface IProps {
  side: Side;
  options: TimerOptions;
  onClickHandler: (side: Side) => () => void;
  onTimesUp: () => void;
  gameState: GameState;
  isItMyTurn: boolean;
  className: string;
  onThisComponentDoneResetting: () => void;
}

interface IState {
  displayedTime: Seconds;
  timeLeft: Milliseconds;
  delayTimeoutID?: number;
  updateIntervalID?: number;
  countdownStartTime?: Milliseconds;
  ranOutOfTimeIsMe: boolean;
}

class ChessClockFace extends Component<IProps, IState> {
  state: IState = {
    displayedTime: this.props.options.startingTime,
    timeLeft: this.props.options.startingTime * 1000,
    ranOutOfTimeIsMe: false
  };
  componentDidMount() {
    const updateIntervalID = window.setInterval(() => {
      const { isItMyTurn } = this.props;
      const { displayedTime, timeLeft, countdownStartTime } = this.state;
      if (countdownStartTime && isItMyTurn) {
        let calculatedDisplayTime: Seconds = Math.ceil(
          (timeLeft - Date.now() + countdownStartTime) / 1000
        );
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }
      }
    }, 30);
    this.setState({ updateIntervalID });
  }

  onResetGameState() {
    if (this.state.delayTimeoutID) {
      clearTimeout(this.state.delayTimeoutID);
    }
    this.setState(
      {
        displayedTime: this.props.options.startingTime,
        timeLeft: this.props.options.startingTime * 1000,
        ranOutOfTimeIsMe: false,
        delayTimeoutID: undefined,
        updateIntervalID: undefined,
        countdownStartTime: undefined
      },
      this.props.onThisComponentDoneResetting
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.updateIntervalID);
  }

  componentDidUpdate(prevProps: IProps) {
    const { isItMyTurn, gameState } = this.props;
    if (!prevProps.isItMyTurn && isItMyTurn) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(
        this.onDelayElapsed,
        1000 * this.props.options.delay
      );
      this.setState({
        delayTimeoutID: delayTimeoutID
      });
    } else if (
      (prevProps.isItMyTurn &&
        !isItMyTurn &&
        gameState == GameState.InProgress) ||
      (prevProps.gameState == GameState.InProgress &&
        gameState == GameState.Paused)
    ) {
      // end our turn
      this.setState(prevState => {
        if (prevState.countdownStartTime) {
          return {
            timeLeft:
              prevState.timeLeft - Date.now() + prevState.countdownStartTime,
            countdownStartTime: undefined,
            delayTimeoutID: undefined
          };
        } else {
          clearTimeout(prevState.delayTimeoutID);
          return {
            timeLeft: prevState.timeLeft,
            delayTimeoutID: undefined
          };
        }
      });
    } else if (
      this.state.displayedTime === 0 &&
      gameState == GameState.InProgress
    ) {
      // end game
      const { delayTimeoutID } = this.state;
      if (delayTimeoutID) {
        clearTimeout(delayTimeoutID);
      }
      this.setState({ ranOutOfTimeIsMe: true });
      this.props.onTimesUp();
    } else if (
      prevProps.gameState != GameState.Resetting &&
      gameState == GameState.Resetting
    ) {
      // reset game
      this.onResetGameState();
    }
  }

  onDelayElapsed = () => {
    this.setState({
      countdownStartTime: Date.now()
    });
  };

  render() {
    const { side, onClickHandler, isItMyTurn, className } = this.props;
    const { displayedTime, ranOutOfTimeIsMe } = this.state;
    return (
      <div
        className={
          className +
          (isItMyTurn ? " active" : "") +
          (ranOutOfTimeIsMe ? " timeUp" : "")
        }
        onTouchEnd={onClickHandler(side)}
      >
        {toDurationString(displayedTime)}
      </div>
    );
  }
}

export default ChessClockFace;
