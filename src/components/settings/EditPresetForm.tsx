import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { TimerOptions, Preset } from "../../types";
import EditPresetFormAppBar from "./EditPresetFormAppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
interface IProps {
  open: boolean;
  preset?: Preset;
  updatePresets: (presets: Preset[]) => void;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: "100%",
  },
}));

function EditPresetForm(props: IProps) {
  const { open, preset, updatePresets, setEditPresetFormIsOpen } = props;
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
          {preset && `You have selected preset "${preset.text}".`}
        </Container>
      </Drawer>
    </React.Fragment>
  );
}

export default EditPresetForm;
