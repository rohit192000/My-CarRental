import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Grid, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button } from '@mui/material';
import { db } from '../../firebase';
import imgbackground from '../image/nee.jpg';
import { useNavigate } from 'react-router-dom';
const Booking = () => {
  const path = useNavigate();
  const [users, setUsers] = useState([]);
  const getUsers = (x) => {
    db.collection("booking").orderBy('RegDate','asc').onSnapshot((querySnapshot) => {
      console.log(querySnapshot.size);
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
  const deleteUser = (x) => {
    db.collection("booking").doc(x).delete().then(function (success) {
      alert('Data is deleted successfully');
    }).catch(function (error) {
      alert('Data is not deleted');
    })
  }
  const ViewDetail = (x) => {
    path('/viewbookingadmin/?id=' + x);
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>
      <Grid container>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', height: '35px', width: '100%', textAlign: 'center' }}>Bookings</Typography>
        <Grid item xs={12} style={{ paddingTop: '2%' }}>
          <TableContainer>
            {/* <ButtonGroup>
              <Button onClick={() => getUsers('assign')} id="assign" variant="contained" color="primary">Assign Driver</Button>
              <Button onClick={() => getUsers('assigned')} id="assigned" variant="contained" color="primary">Assigned Driver</Button>
            </ButtonGroup> */}
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
                      <TableCell>Rs.{userss.data().carPrice}/-</TableCell>
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
    </>
  )
}
export default Booking;