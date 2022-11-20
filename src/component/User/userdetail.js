/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Paper, Grid, Card, CardContent, Button, TextField, Typography } from '@mui/material';
import imgbackground from '../image/carbg2.jpg';
import { db } from '../../firebase';
import Usernavbar from './usernavbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const Userdetail = () => {
  const navi = useNavigate();
  const user = localStorage.getItem('user');
  if (user == null) {
    var path = '/';
    navi(path);
  }
  const userlist = db.collection("signup").doc(user);
  const [userData, setUserData] = useState({
    name:'',
    contact: '',
    email:''
  })
  const getdata = () => {
    userlist.onSnapshot(function (query) {
      if (query.exists) {
        setUserData((userData) => ({
          ...userData,
          name:query.data().Name,
          contact:query.data().Phone,
          email:query.data().Email
        }))
      }
    })
  }
  useEffect(() => {
    getdata();  
  }, [])
  const updateMyData = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var fname = data.get('name');
    var contact = data.get('contact');
    var email = data.get('email');
    userlist.update({
      Name: fname,
      Contact: contact,
      Email: email
    }).then(function (success) {
      alert('Successfully Updated');
    }).catch(function (error) {
      alert('Error');
    })
  }
  const [action, setAction] = useState({
    success:false,
    error:false,
    npass:'',
    cpass:''
  })
  const confirm = () => {
    if (action.npass === action.cpass) {
      setAction((action) => ({...action, success:true, error:false}));
    } else {
      setAction((action) => ({...action, success:false, error:true}));
    }
  }
  const changePassword = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var oldpass = data.get('opass');
    var newpass = data.get('npass');
    userlist.get().then(function (success) {
      console.log(oldpass);
      console.log(success.data().Password);
      if (oldpass === success.data().Password) {
        userlist.update({
          Password: newpass
        }).then(function (succ) {
          alert('Password Successfuly Updated')
          e.target.reset();
          setAction({...action, success:false});
        }).catch(function (err) {
          alert('Something went wrong')
        })
      } else {
        alert('Please Match Old Password');
      }
    })
  }
  return (
    <>
      <Grid>
        <Usernavbar />
        <Paper>
          <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(15px)' }} src={imgbackground} alt="" />
          <Grid container style={{ position: 'absolute', top: '17vh' }}>
            <Grid item xs={1}> </Grid>
            <Grid item xs={4}>
              <Card style={{ padding: 15 }}>
                <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Update your personal detail </Typography>
                <form action='' method='post' onSubmit={updateMyData}>
                  <CardContent>
                    <TextField fullWidth variant="outlined" className="form-control" name='name' value={userData.name} placeholder="Enter your First name" onChange={(e) => setUserData({...userData, name:e.target.value})} type="text"></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField fullWidth variant="outlined" className="form-control" name='contact' value={userData.contact} placeholder="Enter Contact No" onChange={(e) => setUserData({...userData, contact:e.target.value})} type="text"></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField fullWidth variant="outlined" className="form-control" value={userData.email} placeholder="Enter email" type="email" name="email" onChange={(e) => setUserData({...userData, email:e.target.value})}></TextField>
                  </CardContent>
                  <CardContent>
                    <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Update</Button>
                  </CardContent>
                </form>
              </Card>
            </Grid>
            <Grid item xs={2}> </Grid>
            <Grid item xs={4}>
              <Card style={{ padding: 15 }}>
                <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Form to change password</Typography>
                <form action='' method='' onSubmit={changePassword}>
                  <CardContent>
                    <TextField fullWidth variant="outlined" className="form-control" name="opass" label="Enter old password" type="text"></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField onKeyUp={confirm} fullWidth variant="outlined" className="form-control" onChange={(e) => setAction({...action, npass:e.target.value})} name="npass" label="Enter new password" type="text"></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField onKeyUp={confirm} fullWidth variant="outlined" className="form-control" onChange={(e) => setAction({...action, cpass:e.target.value})} name="cpass" label="Confirm your password" type="text" ></TextField>

                    {(action.npass === '' || action.cpass === '') ? (
                      <Alert severity="error">Please fill New Password and Confirm Password</Alert>
                    ) : (
                      <>
                        {action.error && (
                          <Alert severity="error">Please Match Password & Confirm Password</Alert>
                        )}
                        {action.success && (
                          <Alert severity="success" id='success'>Password and Confirm Password Matched</Alert>
                        )}
                      </>
                    )}
                  </CardContent>
                  <CardContent>
                    <Button type='submit' style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Update password</Button>
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
export default Userdetail;
