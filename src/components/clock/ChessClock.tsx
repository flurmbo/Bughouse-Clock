import React, { Component } from "react";
import ChessClockFace from "./ChessClockFace";
import { Side, TimerOptions, GameState } from "../../types";
import { otherSide } from "../../utils";

interface IProps {
  className: string;
  options: TimerOptions;
  onTimesUp: () => void;
  onStartGame: () => void;
  gameState: GameState;
  onThisComponentDoneResetting: () => void;
}

interface IState {
  running: boolean;
  whoseTurnItIs?: Side;
}

class ChessClock extends Component<IProps, IState> {
  state: IState = {
    running: false,
  };

  onClickHandler = (side: Side) => {
    return () => {
      if (this.state.running && this.state.whoseTurnItIs === side) {
        // End our turn
        this.setState(state => {
          return {
            whoseTurnItIs: otherSide(side),
          };
        });
      } else if (
        !this.state.running &&
        this.props.gameState !== GameState.GameOver
      ) {
        // Start game and begin timing by starting other player's turn
        this.props.onStartGame();
        this.setState(() => {
          return {
            running: true,
            whoseTurnItIs: otherSide(side),
          };
        });
      }
    };
  };

  componentDidUpdate(prevProps: IProps) {
    const { gameState, onThisComponentDoneResetting } = this.props;
    if (
      prevProps.gameState != GameState.Resetting &&
      gameState == GameState.Resetting
    ) {
      // on reset game
      this.setState(
        {
          running: false,
          whoseTurnItIs: undefined,
        },
        onThisComponentDoneResetting
      );
    }
  }

  render() {
    const {
      className,
      options,
      onTimesUp,
      gameState,
      onThisComponentDoneResetting,
    } = this.props;
    const { whoseTurnItIs } = this.state;
    return (
      <React.Fragment>
        <ChessClockFace
          options={options}
          className={"timer top" + className}
          side={Side.Top}
          onClickHandler={this.onClickHandler}
          isItMyTurn={
            whoseTurnItIs === Side.Top && gameState == GameState.InProgress
          }
          onTimesUp={onTimesUp}
          gameState={gameState}
          onThisComponentDoneResetting={onThisComponentDoneResetting}
        />
        <ChessClockFace
          options={options}
          className={"timer bottom" + className}
          side={Side.Bottom}
          onClickHandler={this.onClickHandler}
          isItMyTurn={
            whoseTurnItIs === Side.Bottom && gameState == GameState.InProgress
          }
          onTimesUp={onTimesUp}
          gameState={gameState}
          onThisComponentDoneResetting={onThisComponentDoneResetting}
        />
      </React.Fragment>
    );
  }
}

export default ChessClock;
