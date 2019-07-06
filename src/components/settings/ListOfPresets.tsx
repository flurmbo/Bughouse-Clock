import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { IPreset, ITimerOptions } from "../../types";

interface IProps {
  presets: IPreset[];
  showEditDeletePresetButtons: boolean;
  setDeletePresetDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPreset: React.Dispatch<React.SetStateAction<string>>;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setTimerOptions: (newTimerOptions: Partial<ITimerOptions>) => () => void;
  updatePresets: (presets: IPreset[]) => void;
}

function OptionsDropDown(props: IProps) {
  function onClickDeleteButton(id: string) {
    return () => {
      setDeletePresetDialogIsOpen(true);
      setSelectedPreset(id);
    };
  }

  function onClickEditButton(id: string) {
    return () => {
      setEditPresetFormIsOpen(true);
      setSelectedPreset(id);
    };
  }

  const {
    setTimerOptions,
    presets,
    showEditDeletePresetButtons,
    setDeletePresetDialogIsOpen,
    setSelectedPreset,
    setEditPresetFormIsOpen,
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
                  <IconButton
                    color="inherit"
                    edge="end"
                    onClick={onClickEditButton(id)}
                  >
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
