import { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import { Grid, Typography, ButtonGroup } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button } from '@material-ui/core';
import { db } from '../firebase';
// import { makeStyles } from '@material-ui/core/styles';
import imgbackground from './image/nee.jpg';
import { useNavigate } from 'react-router-dom';


const Booking = () => {
  // assigning variable path to navigate to use for navigate to different componenet
  const path = useNavigate();

  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  // }));


  // const classes = useStyles();

  // 
  // const [ussr, setUssr] = useState('');

  // const handleChange = (event) => {
  //   setUssr(event.target.value);
  //   getUsers();
  // };

  // const [uuser, setUuser] = useState([]);

  // const signup = db.collection("signup");

  // function getUusers() {
  //   signup.onSnapshot((querySnapshot) => {
  //     const item = [];
  //     querySnapshot.forEach((doc) => {
  //       item.push(doc);
  //     })
  //     setUuser(item);
  //   })
  // }

  // useEffect(() => {
  //   getUusers();
  // }, []);

  const [users, setUsers] = useState([]);

  // query for manipulating booking collection
  const booking = db.collection("booking");
  function getUsers(x) {
    booking.orderBy('RegDate','asc').onSnapshot((querySnapshot) => {
      console.log(querySnapshot.size);
      const item = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        // if (x == 'assign') {
          // if (doc.data().Status == "no" || doc.data().Status == 'undefined') {
            item.push(doc);
          // } else {
            // console.log('No');
          // }
        // } else if (x == 'assigned' && doc.data().Status == 'yes') {
          // if (doc.data().Status == 'yes') {
            // item.push(doc);
          // }
        // }
      })
      setUsers(item);
    })
  }

  useEffect(() => {
    getUsers();
  }, []);

  function deleteUser(x) {
    booking.doc(x).delete().then(function (success) {
      alert('Data is deleted successfully');
    }).catch(function (error) {
      alert('Data is not deleted');
    })
  }

  function ViewDetail(x) {
    path('/viewbookingadmin/?id=' + x);
  }



  return (
    <div>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>

      <Grid container>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', height: '35px', width: '100%', textAlign: 'center' }}>Bookings</Typography>
        <Grid item xs={12} style={{ paddingTop: '2%' }}>
          <TableContainer>
            <ButtonGroup>
              <Button onClick={() => getUsers('assign')} id="assign" variant="contained" color="primary">Assign Driver</Button>
              <Button onClick={() => getUsers('assigned')} id="assigned" variant="contained" color="primary">Assigned Driver</Button>
            </ButtonGroup>
            <Table style={{ backgroundColor: 'white', marginTop: 5 }}>
              <TableHead style={{ backgroundColor: 'rgb(36, 86, 166)', color: 'white' }}>
                <TableRow >
                  <TableCell style={{ color: 'white' }}><b>Name</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Age</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Email</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Phone no.</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Car Name</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Number</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Price</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Reg Date</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Driver Assigned</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>View</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Delete</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  users.map((userss) => (
                    <TableRow key={userss.id}>
                      <TableCell>{userss.data().Name}</TableCell>
                      <TableCell>{userss.data().Age}</TableCell>
                      <TableCell>{userss.data().Email}</TableCell>
                      <TableCell>{userss.data().Phone}</TableCell>
                      <TableCell>{userss.data().carName}</TableCell>
                      <TableCell>{userss.data().carNumber}</TableCell>
                      {/* <TableCell>{userss.data().carColor}</TableCell> */}
                      {/* <TableCell>{userss.data().carVariant}</TableCell> */}
                      {/* <TableCell>{userss.data().carSeat}</TableCell> */}
                      <TableCell>Rs.{userss.data().carPrice}/-</TableCell>
                      {/* <TableCell>{userss.data().PickDate}</TableCell> */}
                      {/* <TableCell>{userss.data().PickLocation}</TableCell> */}
                      <TableCell>{userss.data().RegDate.toDate().toDateString()}</TableCell>
                      <TableCell>{userss.data().Status}</TableCell>
                      <TableCell><Button color="secondary" variant="contained" onClick={() => ViewDetail(userss.id)}>View</Button></TableCell>
                      <TableCell><Button color="secondary" variant="contained" onClick={() => deleteUser(userss.id)}>DEL</Button></TableCell>

                    </TableRow>
                  ))
                }


              </TableBody>
            </Table>

          </TableContainer>

        </Grid>
      </Grid>


    </div>
  )
}
export default Booking;