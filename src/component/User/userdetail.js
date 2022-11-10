import React, { useEffect, useState } from 'react';
import { Paper, Grid, Card, CardContent, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import imgbackground from '../image/carbg2.jpg';
import { db } from '../../firebase';
import Usernavbar from './usernavbar';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export default function Userdetail() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const user = localStorage.getItem('user');
  // if(user == null)
  // {
  //     window.location.href='/';
  // }

  const navi = useNavigate();

  const user = localStorage.getItem('user');
  // console.log(user)
  if (user == null) {
    var path = '/';
    navi(path);
  }
  // function Logout() {
  //   localStorage.removeItem('user');
  //   var path = '/';
  //   navi(path);
  // }

  console.log(user);
  const userlist = db.collection("signup").doc(user);

  var [fname, setfname] = useState();
  var [lname, setlname] = useState();
  var [contact, setcontact] = useState();
  var [email, setemail] = useState();

  function getdata(){
    userlist.onSnapshot(function (query) {
      if (query.exists) {
        console.log(query.data());
        setfname(query.data().Firstname);
        setlname(query.data().Lastname);
        setcontact(query.data().Phone);
        setemail(query.data().Email);
      }
    })
  } 

  useEffect(() => {
    getdata();
  }, [])

  // const [fname, setfname]

  function updateMyData(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    var fname = data.get('fname');
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

  const [successs, setsuccesss] = useState(false);
  const [error, seterror] = useState(false);
  const [confirmbtn, setconfirmbtn] = useState(false);
  const [npass, setnpass] = useState('');
  const [cpass, setcpass] = useState('');
  function confirm() {
    if (npass == cpass) {
      setsuccesss(true);
      seterror(false);
      setconfirmbtn(true);
    } else {
      setsuccesss(false);
      seterror(true);
      setconfirmbtn(false);
    }
  }

  console.log(successs);

  function changePassword(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    var oldpass = data.get('opass');
    var newpass = data.get('npass');
    userlist.get().then(function (success) {
      console.log(oldpass);
      console.log(success.data().Password);
      if (oldpass == success.data().Password) {
        userlist.update({
          Password: newpass
        }).then(function (succ) {
          alert('Password Successfuly Updated')
          e.target.reset();
          setsuccesss(false);
          // setconfirmbtn(false);
        }).catch(function (err) {
          alert('Something went wrong')
        })
      } else {
        alert('Please Match Old Password');
      }
    })
  }


  return (
    <div className="body">
      <Usernavbar />
      <Paper>
        <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(15px)' }} src={imgbackground} alt="" />

        <Grid container style={{ position: 'absolute', top: '17vh' }}>
          <Grid item xs={1}> </Grid>
          <Grid item xs={4}>
            <br></br>
            <Card style={{ padding: 15 }}>
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Update your personal detail </Typography>
              <form action='' method='post' onSubmit={updateMyData}>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" name='fname' value={fname} placeholder="Enter your First name" onChange={(e) => setfname(e.target.value)} type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" name='lname' value={lname} placeholder="Enter your Last name" onChange={(e) => setfname(e.target.value)} type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" name='contact' value={contact} placeholder="Enter Contact No" onChange={(e) => setcontact(e.target.value)} type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" value={email} placeholder="Enter email" type="email"></TextField>
                </CardContent>
                <CardContent>
                  <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Update</Button>
                </CardContent>
              </form>
            </Card>
          </Grid>

          <Grid item xs={2}> </Grid>

          <Grid item xs={4}>
            <br></br>
            <Card style={{ padding: 15 }}>
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Form to change password</Typography>
              <form action='' method='' onSubmit={changePassword}>

                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" name="opass" label="Enter old password" type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField onKeyUp={confirm} fullWidth variant="outlined" className="form-control" onChange={(e) => setnpass(e.target.value)} name="npass" label="Enter new password" type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField onKeyUp={confirm} fullWidth variant="outlined" className="form-control" onChange={(e) => setcpass(e.target.value)} name="cpass" label="Confirm your password" type="text" ></TextField>

                  {(npass == '' || cpass == '') ? (
                    <Alert severity="error">Please fill New Password and Confirm Password</Alert>
                  ) : (
                    <>
                      {error && (
                        <Alert severity="error">Please Match Password & Confirm Password</Alert>
                      )}
                      {successs && (
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


    </div>













  )
}
