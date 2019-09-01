import React from "react";
import { IGameState, Seconds, Side } from "../../types";
import { toDurationString } from "../../utils";

interface IProps {
  side: Side;
  className: string;
  clock: "left" | "right";
  onClickClockFace: (side: Side, clock: "left" | "right") => void;
  gameState: IGameState;
  displayedTime: Seconds;
}

const ChessClockFace = (props: IProps) => {
  const {
    side,
    className,
    onClickClockFace,
    clock,
    gameState,
    displayedTime,
  } = props;

  const onTouchEnd = (e: any) => {
    console.log("touch ended!");
    onClickClockFace(side, clock);
  };

  const flagged = gameState[clock].flagged === side;

  return (
    <div
      className={
        className +
        (gameState[clock].side === side ? " active" : "") +
        (flagged ? " flagged" : "")
      }
      onTouchEnd={onTouchEnd}
    >
      {toDurationString(displayedTime)}
    </div>
  );
};

export default ChessClockFace;
