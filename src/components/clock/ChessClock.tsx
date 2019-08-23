import React from "react";
import { ITurnState, Side } from "../../types";
import ChessClockFace from "./ChessClockFace";

interface IProps {
  className: string;
  onClickClockFace: (side: Side, clock: "left" | "right") => void;
  clock: "left" | "right";
  turnState: ITurnState;
  displayedTimes: number[];
}

const ChessClock = (props: IProps) => {
  const {
    className,
    onClickClockFace,
    clock,
    turnState,
    displayedTimes,
  } = props;
  return (
    <React.Fragment>
      <ChessClockFace
        className={"timer top" + className}
        side={Side.Top}
        onClickClockFace={onClickClockFace}
        clock={clock}
        turnState={turnState}
        displayedTime={displayedTimes[0]}
      />
      <ChessClockFace
        className={"timer bottom" + className}
        side={Side.Bottom}
        onClickClockFace={onClickClockFace}
        clock={clock}
        turnState={turnState}
        displayedTime={displayedTimes[1]}
      />
    </React.Fragment>
  );
};

export default ChessClock;
