import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Typography, Button, Modal, CardContent, TextField, ImageListItem, ImageListItemBar, ImageList, } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import firebase from 'firebase';
import { db, storageref } from '../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import imgbackground from './image/nee.jpg';

//  This function is used for generating random numbers.
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

//  function used for designing modal 
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`, //$ used for concat number with string where top ia a number and % is a string.
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// this function is used for styling the paper component so we can used it anywhere in this page.
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

// main function starts here.
export default function Driverlist() {
  // assigning useStyles function to classes variable.
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  // used for stating the condition in madal to open on true and closed on false.
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  // used for opening the modal
  const handleOpen = () => {
    setOpen(true);
  };


  const [id, setid] = useState()

  const [Name, setName] = useState()
  const [Age, setAge] = useState()
  const [Gender, setGender] = useState()
  const [Phone, setPhone] = useState()
  const [Email, setEmail] = useState()
  const [License, setLicense] = useState()
  const [Aadhar, setAadhar] = useState()
  const [Password, setPassword] = useState()
  const [img, setImage] = useState()


  const [update, setUpdate] = useState();
  const handleOpen1 = (x) => {
    setOpen1(true);
    setUpdate(x);

    setid(x.id);
    setName(x.data().Name);
    setAge(x.data().Age);
    setGender(x.data().Gender);
    setPhone(x.data().Phone);
    setEmail(x.data().Email);
    setLicense(x.data().License);
    setAadhar(x.data().Aadhar);
    setImage(x.data().Image);



  };

  // used for closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      {/* <SimpleModal /> */}
    </div>
  );

  //  variable define for assigning drivers so we can render on the frontend
  const [users, setUsers] = useState([]);

  // query for specific collection
  const adddriver = db.collection("adddriver");

  // function for importing the data of the drivers.
  function getUsers() {
    adddriver.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setUsers(item);
    })
  }


  // hooks which can run the function only when refresh the page.
  useEffect(() => {
    getUsers();
  }, []);

  // function for adding the new user applied on the form. 
  function Submitlist(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    // alert('hi');
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

    if (name == '' || age == '') {
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
  function Editlist(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    // alert('hi');
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

    if (name == '' || age == '') {
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

      adddriver.doc(id).update({
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
        adddriver.doc(id).update({
          Image: url,
          date: firebase.firestore.Timestamp.now()
        }).then(function (success) {
          alert('Image is updated successfully');
          setImage(url);
        }).catch(function (error) {
          alert('There is a error');
        })
      })
  }
  // function for deleting the driver.
  function deleteDriver(x) {
    adddriver.doc(x).delete();
  }


  return (
    <div>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>

      <Grid container>
        {/* Modal for adding the driver */}

        <Modal style={{ width: '50%', position: 'absolute', top: '13%', left: '25%' }}
          open={open}
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
          open={open1}
          onClose={handleClose1}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"  >
          <Paper>
            <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700', paddingTop: '10px' }}>Edit Driver in the list</Typography>

            {update && (
              <>


                {/* <form action="" method="post" onChange={Editphoto} className="form-group"> */}
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
                {/* </form> */}


                <form action="" method="post" onSubmit={Editlist} className="form-group">
                  <Grid container>
                    <Grid item xs={6}>
                      <CardContent >
                        <TextField size='small' name="name" variant='outlined' onChange={(e) => setName(e.target.value)} value={Name} className="form-control" label="Enter name " type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="age" variant='outlined' className="form-control" onChange={(e) => setAge(e.target.value)} value={Age} label="Enter age " type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="gender" variant='outlined' className="form-control" onChange={(e) => setName(e.target.value)} value={Gender} label="Enter gender" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="phone" variant='outlined' className="form-control" onChange={(e) => setPhone(e.target.value)} value={Phone} label="Enter phone no" type="number" fullWidth required></TextField>
                      </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <TextField size='small' name="email" variant='outlined' className="form-control" onChange={(e) => setEmail(e.target.value)} value={Email} label="Enter email" type="email" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="license" variant='outlined' className="form-control" onChange={(e) => setLicense(e.target.value)} value={License} label="Enter license id" type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="aadhar" variant='outlined' className="form-control" label="Enter aadhar id" onChange={(e) => setAadhar(e.target.value)} value={Aadhar} type="text" fullWidth required></TextField>
                      </CardContent>
                      <CardContent>
                        <TextField size='small' name="password" variant='outlined' className="form-control" label="Enter password" onChange={(e) => setPassword(e.target.value)} value={Password} type="text" fullWidth required></TextField>
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
                    users.map((userss) => (
                      <TableRow key={userss.id}>
                        <TableCell>{userss.data().Name}</TableCell>
                        <TableCell>{userss.data().Age}</TableCell>
                        <TableCell>{userss.data().Gender}</TableCell>
                        <TableCell>{userss.data().Phone}</TableCell>
                        <TableCell>{userss.data().Email}</TableCell>
                        <TableCell>{userss.data().License}</TableCell>
                        <TableCell>{userss.data().Aadhar}</TableCell>
                        <TableCell>{userss.data().Password}</TableCell>
                        <TableCell><img src={userss.data().Image} style={{ height: '70px' }} /></TableCell>
                        <TableCell><Button variant='contained' color='secondary' onClick={() => deleteDriver(userss.id)}>< DeleteIcon /></Button></TableCell>
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


    </div >
  )
}
