import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function OptionsDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handlClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        edge="end"
        aria-haspopup="true"
        onClick={handlClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Full Screen</MenuItem>
        <MenuItem>Start both timers with single tap</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default OptionsDropDown;
