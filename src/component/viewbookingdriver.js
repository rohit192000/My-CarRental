import React, { useEffect, useState } from 'react';
// import Usernavbar from './usernavbar';
import {Paper, Grid, Typography, TextField} from '@material-ui/core';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, Avatar} from '@material-ui/core';
import { db } from '../firebase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import imgbackground from './image/nee.jpg';


const Viewbookingdriver = ()=> {

    var queryString = window.location.search;
    var urlparm = new URLSearchParams(queryString);
    var id = urlparm.get('id');
    console.log(id);


    const [users, setUsers] = useState([]);

    const booking = db.collection("booking");
  
    function getUsers(){
      booking.doc(id).onSnapshot((doc) => {

        const item = [];
        // querySnapshot.forEach((doc) =>{
          console.log(doc.data().RegDate.toDate().toDateString());
          item.push(doc);

          console.log(doc.data().Driver);
          // if(doc.data().DriverName != '' || doc.data().DriverName != null)
          // {
          //   document.getElementById('assigndriver').style.display = 'block';
          //   document.getElementById('showassigndriver').style.display = 'none';
          // }
        //   if(doc.data().Driver == 'driver')
        //   {
        //     // console.log('yes');
        //     document.getElementById('assigndriver').style.display = 'block';
        //     document.getElementById('showassigndriver').style.display = 'none';
        // }else if(doc.data().Driver == 'selfdrive')
        //   {
        //     document.getElementById('assigndriver').style.display = 'none';
        //     document.getElementById('showassigndriver').style.display = 'block';
        //   // console.log('no');
        //   }



          // })
        setUsers(item);
      })
    }
  
  
    useEffect(() => {
      getUsers();
    }, []);
  

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(0),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
      



    const classes = useStyles();
    // function ViewDetail(x) {
    //   window.location.href='';
    // }
  


    const [driver, setDriver] = useState([]);

    const adddriver = db.collection("adddriver");
  
    function getDriver(){
      adddriver.onSnapshot((querySnapshot) => {
        const item = [];
        querySnapshot.forEach((doc) =>{
          item.push(doc);
        })
        setDriver(item);
      })
    }
  
    function assigndriver(){

      let kms = document.getElementById('km').value;
      let days = document.getElementById('day').value;
      let amounts = document.getElementById('amount').value;

      console.log(kms+days+amounts);

        
    }
  
    useEffect(() => {
        getDriver();
      }, []);
    




    return(
        <div>
            <img style={{height:'99vh', width:'100%', backgroundAttachment:'fixed', backgroundRepeat:'no-repeat', filter:'blur(10px)', position: 'fixed', zIndex:'-1'}} src={imgbackground} alt="" />
               
            <Grid container style={{marginTop:'20px'}}>
                <Typography variant="h4" style={{fontFamily:'gabriola', backgroundColor:'rgb(36, 86, 166)', color:'white', height:'35px', width:'100%', textAlign:'center'}}>Bookings assigned to me..!</Typography>
                <Grid item xs={3}> </Grid>

              <Grid item xs={6} style={{paddingTop:'0%'}}> 
               
              
              <CardContent>
            
            <Card>
      <CardActionArea>
       
          {
              users.map((userss) => (
        <CardContent key={userss.id}>

             <CardMedia image={userss.data().carImage} style={{height:'290px'}}>
              {/* <img style={{width:'100%'}} src={userss.data().Image} />  */}
              </CardMedia>
          <Typography  variant="h6">
            Details
          </Typography>
          <Typography variant="body2" color="default" component="p"><b>Name:</b> {userss.data().Name}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Age:</b> {userss.data().Age}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Email:</b> {userss.data().Email}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Phone:</b> {userss.data().Phone}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Name:</b> {userss.data().carName}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Number:</b> {userss.data().carNumber}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Color:</b> {userss.data().carColor}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Seat:</b> {userss.data().carSeat}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Variant:</b> {userss.data().carVariant}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Car Price per km:</b> Rs.  {userss.data().carPrice}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Pick Date:</b> {userss.data().PickDate}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Pick Location:</b> {userss.data().PickLocation}</Typography>
          <Typography variant="body2" color="default" component="p"><b>Registration Date:</b> {userss.data().RegDate.toDate().toDateString()}</Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">Name: {userss.data().Name}</Typography> */}

        </CardContent>
         ))
        }
            
      </CardActionArea>
    </Card>
    </CardContent>
      
    </Grid>
<Grid item xs={4}>
<CardContent>
    {/* <Card id='assigndriver'>
    <CardContent>
    <Typography variant='h6'>Trip Status</Typography>
    <CardContent fullWidth >
      <TextField size='small' fullWidth variant="outlined" id="km" label='Total km covered'></TextField>
    </CardContent>
    <CardContent fullWidth>
      <TextField size='small' fullWidth variant="outlined" id="day" label='No. of days'></TextField>
    </CardContent>
    <CardContent fullWidth>
      <TextField size='small' fullWidth variant="outlined" id="amount" label='Total Amount received'></TextField>
    </CardContent>
    <CardContent>
        <Button onClick={assigndriver} variant='contained' color='primary'>Complete Trip</Button>
    </CardContent>
    </CardContent>
    </Card> */}

    {/* <Card id='showassigndriver'>
          <Typography>Details</Typography>
    </Card> */}



</CardContent>
</Grid>
</Grid>  

       
       
        </div>
    )
}
export default Viewbookingdriver;