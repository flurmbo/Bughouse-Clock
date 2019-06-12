import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

interface IProps {
  open: boolean;
}

function ConfirmResetDialog(props: IProps) {
  const { open } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>{"Are you sure you want to reset the clock?"}</DialogTitle>
      <DialogContentText />
      <DialogActions>
        <Button>Yes</Button>
        <Button>No</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmResetDialog;
