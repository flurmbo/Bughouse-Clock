import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { IncrementType, IPreset, ISettings } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import EditPresetForm from "./EditPresetForm";
import ListOfPresets from "./ListOfPresets";
import SettingsAppBar from "./SettingsAppBar";

interface IProps {
  open: boolean;
  setSelectedPreset: (presetId: string) => void;
  presets: IPreset[];
  closeSettings: () => void;
  updatePresets: (presets: IPreset[]) => void;
  selectedPreset: string;
  settings: ISettings;
  setSettings: (settings: Partial<ISettings>) => void;
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
    setSelectedPreset,
    setSettings,
    presets,
    updatePresets,
    closeSettings,
    selectedPreset,
    settings,
  } = props;

  function onYesDelete() {
    updatePresets(presets.filter(preset => preset.id !== selectedPreset));
    setDeletePresetDialogIsOpen(false);
  }

  function editNewPreset() {
    const id = uuid();
    updatePresets([
      ...presets,
      {
        text: "",
        increment: 0,
        startingTime: 0,
        incrementType: IncrementType.Delay,
        id,
      },
    ]);
    setFocusedPreset(id);
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
  const [focusedPreset, setFocusedPreset] = useState("");
  const [deletePresetDialogIsOpen, setDeletePresetDialogIsOpen] = useState(
    false,
  );
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
          setSettings={setSettings}
          settings={settings}
          setSelectedPreset={setSelectedPreset}
          setShowEditDeletePresetButtons={setShowEditDeletePresetButtons}
          showEditDeletePresetButtons={showEditDeletePresetButtons}
          closeSettings={closeSettings}
        />
        <Container>
          <ListOfPresets
            focusedPreset={focusedPreset}
            setFocusedPreset={setFocusedPreset}
            presets={presets}
            showEditDeletePresetButtons={showEditDeletePresetButtons}
            setDeletePresetDialogIsOpen={setDeletePresetDialogIsOpen}
            setEditPresetFormIsOpen={setEditPresetFormIsOpen}
            updatePresets={updatePresets}
            setSelectedPreset={setSelectedPreset}
            selectedPreset={selectedPreset}
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
      {editPresetFormIsOpen && (
        <EditPresetForm
          open={editPresetFormIsOpen}
          updatePresets={updatePresets}
          editedPreset={
            focusedPreset
              ? presets.find(preset => preset.id === focusedPreset)
              : undefined
          }
          setEditPresetFormIsOpen={setEditPresetFormIsOpen}
          presets={presets}
        />
      )}
    </React.Fragment>
  );
}

export default SettingsMenu;
