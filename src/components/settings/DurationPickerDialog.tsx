import { DialogContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useCallback, useState } from "react";
import DurationPicker from "react-duration-picker";
import { secondsToDuration } from "../../utils";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialDuration: number;
  onClose: (duration: DurationPicker.Duration) => void;
  title: string;
}

function DurationPickerDialog(props: IProps) {
  const onChangeDisplayedDuration = useCallback(
    (duration: DurationPicker.Duration) => {
      setDisplayedDuration(duration);
    },
    [],
  );

  const { open, setOpen, initialDuration, onClose, title } = props;
  const [displayedDuration, setDisplayedDuration] = useState(
    secondsToDuration(initialDuration),
  );

  const closeDialog = () => {
    onClose(displayedDuration);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DurationPicker
          onChange={onChangeDisplayedDuration}
          initialDuration={
            secondsToDuration(initialDuration) || {
              minutes: 0,
              seconds: 0,
            }
          }
          noHours
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
