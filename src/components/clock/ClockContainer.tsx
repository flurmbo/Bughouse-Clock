import React, { useCallback, useEffect, useRef, useState } from "react";
import { GameLifecycle, IGameState, IPreset, Side } from "../../types";
import { otherSide, sideToIdentifier } from "../../utils";
import ButtonTray from "./ButtonTray";
import ChessClock from "./ChessClock";

interface IProps {
  gameLifecycle: GameLifecycle;
  selectedPreset: IPreset;
  setGameLifecycle: (gameLifecycle: GameLifecycle) => void;
  openSettings: () => void;
  openConfirmResetDialog: () => void;
  updateGameLifecycle: (GameLifecycle: GameLifecycle) => void;
}

const ClockContainer = (props: IProps) => {
  const {
    gameLifecycle,
    selectedPreset,
    openSettings,
    openConfirmResetDialog,
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

  const gameStateRef = useRef(gameState);
  const gameLifecycleRef = useRef(gameLifecycle);

  const updateGameState = useCallback(
    (action: string, payload: any) => {
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

        case "RESET_GAME":
          setGameState({
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

          break;
      }
    },
    [setGameLifecycle, startingTime],
  );
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    gameLifecycleRef.current = gameLifecycle;
    console.log(` it is now ${gameLifecycle}`);
  }, [gameLifecycle, props.gameLifecycle]);

  const onClickClockFace = (side: Side, clock: "left" | "right") => {
    const state = gameStateRef.current;
    const lifecycle = gameLifecycleRef.current;
    if (state[clock].turnStartTime) {
      updateGameState("END_TURN", { side, clock });
    } else if (
      lifecycle === GameLifecycle.InProgress ||
      lifecycle === GameLifecycle.NotStarted ||
      lifecycle === GameLifecycle.Paused
    ) {
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
              updateGameState("END_GAME", { side: "TOP", clock: "left" });
              break;
            case 1:
              updateGameState("END_GAME", { side: "BOTTOM", clock: "left" });
              break;
            case 2:
              updateGameState("END_GAME", { side: "TOP", clock: "right" });
              break;
            case 3:
              updateGameState("END_GAME", { side: "BOTTOM", clock: "right" });
              break;
          }
        }
        setDisplayedTimes(() => {
          return {
            left: {
              top: Math.ceil(times[0]),
              bottom: Math.ceil(times[1]),
            },
            right: {
              top: Math.ceil(times[2]),
              bottom: Math.ceil(times[3]),
            },
          };
        });
      }
    }, 30);

    return () => {
      window.clearInterval(updateDisplayId);
    };
  }, [updateGameState]);

  const onPause = useCallback(() => {
    updateGameLifecycle(GameLifecycle.Paused);
    updateGameState("PAUSE_GAME", {});
  }, [updateGameLifecycle, updateGameState]);

  const onClickSettingsButton = useCallback(() => {
    onPause();
    openSettings();
  }, [onPause, openSettings]);

  const onClickResetButton = useCallback(() => {
    onPause();
    openConfirmResetDialog();
  }, [onPause, openConfirmResetDialog]);

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
    </React.Fragment>
  );
};

export default ClockContainer;
