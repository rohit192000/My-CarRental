import React, {Component} from 'react';
import Usernavbar from './usernavbar';
import {Typography, Button, Paper, Grid, Card, CardContent} from '@material-ui/core';
import image1 from '../image/nee.jpg';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import {useNavigate} from 'react-router-dom';
const Confirm =() =>{
var path=useNavigate();
    const token = localStorage.getItem('token');
    console.log(token)
    if(token == null)
    {
        path('/');
    }
    function Logout(){
        localStorage.removeItem('token');
        path('/');
    }


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('confirmbooking');
    if(id == null)
    {
        path('/home');
    }


    return(    

        <div>
        <Usernavbar />
        <Paper>

        <img style={{height:'99vh',width:'100%', filter:'blur(20px)'}} src={image1} />

        <Grid container style={{position:'absolute', top:'0vh'}}>
              <Grid item xs={3}> </Grid>

              <Grid item xs={6} style={{marginTop:'180px'}}>
                  <Card style={{textAlign:'center'}}>
                      <CardContent>
                      <center><DriveEtaIcon style={{zoom:1.5, color:'lightgreen'}} /></center>
                      <Typography variant="h6">Congratulations your Car has been Booked</Typography>
                      {/* <Button variant='contained' color='primary'><Link to='/myorder' style={{textDecoration:'none', color:'white'}}>View Car Status</Link></Button>&nbsp;&nbsp;
                      <Button variant='contained' color='secondary'><Link to='/carsearch' style={{textDecoration:'none', color:'white'}}>Book New Car</Link></Button> */}
                      </CardContent>
                  </Card>
              </Grid>

        </Grid>      


        </Paper>
        </div>
    )
}
export default Confirm;