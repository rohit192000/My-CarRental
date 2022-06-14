import React from 'react';
import clsx from 'clsx';
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
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import DomainIcon from '@material-ui/icons/Domain';
import HomeIcon from '@material-ui/icons/Home';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import PeopleIcon from '@material-ui/icons/People';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



export default function AdminNavbar() {

  const useStyles = makeStyles({
    list: {
      width: 250,
     
    },
    fullList: {
      width: 'auto',
    },
    
  });
  
    const classes = useStyles();
    const [state, setState] = React.useState({
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

<List style={{backgroundColor:'rgb(26, 56, 107)', height:'97.5vh'}}>

  <Typography variant="h3" noWrap style={{fontFamily:'gabriola', color:'white', textAlign:'center'}}>Rent-a-Ride</Typography>

<Link className='link' to="/dashboard">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>
</Link>

<Link className='link'   to="/userlist">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="User List" />
  </ListItem>
</Link>

<Link className='link'   to="/driverlist">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <AirlineSeatReclineNormalIcon />
    </ListItemIcon>
    <ListItemText primary="Driver List" />
  </ListItem>
</Link>


<Link className='link'   to="/carlist">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <DriveEtaIcon />
    </ListItemIcon>
    <ListItemText primary="Car List" />
  </ListItem>
</Link>


<Link className='link'   to="/category">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <DomainIcon />
    </ListItemIcon>
    <ListItemText primary="Category List" />
  </ListItem>
</Link>

<Link className='link'   to="/booking">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <BookmarkIcon />
    </ListItemIcon>
    <ListItemText primary="Booking List" />
  </ListItem>
</Link>


<Link className='link'   to="/contactinfo">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
         <PermContactCalendarIcon />
    </ListItemIcon>
    <ListItemText primary="Contact Form Details" />
  </ListItem>
</Link>


     <List >

  <Divider style={{backgroundColor:'white'}} />
     
<Link className='link' to="/adminlogin">
  <ListItem button>
    <ListItemIcon style={{color:'white'}}>
       <PowerSettingsNewIcon />
    </ListItemIcon>
      <ListItemText primary="Log out" />
  </ListItem>
</Link>

  <Divider style={{backgroundColor:'white'}} />

  </List>


</List>




      </div>
    );







  return (
    <div>
    <div>
        <React.Fragment key='left'>
          {/* <Button onClick={toggleDrawer('left', true)}>Left</Button> */}
           <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
    <AppBar style={{backgroundColor:'#16a5d0'}} position="fixed" className={classes.appBar}>
        <Toolbar>
        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
          <Typography variant="h3" noWrap style={{fontFamily:'gabriola',flexGrow:1}}>
           Rent-a-Ride
          </Typography>
        </Toolbar>
      </AppBar>
      <br /><br /><br /><br />
    </div>
  );
}
