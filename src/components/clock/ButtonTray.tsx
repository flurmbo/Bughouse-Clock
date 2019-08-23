import { withStyles } from "@material-ui/core/styles";
import PauseIcon from "@material-ui/icons/Pause";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { Component } from "react";
import { GameLifecycle } from "../../types";
import { isCordova } from "../../utils";

declare let navigator: any;

interface IProps {
  onResetGame: () => void;
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  gameLifecycle: GameLifecycle;
  classes: any;
  openConfirmResetDialog: () => void;
}

const styles = {
  root: {
    height: "auto",
    width: "70%",
  },
};

class ButtonTray extends Component<IProps> {
  public handleOnClickResetButton = () => {
    this.props.openConfirmResetDialog();
    // this.props.onResetGame();
  };
  public onConfirm = (i: number) => {
    alert("You selected button " + i);
  };
  public dave = () => {
    if (isCordova()) {
      navigator.notification.confirm(
        "a winner is you",
        this.onConfirm,
        "Game Over",
        ["Restart", "Exit"],
      );
    } else {
      alert("I'm sorry Dave, I'm afraid I can't do that.");
    }
  };

  public render() {
    const { classes, gameLifecycle, onClickSettingsButton } = this.props;
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
              onClick={this.dave}
              fontSize="large"
            />
          </div>
        )}
        <div className="bottomButton">
          <RefreshIcon
            classes={{ root: classes.root }}
            fontSize="large"
            onClick={this.handleOnClickResetButton}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ButtonTray);
