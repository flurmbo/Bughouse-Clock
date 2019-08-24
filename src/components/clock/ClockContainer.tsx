import React, { useEffect, useRef, useState } from "react";
import { GameLifecycle, IGameState, IPreset, Side } from "../../types";
import { otherSide, sideToIdentifier } from "../../utils";
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
      turnStartTime: undefined,
      time: {
        top: startingTime * 1000,
        bottom: startingTime * 1000,
      },
    },
    right: {
      side: Side.Bottom,
      turnStartTime: undefined,
      time: {
        top: startingTime * 1000,
        bottom: startingTime * 1000,
      },
    },
  });

  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const onClickClockFace = (side: Side, clock: "left" | "right") => {
    const state = gameStateRef.current;
    if (state[clock].turnStartTime) {
      updateGameState("END_TURN", { side, clock });
    } else {
      updateGameState("FIRST_TURN", { side, clock });
    }
  };

  const [displayedTimes, setDisplayedTimes] = useState({
    left: {
      top: selectedPreset.startingTime,
      bottom: selectedPreset.startingTime,
    },
    right: {
      top: selectedPreset.startingTime,
      bottom: selectedPreset.startingTime,
    },
  });

  useEffect(() => {
    //
    const updateDisplayId = window.setInterval(() => {
      setDisplayedTimes(() => {
        const { left, right } = gameStateRef.current;
        return {
          left: {
            top: Math.ceil(
              (left.time.top -
                (left.side === Side.Top && left.turnStartTime
                  ? Date.now() - left.turnStartTime
                  : 0)) /
                1000,
            ),
            bottom: Math.ceil(
              (left.time.bottom -
                (left.side === Side.Bottom && left.turnStartTime
                  ? Date.now() - left.turnStartTime
                  : 0)) /
                1000,
            ),
          },
          right: {
            top: Math.ceil(right.time.top / 1000),
            bottom: Math.ceil(right.time.bottom / 1000),
          },
        };
      });
    }, 30);
    return () => {
      window.clearInterval(updateDisplayId);
    };
  }, []);
  const updateGameState = (action: string, payload: any) => {
    let clock: "left" | "right";
    let side: Side;
    switch (action) {
      case "FIRST_TURN":
        clock = payload.clock;
        side = payload.side;
        setGameState(prevState => {
          const now = Date.now();
          return {
            ...prevState,
            ...{
              [clock]: {
                side: otherSide(side),
                turnStartTime: now,
                time: prevState[clock].time,
              },
            },
          };
        });
      case "END_TURN":
        clock = payload.clock;
        side = payload.side;
        setGameState(prevState => {
          const now = Date.now();
          const sideId = sideToIdentifier(side);
          const otherSideId = sideToIdentifier(otherSide(side));
          const lastStartTime = prevState[clock].turnStartTime as number;
          return {
            ...prevState,
            ...{
              [clock]: {
                side: otherSide(side),
                turnStartTime: now,
                time: {
                  [sideId]:
                    prevState[clock].time[sideId] - (now - lastStartTime),
                  [otherSideId]: prevState[clock].time[otherSideId],
                },
              },
            },
          };
        });

      case "DELAY_ELAPSED":
      // do something
      case "TIME_ELAPSED":
      // do something
      case "RESET_GAME":
      // do something
    }
  };

  return (
    <React.Fragment>
      <ChessClock
        className="LeftClock"
        onClickClockFace={onClickClockFace}
        clock="left"
        gameState={gameState}
        displayedTimes={displayedTimes.left}
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
        displayedTimes={displayedTimes.right}
      />
    </React.Fragment>
  );
};

export default ClockContainer;
