import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Paper, Grid, Typography, Button, Modal, CardContent, TextField, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import firebase from 'firebase';
import { db, storageref } from '../../firebase';
import { Delete, Edit } from '@mui/icons-material';
import imgbackground from '../image/nee.jpg';
const Driverlist = () => {
  const [open, setOpen] = useState({ open1: false, open2: false });
  // used for opening the modal
  const handleOpen = () => {
    setOpen({ ...open, open1: true });
  };
  const [driverData, setDriverData] = useState({
    id: '',
    Name: '',
    Age: '',
    Gender: '',
    Phone: '',
    Email: '',
    License: '',
    Aadhar: '',
    Password: '',
    img: '',
    update: '',
  })
  const handleOpen1 = (x) => {
    setOpen({ ...open, open2: true });
    setDriverData((driverData) => ({
      ...driverData,
      update: x,
      id: x.id,
      Name: x.data().Name,
      Age: x.data().Age,
      Gender: x.data().Gender,
      Phone: x.data().Phone,
      Email: x.data().Email,
      License: x.data().License,
      Aadhar: x.data().Aadhar,
      Password: x.data().Password,
      img: x.data().Image
    }))
  };
  // used for closing the modal
  const handleClose = () => {
    setOpen({ ...open, open1: false });
  };
  const handleClose1 = () => {
    setOpen({ ...open, open2: false });
  };
  //  variable define for assigning drivers so we can render on the frontend
  const [drivers, setDrivers] = useState([]);
  // query for specific collection
  const adddriver = db.collection("adddriver");
  // function for importing the data of the drivers.
  const getDrivers = () => {
    adddriver.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setDrivers(item);
    })
  }
  // hooks which can run the function only when refresh the page.
  useEffect(() => {
    getDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // function for adding the new user applied on the form. 
  const Submitlist = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let age = data.get('age');
    let gender = data.get('gender');
    let phone = data.get('phone');
    let email = data.get('email');
    let license = data.get('license');
    let aadhar = data.get('aadhar');
    let password = data.get('password');
    var nameval = /^([a-zA-Z]{3,}[ ]*[a-zA-Z]*)$/;
    var ageval = /^([0-9]{2})$/
    var phoneval = /^([5-9][0-9]{9})$/
    var emailval = /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/
    var aadharval = /^([2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4})$/
    var licenseval = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
    if (name === '' || age === '') {
      alert('Please fill all fields');
    } else if (!nameval.test(name)) {
      alert('Please fill name of minimum 3 characters')
    } else if (!ageval.test(age)) {
      alert('Please fill age of two number')
    } else if (!phoneval.test(phone)) {
      alert('Please fill 10 digit number starts with number 5-9')
    } else if (!aadharval.test(aadhar)) {
      alert('Please fill correct pattern for aadhar number')
    } else if (!emailval.test(email)) {
      alert('Please fill correct pattern for email xyz@gmail.com')
    } else if (!licenseval.test(license)) {
      alert('Please fill correct pattern for license')
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
          adddriver.add({
            Name: name,
            Age: age,
            Gender: gender,
            Phone: phone,
            Email: email,
            License: license,
            Aadhar: aadhar,
            Password: password,
            Booked_Status: 'No',
            Image: url,
            date: firebase.firestore.Timestamp.now()
          }).then(function (success) {
            alert('Data is added successfully');
            handleClose();
          }).catch(function (error) {
            alert('There is a error');
          })
        })
    }
  }
  // Function for editing the driver details
  const editDrivers = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let age = data.get('age');
    let gender = data.get('gender');
    let phone = data.get('phone');
    let email = data.get('email');
    let license = data.get('license');
    let aadhar = data.get('aadhar');
    let password = data.get('password');
    var nameval = /^([a-zA-Z]{3,}[ ]*[a-zA-Z]*)$/;
    var ageval = /^([0-9]{2})$/
    var phoneval = /^([5-9][0-9]{9})$/
    var emailval = /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/
    var aadharval = /^([2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4})$/
    var licenseval = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
    if (name === '' || age === '') {
      alert('Please fill all fields');
    } else if (!nameval.test(name)) {
      alert('Please fill name of minimum 3 characters')
    } else if (!ageval.test(age)) {
      alert('Please fill age of two number')
    } else if (!phoneval.test(phone)) {
      alert('Please fill 10 digit number starts with number 5-9')
    } else if (!aadharval.test(aadhar)) {
      alert('Please fill correct pattern for aadhar number')
    } else if (!emailval.test(email)) {
      alert('Please fill correct pattern for email xyz@gmail.com')
    } else if (!licenseval.test(license)) {
      alert('Please fill correct pattern for liscense')
    } else {
      adddriver.doc(driverData.id).update({
        Name: name,
        Age: age,
        Gender: gender,
        Phone: phone,
        Email: email,
        License: license,
        Aadhar: aadhar,
        Password: password,
        date: firebase.firestore.Timestamp.now()
      }).then(function (success) {
        alert('Data is updated successfully');
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
        adddriver.doc(driverData.id).update({
          Image: url,
          date: firebase.firestore.Timestamp.now()
        }).then(function (success) {
          alert('Image is updated successfully');
          setDriverData({ ...driverData, img: url });
        }).catch(function (error) {
          alert('There is a error');
        })
      })
  }
  // function for deleting the driver.
  const deleteDriver = (x) => {
    adddriver.doc(x).delete();
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>
      <Grid container>
        {/* Modal for adding the driver */}
        <Modal style={{ width: '50%', position: 'absolute', top: '13%', left: '25%' }}
          open={open.open1}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"  >
          <Paper>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Add Driver to the list</Typography>
            <form action="" method="post" onSubmit={Submitlist} className="form-group">
              <Grid container>
                <Grid item xs={6}>
                  <CardContent >
                    <TextField size='small' name="name" variant='outlined' className="form-control" label="Enter name " type="text" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="age" variant='outlined' className="form-control" label="Enter age " type="text" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="gender" variant='outlined' className="form-control" label="Enter gender" type="text" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="phone" variant='outlined' className="form-control" label="Enter phone no" type="number" fullWidth required></TextField>
                  </CardContent>
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <TextField size='small' name="email" variant='outlined' className="form-control" label="Enter email" type="email" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="license" variant='outlined' className="form-control" label="Enter license id" type="text" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="aadhar" variant='outlined' className="form-control" label="Enter aadhar id" type="text" fullWidth required></TextField>
                  </CardContent>
                  <CardContent>
                    <TextField size='small' name="password" variant='outlined' className="form-control" label="Enter password" type="text" fullWidth required></TextField>
                  </CardContent>
                </Grid>
                <Grid lg={12}>
                  <CardContent>
                    <TextField size='small' id='image' name="image" variant='outlined' className="form-control" type="file" fullWidth required></TextField>
                  </CardContent>
                </Grid>
                <CardContent>
                  <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Add Driver</Button>
                </CardContent>
              </Grid>
            </form>
          </Paper>
        </Modal>
        {/* Modal for Editing the driver */}
        <Modal style={{ width: '50%', position: 'absolute', top: '13%', left: '25%' }}
          open={open.open2}
          onClose={handleClose1}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"  >
          <Paper>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Edit Driver in the list</Typography>
            {driverData.update && (
              <>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={4}>
                    <CardContent>
                      <img name="image" src={driverData.img} style={{ height: '90px' }} alt='' />
                      <TextField onChange={(e) => Editphoto(e.target.files[0])} size="small" name="image" id='image' variant='outlined' className="form-control" type="file" fullWidth required></TextField>
                    </CardContent>
                  </Grid>
                </Grid>
                <form action="" method="post" onSubmit={editDrivers} className="form-group">
                  <Grid container>
                    <Grid item xs={6}>
                      <CardContent >
                        <TextField size='small' name="name" variant='outlined' onChange={(e) => setDriverData({ ...driverData, Name: e.target.value })} value={driverData.Name} className="form-control" label="Enter name " type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="age" variant='outlined' className="form-control" onChange={(e) => setDriverData({ ...driverData, Age: e.target.value })} value={driverData.Age} label="Enter age " type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="gender" variant='outlined' className="form-control" onChange={(e) => setDriverData({ ...driverData, Gender: e.target.value })} value={driverData.Gender} label="Enter gender" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="phone" variant='outlined' className="form-control" onChange={(e) => setDriverData({ ...driverData, Phone: e.target.value })} value={driverData.Phone} label="Enter phone no" type="number" fullWidth required></TextField>
                      </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <TextField size='small' name="email" variant='outlined' className="form-control" onChange={(e) => setDriverData({ ...driverData, Email: e.target.value })} value={driverData.Email} label="Enter email" type="email" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="license" variant='outlined' className="form-control" onChange={(e) => setDriverData({ ...driverData, License: e.target.value })} value={driverData.License} label="Enter license id" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="aadhar" variant='outlined' className="form-control" label="Enter aadhar id" onChange={(e) => setDriverData({ ...driverData, Aadhar: e.target.value })} value={driverData.Aadhar} type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="password" variant='outlined' className="form-control" label="Enter password" onChange={(e) => setDriverData({ ...driverData, Password: e.target.value })} value={driverData.Password} type="text" fullWidth required></TextField>
                      </CardContent>
                    </Grid>
                    <CardContent>
                      <Button type="submit" style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>Edit Driver</Button>
                    </CardContent>
                  </Grid>
                </form>
              </>
            )}
          </Paper>
        </Modal>
        <Grid container>
          <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', height: '35px', width: '100%', fontWeight: 'bolder', textAlign: 'center' }}>Driver List</Typography>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <CardContent>
              <Button type="button" variant='contained' onClick={handleOpen} style={{ backgroundColor: 'white', color: 'blue' }}><b>Add new Driver</b></Button>
            </CardContent>
            <TableContainer>
              <Table style={{ backgroundColor: 'white' }}>
                <TableHead style={{ backgroundColor: '#16a5d0', color: 'white' }}>
                  <TableRow >
                    <TableCell style={{ color: 'white' }}><b>Driver Name</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Age</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Gender</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Phone no.</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Email</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Licence Id</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Aadhar Id</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Password</b></TableCell>
                    <TableCell style={{ color: 'white' }}><b>Image</b></TableCell>
                    <TableCell style={{ color: 'white' }} colSpan='2'><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    drivers.map((userss) => (
                      <TableRow key={userss.id}>
                        <TableCell>{userss.data().Name}</TableCell>
                        <TableCell>{userss.data().Age}</TableCell>
                        <TableCell>{userss.data().Gender}</TableCell>
                        <TableCell>{userss.data().Phone}</TableCell>
                        <TableCell>{userss.data().Email}</TableCell>
                        <TableCell>{userss.data().License}</TableCell>
                        <TableCell>{userss.data().Aadhar}</TableCell>
                        <TableCell>{userss.data().Password}</TableCell>
                        <TableCell><img src={userss.data().Image} style={{ height: '70px' }} alt={''} /></TableCell>
                        <TableCell><Button variant='contained' color='secondary' onClick={() => deleteDriver(userss.id)}>< Delete /></Button></TableCell>
                        <TableCell><Button type="button" variant='contained' onClick={() => handleOpen1(userss)} style={{ backgroundColor: 'white', color: 'blue' }}><b><Edit /></b></Button></TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Driverlist;
