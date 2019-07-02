import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { TimerOptions } from "../../types";

interface IProps {
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
function EditPresetFormAppBar(props: IProps) {
  const { setEditPresetFormIsOpen } = props;
  const appBarDisplayText = "Edit preset";
  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color="secondary">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setEditPresetFormIsOpen(false)}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography className={classes.title}>
              {appBarDisplayText}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default EditPresetFormAppBar;
