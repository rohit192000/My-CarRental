import React, { useEffect, useState } from 'react';
import Usernavbar from './usernavbar';
import {Paper, Grid, Typography} from '@material-ui/core';
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


const Viewbooking = ()=> {

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

          console.log(doc.data().DriverName);
          if(doc.data().DriverName == '' || doc.data().DriverName == null)
          {
            document.getElementById('assigndriver').style.display = 'block';
            document.getElementById('showassigndriver').style.display = 'none';
            //   console.log('hii');
          }else
          {
            document.getElementById('assigndriver').style.display = 'none';
            document.getElementById('showassigndriver').style.display = 'block';
            // console.log('boo');
            document.getElementById('dname').innerHTML = doc.data().DriverName;
            document.getElementById('dphone').innerHTML = doc.data().DriverPhone;
            document.getElementById('dage').innerHTML = doc.data().DriverAge;
            document.getElementById('demail').innerHTML = doc.data().DriverEmail;
            document.getElementById('dadhar').innerHTML = doc.data().DriverAadhar;
            document.getElementById('dlicense').innerHTML = doc.data().DriverLicense;
            document.getElementById('dimage').src = doc.data().DriverImage;
            console.log(doc.data().DriverImage);
          }



          // })
        setUsers(item);
      })
    }
  
  
    useEffect(() => {
      getUsers();
    }, []);
  

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
      



    const classes = useStyles();
  const [drvlst, setDrvlst] = React.useState('');

  const handleChange = (event) => {
    setDrvlst(event.target.value);
  };
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
        var driverid = drvlst;
        adddriver.doc(driverid).get().then(function(dcc){
            var Name = dcc.data().Name;
            var Age = dcc.data().Age;
            var Gender = dcc.data().Gender;
            var Phone = dcc.data().Phone;
            var Email = dcc.data().Email;
            var License = dcc.data().License;
            var Aadhar = dcc.data().Aadhar;
            var Password = dcc.data().Password;
            var Image = dcc.data().Image;
            booking.doc(id).update({
                DriverName: dcc.data().Name,
                DriverAge: dcc.data().Age,
                DriverGender: dcc.data().Gender,
                DriverPhone: dcc.data().Phone,
                DriverEmail: dcc.data().Email,
                DriverLicense: dcc.data().License,
                DriverAadhar: dcc.data().Aadhar,
                DriverPassword: dcc.data().Password,
                DriverImage: dcc.data().Image    
            }).then(function(docc){
                alert('Driver has been Assigned');
                getUsers();
            }).catch(function(error) {
                alert('Contact Dev');
            })
        })
    }
  
    useEffect(() => {
        getDriver();
      }, []);
    




    return(
        <div>
                   
                <Usernavbar />



            <img style={{height:'99vh', width:'100%', backgroundAttachment:'fixed', backgroundRepeat:'no-repeat', filter:'blur(10px)', position: 'fixed', zIndex:'-1'}} src={imgbackground} alt="" />
               
            <Grid container style={{marginTop:'80px'}}>
                <Typography variant="h4" style={{fontFamily:'gabriola', backgroundColor:'rgb(36, 86, 166)', color:'white', height:'35px', width:'100%', textAlign:'center'}}> My Bookings</Typography>
              <Grid item xs={1}></Grid>
              <Grid item xs={6} > 
               
              
              <CardContent>
            
            <Card>
      <CardActionArea>
       
          {
              users.map((userss) => (
        <CardContent key={userss.id}>

             <CardMedia image={userss.data().carImage} style={{height:'290px'}}>
              {/* <img style={{width:'100%'}} src={userss.data().Image} />  */}
              </CardMedia>
          <Typography gutterBottom variant="h5" component="h2">
            Details:-
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
    <Card id='assigndriver'>
      <CardContent>
        <Typography variant='h5' style={{textAlign:'center'}}> Wait For Driver Details</Typography>
      </CardContent>
    </Card>

    <Card id='showassigndriver'>
    <CardContent>
    <Typography variant='h6'>View Driver</Typography>

    <img id='dimage' style={{width:'50%',marginLeft:'25%',borderRadius:'50%'}} />


    <TableContainer>
                    
                    <Table style={{backgroundColor:'white'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>Driver Name</TableCell>
                                <TableCell><span id='dname'></span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Driver Phone</TableCell>
                                <TableCell><span id='dphone'></span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Driver Age</TableCell>
                                <TableCell><span id='dage'></span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Driver Email</TableCell>
                                <TableCell><span id='demail'></span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Driver License</TableCell>
                                <TableCell><span id='dlicense'></span></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Driver Aadhar</TableCell>
                                <TableCell><span id='dadhar'></span></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                </TableContainer>





    </CardContent>
    </Card>



</CardContent>
</Grid>
</Grid>  

       
       
        </div>
    )
}
export default Viewbooking;