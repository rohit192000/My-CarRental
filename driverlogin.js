import React, { Component, useState } from 'react';
import { Paper, Grid, CardContent, Button, TextField, Typography, Checkbox } from '@material-ui/core';
import { db } from '../firebase';
import imgbackground from './image/b5.jpg';
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';
export default function Driverlogin() {
  const logindriver = db.collection('adddriver');
  const [OtpData, setOTPData] = useState();
  const [otp, setCheckOTP] = useState(false);
  function signin(e) {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    logindriver.where('Email', '==', email).where('Password', '==', password).get().then(function (querySnapshot) {
      if (querySnapshot.size == 0) {
        alert('Entered wrong Email or password');
      }
      querySnapshot.forEach(function (docc) {
        var phoneNumber = '+91' + docc.data().Phone;
        var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            console.log('yes');
            setOTPData(confirmationResult);
            localStorage.setItem('Phone', phoneNumber);
            localStorage.setItem('UID', docc.id);
            localStorage.setItem('email', email);
            setCheckOTP(true);
            e.target.reset();
          }).catch((errror) => {
            console.log('no');
          });

        // var uid = success.id;
        // localStorage.setItem('token', uid);
        // localStorage.setItem('driveremail', email);
        // window.location.href='./driverdb';
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
  var navi = useNavigate();
  const verifyOtp = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var OTP = data.get('verify_otp');
    OtpData.confirm(OTP).then((result) => {
      alert("Correct Otp");
      var uid = localStorage.getItem('UID');
      var email = localStorage.getItem('email');
      localStorage.setItem('token', uid);
      localStorage.setItem('driveremail', email);
      navi('/driverdb');
      e.target.reset();
    }).catch((error) => {
      alert("Incorrect Otp");
    })
  }

  return (


    <div classname="body">
      <Paper >
        <img style={{ height: '99vh', width: '100%', filter: 'blur(15px)' }} src={imgbackground} alt="" />
        <Grid container style={{ position: 'absolute', top: '22vh' }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4} style={{ height: '350px' }}>
            <img style={{ height: '350px', width: '100%' }} src={imgbackground} alt="" />
          </Grid>
          <Grid item xs={4} style={{ backgroundColor: 'white', height: '350px' }}>
            <br></br>
            {otp ? (<>
              <form className="form-group" onSubmit={verifyOtp}>
                <br></br>
                <CardContent>
                  <TextField variant="outlined" name="verify_otp" className="form-control" label="Enter OTP" type="number" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <Button type='submit' style={{ backgroundColor: 'rgb(39, 126, 226)', width: '100%', color: 'white' }}><b>Verify OTP</b></Button>
                </CardContent>
              </form>
            </>) : (<>
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Welcome Driver</Typography>
              <form className="form-group">
                <br />
                <CardContent>
                  <TextField variant="outlined" id="email" className="form-control" label="Enter email" type="email" fullWidth></TextField>
                </CardContent>
                <CardContent>
                  <TextField variant="outlined" id="password" className="form-control" label="Enter password" type="password" fullWidth></TextField>
                </CardContent>
                <CardContent>
                  <Button onClick={signin} style={{ backgroundColor: 'rgb(7, 104, 121)', width: '100%', color: 'white' }}><b>Login</b></Button>
                  {/* <center>
                        <input style={{height:'35px', width:'200px', backgroundColor:'red',border:'none', color:'white', fontSize:'18px', borderRadius:'10px'}} type="submit" value="Login" fullWidth  />
                      </center> */}
                  <Grid container>
                    <Grid xs={6}></Grid>
                    <Grid xs={3}>
                      <div id="recaptcha-container"></div>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </>)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}