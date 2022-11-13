import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Grid, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button, Card, CardActionArea, CardContent, CardMedia, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { db } from '../../firebase';
import { makeStyles } from '@mui/material/styles';
import imgbackground from '../image/nee.jpg';
const Viewbookingadmin = () => {
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
  var queryString = window.location.search;
  var urlparm = new URLSearchParams(queryString);
  var id = urlparm.get('id');
  const [users, setUsers] = useState([]);
  const booking = db.collection("booking");
  const [MyDriver, setMyDriver] = useState('');
  const getUsers = () => {
    booking.doc(id).get().then((doc) => {
      const item = [];
      const items = [];
      setMyDriver(doc.data().Driver);
      if (doc.data().Status === 'yes') {
        setdriverss(false);
        items.push(doc);
      }
      item.push(doc);
      setUsers(item);
    })
  }
  const [driverss, setdriverss] = useState(true);
  const [driver, setDriver] = useState([]);
  const adddriver = db.collection("adddriver");
  const getDriver = () => {
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
  };
  const assigndriver = () => {
    var driverid = drvlst;
    adddriver.doc(driverid).get().then(function (dcc) {
      console.log(dcc.data().Booked_Dates);
      if (dcc.data().Booked_Dates) {
        console.log('yes');
      } else {
        console.log('no');
      }
      adddriver.where('Booked_Dates', 'array-contains-any', dcc.data().Booked_Dates).where('Phone', '==', dcc.data().Phone).get().then((suc) => {
        console.log(suc.size);
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
    getUsers();
    getDriver();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
                                <TableCell><img name="image" src={drivers.data().DriverImage} style={{ height: '90px' }} alt='' /></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Name</TableCell>
                                <TableCell>{drivers.data().DriverName}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Phone</TableCell>
                                <TableCell>{drivers.data().DriverPhone}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Age</TableCell>
                                <TableCell>{drivers.data().DriverAge}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Email</TableCell>
                                <TableCell>{drivers.data().DriverEmail}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver License</TableCell>
                                <TableCell>{drivers.data().DriverLicense}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Aadhar</TableCell>
                                <TableCell>{drivers.data().DriverAadhar}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Driver Gender</TableCell>
                                <TableCell>{drivers.data().DriverGender}</TableCell>
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
    </>
  )
}
export default Viewbookingadmin;