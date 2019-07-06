import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

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
      <DialogContent>
        <DialogContentText />
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
