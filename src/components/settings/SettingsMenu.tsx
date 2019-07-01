import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { TimerOptions, Preset } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import SettingsAppBar from "./SettingsAppBar";
import ListOfPresets from "./ListOfPresets";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

interface IProps {
  open: boolean;
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  timerOptions: TimerOptions;
  presets: Preset[];
  updatePresets: (presets: Preset[]) => void;
}

const useStyles = makeStyles({
  drawerPaper: {
    width: "100%",
  },
});

function SettingsMenu(props: IProps) {
  function onYesDelete() {
    updatePresets(presets.filter(preset => preset.id != selectedPreset));
    setDeletePresetDialogIsOpen(false);
  }
  const { open, setTimerOptions, timerOptions, presets, updatePresets } = props;
  const classes = useStyles();
  const [
    showEditDeletePresetButtons,
    setShowEditDeletePresetButtons,
  ] = useState(false);
  const [deletePresetDialogIsOpen, setDeletePresetDialogIsOpen] = useState(
    false
  );
  const [selectedPreset, setSelectedPreset] = useState(0);
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SettingsAppBar
          setTimerOptions={setTimerOptions}
          timerOptions={timerOptions}
          setShowEditDeletePresetButtons={setShowEditDeletePresetButtons}
          showEditDeletePresetButtons={showEditDeletePresetButtons}
        />
        <Container>
          <ListOfPresets
            presets={presets}
            showEditDeletePresetButtons={showEditDeletePresetButtons}
            setDeletePresetDialogIsOpen={setDeletePresetDialogIsOpen}
            setTimerOptions={setTimerOptions}
            updatePresets={updatePresets}
            setSelectedPreset={setSelectedPreset}
          />
        </Container>
      </Drawer>
      <ConfirmationDialog
        open={deletePresetDialogIsOpen}
        handleYes={onYesDelete}
        handleNo={() => {
          setDeletePresetDialogIsOpen(false);
        }}
        text={"Are you sure you want to delete this preset?"}
      />
    </React.Fragment>
  );
}

export default SettingsMenu;
