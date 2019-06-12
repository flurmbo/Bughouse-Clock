import React, { Component } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import PauseIcon from "@material-ui/icons/Pause";
import { withStyles } from "@material-ui/core/styles";
import { GameState } from "./types";
import { isCordova } from "./utils";

declare let navigator: any;

interface IProps {
  onResetGame: () => void;
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  gameState: GameState;
  classes: any;
  openConfirmResetDialog: () => void;
}

const styles = {
  root: {
    width: "70%",
    height: "auto"
  }
};

class ButtonTray extends Component<IProps> {
  handleOnClickResetButton = () => {
    this.props.openConfirmResetDialog();
    //this.props.onResetGame();
  };
  onConfirm = (i: number) => {
    alert("You selected button " + i);
  };
  dave = () => {
    if (isCordova()) {
      navigator.notification.confirm(
        "a winner is you",
        this.onConfirm,
        "Game Over",
        ["Restart", "Exit"]
      );
    } else {
      alert("I'm sorry Dave, I'm afraid I can't do that.");
    }
  };

  render() {
    const { classes, gameState, onClickSettingsButton } = this.props;
    return (
      <React.Fragment>
        <div className="topButton">
          <SettingsIcon
            classes={{ root: classes.root }}
            fontSize="large"
            onClick={onClickSettingsButton}
          />
        </div>
        {gameState == GameState.InProgress && (
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
