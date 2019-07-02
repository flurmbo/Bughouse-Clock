import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { TimerOptions, Preset } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import EditPresetForm from "./EditPresetForm";
import SettingsAppBar from "./SettingsAppBar";
import ListOfPresets from "./ListOfPresets";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

interface IProps {
  open: boolean;
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  timerOptions: TimerOptions;
  presets: Preset[];
  closeSettings: () => void;
  updatePresets: (presets: Preset[]) => void;
}

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function SettingsMenu(props: IProps) {
  function onYesDelete() {
    updatePresets(presets.filter(preset => preset.id != selectedPreset));
    setDeletePresetDialogIsOpen(false);
  }
  const {
    open,
    setTimerOptions,
    timerOptions,
    presets,
    updatePresets,
    closeSettings,
  } = props;
  const classes = useStyles();
  const [
    showEditDeletePresetButtons,
    setShowEditDeletePresetButtons,
  ] = useState(false);
  const [deletePresetDialogIsOpen, setDeletePresetDialogIsOpen] = useState(
    false
  );
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [editPresetFormIsOpen, setEditPresetFormIsOpen] = useState(false);
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
          closeSettings={closeSettings}
        />
        <Container>
          <ListOfPresets
            presets={presets}
            showEditDeletePresetButtons={showEditDeletePresetButtons}
            setDeletePresetDialogIsOpen={setDeletePresetDialogIsOpen}
            setEditPresetFormIsOpen={setEditPresetFormIsOpen}
            setTimerOptions={setTimerOptions}
            updatePresets={updatePresets}
            setSelectedPreset={setSelectedPreset}
          />
        </Container>
        {!showEditDeletePresetButtons && (
          <Fab color="secondary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        )}
      </Drawer>
      <ConfirmationDialog
        open={deletePresetDialogIsOpen}
        handleYes={onYesDelete}
        handleNo={() => {
          setDeletePresetDialogIsOpen(false);
        }}
        text={"Are you sure you want to delete this preset?"}
      />
      <EditPresetForm
        open={editPresetFormIsOpen}
        updatePresets={updatePresets}
        editedPreset={
          selectedPreset
            ? presets.find(preset => preset.id == selectedPreset)
            : undefined
        }
        setEditPresetFormIsOpen={setEditPresetFormIsOpen}
        presets={presets}
      />
    </React.Fragment>
  );
}

export default SettingsMenu;
