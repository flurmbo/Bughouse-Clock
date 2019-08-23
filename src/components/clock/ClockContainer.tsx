import React, { useEffect, useRef, useState } from "react";
import { GameState, IPreset, ITurnState, Side } from "../../types";
import { otherSide } from "../../utils";
import ButtonTray from "./ButtonTray";
import ChessClock from "./ChessClock";

interface IProps {
  gameState: GameState;
  selectedPreset: IPreset;
  setGameState: (gameState: GameState) => void;
  onResetGame: () => void;
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  openConfirmResetDialog: () => void;
}
const ClockContainer = (props: IProps) => {
  const {
    gameState,
    selectedPreset,
    onResetGame,
    onClickPauseButton,
    onClickSettingsButton,
    openConfirmResetDialog,
  } = props;

  const [turnState, setTurnState] = useState<ITurnState>({
    left: Side.Top,
    right: Side.Bottom,
  });

  const turnStateRef = useRef(turnState);

  useEffect(() => {
    turnStateRef.current = turnState;
  }, [turnState]);

  const onClickClockFace = (side: Side, clock: "left" | "right") => {
    const state = turnStateRef.current;
    if (state[clock] === side) {
      setTurnState(prevState => {
        return {
          ...prevState,
          ...{ [clock]: otherSide(side) },
        };
      });
    }
  };

  const displayedTimes = [
    selectedPreset.startingTime,
    selectedPreset.startingTime,
  ];

  return (
    <React.Fragment>
      <ChessClock
        className="LeftClock"
        onClickClockFace={onClickClockFace}
        clock="left"
        turnState={turnState}
        displayedTimes={displayedTimes}
      />
      <ButtonTray
        gameState={gameState}
        onResetGame={onResetGame}
        onClickPauseButton={onClickPauseButton}
        onClickSettingsButton={onClickSettingsButton}
        openConfirmResetDialog={openConfirmResetDialog}
      />
      <ChessClock
        className="RightClock"
        onClickClockFace={onClickClockFace}
        clock="right"
        turnState={turnState}
        displayedTimes={displayedTimes}
      />
    </React.Fragment>
  );
};

export default ClockContainer;
