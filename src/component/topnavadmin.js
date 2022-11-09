import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Button, TextField} from '@material-ui/core';

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';


import HomeIcon from '@material-ui/icons/Home';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import PeopleIcon from '@material-ui/icons/People';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Topnavadmin() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor: 'rgb(3, 70, 70)'}}>
        <Toolbar>
          <Typography variant="h3" noWrap style={{fontFamily:'gabriola',flexGrow:1}}>
           Rent-a-Ride
          </Typography>
          <Badge style={{marginRight:'20px'}} badgeContent={21} color="error">
        <NotificationsActiveIcon />
      </Badge>


          <Badge style={{marginRight:'20px'}} badgeContent={4} color="error">
        <MailIcon />
      </Badge>


          <TextField placeholder=" Search here" style={{backgroundColor:'white'}}    />  <Button style={{backgroundColor:'rgb(170, 169, 169)'}}><SearchIcon /></Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
