import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import OptionsDropDown from "./OptionsDropDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  }
});

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}
function SettingsAppBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color="primary">
          <Toolbar>
            <Typography className={classes.title}>Settings</Typography>
            <OptionsDropDown />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default SettingsAppBar;
