import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { IPreset, ITimerOptions } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";
import EditPresetFormAppBar from "./EditPresetFormAppBar";

interface IProps {
  open: boolean;
  editedPreset?: IPreset;
  presets: IPreset[];
  updatePresets: (presets: IPreset[]) => void;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: "100%",
  },
}));

function EditPresetForm(props: IProps) {
  function savePreset() {
    updatePresets(
      presets.map(preset => {
        if (editedPreset && unsavedPreset && preset.id === editedPreset.id) {
          return unsavedPreset;
        } else {
          return preset;
        }
      }),
    );
  }
  function handleChange(name: string) {
    return (event: any) => {
      if (unsavedPreset) {
        const newUnsavedPreset: IPreset = {
          ...unsavedPreset,
          [name]: event.target.value,
        };
        setUnsavedPreset(newUnsavedPreset);
      }
    };
  }

  const {
    open,
    editedPreset,
    updatePresets,
    setEditPresetFormIsOpen,
    presets,
  } = props;
  const [unsavedPreset, setUnsavedPreset] = useState(editedPreset);
  const [discardChangesDialogIsOpen, setDiscardChangesDialogIsOpen] = useState(
    false,
  );
  useEffect(() => {
    setUnsavedPreset(editedPreset);
  }, [editedPreset]);

  function closeEditPresetFormWithoutSaving(): void {
    setDiscardChangesDialogIsOpen(false);
    setEditPresetFormIsOpen(false);
    setUnsavedPreset(undefined);
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer open={open} classes={{ paper: classes.drawerPaper }}>
        <EditPresetFormAppBar
          editedPreset={editedPreset}
          unsavedPreset={unsavedPreset}
          setEditPresetFormIsOpen={setEditPresetFormIsOpen}
          savePreset={savePreset}
          setDiscardChangesDialogIsOpen={setDiscardChangesDialogIsOpen}
        />
        <Container>
          {editedPreset && `You have selected preset "${editedPreset.text}".`}
          <TextField
            value={unsavedPreset ? unsavedPreset.text : ""}
            label="text"
            onChange={handleChange("text")}
          />
        </Container>
      </Drawer>
      <ConfirmationDialog
        open={discardChangesDialogIsOpen}
        text="Discard unsaved changes?"
        handleYes={closeEditPresetFormWithoutSaving}
        handleNo={setDiscardChangesDialogIsOpen}
      />
    </React.Fragment>
  );
}

export default EditPresetForm;
