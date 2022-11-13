import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { makeStyles } from '@mui/styles';
import { Paper, Grid, Select, InputLabel, MenuItem, FormControl, Typography, Button, Modal, CardContent, TextField, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import firebase from 'firebase';
import { db, storageref } from '../../firebase';
import imgbackground from '../image/nee.jpg';
import { Delete, Edit } from '@mui/icons-material';
const Carlist = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState({ open1: false, open2: false });
  const handleOpen = () => {
    setOpen({ ...open, open1: true });
  };
  const [carData, setCarData] = useState({ id: '', Name: '', Variant: '', Seat: '', Color: '', Number: '', Price: '', Type1: '', Cat1: '', img: '', update: '' });
  const handleOpen1 = (x) => {
    setOpen({ ...open, open2: true });
    setCarData((carData) => ({
      ...carData,
      id: x.id,
      Name: x.data().Name,
      Variant: x.data().Variant,
      Seat: x.data().Seat,
      Color: x.data().Color,
      Number: x.data().Number,
      Price: x.data().Price,
      Type1: x.data().Type,
      Cat1: x.data().Category,
      img: x.data().Image,
      update: x
    }))
    console.log(x.data().Image);
  }
  const handleClose1 = () => {
    setOpen({ ...open, open2: false });
  }
  const handleClose = () => {
    setOpen({ ...open, open1: false });
  };
  const [cardetails, setCarDetails] = useState([]);
  const addcar = db.collection("addcar");
  const getCarDetail = () => {
    addcar.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setCarDetails(item);
    })
  }
  const [categoryName, setCategoryName] = useState([]);
  const getCategory = () => {
    db.collection("category").onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setCategoryName(item);
    })
  }
  useEffect(() => {
    getCategory();
    getCarDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [type, setType] = useState('');
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const [category, setCategory] = useState('');
  const handleTypeChangess = (event) => {
    setCategory(event.target.value);
  };
  const Submitlist = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    let name = data.get('name');
    let variant = data.get('variant');
    let seat = data.get('seat');
    let color = data.get('color');
    let number = data.get('number');
    let price = data.get('price');
    let regnoeval = /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/
    if (!regnoeval.test(number)) {
      alert("e.g PB 10 JK 2345");
    }
    let ar_name = name.split('');
    let new_ar = [];
    for (let i = 0; i < ar_name.length; i++) {
      const element = ar_name[i];
      var new_ar2 = [];
      for (let j = 1; j <= element.length; j++) {
        const sub_element = element.slice(0, j);
        new_ar2.push(sub_element);
      }
      new_ar.push(new_ar2);
    }
    let filter_arr = new_ar.flat(Infinity);
    const ref = storageref.ref()
    var x = Math.floor((Math.random() * 1000000) + 1);
    const file = document.querySelector("#image").files[0]
    const names = "CarOption/" + x + ".png";
    const metadata = {
      contentType: file.type
    }
    ref.child(names).put(file, metadata).then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        addcar.add({
          Name: name,
          Variant: variant,
          Seat: seat,
          Type: type,
          Category: category,
          Color: color,
          Number: number,
          Price: price,
          Booking_Status: 'No',
          keyword: filter_arr,
          Image: url,
          date: firebase.firestore.Timestamp.now()
        }).then(function (success) {
          alert('Data is added successfully');
          e.target.reset();
          handleClose();
        }).catch(function (error) {
          alert('There is a error');
        })
      })
  }
  const Editlist = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let variant = data.get('variant');
    let seat = data.get('seat');
    let color = data.get('color');
    let number = data.get('number');
    let price = data.get('price');
    if (!(/^[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}$/).test(number)) {
      alert("Please fill correct format for registration number. e.g PB 10 JK 2345");
    }
    addcar.doc(carData.id).update({
      Name: name,
      Variant: variant,
      Seat: seat,
      Type: carData.Type1,
      Category: carData.Cat1,
      Color: color,
      Number: number,
      Price: price,
      date: firebase.firestore.Timestamp.now()
    }).then(function (success) {
      alert('Data is updated successfully');
      e.target.reset();
      handleClose1();
    }).catch(function (error) {
      alert('There is a error');
    })
  }
  // code to edit the image
  const Editphoto = (x) => {
    const ref = storageref.ref()
    var y = Math.floor((Math.random() * 1000000) + 1);
    const file = x;
    const names = "CarOption/" + y + ".png";
    const metadata = {
      contentType: file.type
    }
    const task = ref.child(names).put(file, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        addcar.doc(carData.id).update({
          Image: url,
          date: firebase.firestore.Timestamp.now()
        }).then(function (success) {
          alert('Image is updated successfully');
          setCarData((carData) => ({ ...carData, img: url }));
        }).catch(function (error) {
          alert('There is a error');
        })
      })
  }
  const DeleteCar = (x) => {
    addcar.doc(x).delete();
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>
      {/* Modal for adding the car */}
      <Modal style={{ width: '60%', position: 'absolute', top: '13%', left: '20%' }}
        open={open.open1}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"  >
        <Paper>
          <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Add Cars to the list</Typography>
          <form action='' method='post' onSubmit={Submitlist}>
            <Grid container>
              <Grid xs={6}>
                <CardContent >
                  <TextField size="small" name="name" variant='outlined' className="form-control" label="Enter car name " type="text" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <TextField size="small" name="variant" variant='outlined' className="form-control" label="Enter variant" type="text" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <TextField size="small" name="seat" variant='outlined' className="form-control" label="Enter seat" type="number" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <FormControl fullWidth variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Car Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={""}
                      onChange={handleTypeChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='Hatchback'>Hatchback</MenuItem>
                      <MenuItem value='Sedan'>Sedan</MenuItem>
                      <MenuItem value='SUV'>SUV</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Grid>
              <Grid xs={6}>
                <CardContent>
                  <TextField size="small" name="color" variant='outlined' className="form-control" label="Enter color" type="text" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <TextField size="small" name="number" variant='outlined' className="form-control" label="Enter registration number" type="text" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <TextField size="small" name="price" variant='outlined' className="form-control" label="Enter price per km" type="text" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <FormControl fullWidth variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={""}
                      onChange={handleTypeChangess}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoryName.map((userss) => (
                        <MenuItem key={userss.id} value={userss.data().Name}>{userss.data().Name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <CardContent>
                  <TextField size="small" name="image" id='image' variant='outlined' className="form-control" type="file" fullWidth required></TextField>
                </CardContent>
                <CardContent>
                  <Button variant='contained' color='primary' type='submit'>Add New Car</Button>
                </CardContent>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Modal>
      {/* Modal for editing the cars */}
      <Modal style={{ width: '60%', position: 'absolute', top: '13%', left: '20%' }}
        open={open.open2}
        onClose={handleClose1}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"  >
        <Paper>
          <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Edit Cars in the list</Typography>

          {carData.update && (
            <>
              <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={4}>
                  <CardContent>
                    <img name="image" src={carData.img} style={{ height: '90px' }} alt='' />
                    <TextField onChange={(e) => Editphoto(e.target.files[0])} size="small" name="image" id='image' variant='outlined' className="form-control" type="file" fullWidth required></TextField>
                  </CardContent>
                </Grid>
              </Grid>
              <form action='' method='post' onSubmit={Editlist} >
                <Grid container>
                  <Grid item xs={6}>
                    <CardContent >
                      <TextField size="small" onChange={(e) => setCarData((carData) => ({ ...carData, Name: e.target.value }))} value={carData.Name} name="name" variant='outlined' className="form-control" label="Enter car name " type="text" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <TextField size="small" name="variant" onChange={(e) => setCarData((carData) => ({ ...carData, Variant: e.target.value }))} value={carData.Variant} variant='outlined' className="form-control" label="Enter variant" type="text" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <TextField size="small" name="seat" onChange={(e) => setCarData((carData) => ({ ...carData, Seat: e.target.value }))} value={carData.Seat} variant='outlined' className="form-control" label="Enter seat" type="number" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <FormControl fullWidth variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Car Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={carData.Type1}
                          onChange={(e) => setCarData((carData) => ({ ...carData, Type1: e.target.value }))}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value='Hatchback'>Hatchback</MenuItem>
                          <MenuItem value='Sedan'>Sedan</MenuItem>
                          <MenuItem value='SUV'>SUV</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Grid>
                  <Grid item xs={6}>
                    <CardContent>
                      <TextField size="small" name="color" onChange={(e) => setCarData((carData) => ({ ...carData, Color: e.target.value }))} value={carData.Color} variant='outlined' className="form-control" label="Enter color" type="text" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <TextField size="small" name="number" variant='outlined' onChange={(e) => setCarData((carData) => ({ ...carData, Number: e.target.value }))} value={carData.Number} className="form-control" label="Enter registration number" type="text" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <TextField size="small" name="price" variant='outlined' onChange={(e) => setCarData((carData) => ({ ...carData, Price: e.target.value }))} value={carData.Price} className="form-control" label="Enter price per Km" type="text" fullWidth required></TextField>
                    </CardContent>
                    <CardContent>
                      <FormControl fullWidth variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={carData.Cat1}
                          onChange={(e) => setCarData((carData) => ({ ...carData, Cat1: e.target.value }))}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {categoryName.map((userss) => (
                            <MenuItem key={userss.id} value={userss.data().Name}>{userss.data().Name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12}>
                    <CardContent>
                      <Button variant='contained' color='primary' type='submit'>Edit Car</Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Paper>
      </Modal>
      <Grid container>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', textAlign: 'center', width: '100%', height: '35px' }}>Car List</Typography>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <CardContent>
            <Button type="button" variant='contained' onClick={handleOpen} style={{ backgroundColor: 'white', color: 'blue' }}><b>Add new Car</b></Button>
          </CardContent>
          <TableContainer>
            <Table style={{ backgroundColor: 'white' }}>
              <TableHead style={{ backgroundColor: '#16a5d0', color: 'white' }}>
                <TableRow >
                  <TableCell style={{ color: 'white' }}><b>Car name</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Variant</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Seats</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Type</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Color</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Category</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Registration Number</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Price Per km</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Image</b></TableCell>
                  <TableCell style={{ color: 'white' }} colspan='2'><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardetails.map((userss) => (
                  <TableRow key={userss.id}>
                    <TableCell>{userss.data().Name}</TableCell>
                    <TableCell>{userss.data().Variant}</TableCell>
                    <TableCell>{userss.data().Seat}</TableCell>
                    <TableCell>{userss.data().Type}</TableCell>
                    <TableCell>{userss.data().Color}</TableCell>
                    <TableCell>{userss.data().Category}</TableCell>
                    <TableCell>{userss.data().Number}</TableCell>
                    <TableCell>{userss.data().Price}</TableCell>
                    <TableCell><img src={userss.data().Image} style={{ height: '70px' }} alt='' /></TableCell>
                    <TableCell><Button variant='contained' color='secondary' onClick={() => DeleteCar(userss.id)}>< Delete /></Button></TableCell>
                    <TableCell><Button type="button" variant='contained' onClick={() => handleOpen1(userss)} style={{ backgroundColor: 'white', color: 'blue' }}><b><Edit /></b></Button></TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default Carlist;