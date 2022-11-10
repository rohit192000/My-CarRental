import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { Grid, Card, CardContent, Typography, ListItemIcon } from '@mui/material';
import { LocalTaxi, LocalCarWash, PeopleAlt, PersonOutline } from '@mui/icons-material';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navi = useNavigate();
  const [totalUser, setTotalUser] = useState();
  const [users, setUsers] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const getUsers = () => {
    db.collection('signup').onSnapshot((docc) => {
      setTotalUser(docc.size);
      var username = [];
      var userCarBooking = [];
      docc.forEach((doc) => {
        username.push(doc.data().Name);
        userCarBooking.push(doc.data().booking);
      })
      setUsers(username);
      setUserBookings(userCarBooking);
    })
  }
  const datas = {
    labels: users,
    datasets: [{
      backgroundColor: [
        '#16a5d0',
        'royalblue'],
      data: userBookings,
      hoverOffset:4
    }]
  }
  const [totalbooking, setToatalBooking] = useState();
  db.collection('booking').get().then((docc) => {
    setToatalBooking(docc.size);
  })
  const [totalCars, setTotalCars] = useState();
  const [carname, setCarname] = useState([]);
  const [cartotal, setCarTotal] = useState([]);
  const cars = () => {
    db.collection('addcar').onSnapshot((docc) => {
      setTotalCars(docc.size);
      var carCategory = [];
      var totalCars = [];
      db.collection('category').onSnapshot((docc) => {
        docc.forEach((succ) =>{
          carCategory.push(succ.data().Name);
          totalCars.push(succ.data().Quantity);
        })
      })
      setCarname(carCategory);
      setCarTotal(totalCars);
    })
  }
  const datass = {
    labels: carname,
    datasets: [{
      backgroundColor: [
        '#16a5d0',
        'royalblue'],
      label: 'Cars',
      data:cartotal
    }]
  }
  var [totalDriver, setTotalDriver] = useState();
  db.collection('adddriver').get().then(function (docc) {
    setTotalDriver(docc.size);
  })
  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navi('/adminlogin');
    }
    getUsers();
    cars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
      <>
        <AdminNavbar />
        <Grid container >
          <Grid item xs={12}>
            <Grid container >
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} style={{ padding: 10 }} >
                    <Card className='dash-card'>
                      <CardContent>
                        <Typography variant='h4' className='white'>  Total Users<br/>
                          <ListItemIcon><PeopleAlt className='white' /></ListItemIcon> {totalUser}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 10 }} >
                    <Card className='dash-card'>
                      <CardContent>
                        <Typography variant='h4' className='white'>Total bookings<br/><ListItemIcon><LocalTaxi className='white' /></ListItemIcon>{totalbooking}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 10 }} >
                    <Card className='dash-card'>
                      <CardContent>
                        <Typography variant='h4' className='white'>Total Cars<br/><ListItemIcon><LocalCarWash className='white' /> </ListItemIcon>{totalCars}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} style={{ padding: 10 }} >
                    <Card className='dash-card'>
                      <CardContent>
                        <Typography variant='h4' className='white'>Total Driver<br/><ListItemIcon><PersonOutline className='white' /></ListItemIcon> {totalDriver}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Doughnut data={datas} style={{ height: '20' }}  />
              </Grid>
              <Grid item xs={8}>
                <Bar data={datass} style={{ height: '50vh' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
  );
}
export default Dashboard;