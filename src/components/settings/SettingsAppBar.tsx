import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { ISettings } from "../../types";
import OptionsDropDown from "./OptionsDropDown";

interface IProps {
  setShowEditDeletePresetButtons: React.Dispatch<React.SetStateAction<boolean>>;
  showEditDeletePresetButtons: boolean;
  settings: ISettings;
  setSettings: (settings: Partial<ISettings>) => void;
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
    setShowEditDeletePresetButtons,
    showEditDeletePresetButtons,
    closeSettings,
    settings,
    setSettings,
  } = props;

  function toggleShowEditDeleteButtons() {
    setShowEditDeletePresetButtons(!showEditDeletePresetButtons);
  }

  const appBarDisplayText = showEditDeletePresetButtons
    ? "Edit or Delete Presets"
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
                  onClick={toggleShowEditDeleteButtons}
                >
                  <EditIcon />
                </IconButton>
                <OptionsDropDown
                  settings={settings}
                  setSettings={setSettings}
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
