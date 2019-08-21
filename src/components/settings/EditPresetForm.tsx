import React, { useCallback, useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { IDuration, IPreset, ITimerOptions } from "../../types";
import { durationToSeconds, toDurationString } from "../../utils";
import ConfirmationDialog from "../ConfirmationDialog";
import DurationPickerDialog from "./DurationPickerDialog";
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

  const handleChangeMainTime = (duration: IDuration) => {
    if (unsavedPreset) {
      const newUnsavedPreset: IPreset = {
        ...unsavedPreset,
        startingTime: durationToSeconds(duration),
      };
      setUnsavedPreset(newUnsavedPreset);
    }
  };

  const handleChangeIncrement = (duration: IDuration) => {
    if (unsavedPreset) {
      const newUnsavedPreset: IPreset = {
        ...unsavedPreset,
        increment: durationToSeconds(duration),
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
  const [mainTimeDialogIsOpen, setMainTimeDialogIsOpen] = useState(false);
  const [incrementDialogIsOpen, setIncrementDialogIsOpen] = useState(false);

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setUnsavedPreset(editedPreset);
  }, [editedPreset]);

  function closeEditPresetFormWithoutSaving(): void {
    setDiscardChangesDialogIsOpen(false);
    setEditPresetFormIsOpen(false);
    setUnsavedPreset(undefined);
  }

  const openMainTimeDialog = useCallback(
    () => setMainTimeDialogIsOpen(true),
    [],
  );

  const openIncrementDialog = useCallback(
    () => setIncrementDialogIsOpen(true),
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
          setShowError={setShowError}
        />
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                error={
                  showError && unsavedPreset && unsavedPreset.text.length === 0
                }
                value={unsavedPreset ? unsavedPreset.text : ""}
                label="Preset Name"
                onChange={handleChange("text")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={
                  unsavedPreset
                    ? toDurationString(unsavedPreset.startingTime)
                    : ""
                }
                label="Main Time"
                onTouchStart={openMainTimeDialog}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={
                  unsavedPreset ? toDurationString(unsavedPreset.increment) : ""
                }
                label="Increment"
                onTouchStart={openIncrementDialog}
                fullWidth
              />
            </Grid>
          </Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend">Increment Type</FormLabel>
            <RadioGroup aria-label="increment" name="increment">
              <FormControlLabel
                value="delay"
                control={<Radio />}
                label="Delay"
              />
              <FormControlLabel
                value="fischer"
                control={<Radio />}
                label="Fischer"
              />
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
      {mainTimeDialogIsOpen && (
        <DurationPickerDialog
          open={mainTimeDialogIsOpen}
          setOpen={setMainTimeDialogIsOpen}
          initialDuration={unsavedPreset ? unsavedPreset.startingTime : 0}
          onClose={handleChangeMainTime}
          title="Select Main Time"
        />
      )}
      {incrementDialogIsOpen && (
        <DurationPickerDialog
          open={incrementDialogIsOpen}
          setOpen={setIncrementDialogIsOpen}
          initialDuration={unsavedPreset ? unsavedPreset.increment : 0}
          onClose={handleChangeIncrement}
          title="Select Increment Time"
        />
      )}
    </React.Fragment>
  );
}

export default EditPresetForm;
