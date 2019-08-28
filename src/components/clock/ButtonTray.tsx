import { withStyles } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { GameLifecycle } from "../../types";

// declare let navigator: any;

interface IProps {
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  onClickResetButton: () => void;
  gameLifecycle: GameLifecycle;
  classes: any;
}

const styles = {
  root: {
    height: "auto",
    width: "70%",
  },
};

const ButtonTray = React.memo((props: IProps) => {
  const {
    classes,
    gameLifecycle,
    onClickSettingsButton,
    onClickPauseButton,
    onClickResetButton,
  } = props;
  return (
    <React.Fragment>
      <div className="topButton">
        <SettingsIcon
          classes={{ root: classes.root }}
          fontSize="large"
          onClick={onClickSettingsButton}
        />
      </div>
      {gameLifecycle === GameLifecycle.InProgress && (
        <div className="middleButton">
          <PauseIcon
            classes={{ root: classes.root }}
            onClick={onClickPauseButton}
            fontSize="large"
          />
        </div>
      )}
      <div className="bottomButton">
        <RefreshIcon
          classes={{ root: classes.root }}
          fontSize="large"
          onClick={onClickResetButton}
        />
      </div>
    </React.Fragment>
  );
});

export default withStyles(styles)(ButtonTray);
