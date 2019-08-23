import React from "react";
import { ITurnState, Seconds, Side } from "../../types";
import { toDurationString } from "../../utils";

interface IProps {
  side: Side;
  className: string;
  clock: "left" | "right";
  onClickClockFace: (side: Side, clock: "left" | "right") => void;
  turnState: ITurnState;
  displayedTime: Seconds;
}

const ChessClockFace = (props: IProps) => {
  const {
    side,
    className,
    onClickClockFace,
    clock,
    turnState,
    displayedTime,
  } = props;

  const onTouchEnd = () => {
    onClickClockFace(side, clock);
  };

  return (
    <div
      className={className + (turnState[clock] === side ? " active" : "")}
      onTouchEnd={onTouchEnd}
    >
      {toDurationString(displayedTime)}
    </div>
  );
};

export default ChessClockFace;
