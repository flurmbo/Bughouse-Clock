import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { TimerOptions } from "../../types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Preset } from "../../types";

interface IProps {
  presets: Preset[];
  showEditDeletePresetButtons: boolean;
  setDeletePresetDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPreset: React.Dispatch<React.SetStateAction<number>>;
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  updatePresets: (presets: Preset[]) => void;
}

function OptionsDropDown(props: IProps) {
  function onClickDeleteButton(id: number) {
    return () => {
      setDeletePresetDialogIsOpen(true);
      setSelectedPreset(id);
    };
  }

  const {
    setTimerOptions,
    presets,
    showEditDeletePresetButtons,
    setDeletePresetDialogIsOpen,
    setSelectedPreset,
  } = props;
  return (
    <List>
      {presets.map(preset => {
        const { text, startingTime, delay, id } = preset;
        return (
          <React.Fragment key={id}>
            <ListItem
              key={id}
              button={!showEditDeletePresetButtons as any}
              onClick={
                showEditDeletePresetButtons
                  ? undefined
                  : setTimerOptions({ delay, startingTime })
              }
            >
              <ListItemText primary={text} />
              {showEditDeletePresetButtons && (
                <React.Fragment>
                  <IconButton color="inherit" edge="end">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={onClickDeleteButton(id)}
                    color="inherit"
                    edge="end"
                  >
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default OptionsDropDown;
