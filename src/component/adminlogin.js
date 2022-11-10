import React, { useEffect, useState } from 'react';
import { Paper, Grid, CardContent, Button, TextField, Typography } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';

import imgbackground from './image/ccw.jpg';
import { useNavigate } from 'react-router';



const Adminlogin = () => {

  // const [users, setUsers] = useState([]);

  const adminlogin = db.collection("Admin");

  function getUsers() {
    adminlogin.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      // setUsers(item);
    })
  }



  useEffect(() => {
    getUsers();
  });
  const [OTPData, setOTPData] = useState();
  const [otp, setCheckOTP] = useState(false);
  function Submitlogin(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let email = data.get('emailid');
    let password = data.get('passwordid');

    adminlogin.where("Email", "==", email).where("Password", "==", password).get().then(function (querySnapshot) {

      querySnapshot.forEach(function (docc) {
        if (docc.exists) {
          console.log(docc.data().Phone);
          var phoneNumber = docc.data().Phone;
          var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // console.log('yes');
              setOTPData(confirmationResult);
              localStorage.setItem('Phone', phoneNumber);
              localStorage.setItem('UID', docc.id);
              setCheckOTP(true);
              e.target.reset(true);
            }).catch((errror) => {
              console.log('no');
            });
          // var uid = docc.id;
          // localStorage.setItem('token', uid);
          //   window.location.href='./dashboard';
          // alert('yes');
        } else {
          alert('Wrong Email and Password');
        }
      })
    })
  }
  const navi = useNavigate();
  const verifyOtp = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var OTP = data.get('verify_otp');
    OTPData.confirm(OTP).then((result) => {
      alert("Correct Otp");
      var uid = localStorage.getItem('UID');
      localStorage.setItem('token', uid);
      navi('/dashboard');
      alert('yes');
      e.target.reset();
    }).catch((error) => {
      alert("Incorrect Otp");
    })


  }
  return (
    <div className="App">

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
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Welcome Admin</Typography>
              <form className="form-group" onSubmit={Submitlogin}>
                <br></br>
                <CardContent>
                  <TextField variant="outlined" name="emailid" className="form-control" label="Enter email" type="email" fullWidth required></TextField>
                </CardContent>

                <CardContent>
                  <TextField variant="outlined" name="passwordid" className="form-control" label="Enter password" type="password" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <Button type='submit' style={{ backgroundColor: 'rgb(39, 126, 226)', width: '100%', color: 'white' }}><b>Login</b></Button>
                </CardContent>
                <div id="recaptcha-container"></div>
              </form>
            </>)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default Adminlogin;
