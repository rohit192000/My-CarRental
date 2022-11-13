import React, {Component, useEffect, useState} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';
import { db } from '../../firebase';

import imgbackground from '../image/carbg2.jpg';
// import './App.css';
import Usernavbar from './usernavbar';
import { useNavigate } from 'react-router-dom';



export default function Myorder()  {
  var path=useNavigate();
    const [users, setUsers] = useState([]);

    const user = localStorage.getItem('user');
    if(user == null)
    {
       path('/');
    }

    function Logout(){
        localStorage.removeItem('user');
       path('/');
    }



    const booking = db.collection("booking");
  

    
    function getUsers(x){
        booking.where('Uid','==',user).onSnapshot((querySnapshot) => {
          const item = [];
          // console.log(ussr);
          querySnapshot.forEach((doc) =>{
            if(x == 'assign')
            {
              if(doc.data().DriverName == '' || doc.data().DriverName == null)
              {
                console.log(doc.data().DriverName)
                item.push(doc);
                console.log('yes')
              }else
              {
                console.log('No');
              }
            }else if(x == 'assigned')
            {
                if(doc.data().DriverName == '' || doc.data().DriverName == null)
                {
                }else
                {
                  item.push(doc);
                }
            }else if(users != '')
            {
              // item.push(doc);
            }else if(x == null)
            {
              item.push(doc);
            }
      
  
          })
          setUsers(item);
        })
      }

    
    // function getUsers(){
    //   booking.onSnapshot((querySnapshot) => {
    //     const iteem = [];
    //     querySnapshot.forEach((doc) =>{
    //       iteem.push(doc);
    //     })
    //     setUsers(iteem);
    //   })
    // }

    
  useEffect(() => {
    getUsers();
  }, []);




  
  function deleteUser(x) {
    booking.doc(x).delete().then(function(success){
      alert('Data is deleted successfully');
    }).catch(function(error){
      alert('Data is not deleted');
    })
  }


  
  function ViewDetail(x) {
   path('/viewbooking/?id='+x);
  }




        return(

          <div className="body">
 
 <Usernavbar />



          <Paper>

          <img style={{height:'150vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />

          <Grid container style={{position:'absolute', top:'10vh'}}>
              
          <Button onClick={() => getUsers('assign')} id="assign" variant="contained" color="secondary">Assign Driver</Button>
                <Button onClick={() => getUsers('assigned')} id="assigned" variant="contained" color="primary">Assigned Driver</Button>
                  
              {/* <Grid item xs={0}> </Grid> */}
                <Grid item xs={12} style={{backgroundColor:'white', marginTop:'0vh'}}>
                  
                  <TableContainer>

                    <Table style={{backgroundColor:'white'}}>
                        <TableHead style={{backgroundColor:'rgb(36, 86, 166)', color:'white'}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}><b>Name</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Age</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Email</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Phone no.</b></TableCell>

                                {/* <TableCell style={{color:'white'}}><b>Registration Date</b></TableCell> */}
                                <TableCell style={{color:'white'}}><b>Car Name</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Number</b></TableCell>
                                {/* <TableCell style={{color:'white'}}><b>Color</b></TableCell> */}
                                {/* <TableCell style={{color:'white'}}><b>Variant</b></TableCell> */}
                                {/* <TableCell style={{color:'white'}}><b>Seat</b></TableCell> */}
                                {/* <TableCell style={{color:'white'}}><b>Price</b></TableCell> */}

                                {/* <TableCell style={{color:'white'}}><b></b></TableCell> */}
                                

                                <TableCell style={{color:'white'}}><b>Pick Date</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Pick location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>View</b></TableCell>

                                {/* <TableCell style={{color:'white'}}><b>Delete</b></TableCell> */}

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
                                {/* <TableCell>{userss.data().RegDate.toDate().toDateString()}</TableCell> */}
                                <TableCell>{userss.data().carName}</TableCell>
                                <TableCell>{userss.data().carNumber}</TableCell>
                                {/* <TableCell>{userss.data().carColor}</TableCell> */}
                                {/* <TableCell>{userss.data().carVariant}</TableCell> */}
                                {/* <TableCell>{userss.data().carSeat}</TableCell> */}
                                {/* <TableCell>Rs.{userss.data().carPrice}/-</TableCell> */}
                                <TableCell>{userss.data().PickDate}</TableCell>
                                <TableCell>{userss.data().PickLocation}</TableCell>
                                <TableCell><Button color="secondary" variant="contained" onClick={() => ViewDetail(userss.id)}>View</Button></TableCell>

                                {/* <TableCell><Button color="secondary" variant="contained" onClick={() => deleteUser(userss.id)}>DEL</Button></TableCell> */}

                            </TableRow>
                            ))
                        }
                        </TableBody>
                        </Table>
                        </TableContainer>
                 



                    
                </Grid>
             

                </Grid>
                </Paper>
           
            
</div>










            

            
        )
    }
