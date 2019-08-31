import { DialogContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface IProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

function WelcomeDialog(props: IProps) {
  const { open, setOpen } = props;
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Welcome to Bughouse Clock</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Thanks for using Bughouse Clock! This app uses fullscreen mode. To
          access your device's navigation, swipe up from the bottom of the
          screen.
        </DialogContentText>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default WelcomeDialog;
