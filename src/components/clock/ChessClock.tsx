import React from "react";
import { IGameState, Side } from "../../types";
import ChessClockFace from "./ChessClockFace";

interface IProps {
  className: string;
  onClickClockFace: (side: Side, clock: "left" | "right") => void;
  clock: "left" | "right";
  gameState: IGameState;
  displayedTimes: { top: number; bottom: number };
}

const ChessClock = (props: IProps) => {
  const {
    className,
    onClickClockFace,
    clock,
    gameState,
    displayedTimes,
  } = props;
  return (
    <React.Fragment>
      <ChessClockFace
        className={"timer top" + className}
        side={Side.Top}
        onClickClockFace={onClickClockFace}
        clock={clock}
        gameState={gameState}
        displayedTime={displayedTimes.top}
      />
      <ChessClockFace
        className={"timer bottom" + className}
        side={Side.Bottom}
        onClickClockFace={onClickClockFace}
        clock={clock}
        gameState={gameState}
        displayedTime={displayedTimes.bottom}
      />
    </React.Fragment>
  );
};

export default ChessClock;
