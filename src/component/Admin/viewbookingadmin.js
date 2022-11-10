import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import { Grid, Typography } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { db } from '../../firebase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import imgbackground from '../image/nee.jpg';


const Viewbookingadmin = () => {

  var queryString = window.location.search;
  var urlparm = new URLSearchParams(queryString);
  var id = urlparm.get('id');
  console.log(id);


  const [users, setUsers] = useState([]);
  // const [userss, setUserss] = useState([]);

  const booking = db.collection("booking");


  // for checking if user chooses self-drive or driver.
  const [MyDriver, setMyDriver] = useState('');

  // const [alldates, setalldates] = useState([]);

  function getUsers() {
    booking.doc(id).get().then((doc) => {
      const item = [];
      const items = [];
      setMyDriver(doc.data().Driver);
      if (doc.data().Status === 'yes') {
        console.log(doc);
        setdriverss(false);
        items.push(doc);
      }
      // setalldates(doc.data().Booked_Dates);
      // querySnapshot.forEach((doc) =>{
      // console.log(doc.data().RegDate.toDate().toDateString());
      item.push(doc);

      // console.log(doc.data().DriverName);
      // if(doc.data().DriverName == '' || doc.data().DriverName == null)
      // {
      // setdriverss(true);
      // document.getElementById('assigndriver').style.display = 'block';
      // document.getElementById('showassigndriver').style.display = 'none';
      //   console.log('hii');
      // }else
      // {
      // setdriverss(false);
      // document.getElementById('assigndriver').style.display = 'none';
      // document.getElementById('showassigndriver').style.display = 'block';
      // console.log('boo');
      // document.getElementById('dname').innerHTML = doc.data().DriverName;
      // document.getElementById('dphone').innerHTML = doc.data().DriverPhone;
      // document.getElementById('dage').innerHTML = doc.data().DriverAge;
      // document.getElementById('demail').innerHTML = doc.data().DriverEmail;
      // document.getElementById('dadhar').innerHTML = doc.data().DriverAadhar;
      // document.getElementById('dlicense').innerHTML = doc.data().DriverLicense;
      // document.getElementById('dimage').src = doc.data().DriverImage;
      // console.log(doc.data().DriverImage);
      // }



      // })
      setUsers(item);
      // setUserss(items);
    })

  }


  useEffect(() => {
    getUsers();
  });


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

  // function ViewDetail(x) {
  //   window.location.href='';
  // }



  const [driverss, setdriverss] = useState(true);

  // variable to get the details of driver
  const [driver, setDriver] = useState([]);

  const adddriver = db.collection("adddriver");

  function getDriver() {
    adddriver.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setDriver(item);// assigning driver data to the driver variable
    })
  }

  const [drvlst, setDrvlst] = useState('');
  const handleChange = (event) => {
    setDrvlst(event.target.value);
    // setdriverss(false);
  };

  function assigndriver() {
    var driverid = drvlst;

    // alldates

// if else check

    adddriver.doc(driverid).get().then(function (dcc) {

      console.log(dcc.data().Booked_Dates);

      if(dcc.data().Booked_Dates){
        console.log('yes');
      }else{
        console.log('no');
      }

      adddriver.where('Booked_Dates','array-contains-any',dcc.data().Booked_Dates).where('Phone','==',dcc.data().Phone).get().then((suc) =>{
        console.log(suc.size);
        // if(suc.size)
      })


      booking.doc(id).update({
        DriverName: dcc.data().Name,
        DriverAge: dcc.data().Age,
        DriverGender: dcc.data().Gender,
        DriverPhone: dcc.data().Phone,
        DriverEmail: dcc.data().Email,
        DriverLicense: dcc.data().License,
        DriverAadhar: dcc.data().Aadhar,
        DriverPassword: dcc.data().Password,
        Status: 'yes',
        DriverImage: dcc.data().Image
      }).then(function (docc) {
        alert('Driver has been Assigned');
        getUsers();
        setdriverss(false);
      }).catch(function (error) {
        alert('Contact Dev');
      })
    })
  }

  useEffect(() => {
    getDriver();
  });





  return (
    <div>

      <AdminNavbar />



      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />

      <Grid container style={{ marginTop: '0px' }}>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', backgroundColor: 'rgb(36, 86, 166)', color: 'white', height: '35px', width: '100%', textAlign: 'center' }}> My Bookings</Typography>
        <Grid item xs={1}> </Grid>

        <Grid item xs={6} style={{ paddingTop: '0%' }}>


          <CardContent>

            <Card>
              <CardActionArea>

                {
                  users.map((userss) => (
                    <CardContent key={userss.id}>

                      <CardMedia image={userss.data().carImage} style={{ height: '290px' }}>
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
                      <Typography variant="body2" color="default" component="p"><b>Driver Required:</b> {userss.data().Driver}</Typography>

                      {/* <Typography variant="body2" color="default" component="p"><b>Registration Date:</b> {userss.data().RegDate.toDate().toDateString()}</Typography> */}
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

            {MyDriver !== 'selfdrive' && (
              <>



                {driverss ? (

                  <Card id='assigndriver'>
                    <CardContent>
                      <Typography variant='h6'>Assign Driver</Typography>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Driver list</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={drvlst}
                          onChange={handleChange}
                        >
                          {driver.map((drivers) => (
                            <MenuItem key={drivers.id} value={drivers.id}>{drivers.data().Name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CardContent>
                    <CardContent>
                      <Button onClick={assigndriver} variant='contained' color='primary'>Assign</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card id='showassigndriver'>
                    <CardContent>
                      <Typography variant='h6'>View Driver</Typography>

                      <img id='dimage' style={{ width: '50%', marginLeft: '25%', borderRadius: '50%' }} alt='' />

                      {users.map((drivers) => (
                        <TableContainer>

                          <Table style={{ backgroundColor: 'white' }} key={drivers.id}>
                            <TableBody>
                              <TableRow>
                                <TableCell>Driver Image</TableCell>
                                <TableCell><span id='dimage'><img name="image" src={drivers.data().DriverImage} style={{ height: '90px' }} alt='' /></span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Name</TableCell>
                                <TableCell><span id='dname'>{drivers.data().DriverName}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Phone</TableCell>
                                <TableCell><span id='dphone'>{drivers.data().DriverPhone}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Age</TableCell>
                                <TableCell><span id='dage'>{drivers.data().DriverAge}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Email</TableCell>
                                <TableCell><span id='demail'>{drivers.data().DriverEmail}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver License</TableCell>
                                <TableCell><span id='dlicense'>{drivers.data().DriverLicense}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Aadhar</TableCell>
                                <TableCell><span id='dadhar'>{drivers.data().DriverAadhar}</span></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Gender</TableCell>
                                <TableCell><span id='dadhar'>{drivers.data().DriverGender}</span></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            )}


          </CardContent>
        </Grid>
      </Grid>



    </div>
  )
}
export default Viewbookingadmin;