import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TimerOptions } from "../../types";

interface IProps {
  timerOptions: TimerOptions;
  setTimerOptions: (
    newTimerOptions: Partial<TimerOptions>,
    reset?: boolean
  ) => () => void;
}

function OptionsDropDown(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onClickFullScreen(e: any) {
    if (
      e.target.getAttribute("type") == "checkbox" ||
      e.target.getAttribute("role") == "menuitem"
    ) {
      props.setTimerOptions(
        { fullScreen: !props.timerOptions.fullScreen },
        false
      )();
    }
  }
  function onClickSingleTap(e: any) {
    if (
      e.target.getAttribute("type") == "checkbox" ||
      e.target.getAttribute("role") == "menuitem"
    ) {
      props.setTimerOptions(
        { singleTap: !props.timerOptions.singleTap },
        false
      )();
    }
  }
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
          />
        </MenuItem>
        <MenuItem onClick={onClickSingleTap}>
          <FormControlLabel
            control={<Checkbox checked={props.timerOptions.singleTap} />}
            label="Single tap starts timers"
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default OptionsDropDown;
