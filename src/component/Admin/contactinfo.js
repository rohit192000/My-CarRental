import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Button, Grid, Typography, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { db } from '../../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import imgbackground from '../image/nee.jpg';
const Contactinfo = () => {
  const [contacts, setUsers] = useState([]);
  const contact = db.collection("contact");
  const getContact = () => {
    contact.onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setUsers(item);
    })
  }
  useEffect(() => {
    getContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteUser = (x) => {
    contact.doc(x).delete();
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}></Grid>
      <Grid container style={{ backgroundColor: 'transparent', padding: '0px' }}>
        <Typography variant="h4" style={{ fontFamily: 'gabriola', color: 'white', height: '35px', width: '100%', textAlign: 'center' }}>Contact Information</Typography>
        <br />
        <Grid item xs={1}></Grid>
        <Grid item xs={10} style={{ padding: '50px' }}>
          <TableContainer>
            <Table style={{ backgroundColor: 'white' }}>
              <TableHead style={{ backgroundColor: 'rgb(36, 86, 166)', color: 'white' }}>
                <TableRow >
                  <TableCell style={{ color: 'white' }}><b>Name</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Phone</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Email</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Location</b></TableCell>
                  <TableCell style={{ color: 'white' }}><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  contacts.map((contactData) => (
                    <TableRow key={contactData.id}>
                      <TableCell>{contactData.data().Name}</TableCell>
                      {/* <TableCell>{contactData.data().Lastname}</TableCell> */}
                      {/* <TableCell>{contactData.data().Age}</TableCell> */}
                      <TableCell>{contactData.data().Phone}</TableCell>
                      <TableCell>{contactData.data().Email}</TableCell>
                      <TableCell>{contactData.data().Location}</TableCell>
                      {/* <TableCell>{contactData.data().Address}</TableCell> */}
                      <TableCell><Button variant='contained' color='secondary' onClick={() => deleteUser(contactData.id)}>< DeleteIcon /></Button></TableCell>
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
export default Contactinfo;