import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';
import { db } from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';

import imgbackground from '../image/nee.jpg';


const Contactinfo = ()=> {


    const [users, setUsers] = useState([]);

    const contact = db.collection("contact");
  
    function getUsers(){
      contact.onSnapshot((querySnapshot) => {
        const item = [];
        querySnapshot.forEach((doc) =>{
          item.push(doc);
        })
        setUsers(item);
      })
    }
  
  
    useEffect(() => {
      getUsers();
    }, []);


    
    function deleteUser(x){
      contact.doc(x).delete();
  }



    return(
        <div>
                     <AdminNavbar />

            <img style={{height:'99vh', width:'100%', backgroundAttachment:'fixed', backgroundRepeat:'no-repeat', filter:'blur(10px)', position: 'fixed', zIndex:'-1'}} src={imgbackground} alt="" />
            <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}></Grid>


            <Grid container style={{backgroundColor:'transparent', padding:'0px'}}>
                <Typography variant="h4" style={{ fontFamily:'gabriola', color:'white', height:'35px', width:'100%', textAlign:'center'}}>Contact Information</Typography>
                <br />
                <Grid item xs={1}></Grid>
              <Grid item xs={10} style={{padding:'50px'}}> 
                <TableContainer>
                    <Table style={{backgroundColor:'white'}}>
                        <TableHead style={{backgroundColor:'rgb(36, 86, 166)', color:'white'}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}><b>Name</b></TableCell>
                                {/* <TableCell style={{color:'white'}}><b>Phone</b></TableCell> */}
                                {/* <TableCell style={{color:'white'}}><b>Age</b></TableCell> */}
                                <TableCell style={{color:'white'}}><b>Phone</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Email</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            

                            {
              users.map((userss) => (
                <TableRow key={userss.id}>
                  <TableCell>{userss.data().Name}</TableCell>
                  {/* <TableCell>{userss.data().Lastname}</TableCell> */}
                  {/* <TableCell>{userss.data().Age}</TableCell> */}
                  <TableCell>{userss.data().Phone}</TableCell>
                  <TableCell>{userss.data().Email}</TableCell>
                  <TableCell>{userss.data().Location}</TableCell>
                  {/* <TableCell>{userss.data().Address}</TableCell> */}
                  <TableCell><Button variant='contained' color='secondary' onClick={() => deleteUser(userss.id)}>< DeleteIcon /></Button></TableCell>
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
export default Contactinfo;