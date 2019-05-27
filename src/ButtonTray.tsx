import React, { Component } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import PauseIcon from "@material-ui/icons/Pause";
import { withStyles } from "@material-ui/core/styles";
import { GameState } from "./types";

interface IProps {
  onClickResetButton: () => void;
  onClickPauseButton: () => void;
  onClickSettingsButton: () => void;
  gameState: GameState;
  classes: any;
}

const styles = {
  root: {
    width: "70%",
    height: "auto"
  }
};

class ButtonTray extends Component<IProps> {
  handleOnClickResetButton = () => {
    this.props.onClickResetButton();
  };

  dave = () => {
    alert("I'm sorry Dave, I'm afraid I can't do that.");
  };

  render() {
    const { classes, gameState } = this.props;
    return (
      <React.Fragment>
        <div className="topButton">
          <SettingsIcon
            classes={{ root: classes.root }}
            fontSize="large"
            onClick={this.dave}
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
            onClick={this.dave}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ButtonTray);
