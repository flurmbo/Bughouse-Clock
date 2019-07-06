import { DialogContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface IProps {
  open: boolean;
}

function AboutDialog(props: IProps) {
  const { open } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>About Bughouse Timer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bughouse Timer was developed by Phil Marshall. You can email comments
          and questions{" "}
          <a href="mailto: phillipsolomonmarshall@gmail.com">here</a>.
        </DialogContentText>
        <DialogActions>
          <Button>OK</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default AboutDialog;
