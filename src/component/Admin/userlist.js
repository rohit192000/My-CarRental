import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Button, Grid, Typography, ButtonGroup, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { db } from '../../firebase';
import {Delete, ToggleOff, ToggleOn} from '@mui/icons-material';
import imgbackground from '../image/nee.jpg';
const Userlist = () => {
  const [users, setUsers] = useState([]);
  const signup = db.collection("signup");
  const getUsers = () => {
    signup.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setUsers(item);
    })
  }
  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteUser = (x) => {
    signup.doc(x).delete();
  }

  const deactiveUser = (x) => {
    db.collection('signup').doc(x).update({
      Status: 0
    })
  }
  const activeUser = (x) => {
    db.collection('signup').doc(x).update({
      Status: 1
    })
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>
      <Grid container style={{ backgroundColor: 'transparent', padding: '0px' }}>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', height: '35px', width: '100%', textAlign: 'center' }}>User List</Typography>
        <br />
        <Grid item xs={12} style={{ padding: '50px' }}>
          <TableContainer>
            <Table style={{ backgroundColor: 'white' }}>
              <TableHead style={{ backgroundColor: '#16a5d0', color: 'white' }}>
                <TableRow >
                  <TableCell style={{ color: 'white' }}><b>Name</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Phone</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Email</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Password</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((userss) => (
                  <TableRow key={userss.id}>
                    <TableCell>{userss.data().Name}</TableCell>
                    <TableCell>{userss.data().Phone}</TableCell>
                    <TableCell>{userss.data().Email}</TableCell>
                    <TableCell>{userss.data().Password}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button size='small' variant='contained' color='primary' onClick={() => deleteUser(userss.id)}><Delete /></Button>
                        {userss.data().Status === 0 ? (
                          <Button size='small' variant='contained' style={{ background: 'green', color: 'white' }} onClick={() => activeUser(userss.id)}><ToggleOn /></Button>
                        ) : (
                          <Button size='small' variant='contained' style={{ background: 'maroon', color: 'white' }} color='primary' onClick={() => deactiveUser(userss.id)}><ToggleOff /></Button>
                        )}
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default Userlist;