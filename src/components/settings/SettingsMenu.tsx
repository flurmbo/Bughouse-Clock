import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { IncrementType, IPreset, ISettings, PresetsAction } from "../../types";
import { getPresetById, isCordova } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog";
import EditPresetForm from "./EditPresetForm";
import ListOfPresets from "./ListOfPresets";
import SettingsAppBar from "./SettingsAppBar";

interface IProps {
  open: boolean;
  setSelectedPreset: (presetId: string) => void;
  presets: IPreset[];
  closeSettings: () => void;
  updatePresets: (action: PresetsAction, payload: { preset: IPreset }) => void;
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
    const presetToDelete = getPresetById(focusedPreset, presets);
    if (presetToDelete) {
      updatePresets(PresetsAction.DeletePreset, {
        preset: presetToDelete,
      });
    }
    setDeletePresetDialogIsOpen(false);
  }

  function editNewPreset() {
    const id = uuid();
    updatePresets(PresetsAction.AddPreset, {
      preset: {
        text: "",
        increment: 0,
        startingTime: 0,
        incrementType: IncrementType.None,
        id,
      },
    });
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

  const [androidBackCallback, setAndroidBackCallback] = useState(() => {
    return () => {
      //
    };
  });
  const androidBackCallbackRef = useRef(androidBackCallback);

  useEffect(() => {
    androidBackCallbackRef.current = androidBackCallback;
  }, [androidBackCallback]);

  const onPressAndroidBackButton = () => {
    const currentCallback = androidBackCallbackRef.current;
    currentCallback();
  };

  useEffect(() => {
    console.log("setting up cordova listener!");
    if (isCordova()) {
      document.addEventListener("backbutton", onPressAndroidBackButton, false);
    }
    return () => {
      console.log("tearing down cordova listener!");
      if (isCordova()) {
        document.removeEventListener(
          "backbutton",
          onPressAndroidBackButton,
          false,
        );
      }
    };
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!editPresetFormIsOpen && (
          <SettingsAppBar
            setSettings={setSettings}
            settings={settings}
            setShowEditDeletePresetButtons={setShowEditDeletePresetButtons}
            showEditDeletePresetButtons={showEditDeletePresetButtons}
            closeSettings={closeSettings}
            setAndroidBackCallback={setAndroidBackCallback}
          />
        )}
        <Container>
          <ListOfPresets
            focusedPreset={focusedPreset}
            setFocusedPreset={setFocusedPreset}
            presets={presets}
            showEditDeletePresetButtons={showEditDeletePresetButtons}
            setDeletePresetDialogIsOpen={setDeletePresetDialogIsOpen}
            setEditPresetFormIsOpen={setEditPresetFormIsOpen}
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
          setShowEditDeletePresetButtons={setShowEditDeletePresetButtons}
          setAndroidBackCallback={setAndroidBackCallback}
        />
      )}
    </React.Fragment>
  );
}

export default SettingsMenu;
