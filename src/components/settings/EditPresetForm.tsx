import React, { useEffect, useState, useCallback } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import { IPreset, ITimerOptions, IDuration } from "../../types";
import { durationToSeconds } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog";
import DurationPickerDialog from "./DurationPickerDialog";
import EditPresetFormAppBar from "./EditPresetFormAppBar";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

  const handleChangeDuration = (duration: IDuration) => {
    if (unsavedPreset) {
      const newUnsavedPreset: IPreset = {
        ...unsavedPreset,
        startingTime: durationToSeconds(duration),
      };
      setUnsavedPreset(newUnsavedPreset);
    }
  };

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
  const [durationPickerDialogIsOpen, setDurationPickerDialogIsOpen] = useState(
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

  const openDurationPickerDialog = useCallback(
    () => setDurationPickerDialogIsOpen(true),
    [],
  );

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
          <TextField
            value={unsavedPreset ? unsavedPreset.startingTime : ""}
            label="startingTime"
            onChange={handleChange("startingTime")}
            onClick={openDurationPickerDialog}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Increment Type</FormLabel>
            <RadioGroup aria-label="increment" name="increment">
              <FormControlLabel
                value="delay"
                control={<Radio />}
                label="Delay"
              />
              <FormControlLabel value="add" control={<Radio />} label="Add" />
            </RadioGroup>
          </FormControl>
        </Container>
      </Drawer>
      <ConfirmationDialog
        open={discardChangesDialogIsOpen}
        text="Discard unsaved changes?"
        handleYes={closeEditPresetFormWithoutSaving}
        handleNo={setDiscardChangesDialogIsOpen}
      />
      {durationPickerDialogIsOpen && (
        <DurationPickerDialog
          open={durationPickerDialogIsOpen}
          setOpen={setDurationPickerDialogIsOpen}
          initialDuration={unsavedPreset ? unsavedPreset.startingTime : 0}
          onClose={handleChangeDuration}
        />
      )}
    </React.Fragment>
  );
}

export default EditPresetForm;
