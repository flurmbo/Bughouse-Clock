import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { IPreset, ITimerOptions } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import EditPresetForm from "./EditPresetForm";
import ListOfPresets from "./ListOfPresets";
import SettingsAppBar from "./SettingsAppBar";

interface IProps {
  open: boolean;
  setTimerOptions: (newTimerOptions: Partial<ITimerOptions>) => () => void;
  timerOptions: ITimerOptions;
  presets: IPreset[];
  closeSettings: () => void;
  updatePresets: (presets: IPreset[]) => void;
}

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: "100%",
  },
  fab: {
    bottom: theme.spacing(2),
    position: "absolute",
    right: theme.spacing(2),
  },
}));

function SettingsMenu(props: IProps) {
  const {
    open,
    setTimerOptions,
    timerOptions,
    presets,
    updatePresets,
    closeSettings,
  } = props;

  function onYesDelete() {
    updatePresets(presets.filter(preset => preset.id !== selectedPreset));
    setDeletePresetDialogIsOpen(false);
  }

  function editNewPreset() {
    const id = uuid();
    updatePresets([...presets, { text: "", delay: 0, startingTime: 0, id }]);
    setSelectedPreset(id);
    setEditPresetFormIsOpen(true);
  }

  function closePresetDialog() {
    setDeletePresetDialogIsOpen(false);
  }

  const classes = useStyles();
  const [
    showEditDeletePresetButtons,
    setShowEditDeletePresetButtons,
  ] = useState(false);
  const [deletePresetDialogIsOpen, setDeletePresetDialogIsOpen] = useState(
    false,
  );

  const [selectedPreset, setSelectedPreset] = useState("");
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
          <Fab
            color="secondary"
            aria-label="Add"
            className={classes.fab}
            onClick={editNewPreset}
          >
            <AddIcon />
          </Fab>
        )}
      </Drawer>
      <ConfirmationDialog
        open={deletePresetDialogIsOpen}
        handleYes={onYesDelete}
        handleNo={closePresetDialog}
        text={"Are you sure you want to delete this preset?"}
      />
      <EditPresetForm
        open={editPresetFormIsOpen}
        updatePresets={updatePresets}
        editedPreset={
          selectedPreset
            ? presets.find(preset => preset.id === selectedPreset)
            : undefined
        }
        setEditPresetFormIsOpen={setEditPresetFormIsOpen}
        presets={presets}
      />
    </React.Fragment>
  );
}

export default SettingsMenu;
