import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Usernavbar from './usernavbar';
import { Grid, CardContent, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import {db} from '../../firebase';
import { useNavigate } from 'react-router-dom';
const Lookdetail = () => {
  const navi = useNavigate();
  const user = localStorage.getItem('user');
  if (user == null) {
    navi('/');
  }
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const car = urlParams.get('id');
  if (car == null) {
    navi('/home');
  }
  const [carData, setCarData] = useState({
    Image:"",
    Name:"",
    variant:"",
    Number:"",
    Color:"",
    Price:"",
    Category:"",
    Type:"",
    Booking_Status:"",
    BookedDates:""
  });
  useEffect(() => {
    db.collection('addcar').doc(car).get().then(function (query) {
      setCarData((carData) => ({
        ...carData,
        Image: query.data().Image,
        Name: query.data().Name,
        variant: query.data().Variant,
        Number: query.data().Number,
        Color: query.data().Color,
        Price: query.data().Price,
        Category: query.data().Category,
        Type: query.data().Type,
        BookedDates: query.data().Booked_dates,
        Booking_Status: query.data().Booking_Status,
      }))
    })
  });
  const Bookings = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let batch = db.batch();
    let username = data.get('username');
    let age = data.get('age');
    let phone = data.get('phone');
    let email = data.get('email');
    let pickup_location = data.get('pickup_location');
    let drop_location = data.get('drop_location');
    let pickup_date = data.get('pickup_date');
    let drop_date = data.get('drop_date');
    let nameval = /^([a-zA-Z]{3,}[ ]*[a-zA-Z]*)$/;
    let ageval = /^([0-9]{2})$/
    let phoneval = /^([5-9][0-9]{9})$/
    let emailval = /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/
    let dt = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
    // logic starting for adding booking dtaes in a databases.
    const start = new Date(pickup_date);
    const end = new Date(drop_date);
    let daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    let arr = [];
    for (let i = 0; i <= daysBetween; i++) {
      const temp = new Date();
      temp.setDate(start.getDate() + i);
      arr.push(temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear());
    }
    // var arvv = carData.BookedDates.concat(arr);
    console.log(arr);
    // conditions checking starts for booking
    if ((new Date(dt) < new Date(pickup_date)) && (new Date(drop_date) > new Date(pickup_date))) {
      // console.log(username + " " + age + " " + phone + email + " " + pickup_location + " " + drop_location + " " + pickup_date + " " + drop_date);
      if (username === '' || age === '' || phone === '' || email === '' || pickup_location === '' || drop_location === '' || pickup_date === '' || drop_date === '') {
        alert('Please fill all the details');
      } else if (!nameval.test(username)) {
        alert('Please fill name of minimum 3 characters')
      } else if (!ageval.test(age) && age >= 20) {
        alert('age must be greater that 20')
      } else if (!phoneval.test(phone)) {
        alert('Please fill 10 digit number starts with number 5-9 e.g 7658463745')
      } else if (!emailval.test(email)) {
        alert('eg. xyz@gmail.com')
      } else {
        console.log(arr);
        console.log(carData.Number);
        db.collection('addcar').where('Number', '==', carData.Number).where("Booked_dates", "array-contains-any", arr).get().then((succ) => {
          console.log(succ.size);
          if (succ.size > 0) {
            alert("Sorry These days are already Booked");
          } else {
            let rff = db.collection('signup').doc(user);
            let upd = firebase.firestore.FieldValue.increment(1);
            batch.update(rff, { 'booking': upd });
            db.collection('addcar').doc(car).get().then(function (query) {
              let bk = db.collection("booking").doc();
              let car = db.collection('addcar').doc(query.id);
              batch.set(bk, {
                Uid: user,
                Name: username,
                Age: age,
                Phone: phone,
                Email: email,
                Driver: value,
                CarId: car,
                carName: query.data().Name,
                carvariant: query.data().Variant,
                carSeat: query.data().Seat,
                carType: query.data().Type,
                carCategory: query.data().Category,
                carColor: query.data().Color,
                carNumber: query.data().Number,
                carPrice: query.data().Price,
                carImage: query.data().Image,
                PickLocation: pickup_location,
                DropLocation: drop_location,
                PickDate: pickup_date,
                DropDate: drop_date,
                Driver_Assigned: 'No',
                Booked_Dates: arr,
                RegDate: firebase.firestore.Timestamp.now()
              })
              batch.update(car, {
                Booked_dates: arr,
                Booking_Status: 'Yes'
              })
              batch.commit().then(function () {
                // window.location.href = '/confirm/?confirmbooking=' + bk.id;
                e.target.reset();
                navi('/myorder')
              }).catch(function (error) {
                console.log(error);
                alert('There is a error');
              })
            })
          }
        })
      }

    } else {
      alert("Sorry you can't select previous date");
    }
  }
  const [value, setValue] = useState('driver');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Usernavbar />
      <Grid container style={{ marginTop: '65px' }} >
        <Grid item lg={6} xs={12} style={{ textAlign: 'center' }}>
          <img style={{ width: '40vw' }} id='img' src={carData.Image} alt='' />
          <Typography variant='h3' id='name' style={{ fontFamily: 'timesnewroman' }}>{carData.Name}</Typography>
          <Typography variant='h6'> Category : {carData.Category}</Typography>
          <Typography>Brand : {carData.variant}</Typography>
          <Typography>Reg. No. : {carData.Number}</Typography>
          <Typography>Color: {carData.Color}</Typography>
          <Typography>Car Type : {carData.Type}</Typography>
          <Typography>Charges: Rs. {carData.Price}/km</Typography>
          <Typography>Booking Status: {carData.Booking_Status}</Typography>
        </Grid>
        <Grid item lg={6} xs={6} style={{ backgroundColor: 'rgb(233, 232, 232)', paddingTop: '20px', minHeight: '93vh' }}>
          <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Enter details to book now..!</Typography>
          <form onSubmit={Bookings}>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="username" label="Enter name" type="text" onChange={e => e.target.value}></TextField>
            </CardContent>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="age" label="Enter age" type="tel"></TextField>
            </CardContent>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="phone" label=" Enter phone no." type="tel"></TextField>
            </CardContent>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="email" label=" Enter email" type="email"></TextField>
            </CardContent>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">Option</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                  <Grid container>
                    <Grid>
                      <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                    </Grid>
                    <Grid>
                      <FormControlLabel value="selfdrive" control={<Radio />} label="Self-Drive" />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="pickup_location" label=" Pickup Location" type="text"></TextField>
            </CardContent>
            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="drop_location" label=" Drop Location" type="text"></TextField>
            </CardContent>
            <CardContent>
              <TextField style={{ width: '98%' }} variant="outlined"
                name="pickup_date"
                label="Pickup Date and Time"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
            <CardContent>
              <TextField style={{ width: '98%' }} variant="outlined"
                name="drop_date"
                label="Drop Date and Time"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardContent>
            <CardContent>
              <Button type='submit' style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>book now</Button>
            </CardContent>
          </form>
        </Grid>
      </Grid>
    </>
  )
}
export default Lookdetail;