import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { IPreset, ITimerOptions } from "../../types";
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

  useEffect(() => {
    setUnsavedPreset(editedPreset);
  }, [editedPreset]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer open={open} classes={{ paper: classes.drawerPaper }}>
        <EditPresetFormAppBar
          setEditPresetFormIsOpen={setEditPresetFormIsOpen}
          savePreset={savePreset}
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
    </React.Fragment>
  );
}

export default EditPresetForm;
