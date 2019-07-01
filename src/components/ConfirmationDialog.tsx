import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

interface IProps {
  open: boolean;
  handleYes: () => void;
  handleNo: () => void;
  text: string;
}

function ConfirmationDialog(props: IProps) {
  const { open, handleYes, handleNo } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>{props.text}</DialogTitle>
      <DialogContentText />
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
