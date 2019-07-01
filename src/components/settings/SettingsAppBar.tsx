import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import OptionsDropDown from "./OptionsDropDown";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/AddCircle";
import { TimerOptions } from "../../types";

interface IProps {
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  timerOptions: TimerOptions;
  setShowEditDeletePresetButtons: React.Dispatch<React.SetStateAction<boolean>>;
  showEditDeletePresetButtons: boolean;
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
  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color="primary">
          <Toolbar>
            <Typography className={classes.title}>Settings</Typography>
            <IconButton color="inherit" edge="end">
              <AddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() =>
                props.setShowEditDeletePresetButtons(
                  !props.showEditDeletePresetButtons
                )
              }
            >
              <EditIcon />
            </IconButton>
            <OptionsDropDown
              setTimerOptions={props.setTimerOptions}
              timerOptions={props.timerOptions}
            />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default SettingsAppBar;
