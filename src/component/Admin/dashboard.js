import React, { Component, useState, useEffect } from 'react';
import AdminNavbar from './adminNavbar';
import { Container, Paper, Grid, Box, Card, CardContent, CardActions, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import EuroIcon from '@material-ui/icons/Euro';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import Chart from 'chart.js/auto';
import { Bar, Bubble, Doughnut, Line, PolarArea, Radar } from 'react-chartjs-2';
import { db } from '../../firebase';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import imgg from '../image/fb.JPG';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');
  if (token == null) {
    navi('/adminlogin');
  }
  function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UID');
    localStorage.removeItem('Phone');
    localStorage.removeItem('User');
    navi('/adminlogin');
  }

  // const booking = db.collection("booking");


  const [urs, setUrs] = useState([]);
  const [ctt, setct] = useState([]);
  const [tuser, settuser] = useState();
  function getUrs() {
    db.collection('signup').onSnapshot(function (docc) {
      settuser(docc.size);
      var item = [];
      var items = [];
      docc.forEach(function (doc) {
        item.push(doc.data().Firstname);
        items.push(doc.data().booking);
      })
      setUrs(item);
      setct(items);
    })
  }

  const [tbook, settbook] = useState();
  db.collection('booking').get().then(function (docc) {
    settbook(docc.size);
  })

  var carref = db.collection('addcar');

  const [carname, setCarname] = useState([]);
  const [carval, setCarval] = useState([]);


  const [tcar, settcar] = useState();
  function cars() {
    carref.onSnapshot(function (docc) {
      // var crs = [];
      settcar(docc.size);
      var pre = 0
      var go = 0
      docc.forEach(function (sdd) {
        if (sdd.data().Category == 'Rent Premier') {
          pre += 1;
        } else {
          go += 1;
        }
      })
      var crss = ['Premier', 'Go', 'Wedding'];
      var crs = [pre, go];
      console.log(crs);
      setCarname(crss);
      setCarval(crs);
    })
  }

  var [tdriver, settdriver] = useState();
  db.collection('adddriver').get().then(function (docc) {
    settdriver(docc.size);
  })

  useEffect(() => {
    // getusers();
    getUrs();
    cars();
  }, [])

  // const data = {
  //   labels : urs,
  //   datasets: [{
  //     backgroundColor: 'rgb(89, 89, 231)',
  //     label:'Booking',
  //     data: ctt
  //   }]
  // }
  console.log(urs);
  console.log(ctt);

  // const datas = {
  //   labels : carname,
  //   datasets: [{
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)'],
  //     // backgroundColor:'maroon',
  //     // borderColor:'blue',
  //     label:'Cars',
  //     data: carval
  //   }]
  // }

  const datas = {
    labels: urs,
    datasets: [{
      backgroundColor: [
        '#16a5d0',
        'royalblue'],
      label: 'Cars',
      data: ctt
    }]
  }

  const datass = {
    labels: carname,
    datasets: [{
      backgroundColor: [
        '#16a5d0',
        'royalblue'],
      label: 'Cars',
      data: carval
    }]
  }


  return (
    <div style={{ backgroundColor: 'rgb(230, 224, 224)', minHeight: '100vh' }}>
      <AdminNavbar />


      <Grid container >
        {/* <Grid item xs={1}></Grid> */}
        <Grid item xs={12}>
          <Grid container >
            <Grid item xs={5}>
              <br /><br /><br />
              <Grid container>
                <Grid item xs={6} style={{ padding: 10 }} >
                  <Card className='dash-card'>
                    <CardContent>
                      <Typography variant='h4' className='white'>  Total Users</Typography>
                      <Typography variant="h4" className='white' > <PeopleAltIcon className='white' /> {tuser} </Typography>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={6} style={{ padding: 10 }} >
                  <Card className='dash-card'>
                    <CardContent>
                      <Typography variant='h4' className='white'>Total bookings</Typography>
                      <Typography variant="h4" className='white'><LocalTaxiIcon className='white' />{tbook}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} style={{ padding: 10 }} >
                  <Card className='dash-card'>
                    <CardContent>
                      <Typography variant='h4' className='white'>Total Cars</Typography>
                      <Typography variant="h4" className='white'><LocalCarWashIcon className='white' /> <span id="tcar"></span></Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} style={{ padding: 10 }} >
                  <Card className='dash-card'>
                    <CardContent>
                      <Typography variant='h4' className='white'>Total Driver</Typography>
                      <Typography variant="h4" className='white'><PersonOutlineIcon className='white' /> {tdriver}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>

            </Grid>
            <Grid item xs={3}>
              <Doughnut data={datas} height={30} />
            </Grid>



            <Grid item xs={4}>
              <Bar data={datass} style={{ height: '400px' }} />
            </Grid>


          </Grid>
        </Grid>
      </Grid>
    </div>

  )
}
export default Dashboard;