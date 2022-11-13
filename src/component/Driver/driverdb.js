import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import {BrowserRouter as useNavigate} from 'react-router-dom';
import { Button, ButtonGroup, CardContent, } from '@mui/material';
import {AppBar, Typography, Toolbar, Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Card} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import { db } from '../../firebase';


import imgbackground from '../image/pp.png';


const drawerWidth = 300;
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

export default function Driverdb() {
  var path=useNavigate();
  const classes = useStyles();

  const [bookin, setUsers] = useState([]);
  
  const token = localStorage.getItem('token');
  const driveremail = localStorage.getItem('driveremail');
  if(token == null)
  {
      path('/');
  }
  function Logout(){
    localStorage.removeItem('token');
    path('/driverlogin');
}





  const booking = db.collection("booking");

var email  = '';
  db.collection('adddriver').doc(token).get().then(function(success){
    console.log(success);
    email = success.data().Email;
    console.log(email);
    document.getElementById('username').innerHTML = success.data().Name;
    document.getElementById('img').src = success.data().Image;
    document.getElementById('userid').innerHTML = success.data().Email;
    document.getElementById('userlic').innerHTML = success.data().License;
    document.getElementById('useraadhar').innerHTML = success.data().Aadhar;
    document.getElementById('userphone').innerHTML = success.data().Phone;

  })

  // console.log(email);

  function getUsers(){
    booking.where('DriverEmail','==',driveremail).onSnapshot((querySnapshot) => {
      const iteem = [];
      querySnapshot.forEach((doc) =>{
        iteem.push(doc);
      })
      setUsers(iteem);
    })
  }

  
useEffect(() => {
  getUsers();
}, []);


function ViewDetail(x) {
  path('/viewbookingdriver/?id='+x);
}



    return (

        <div className={classes.root}>
        <CssBaseline />
            
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor: 'rgb(4, 79, 92)'}}>
            <Toolbar>
                    <Typography variant="h3" style={{ flexGrow:1, fontFamily:'gabriola'}}>Rent-a-Ride</Typography>

            </Toolbar>
      </AppBar>


<Grid container>
  <Grid item xs={3}>
  <List style={{backgroundColor:'rgb(175, 199, 199)', height:'99.8vh'}}>
  <br/><br/><br/><br/><br/>
  <center>
    <img style={{width:'60%',  borderRadius:'70%' }} id='img' alt="" />
    <br></br>
    <br></br>

        <Typography style={{fontFamily:'verdana'}} variant="h6">Welcome <span id='username'></span></Typography><br />
        <Divider />
        <Typography style={{fontFamily:'verdana'}} variant="h7">Driver Id: <span id='userid'></span></Typography>
        <Divider />
        <Typography style={{fontFamily:'verdana'}} variant="h7">Driver License: <span id='userlic'></span></Typography>
        <Divider />
        <Typography style={{fontFamily:'verdana'}} variant="h7">Driver Aadhar: <span id='useraadhar'></span></Typography>
        <Divider />
        <Typography style={{fontFamily:'verdana'}} variant="h7">Driver Phone: <span id='userphone'></span></Typography>
        <Divider />
        <br></br>
        <br></br>
        
        <Divider />

           <ListItem button onClick={Logout}>
              <ListItemIcon>
                  <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
          </ListItem>
        <Divider />  
  </center>
  </List>


  </Grid>
  <Grid item xs={9} >

  <br /><br /><br /><br /><br />
  <Grid container>

<Grid item xs={4}>
<CardContent >
  <Card style={{backgroundColor:'pink'}}>
    <CardContent>
    <Typography style={{fontFamily:'gabriola'}}  variant='h4'>Total Rides</Typography>
    <Typography style={{fontFamily:'gabriola'}} variant="h5">3 </Typography>
    </CardContent>
  </Card>
</CardContent>
</Grid>

<Grid item xs={4}>
<CardContent>
  <Card style={{backgroundColor:'lightgreen'}}>
    <CardContent>
  <Typography style={{fontFamily:'gabriola'}} variant='h4'>Pending Rides</Typography>
  <Typography style={{fontFamily:'gabriola'}} variant="h5">3 </Typography>
    </CardContent>
  </Card>
</CardContent>
</Grid>

<Grid item xs={4}>
<CardContent>
  <Card style={{backgroundColor:'skyblue'}}>
    <CardContent>
  <Typography style={{fontFamily:'gabriola'}} variant='h4'>Completed Rides</Typography>
  <Typography style={{fontFamily:'gabriola'}} variant="h5">0</Typography>
    </CardContent>
  </Card>
</CardContent>
</Grid>

<Grid item xs={12}>
<CardContent>
<TableContainer>
                <Card>
                    <Table>
                        <TableHead style={{backgroundColor:'teal', color:'white'}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}><b>Name</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Contact</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Date</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Details</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {
                          bookin.map((userss) => (
                            <TableRow key={userss.id}>
                                <TableCell>{userss.data().Name}</TableCell>
                                <TableCell>{userss.data().Phone}</TableCell>
                                <TableCell>{userss.data().PickLocation}</TableCell>
                                <TableCell>{userss.data().PickDate}</TableCell>
                                <TableCell><Button color="secondary" variant="contained" onClick={() => ViewDetail(userss.id)}>View</Button></TableCell>
                                {/* <TableCell>
                                <Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/viewmore"><Button color="secondary" variant="contained" style={{backgroundColor:'skyblue', color:'white'}}>Detail</Button></Link>
                                </TableCell> */}
                            </TableRow>
                            ))
                          }

                        </TableBody>  
                    </Table> 
                    </Card>  
                </TableContainer>  
              </CardContent>
          </Grid>
      </Grid>
  </Grid>

</Grid>
          
        </div>

    )
}