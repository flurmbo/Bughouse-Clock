import React, { Component } from "react";
import {
  GameLifecycle,
  IPreset,
  Milliseconds,
  Seconds,
  Side,
} from "../../types";
import { toDurationString } from "../../utils";

interface IProps {
  side: Side;
  onClickHandler: (side: Side) => () => void;
  onTimesUp: () => void;
  gameLifecycle: GameLifecycle;
  isItMyTurn: boolean;
  className: string;
  onThisComponentDoneResetting: () => void;
  selectedPreset: IPreset;
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
  public state: IState = {
    displayedTime: this.props.selectedPreset.startingTime,
    ranOutOfTimeIsMe: false,
    timeLeft: this.props.selectedPreset.startingTime * 1000,
  };
  public componentDidMount() {
    // this interval updates the time displayed on the clock face
    const updateIntervalID = window.setInterval(() => {
      const { isItMyTurn } = this.props;
      const { displayedTime, timeLeft, countdownStartTime } = this.state;
      if (countdownStartTime && isItMyTurn) {
        const calculatedDisplayTime: Seconds = Math.ceil(
          (timeLeft - Date.now() + countdownStartTime) / 1000,
        );
        if (calculatedDisplayTime !== displayedTime) {
          this.setState({ displayedTime: calculatedDisplayTime });
        }
      }
    }, 30);
    this.setState({ updateIntervalID });
  }

  public onResetGameLifecycle() {
    if (this.state.delayTimeoutID) {
      clearTimeout(this.state.delayTimeoutID);
    }
    this.setState(
      {
        countdownStartTime: undefined,
        delayTimeoutID: undefined,
        displayedTime: this.props.selectedPreset.startingTime,
        ranOutOfTimeIsMe: false,
        timeLeft: this.props.selectedPreset.startingTime * 1000,
        updateIntervalID: undefined,
      },
      this.props.onThisComponentDoneResetting,
    );
  }

  // public componentWillUnmount() {
  //   clearInterval(this.state.updateIntervalID);
  // }

  public componentDidUpdate(prevProps: IProps) {
    const { isItMyTurn, gameLifecycle } = this.props;
    if (!prevProps.isItMyTurn && isItMyTurn) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(
        this.onDelayElapsed,
        1000 * this.props.selectedPreset.increment,
      );
      this.setState({
        delayTimeoutID,
      });
    } else if (
      (prevProps.isItMyTurn &&
        !isItMyTurn &&
        gameLifecycle === GameLifecycle.InProgress) ||
      (prevProps.gameLifecycle === GameLifecycle.InProgress &&
        gameLifecycle === GameLifecycle.Paused)
    ) {
      // end our turn
      this.setState(prevState => {
        if (prevState.countdownStartTime) {
          return {
            countdownStartTime: undefined,
            delayTimeoutID: undefined,
            timeLeft:
              prevState.timeLeft - Date.now() + prevState.countdownStartTime,
          };
        } else {
          clearTimeout(prevState.delayTimeoutID);
          return {
            delayTimeoutID: undefined,
            timeLeft: prevState.timeLeft,
          };
        }
      });
    } else if (
      this.state.displayedTime === 0 &&
      gameLifecycle === GameLifecycle.InProgress
    ) {
      // end game
      const { delayTimeoutID } = this.state;
      if (delayTimeoutID) {
        clearTimeout(delayTimeoutID);
      }
      this.setState({ ranOutOfTimeIsMe: true });
      this.props.onTimesUp();
    } else if (
      prevProps.gameLifecycle !== GameLifecycle.Resetting &&
      gameLifecycle === GameLifecycle.Resetting
    ) {
      // reset game
      this.onResetGameLifecycle();
    }
  }

  public onDelayElapsed = () => {
    this.setState({
      countdownStartTime: Date.now(),
    });
  };

  public render() {
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