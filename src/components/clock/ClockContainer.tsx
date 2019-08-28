import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GameLifecycle,
  GameStateAction,
  IGameState,
  IPreset,
  Side,
} from "../../types";
import { otherSide, sideToIdentifier } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog";
import ButtonTray from "./ButtonTray";
import ChessClock from "./ChessClock";

interface IProps {
  gameLifecycle: GameLifecycle;
  selectedPreset: IPreset;
  setGameLifecycle: (gameLifecycle: GameLifecycle) => void;
  openSettings: () => void;
  updateGameLifecycle: (GameLifecycle: GameLifecycle) => void;
}

const ClockContainer = (props: IProps) => {
  const {
    gameLifecycle,
    selectedPreset,
    openSettings,
    setGameLifecycle,
    updateGameLifecycle,
  } = props;

  const { startingTime } = selectedPreset;
  const [gameState, setGameState] = useState<IGameState>({
    left: {
      side: undefined,
      turnStartTime: undefined,
      flagged: undefined,
      time: {
        top: startingTime * 1000,
        bottom: startingTime * 1000,
      },
    },
    right: {
      side: undefined,
      turnStartTime: undefined,
      flagged: undefined,
      time: {
        top: startingTime * 1000,
        bottom: startingTime * 1000,
      },
    },
  });

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

  const dispayedTimesRef = useRef(displayedTimes);

  const gameStateRef = useRef(gameState);
  const gameLifecycleRef = useRef(gameLifecycle);

  const selectedPresetRef = useRef(selectedPreset);

  const [resetDialogIsOpen, setResetDialogIsOpen] = useState(false);

  const updateGameState = useCallback(
    (action: GameStateAction, payload: any) => {
      let clock: "left" | "right";
      let side: Side;

      switch (action) {
        case "FIRST_TURN":
          clock = payload.clock;
          side = payload.side;
          setGameLifecycle(GameLifecycle.InProgress);
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
          break;

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
          break;

        case "DELAY_ELAPSED":
          // do something
          break;

        case "END_GAME":
          clock = payload.clock;
          side = payload.side;
          setGameLifecycle(GameLifecycle.GameOver);
          setGameState((prevState: IGameState) => {
            const otherClock = clock === "left" ? "right" : "left";
            const clocksNewState = {
              ...prevState[clock],
              flagged: side,
              turnStartTime: undefined,
            };
            const otherClocksNewState = {
              ...prevState[otherClock],
              turnStartTime: undefined,
            };
            const newGameState: IGameState = {
              left: clock === "left" ? clocksNewState : otherClocksNewState,
              right: clock === "left" ? otherClocksNewState : clocksNewState,
            };
            return newGameState;
          });
          break;

        case "PAUSE_GAME":
          setGameState(prevState => {
            const now = Date.now();
            const leftStartTime = prevState.left.turnStartTime;
            const oldLeft = prevState.left;
            const newLeft = {
              side: undefined,
              turnStartTime: undefined,
              flagged: undefined,
              time: {
                top:
                  oldLeft.side === Side.Top && leftStartTime
                    ? oldLeft.time.top - (now - leftStartTime)
                    : oldLeft.time.top,
                bottom:
                  oldLeft.side === Side.Bottom && leftStartTime
                    ? oldLeft.time.bottom - (now - leftStartTime)
                    : oldLeft.time.bottom,
              },
            };
            const rightStartTime = prevState.right.turnStartTime;
            const oldRight = prevState.right;
            const newRight = {
              side: undefined,
              turnStartTime: undefined,
              flagged: undefined,
              time: {
                top:
                  oldRight.side === Side.Top && rightStartTime
                    ? oldRight.time.top - (now - rightStartTime)
                    : oldRight.time.top,
                bottom:
                  oldRight.side === Side.Bottom && rightStartTime
                    ? oldRight.time.bottom - (now - rightStartTime)
                    : oldRight.time.bottom,
              },
            };

            return { left: newLeft, right: newRight };
          });
          break;

        case "RESET_GAME":
          const startingTimeFromRef = selectedPresetRef.current.startingTime;
          setGameState({
            left: {
              side: undefined,
              turnStartTime: undefined,
              flagged: undefined,
              time: {
                top: startingTimeFromRef * 1000,
                bottom: startingTimeFromRef * 1000,
              },
            },
            right: {
              side: undefined,
              turnStartTime: undefined,
              flagged: undefined,
              time: {
                top: startingTimeFromRef * 1000,
                bottom: startingTimeFromRef * 1000,
              },
            },
          });
          setDisplayedTimes({
            left: {
              top: startingTimeFromRef,
              bottom: startingTimeFromRef,
            },
            right: {
              top: startingTimeFromRef,
              bottom: startingTimeFromRef,
            },
          });

          break;
      }
    },
    [setGameLifecycle],
  );
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    dispayedTimesRef.current = displayedTimes;
  }, [displayedTimes]);
  useEffect(() => {
    selectedPresetRef.current = selectedPreset;
  }, [selectedPreset]);

  useEffect(() => {
    gameLifecycleRef.current = gameLifecycle;
    console.log(` it is now ${gameLifecycle}`);
  }, [gameLifecycle, props.gameLifecycle]);

  useEffect(() => {
    console.log("selected preset has changed!");
    updateGameState(GameStateAction.ResetGame, {});
  }, [selectedPreset, updateGameState]);

  const onClickClockFace = (side: Side, clock: "left" | "right") => {
    const state = gameStateRef.current;
    const lifecycle = gameLifecycleRef.current;
    if (state[clock].turnStartTime) {
      updateGameState(GameStateAction.EndTurn, { side, clock });
    } else if (
      lifecycle === GameLifecycle.InProgress ||
      lifecycle === GameLifecycle.NotStarted ||
      lifecycle === GameLifecycle.Paused
    ) {
      updateGameState(GameStateAction.FirstTurn, { side, clock });
    }
  };

  // this effect updates the displayed times on clock faces
  useEffect(() => {
    const updateDisplayId = window.setInterval(() => {
      if (gameLifecycleRef.current === GameLifecycle.InProgress) {
        const { left, right } = gameStateRef.current;
        const times = [
          (left.time.top -
            (left.side === Side.Top && left.turnStartTime
              ? Date.now() - left.turnStartTime
              : 0)) /
            1000,
          (left.time.bottom -
            (left.side === Side.Bottom && left.turnStartTime
              ? Date.now() - left.turnStartTime
              : 0)) /
            1000,
          (right.time.top -
            (right.side === Side.Top && right.turnStartTime
              ? Date.now() - right.turnStartTime
              : 0)) /
            1000,
          (right.time.bottom -
            (right.side === Side.Bottom && right.turnStartTime
              ? Date.now() - right.turnStartTime
              : 0)) /
            1000,
        ];
        const min = Math.min(...times);
        if (min <= 0) {
          const index = times.indexOf(min);
          switch (index) {
            case 0:
              updateGameState(GameStateAction.EndGame, {
                side: "TOP",
                clock: "left",
              });
              break;
            case 1:
              updateGameState(GameStateAction.EndGame, {
                side: "BOTTOM",
                clock: "left",
              });
              break;
            case 2:
              updateGameState(GameStateAction.EndGame, {
                side: "TOP",
                clock: "right",
              });
              break;
            case 3:
              updateGameState(GameStateAction.EndGame, {
                side: "BOTTOM",
                clock: "right",
              });
              break;
          }
        }
        const roundedTimes = times.map(time => Math.ceil(time));
        const currentTimes = dispayedTimesRef.current;
        if (
          currentTimes.left.top !== roundedTimes[0] ||
          currentTimes.left.bottom !== roundedTimes[1] ||
          currentTimes.right.top !== roundedTimes[2] ||
          currentTimes.right.bottom !== roundedTimes[3]
        ) {
          setDisplayedTimes(() => {
            return {
              left: {
                top: roundedTimes[0],
                bottom: roundedTimes[1],
              },
              right: {
                top: roundedTimes[2],
                bottom: roundedTimes[3],
              },
            };
          });
        }
      }
    }, 30);

    return () => {
      window.clearInterval(updateDisplayId);
    };
  }, [updateGameState]);

  const onPause = useCallback(() => {
    updateGameLifecycle(GameLifecycle.Paused);
    updateGameState(GameStateAction.PauseGame, {});
  }, [updateGameLifecycle, updateGameState]);

  const onClickSettingsButton = useCallback(() => {
    onPause();
    openSettings();
  }, [onPause, openSettings]);

  const onClickResetButton = useCallback(() => {
    onPause();
    setResetDialogIsOpen(true);
  }, [onPause]);

  const handleYesReset = () => {
    updateGameState(GameStateAction.ResetGame, {});
    setResetDialogIsOpen(false);
  };

  const handleNoReset = () => {
    setResetDialogIsOpen(false);
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
        onClickResetButton={onClickResetButton}
        onClickPauseButton={onPause}
        onClickSettingsButton={onClickSettingsButton}
      />
      <ChessClock
        className="RightClock"
        onClickClockFace={onClickClockFace}
        clock="right"
        gameState={gameState}
        displayedTimes={displayedTimes.right}
      />
      {resetDialogIsOpen && (
        <ConfirmationDialog
          open={resetDialogIsOpen}
          handleYes={handleYesReset}
          handleNo={handleNoReset}
          text={"Are you sure you want to reset the clock?"}
        />
      )}
    </React.Fragment>
  );
};

export default ClockContainer;
