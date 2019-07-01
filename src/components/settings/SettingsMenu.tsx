import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { TimerOptions } from "../../types";
import SettingsAppBar from "./SettingsAppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

interface IProps {
  open: boolean;
  setTimerOptions: (newTimerOptions: Partial<TimerOptions>) => () => void;
  timerOptions: TimerOptions;
}

const useStyles = makeStyles({
  drawerPaper: {
    width: "100%",
  },
});

function SettingsMenu(props: IProps) {
  const classes = useStyles();
  const [
    showEditDeletePresetButtons,
    setShowEditDeletePresetButtons,
  ] = useState(false);
  const list = (
    <div role="presentation">
      <List>
        {[
          { text: "5|5", timerOptions: { delay: 5, startingTime: 5 * 60 } },
          { text: "2|2", timerOptions: { delay: 2, startingTime: 2 * 60 } },
        ].map(({ text, timerOptions }, index) => (
          <React.Fragment key={text}>
            <ListItem
              button
              key={text}
              onClick={props.setTimerOptions(timerOptions)}
            >
              <ListItemText primary={text} />
              {showEditDeletePresetButtons && (
                <React.Fragment>
                  <IconButton color="inherit" edge="end">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="inherit" edge="end">
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SettingsAppBar
          setTimerOptions={props.setTimerOptions}
          timerOptions={props.timerOptions}
          setShowEditDeletePresetButtons={setShowEditDeletePresetButtons}
          showEditDeletePresetButtons={showEditDeletePresetButtons}
        />
        <Container>{list}</Container>
      </Drawer>
    </React.Fragment>
  );
}

export default SettingsMenu;
