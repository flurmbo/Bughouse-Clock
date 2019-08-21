import { DialogContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useCallback, useState } from "react";
import DurationPicker from "react-duration-picker";
import { durationToSeconds, secondsToDuration } from "../../utils";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialDuration: number;
  onClose: (duration: DurationPicker.Duration) => void;
}

function DurationPickerDialog(props: IProps) {
  const onChangeDisplayedDuration = useCallback(
    (duration: DurationPicker.Duration) => {
      setDisplayedDuration(duration);
    },
    [],
  );

  const { open, setOpen, initialDuration, onClose } = props;
  const [displayedDuration, setDisplayedDuration] = useState(
    secondsToDuration(initialDuration),
  );

  const closeDialog = () => {
    onClose(displayedDuration);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Select Delay</DialogTitle>
      <DialogContent>
        <DurationPicker
          onChange={onChangeDisplayedDuration}
          initialDuration={
            secondsToDuration(initialDuration) || {
              hours: 0,
              minutes: 0,
              seconds: 0,
            }
          }
        />
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Select
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default DurationPickerDialog;
