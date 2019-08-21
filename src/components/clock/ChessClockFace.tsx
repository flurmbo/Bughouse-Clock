import React, { Component } from "react";
import {
  GameState,
  ITimerOptions,
  Milliseconds,
  Seconds,
  Side,
} from "../../types";
import { toDurationString } from "../../utils";

interface IProps {
  side: Side;
  options: ITimerOptions;
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
  public state: IState = {
    displayedTime: this.props.options.startingTime,
    ranOutOfTimeIsMe: false,
    timeLeft: this.props.options.startingTime * 1000,
  };
  public componentDidMount() {
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

  public onResetGameState() {
    if (this.state.delayTimeoutID) {
      clearTimeout(this.state.delayTimeoutID);
    }
    this.setState(
      {
        countdownStartTime: undefined,
        delayTimeoutID: undefined,
        displayedTime: this.props.options.startingTime,
        ranOutOfTimeIsMe: false,
        timeLeft: this.props.options.startingTime * 1000,
        updateIntervalID: undefined,
      },
      this.props.onThisComponentDoneResetting,
    );
  }

  public componentWillUnmount() {
    clearInterval(this.state.updateIntervalID);
  }

  public componentDidUpdate(prevProps: IProps) {
    const { isItMyTurn, gameState } = this.props;
    if (!prevProps.isItMyTurn && isItMyTurn) {
      // begin our turn
      const delayTimeoutID = window.setTimeout(
        this.onDelayElapsed,
        1000 * this.props.options.increment,
      );
      this.setState({
        delayTimeoutID,
      });
    } else if (
      (prevProps.isItMyTurn &&
        !isItMyTurn &&
        gameState === GameState.InProgress) ||
      (prevProps.gameState === GameState.InProgress &&
        gameState === GameState.Paused)
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
      gameState === GameState.InProgress
    ) {
      // end game
      const { delayTimeoutID } = this.state;
      if (delayTimeoutID) {
        clearTimeout(delayTimeoutID);
      }
      this.setState({ ranOutOfTimeIsMe: true });
      this.props.onTimesUp();
    } else if (
      prevProps.gameState !== GameState.Resetting &&
      gameState === GameState.Resetting
    ) {
      // reset game
      this.onResetGameState();
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
