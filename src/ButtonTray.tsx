import React, { Component } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import PauseIcon from '@material-ui/icons/Pause';
import { withStyles } from '@material-ui/core/styles';

interface IProps {
  resetClocks: () => void;
  timerRunning: boolean;
  classes: any;
}

const styles = {
  root: {
    width: '70%',
    height: 'auto'
  }
};

class ButtonTray extends Component<IProps> {
  handleOnClick = () => {
   this.props.resetClocks();
  }
  
  render() {
    const { classes, timerRunning } = this.props;
    return ( 
      <React.Fragment>
        <div className='topButton'>
          <SettingsIcon
            classes={{root: classes.root}}
            fontSize='large'
          />
        </div>
        <div className='middleButton'>
          <PauseIcon
            classes={{root: classes.root}}
            fontSize='large'
          />
        </div>
        <div className='bottomButton'>
          <RefreshIcon
            classes={{root: classes.root}}
            fontSize='large'
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ButtonTray);
