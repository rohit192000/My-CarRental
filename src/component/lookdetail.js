import React, { useEffect, useState } from 'react';
import Usernavbar from './usernavbar';
import { Grid, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import firebase from 'firebase';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Lookdetail = () => {

  const navi = useNavigate();

  const user = localStorage.getItem('user');
  if (user == null) {
    navi('/');
  }
  // function Logout() {
  //   localStorage.removeItem('user');
  //   navi('/');
  // }


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const car = urlParams.get('id');
  if (car == null) {
    navi('/home');
  }


  // const [mycar, getMycar] = useState([]);
  const [Image, setImage] = useState();
  const [Name, setName] = useState();
  const [variant, setvariant] = useState();
  const [Number, setNumber] = useState();
  const [Color, setColor] = useState();
  const [Price, setPrice] = useState();
  const [Category, setCategory] = useState();
  const [Type, setType] = useState();
  const [Booking_Status, setBookingStatus] = useState();
  const [BookedDates, setDates] = useState();

  function seemycar() {
    db.collection('addcar').doc(car).get().then(function (query) {
      setImage(query.data().Image);
      setName(query.data().Name);
      setvariant(query.data().Variant);
      setNumber(query.data().Number);
      setColor(query.data().Color);
      setPrice(query.data().Price);
      setCategory(query.data().Category);
      setType(query.data().Type);
      setDates(query.data().Booked_dates);
      setBookingStatus(query.data().Booking_Status);
    })
  }

  useEffect(() => {
    seemycar();

  }, []);
  // const booking = db.collection("booking");

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
    var arvv = BookedDates.concat(arr);
    console.log(arvv);
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
        console.log(Number);
        db.collection('addcar').where('Number', '==', Number).where("Booked_dates", "array-contains-any", arr).get().then((succ) => {
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
                Booked_dates: arvv,
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



  // console.log('yes')



  const [value, setValue] = React.useState('driver');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  // const Booked = () => {
  //   db.collection('addcar').doc().onSnapshot((succ) => {
  //     succ.forEach((succc) => {
  //       let status = succc.data().Status;
  //       if(status == 1){

  //       }
  //     });
  //   })
  // }


  return (

    <div>
      <Usernavbar />



      <Grid container style={{ marginTop: '65px' }} >
        <Grid item lg={6} xs={12} style={{ textAlign: 'center' }}>
          <img style={{ width: '80%' }} id='img' src={Image} alt='' />
          <Typography variant='h3' id='name' style={{ fontFamily: 'timesnewroman' }}>{Name}</Typography>
          <Typography variant='h6'> Category : <span id='Category'></span>{Category}</Typography>
          <Typography id='variant'>Brand : <span id='Category'>{variant}</span></Typography>
          <Typography id='carno'>Reg. No. : <span>{Number}</span></Typography>
          <Typography>Color: <span id='color'>{Color}</span></Typography>
          <Typography>Car Type : <span id='Type'>{Type}</span></Typography>
          <Typography>Charges: Rs.<span id='charge'>{Price}</span>/km</Typography>
          <Typography>Booking Status: <span id='charge'>{Booking_Status}</span></Typography>
        </Grid>

        <Grid item lg={6} xs={6} style={{ backgroundColor: 'rgb(233, 232, 232)', paddingTop: '20px', minHeight: '93vh' }}>
          <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}>Enter details to book now..!</Typography>
          <form onSubmit={Bookings}>

            <CardContent>
              <TextField fullWidth variant="outlined" className="form-control" name="username" label="Enter name" type="text"></TextField>
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

            {/* {Booking_Status === 'no' && (<> */}
            <CardContent>
              <Button type='submit' style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>book now</Button>
            </CardContent>
            {/* </>)} */}
          </form>


        </Grid>


      </Grid>


    </div>





  )
}

export default Lookdetail;