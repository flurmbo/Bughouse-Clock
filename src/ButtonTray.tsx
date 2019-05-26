import React, { Component } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import PauseIcon from '@material-ui/icons/Pause';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

interface IProps {
  resetClocks: () => void;
  timerRunning: boolean;
  classes: any;
}

const styles = {
  root: {
    minWidth: '0px'
  }
};

class ButtonTray extends Component<IProps> {
  handleOnClick = () => {
   this.props.resetClocks();
  }
  
  render() {
    const { classes, timerRunning } = this.props;
    return ( 
      <List>
        <ListItem button>
          <ListItemIcon classes={{root: classes.root}}>
            <SettingsIcon
              fontSize='large'
            />
          </ListItemIcon>
        </ListItem>
        {timerRunning &&
          <ListItem button>
            <ListItemIcon classes={{root: classes.root}}>
              <PauseIcon
                fontSize='large'
              />
            </ListItemIcon>
          </ListItem>
        }
        <ListItem
          button
          onClick={this.handleOnClick}>
          <ListItemIcon classes={{root: classes.root}}>
            <RefreshIcon
              fontSize='large'
            />
          </ListItemIcon>
        </ListItem>
      </List>
      
    );
  }
}

export default withStyles(styles)(ButtonTray);
