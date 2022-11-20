import React from 'react';
import { Paper, Grid, CardContent, Button, TextField, Typography } from '@mui/material';
import { db } from '../../firebase';
import imgbackground from '../image/carbg2.jpg';
import Usernavbar from './usernavbar';
const Contact = () => {
  const contact = db.collection("contact");
  const Submitlist = () => {
    var data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      location: document.getElementById('location').value
    };
    if (data.name === "" || data.phone === "" || data.email === "" || data.location === "") {
      alert('Please fill all the details')
    } else {
      contact.add({
        Name: data.name,
        Phone: data.phone,
        Email: data.email,
        Location: data.location
      }).then((success) => {
        alert('Data is added successfully');
      }).catch((error) => {
        alert('There is a error');
      })
    }
  }




  return (
    <>
      <Grid>
        <Usernavbar />
        <Paper>
          <img style={{ height: '99vh', width: '100%', filter: 'blur(15px)' }} src={imgbackground} alt="" />
          <Grid container style={{ position: 'absolute', top: '15vh' }}>
            <Grid item xs={3}> </Grid>
            <Grid item xs={6} style={{ backgroundColor: 'white' }}>
              <br></br>
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Contact us for more</Typography>
              <form>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" id="name" label="Enter name" type="text"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" id="phone" label="Enter Phone no." type="number"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" id="email" label=" Enter email" type="email"></TextField>
                </CardContent>
                <CardContent>
                  <TextField fullWidth variant="outlined" className="form-control" id="location" label=" Enter your location" type="text"></TextField>
                </CardContent>
                <CardContent>
                  <Button onClick={Submitlist} style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>submit</Button>
                </CardContent>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
export default Contact;