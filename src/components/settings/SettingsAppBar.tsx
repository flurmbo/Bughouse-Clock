import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import OptionsDropDown from "./OptionsDropDown";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { TimerOptions } from "../../types";

interface IProps {
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  timerOptions: TimerOptions;
  setShowEditDeletePresetButtons: React.Dispatch<React.SetStateAction<boolean>>;
  showEditDeletePresetButtons: boolean;
  closeSettings: () => void;
}
const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

function ElevationScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
function SettingsAppBar(props: IProps) {
  const {
    setTimerOptions,
    timerOptions,
    setShowEditDeletePresetButtons,
    showEditDeletePresetButtons,
    closeSettings,
  } = props;
  const appBarDisplayText = showEditDeletePresetButtons
    ? "Edit or delete presets"
    : "Settings";
  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color={showEditDeletePresetButtons ? "secondary" : "primary"}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={
                showEditDeletePresetButtons
                  ? () => setShowEditDeletePresetButtons(false)
                  : closeSettings
              }
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography className={classes.title}>
              {appBarDisplayText}
            </Typography>
            {!showEditDeletePresetButtons && (
              <React.Fragment>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() =>
                    setShowEditDeletePresetButtons(!showEditDeletePresetButtons)
                  }
                >
                  <EditIcon />
                </IconButton>
                <OptionsDropDown
                  setTimerOptions={setTimerOptions}
                  timerOptions={timerOptions}
                />
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default SettingsAppBar;
