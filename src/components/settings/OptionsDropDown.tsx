import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { ISettings } from "../../types";
import AboutDialog from "./AboutDialog";

interface IProps {
  settings: ISettings;
  setSettings: (settings: Partial<ISettings>) => void;
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
  const { settings, setSettings } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [aboutDialogIsOpen, setAboutDialogIsOpen] = React.useState(false);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const onClickAbout = () => {
    setAboutDialogIsOpen(true);
  };

  // function onClickFullScreen(e: any) {
  //   if (
  //     e.target.getAttribute("type") === "checkbox" ||
  //     e.target.getAttribute("role") === "menuitem"
  //   ) {
  //     props.setSettings({ fullScreen: !settings.fullScreen });
  //   }
  // }
  function onClickSingleTap(e: any) {
    if (
      e.target.getAttribute("type") === "checkbox" ||
      e.target.getAttribute("role") === "menuitem"
    ) {
      setSettings({ singleTap: !settings.singleTap });
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
        {/* <MenuItem onClick={onClickFullScreen}>
          <FormControlLabel
            control={<Checkbox checked={settings.fullScreen} />}
            label="Full Screen"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
        </MenuItem> */}
        <MenuItem onClick={onClickSingleTap}>
          <FormControlLabel
            control={<Checkbox checked={settings.singleTap} />}
            label="Single tap starts timers"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
        </MenuItem>
        <MenuItem onClick={onClickAbout}>
          <div className={classes.aboutMenuItem}>About</div>
        </MenuItem>
      </Menu>
      <AboutDialog open={aboutDialogIsOpen} setOpen={setAboutDialogIsOpen} />
    </React.Fragment>
  );
}

export default OptionsDropDown;
