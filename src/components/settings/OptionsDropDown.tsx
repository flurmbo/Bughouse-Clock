import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { ITimerOptions } from "../../types";

interface IProps {
  timerOptions: ITimerOptions;
  setTimerOptions: (
    newTimerOptions: Partial<ITimerOptions>,
    reset?: boolean
  ) => () => void;
}

const useStyles = makeStyles({
  aboutMenuItem: {
    marginLeft: "16px",
  },
  formControlLabel: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

function OptionsDropDown(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onClickButton(callback: () => void) {
    return (e: any) => {
      if (
        e.target.getAttribute("type") === "checkbox" ||
        e.target.getAttribute("role") === "menuitem"
      ) {
        callback();
      }
    };
  }

  const onClickAbout = onClickButton(() => {
    console.log("you clicked about!");
  });

  function onClickFullScreen(e: any) {
    if (
      e.target.getAttribute("type") === "checkbox" ||
      e.target.getAttribute("role") === "menuitem"
    ) {
      props.setTimerOptions(
        { fullScreen: !props.timerOptions.fullScreen },
        false
      )();
    }
  }
  function onClickSingleTap(e: any) {
    if (
      e.target.getAttribute("type") === "checkbox" ||
      e.target.getAttribute("role") === "menuitem"
    ) {
      props.setTimerOptions(
        { singleTap: !props.timerOptions.singleTap },
        false
      )();
    }
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        edge="end"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onClickFullScreen}>
          <FormControlLabel
            control={<Checkbox checked={props.timerOptions.fullScreen} />}
            label="Full Screen"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
        </MenuItem>
        <MenuItem onClick={onClickSingleTap}>
          <FormControlLabel
            control={<Checkbox checked={props.timerOptions.singleTap} />}
            label="Single tap starts timers"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
        </MenuItem>
        <MenuItem onClick={onClickAbout}>
          <div className={classes.aboutMenuItem}>About</div>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default OptionsDropDown;
