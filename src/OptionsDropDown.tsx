import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TimerOptions } from "./types";

interface IProps {
  timerOptions: TimerOptions;
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
}

function OptionsDropDown(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  // function handleClose() {
  //   setAnchorEl(null);
  // }

  function onClickFullScreen() {
    console.log("onclick handler is going and props is");
    console.log(props);
    props.setTimerOptions({ fullScreen: true })();
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <MenuItem onClick={onClickFullScreen}>
          <FormControlLabel
            control={<Checkbox checked={props.timerOptions.fullScreen} />}
            label="Full Screen"
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default OptionsDropDown;
