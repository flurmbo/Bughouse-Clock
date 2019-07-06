import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { IPreset, ITimerOptions } from "../../types";
import ConfirmationDialog from "../ConfirmationDialog";

interface IProps {
  editedPreset: IPreset | undefined;
  unsavedPreset: IPreset | undefined;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  savePreset: () => void;
  setDiscardChangesDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  } = props;
  const appBarDisplayText = "Edit preset";

  function closePresetForm() {
    setEditPresetFormIsOpen(false);
  }

  function handleBackButton() {
    if (JSON.stringify(editedPreset) !== JSON.stringify(unsavedPreset)) {
      setDiscardChangesDialogIsOpen(true);
    } else {
      closePresetForm();
    }
  }

  function savePresetAndCloseForm() {
    savePreset();
    closePresetForm();
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
