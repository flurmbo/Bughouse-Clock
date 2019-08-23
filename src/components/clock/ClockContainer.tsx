import React, { useEffect, useRef, useState } from "react";
import { GameLifecycle, IGameState, IPreset, Side } from "../../types";
import { otherSide } from "../../utils";
import ButtonTray from "./ButtonTray";
import ChessClock from "./ChessClock";

interface IProps {
  gameLifecycle: GameLifecycle;
  selectedPreset: IPreset;
  setGameLifecycle: (gameLifecycle: GameLifecycle) => void;
  onResetGame: () => void;
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  openConfirmResetDialog: () => void;
}
const ClockContainer = (props: IProps) => {
  const {
    gameLifecycle,
    selectedPreset,
    onResetGame,
    onClickPauseButton,
    onClickSettingsButton,
    openConfirmResetDialog,
  } = props;

  const { startingTime } = selectedPreset;
  const [gameState, setGameState] = useState<IGameState>({
    left: {
      side: Side.Top,
      time: {
        top: startingTime,
        bottom: startingTime,
      },
    },
    right: {
      side: Side.Bottom,
      time: {
        top: startingTime,
        bottom: startingTime,
      },
    },
  });

  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const onClickClockFace = (side: Side, clock: "left" | "right") => {
    const state = gameStateRef.current;
    if (state[clock].side === side) {
      setGameState(prevState => {
        return {
          ...prevState,
          ...{
            [clock]: {
              side: otherSide(side),
              time: prevState[clock].time,
            },
          },
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
        gameState={gameState}
        displayedTimes={displayedTimes}
      />
      <ButtonTray
        gameLifecycle={gameLifecycle}
        onResetGame={onResetGame}
        onClickPauseButton={onClickPauseButton}
        onClickSettingsButton={onClickSettingsButton}
        openConfirmResetDialog={openConfirmResetDialog}
      />
      <ChessClock
        className="RightClock"
        onClickClockFace={onClickClockFace}
        clock="right"
        gameState={gameState}
        displayedTimes={displayedTimes}
      />
    </React.Fragment>
  );
};

export default ClockContainer;
