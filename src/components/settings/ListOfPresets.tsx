import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { IPreset } from "../../types";

const useStyles = makeStyles({
  listItem: {
    height: 64,
  },
});

interface IProps {
  presets: IPreset[];
  showEditDeletePresetButtons: boolean;
  setDeletePresetDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusedPreset: React.Dispatch<React.SetStateAction<string>>;
  focusedPreset: string;
  setEditPresetFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPreset: (presetId: string) => void;
  selectedPreset: string;
  updatePresets: (presets: IPreset[]) => void;
}

function OptionsDropDown(props: IProps) {
  function onClickDeleteButton(id: string) {
    return () => {
      if (presets.length > 1) {
        setDeletePresetDialogIsOpen(true);
        setFocusedPreset(id);
      }
    };
  }

  function onClickEditButton(id: string) {
    return () => {
      setEditPresetFormIsOpen(true);
      setFocusedPreset(id);
    };
  }

  const {
    presets,
    showEditDeletePresetButtons,
    setDeletePresetDialogIsOpen,
    setFocusedPreset,
    setEditPresetFormIsOpen,
    selectedPreset,
  } = props;

  const classes = useStyles();

  return (
    <List>
      {presets.map(preset => {
        const { text, id } = preset;
        return (
          <React.Fragment key={id}>
            <ListItem
              key={id}
              button={!showEditDeletePresetButtons as any}
              onClick={showEditDeletePresetButtons ? undefined : undefined}
              className={classes.listItem}
            >
              <ListItemText primary={text} />
              {id === selectedPreset && <CheckCircleIcon />}
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
