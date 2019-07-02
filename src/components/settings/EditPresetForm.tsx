import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { TimerOptions, Preset } from "../../types";
import EditPresetFormAppBar from "./EditPresetFormAppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

interface IProps {
  open: boolean;
  editedPreset?: Preset;
  presets: Preset[];
  updatePresets: (presets: Preset[]) => void;
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
        if (editedPreset && unsavedPreset && preset.id == editedPreset.id) {
          return unsavedPreset;
        } else {
          return preset;
        }
      })
    );
  }
  function handleChange(name: string) {
    return (event: any) => {
      setUnsavedPreset(
        Object.assign({}, unsavedPreset, { [name]: event.target.value })
      );
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
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <EditPresetFormAppBar
          setEditPresetFormIsOpen={setEditPresetFormIsOpen}
        />
        <Container>
          {editedPreset && `You have selected preset "${editedPreset.text}".`}
          <TextField
            value={unsavedPreset ? unsavedPreset.text : ""}
            label="text"
            onChange={handleChange("text")}
          />
          <Button onClick={savePreset}>Save</Button>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}

export default EditPresetForm;