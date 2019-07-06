import React, { Component } from "react";
import { GameState, ITimerOptions, Side } from "../../types";
import { otherSide } from "../../utils";
import ChessClockFace from "./ChessClockFace";

interface IProps {
  className: string;
  options: ITimerOptions;
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
  public state: IState = {
    running: false,
  };

  public componentDidUpdate(prevProps: IProps) {
    const { gameState, onThisComponentDoneResetting } = this.props;
    if (
      prevProps.gameState !== GameState.Resetting &&
      gameState === GameState.Resetting
    ) {
      // on reset game
      this.setState(
        {
          running: false,
          whoseTurnItIs: undefined,
        },
        onThisComponentDoneResetting,
      );
    }
  }

  public render() {
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
            whoseTurnItIs === Side.Top && gameState === GameState.InProgress
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
            whoseTurnItIs === Side.Bottom && gameState === GameState.InProgress
          }
          onTimesUp={onTimesUp}
          gameState={gameState}
          onThisComponentDoneResetting={onThisComponentDoneResetting}
        />
      </React.Fragment>
    );
  }

  private onClickHandler = (side: Side) => {
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
}

export default ChessClock;
