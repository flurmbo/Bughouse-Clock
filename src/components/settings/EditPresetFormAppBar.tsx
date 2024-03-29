import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useCallback, useEffect } from "react";
import { IPreset } from "../../types";

interface IProps {
  editedPreset: IPreset | undefined;
  unsavedPreset: IPreset | undefined;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  savePreset: () => void;
  setDiscardChangesDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditDeletePresetButtons: React.Dispatch<React.SetStateAction<boolean>>;
  setAndroidBackCallback: React.Dispatch<React.SetStateAction<() => void>>;
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
    setAndroidBackCallback,
    setShowError,
  } = props;
  const appBarDisplayText = "Edit Preset";

  const closePresetForm = useCallback(() => {
    setEditPresetFormIsOpen(false);
  }, [setEditPresetFormIsOpen]);

  const handleBackButton = useCallback(() => {
    if (JSON.stringify(editedPreset) !== JSON.stringify(unsavedPreset)) {
      setDiscardChangesDialogIsOpen(true);
    } else if (unsavedPreset && unsavedPreset.text) {
      closePresetForm();
    } else {
      setShowError(true);
    }
  }, [
    editedPreset,
    closePresetForm,
    setDiscardChangesDialogIsOpen,
    unsavedPreset,
    setShowError,
  ]);

  useEffect(() => {
    console.log("setting up edit preset app bar!");
    return () => {
      console.log("tearing down edit preset app bar!");
    };
  }, []);

  function savePresetAndCloseForm() {
    if (unsavedPreset && unsavedPreset.text) {
      savePreset();
      closePresetForm();
      setShowEditDeletePresetButtons(false);
    } else {
      props.setShowError(true);
    }
  }
  useEffect(() => {
    console.log("handlebackbutton changed");
  }, [handleBackButton]);

  useEffect(() => {
    console.log("setAndroid changed");
  }, [setAndroidBackCallback]);

  useEffect(() => {
    setAndroidBackCallback(() => {
      return handleBackButton;
    });
  }, [handleBackButton, setAndroidBackCallback]);

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
