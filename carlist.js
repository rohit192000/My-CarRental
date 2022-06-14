import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Typography, Button, Modal, CardContent, TextField, } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import firebase from 'firebase';
import { db, storageref } from '../firebase';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import imgbackground from './image/nee.jpg';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


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



export default function Carlist() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [open1, setOpen1] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };



  const [id, setid] = useState();

  const [Name, setName] = useState();
  const [Variant, setVariant] = useState();
  const [Seat, setSeat] = useState();
  const [Color, setColor] = useState();
  const [Number, setNumber] = useState();
  const [Price, setPrice] = useState();
  const [Type1, setType1] = useState();
  const [Cat1, setCat1] = useState();
  const [img, setImg] = useState();

  const [update, setUpdate] = useState();
  const handleOpen1 = (x) => {
    setOpen1(true);
    setUpdate(x);

    setid(x.id);
    setName(x.data().Name);
    setVariant(x.data().Variant);
    setSeat(x.data().Seat);
    setType1(x.data().Type)
    setColor(x.data().Color);
    setNumber(x.data().Number);
    setPrice(x.data().Price);
    setCat1(x.data().Category);
    setImg(x.data().Image);
    console.log(x.data().Image);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      {/* <SimpleModal /> */}
    </div>
  );

  const [users, setUsers] = useState([]);

  const addcar = db.collection("addcar");

  function getUsers() {
    addcar.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setUsers(item);
    })
  }



  useEffect(() => {
    getUsers();
  }, []);

  const [type, setType] = React.useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };


  const [cat, setCat] = React.useState('');

  const handleTypeChangess = (event) => {
    setCat(event.target.value);
  };


  const [catt, setCatt] = useState([]);

  const category = db.collection("category");

  function getUsr() {
    category.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setCatt(item);
    })
  }
  useEffect(() => {
    getUsr();
  }, []);


  function Submitlist(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    let name = data.get('name');
    let variant = data.get('variant');
    let seat = data.get('seat');
    let color = data.get('color');
    let number = data.get('number');
    let price = data.get('price');
    let regnoeval = /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/

    if (name == '' || variant == '' || seat == '' || color == '' || number == '' || price == '') {
      alert('Fill all the details');
    } else if (!regnoeval.test(number)) {
      alert("e.g PB 10 JK 2345");
    }
    else {

      const ref = storageref.ref()
      var x = Math.floor((Math.random() * 1000000) + 1);
      const file = document.querySelector("#image").files[0]
      const names = "CarOption/" + x + ".png";
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(names).put(file, metadata)
      task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          addcar.add({
            Name: name,
            Variant: variant,
            Seat: seat, 
            Type: type,
            Category: cat,
            Color: color,
            Number: number,
            Price: price,
            Booking_Status: 'No',
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
    // var regnoval = /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/
    let regnoval = /^[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}$/
    let ar = [];
    for (let i = 0; i <= name.length; i++)
    {
      ar.push(name.split(''));
    }


    if (name === '' || variant === '' || seat === '' || color === '' || number === '' || price === '') {
      alert('Fill all the details')
    } else if (!regnoval.test(number)) {
      alert("Please fill correct format for registration number. e.g PB 10 JK 2345");
    }
    else {
      addcar.doc(id).update({
        Name: name,
        Variant: variant,
        Seat: seat,
        Type: Type1,
        Category: Cat1,
        Color: color,
        Number: number,
        Price: price,
        Keyword: ar,
        date: firebase.firestore.Timestamp.now()
      }).then(function (success) {
        alert('Data is updated successfully');
        e.target.reset();
        handleClose1();
      }).catch(function (error) {
        alert('There is a error');
      })
    }
  }

  const Editphoto = (x) => {
    const ref = storageref.ref()
    var y = Math.floor((Math.random() * 1000000) + 1);
    const file = x;
    const names = "CarOption/" + y + ".png";
    const metadata = {
      contentType: file.type
    }
    const task = ref.child(names).put(file, metadata)
    task.then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        addcar.doc(id).update({
          Image: url,
          date: firebase.firestore.Timestamp.now()
        }).then(function (success) {
          alert('Image is updated successfully');
          setImg(url);
        }).catch(function (error) {
          alert('There is a error');
        })
      })
  }


  function DeleteCar(x) {

    addcar.doc(x).delete();
  }

  return (

    <div>
      <AdminNavbar />


      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>

      <Grid container>
        {/* Modal */}

        <Modal style={{ width: '60%', position: 'absolute', top: '13%', left: '20%' }}
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"  >
          <Paper>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Add Cars to the list</Typography>
            <form action='' method='post' onSubmit={Submitlist}>
              <Grid container>
                <Grid item xs={6}>
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
                        value={type}
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
                <Grid item xs={6}>
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
                        value={cat}
                        onChange={handleTypeChangess}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {catt.map((userss) => (
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
          open={open1}
          onClose={handleClose1}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"  >
          <Paper>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Edit Cars in the list</Typography>

            {update && (
              <>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={4}>
                    <CardContent>
                      <img name="image" src={img} style={{ height: '90px' }} alt='' />
                      <TextField onChange={(e) => Editphoto(e.target.files[0])} size="small" name="image" id='image' variant='outlined' className="form-control" type="file" fullWidth required></TextField>
                    </CardContent>
                    {/* <CardContent>
                        <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Change Profile Photo</Button>
                      </CardContent> */}
                  </Grid>
                </Grid>

                <form action='' method='post' onSubmit={Editlist} >
                  <Grid container>
                    <Grid item xs={6}>
                      <CardContent >
                        <TextField size="small" onChange={(e) => setName(e.target.value)} value={Name} name="name" variant='outlined' className="form-control" label="Enter car name " type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size="small" name="variant" onChange={(e) => setVariant(e.target.value)} value={Variant} variant='outlined' className="form-control" label="Enter variant" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size="small" name="seat" onChange={(e) => setSeat(e.target.value)} value={Seat} variant='outlined' className="form-control" label="Enter seat" type="number" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <FormControl fullWidth variant="filled" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-filled-label">Car Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={Type1}
                            onChange={(e) => setType1(e.target.value)}
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
                        <TextField size="small" name="color" onChange={(e) => setColor(e.target.value)} value={Color} variant='outlined' className="form-control" label="Enter color" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size="small" name="number" variant='outlined' onChange={(e) => setNumber(e.target.value)} value={Number} className="form-control" label="Enter registration number" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size="small" name="price" variant='outlined' onChange={(e) => setPrice(e.target.value)} value={Price} className="form-control" label="Enter price per Km" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <FormControl fullWidth variant="filled" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={Cat1}
                            onChange={(e) => setCat1(e.target.value)}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {catt.map((userss) => (
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
                  {users.map((userss) => (
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
                      <TableCell><Button variant='contained' color='secondary' onClick={() => DeleteCar(userss.id)}>< DeleteIcon /></Button></TableCell>
                      <TableCell><Button type="button" variant='contained' onClick={() => handleOpen1(userss)} style={{ backgroundColor: 'white', color: 'blue' }}><b><EditIcon /></b></Button></TableCell>

                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>

            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}