import React from 'react';
import { Paper, Grid, CardContent, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { db } from '../../firebase';
import imgbackground from '../image/carbg2.jpg';
const Login = () => {
  const loginuser = db.collection('signup');
  var navi = useNavigate();
  function signin(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let email = data.get('email');
    let password = data.get('password');
    console.log(email);
    console.log(password);
    if (email === '' || password === '') {
      alert('Plese Fill all Fields');
    } else {
      loginuser.where('Email', '==', email).where('Password', '==', password).get().then(function (querySnapshot) {
        if (querySnapshot.size === 0) {
          alert('Entered Wrong Email or Password');
        }
        querySnapshot.forEach(function (success) {
          if (success.data().Status === 1) {
            alert('Your account has been blocked');
          } else {
            var uid = success.id;
            console.log(uid);
            localStorage.setItem('user', uid);
            var path = '/home';
            navi(path);
          }
        })
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
  return (
    <>
      <Paper >
        <img style={{ height: '99vh', width: '100%', filter: 'blur(15px)' }} src={imgbackground} alt="" />
        <Grid container style={{ position: 'absolute', top: '22vh' }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4} style={{ height: '380px' }}>
            <img style={{ height: '380px', width: '100%' }} src={imgbackground} alt="" />
          </Grid>
          <Grid item xs={4} style={{ backgroundColor: 'white', height: '380px' }}>
            <br></br>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>User Login</Typography>
            <form onSubmit={signin} action='' method='post' className="form-group">
              <br></br>
              <CardContent>
                <TextField variant="outlined" name="email" className="form-control" label="Enter email" type="email" fullWidth></TextField>
              </CardContent>
              <CardContent>
                <TextField variant="outlined" name="password" className="form-control" label="Enter password" type="password" fullWidth></TextField>
              </CardContent>
              <CardContent>
                <Button type='submit' style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}><b>Login</b></Button>
              </CardContent>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>Don't have a account? <Link style={{ textDecoration: 'none', color: 'blue' }} className="nav-item" href="/signup"> Sign Up</Link></Typography>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Login;
