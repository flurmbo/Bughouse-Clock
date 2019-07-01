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
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
}

function OptionsDropDown(props: IProps) {
  const { setTimerOptions, presets } = props;
  return (
    <List>
      {props.presets.map(preset => {
        const { text, startingTime, delay } = preset;
        return (
          <React.Fragment key={text}>
            <ListItem
              button
              key={text}
              onClick={props.setTimerOptions({ delay, startingTime })}
            >
              <ListItemText primary={text} />
              {props.showEditDeletePresetButtons && (
                <React.Fragment>
                  <IconButton color="inherit" edge="end">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => props.setDeletePresetDialogIsOpen(true)}
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
