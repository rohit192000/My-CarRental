import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, Button, Modal, CardContent, TextField, Container, Card, } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { db } from '../firebase';
import DeleteIcon from '@material-ui/icons/Delete';


import imgbackground from './image/nee.jpg';


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






export default function Category() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const [users, setUsers] = useState([]);

  const addcar = db.collection("addcar");
  const category = db.collection("category");

  function getUsers() {
    category.onSnapshot((querySnapshot) => {
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


  function Submitlist(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    // alert('hi');
    let catname = data.get('catname');
    if (catname == '') {
      alert('please fill category')
    } else {
      category.add({
        Name: catname,

      }).then(function (success) {
        alert('Data is added successfully');
        e.target.reset();
      }).catch(function (error) {
        alert('There is a error');
      })
    }
  }

  function deleteCat(x) {
    category.doc(x).delete();
  }


  return (

    <div>
      <AdminNavbar />


      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>

      {/* <Grid container>
                <Typography variant="h4" style={{fontFamily:'gabriola', color:'white', height:'35px', width:'100%', textAlign:'center'}}>Category List</Typography>                

            <Modal style={{ width:'40%', position:'absolute', top:'35px', left:'30%'}}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"  >
              <Paper>
              <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700', paddingTop:'10px'}}>Add Category</Typography>
              </Paper>
            </Modal> */}
      <Container>
        <Grid container>
          <Grid xs={1}></Grid>
          <Grid xs={4}>
            <CardContent>
              <Card>
                <form className="form-group" onSubmit={Submitlist}>
                  <CardContent>
                    <Typography variant='body1'>Add Category</Typography>
                    <br />
                    <TextField size='small' name="catname" variant='outlined' className="form-control" label="Enter car category" type="text" fullWidth></TextField>
                  </CardContent>
                  <CardContent>
                    <Button type="submit" variant='contained' color='primary'>Add</Button>
                  </CardContent>
                </form>
              </Card>
            </CardContent>
          </Grid>

          <Grid xs={2}></Grid>


          <Grid xs={4}>
            {/* <CardContent> */}
            {/* <Button type="button" onClick={handleOpen} variant='contained' style={{ color: 'navy' }}><b>Add Category</b></Button> */}
            {/* </CardContent> */}
            <CardContent>
              <TableContainer>
                <Table style={{ backgroundColor: 'white' }}>
                  <TableHead style={{ backgroundColor: 'rgb(36, 86, 166)', color: 'white' }}>
                    <TableRow >
                      <TableCell align='center' style={{ color: 'white' }}><b>Cat Name</b></TableCell>
                      <TableCell align='center' style={{ color: 'white' }}><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      users.map((userss) => (
                        <TableRow key={userss.id}>
                          <TableCell align='center'>{userss.data().Name}</TableCell>
                          <TableCell align='center'><Button variant='contained' color='primary' onClick={() => deleteCat(userss.id)}>< DeleteIcon /></Button></TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}
