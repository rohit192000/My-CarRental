import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Drawer, Link, AppBar, Toolbar, List, Typography, Divider, ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { Domain, Home, AirlineSeatReclineNormal, People, Bookmark, PowerSettingsNew, DriveEta, PermContactCalendar, Menu } from '@mui/icons-material';
const AdminNavbar = () => {
  var navi = useNavigate();
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: 'rgb(26, 56, 107)', height: '97.5vh' }}>
        <Typography variant="h3" noWrap style={{ fontFamily: 'gabriola', color: 'white', textAlign: 'center' }}>Rent-a-Ride</Typography>
        <Link className='link' onClick={() => { navi('/dashboard') }}>
          <ListItemButton>
            <ListItemIcon style={{ color: 'white' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/userlist') }}>
          <ListItemButton>
            <ListItemIcon style={{ color: 'white' }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/driverlist') }} >
          <ListItemButton >
            <ListItemIcon style={{ color: 'white' }}>
              <AirlineSeatReclineNormal />
            </ListItemIcon>
            <ListItemText primary="Driver List" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/carlist') }}>
          <ListItemButton >
            <ListItemIcon style={{ color: 'white' }}>
              <DriveEta />
            </ListItemIcon>
            <ListItemText primary="Car List" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/category') }}>
          <ListItemButton >
            <ListItemIcon style={{ color: 'white' }}>
              <Domain />
            </ListItemIcon>
            <ListItemText primary="Category List" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/booking') }}>
          <ListItemButton >
            <ListItemIcon style={{ color: 'white' }}>
              <Bookmark />
            </ListItemIcon>
            <ListItemText primary="Booking List" />
          </ListItemButton>
        </Link>
        <Link className='link' onClick={() => { navi('/contactinfo') }}>
          <ListItemButton >
            <ListItemIcon style={{ color: 'white' }}>
              <PermContactCalendar />
            </ListItemIcon>
            <ListItemText primary="Contact Form Details" />
          </ListItemButton>
        </Link>
        <List >
          <Divider style={{ backgroundColor: 'white' }} />
          <Link className='link' onClick={Logout}>
            <ListItemButton >
              <ListItemIcon style={{ color: 'white' }}>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </Link>
          <Divider style={{ backgroundColor: 'white' }} />
        </List>
      </List>
    </div>
  );
  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Phone');
    localStorage.removeItem('UID');
    navi('/adminlogin');
  }
  useEffect(() => {
    if (!(localStorage.getItem('UID'))) {
      return navi("/adminlogin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Fragment key='left'>
        <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </Fragment>
      <AppBar style={{ backgroundColor: '#16a5d0' }} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h3" noWrap style={{ fontFamily: 'gabriola', flexGrow: 1 }}>
            Rent-a-Ride
          </Typography>
        </Toolbar>
      </AppBar>
      <br /><br /><br /><br />
    </>
  );
}
export default AdminNavbar;
