import React, { Component, useState, useEffect } from 'react';
import { Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import firebase from 'firebase';
import imgbackground from './image/carbg2.jpg';

const Signup = () => {

  var path = useNavigate();
  const signup = db.collection("signup");

  const [otp, setOtp] = useState(true);
  const [OTPData, setOTPData] = useState();

  const Submitlist = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let firstname = data.get('firstname');
    let lastname = data.get('lastname');
    let email = data.get('email');
    let phone = data.get('phone');
    let password = data.get('password');

    var nameval = /^([a-zA-Z]{3,})$/;
    var phoneval = /^([0-9]{10})$/;
    if (firstname == '' || lastname == '' || email == '' || phone == '' || password == '') {
      alert('Fill all the details')
    } else if (!nameval.test(firstname)) {
      alert('Please fill alpha only with limit min 3');
    } else if (!phoneval.test(phone)) {
      alert('Fill 10 numerical digits')
    }
    else {


      signup.where('Email', '==', email).get().then(function (query) {
        if (query.size > 0) {
          alert("This account is already registered with us");
        }
        else {
          signup.where('Phone', '==', phone).get().then((querys) => {
            if (querys.size > 0) {
              alert("This contact is already registered with us");
            } else {
              var phonenumber = '+91' + phone;
              var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

              firebase.auth().signInWithPhoneNumber(phonenumber, appVerifier).then((confirmationResult) => {
                console.log('yes');
                setOTPData(confirmationResult);
                // creating session for user with phone number
                localStorage.setItem('Phone', phonenumber);
                // query for inserting user data in the database
                console.log({
                  Name: firstname + ' ' + lastname,
                  Email: email,
                  Phone: phonenumber,
                  Password: password,
                  booking: 0,
                  Status: 1
                });
                signup.add({
                  Name: firstname + ' ' + lastname,
                  Email: email,
                  Phone: phonenumber,
                  Password: password,
                  booking: 0,
                  Status: 1
                }).then((succ) => {
                  // setSignup(false);
                  alert('Now verify your contact number');
                  setOtp(false);
                  // creating Session for user
                  localStorage.setItem('UID', querys.id);

                  //changing the state so it can render otp form
                }).catch((err) => {
                  alert('Error');
                })
                e.target.reset();
              }).catch((error) => {
                console.log('no');
                console.log(error);
              })
            }
          })
        }
      })

    }
  }

  const verifyOtp = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var OTP = data.get('verifyy6_otp');
    // console.log(OTPData);
    var id = localStorage.getItem('UID');
    OTPData.confirm(OTP).then((result) => {
      alert("Correct Otp");
      // query for updating the staus of user 
      // if user didn't fill the otp then their status will not update and that user will not valid
      signup.doc(id).update({
        Status: 0,
      });
      path('/home');
    }).catch((error) => {
      alert("Incorrect Otp");
      // deleting the user if otp doesn't match
      signup.doc(id).update({
        Status: 1,
      });
    })


  }





  return (
    <div className="App">




      <Paper>

        <img style={{ height: '99vh', width: '100%', filter: 'blur(15px)' }} src={imgbackground} alt="" />


        <Grid container style={{ position: 'absolute', top: '2vh' }}>
          <Grid item xs={4}> </Grid>
          <Grid item xs={4} style={{ backgroundColor: 'white' }}>
            <br></br>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Create your Account</Typography>
            {otp ? (<><form className="form-group" onSubmit={Submitlist}>

              <CardContent>
                <TextField variant='outlined' name="firstname" className="form-control" label="Enter first name " type="text" fullWidth></TextField>
              </CardContent>

              <CardContent>
                <TextField variant='outlined' name="lastname" className="form-control" label="Enter last name " type="text" fullWidth></TextField>
              </CardContent>

              <CardContent>
                <TextField variant='outlined' name="email" className="form-control" label="Enter email" type="email" fullWidth></TextField>
              </CardContent>


              <CardContent>
                <TextField variant='outlined' name="phone" className="form-control" label="Enter phone" type="tel" fullWidth></TextField>
              </CardContent>

              <CardContent>
                <TextField variant='outlined' name="password" className="form-control" label="Enter password" type="password" fullWidth></TextField>
              </CardContent>

              {/* <CardContent>
                      <TextField variant='outlined' className="form-control" label="Confirm your password" type="password" fullWidth></TextField>
                    </CardContent> */}




              <CardContent>
                <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Register Here</Button>

                <div id="recaptcha-container"></div>
                {/* <center>
                        <input style={{height:'35px', width:'200px', backgroundColor:'rgb(85, 57, 85)', color:'white', fontSize:'18px', borderRadius:'10px'}} type="submit" value="Submit"  />
                        </center> */}
              </CardContent>
              <Typography variant="subtitle2" style={{ textAlign: 'center', paddingBottom: '10px' }}>Already have a account? <Link style={{ textDecoration: 'none', color: 'blue' }} className="nav-item" to="/"> Login</Link></Typography>
            </form>
            </>
            ) : (<>
              <form className="form-group" onSubmit={verifyOtp}>
                <br></br>
                <CardContent>
                  <TextField variant="outlined" name="verify_otp" className="form-control" label="Enter OTP" type="number" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <Button type='submit' style={{ backgroundColor: 'rgb(39, 126, 226)', width: '100%', color: 'white' }}><b>Verify OTP</b></Button>
                </CardContent>
              </form>
            </>)}
          </Grid>
        </Grid>
      </Paper>

    </div>
  )
}

export default Signup;
