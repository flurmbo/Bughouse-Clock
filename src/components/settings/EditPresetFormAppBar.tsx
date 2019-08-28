import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { IPreset } from "../../types";

interface IProps {
  editedPreset: IPreset | undefined;
  unsavedPreset: IPreset | undefined;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  savePreset: () => void;
  setDiscardChangesDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditDeletePresetButtons: React.Dispatch<React.SetStateAction<boolean>>;
}
const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

function ElevationScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function EditPresetFormAppBar(props: IProps) {
  const {
    editedPreset,
    unsavedPreset,
    setEditPresetFormIsOpen,
    setDiscardChangesDialogIsOpen,
    savePreset,
    setShowEditDeletePresetButtons,
  } = props;
  const appBarDisplayText = "Edit Preset";

  function closePresetForm() {
    setEditPresetFormIsOpen(false);
  }

  function handleBackButton() {
    if (JSON.stringify(editedPreset) !== JSON.stringify(unsavedPreset)) {
      setDiscardChangesDialogIsOpen(true);
    } else if (unsavedPreset && unsavedPreset.text) {
      closePresetForm();
    } else {
      props.setShowError(true);
    }
  }

  function savePresetAndCloseForm() {
    if (unsavedPreset && unsavedPreset.text) {
      savePreset();
      closePresetForm();
      setShowEditDeletePresetButtons(false);
    } else {
      props.setShowError(true);
    }
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar color="secondary">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleBackButton}>
              <ArrowBackIcon />
            </IconButton>

            <Typography className={classes.title}>
              {appBarDisplayText}
            </Typography>
            <Button color="inherit" onClick={savePresetAndCloseForm}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default EditPresetFormAppBar;
