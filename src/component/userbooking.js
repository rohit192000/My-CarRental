import React, {Component} from 'react';
import {Paper, Grid, Typography} from '@material-ui/core';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@material-ui/core';


import imgbackground from './image/nee.jpg';


const Userbooking = ()=> {
    return(
        <Paper>
                   


            <img style={{height:'99vh', width:'100%', backgroundAttachment:'fixed', backgroundRepeat:'no-repeat', filter:'blur(10px)'}} src={imgbackground} alt="" />
               
            <Grid container style={{position:'absolute', top:'10vh'}}>
                <Typography variant="h4" style={{position:'absolute', fontFamily:'gabriola', textAlign:'center', backgroundColor:'teal', color:'white', height:'35px', width:'100%'}}>My Bookings Details</Typography>
              <Grid style={{marginLeft:'10%'}}> 
                <TableContainer>
                    <Paper style={{position:'absolute', top:'10vh'}}>
                    <Table>
                        <TableHead style={{backgroundColor:'black', color:'white'}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}><b>Name</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Age</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Phone</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Email</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Car</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Mode</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Booking date</b></TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Randeep Singh</TableCell>
                                <TableCell>24</TableCell>
                                <TableCell>8146875625</TableCell>
                                <TableCell>randeep2305@gmail.com</TableCell>
                                <TableCell>BMW (5 seater)</TableCell>
                                <TableCell>Self-Drive</TableCell>
                                <TableCell>fortis, Ludhiana East</TableCell>
                                <TableCell>23/5/2021</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Sandeep Singh</TableCell>
                                <TableCell>34</TableCell>
                                <TableCell>8146875625</TableCell>
                                <TableCell>sandeep2305@gmail.com</TableCell>
                                <TableCell>Scorpio (7 seater)</TableCell>
                                <TableCell>Driver</TableCell>
                                <TableCell>Apollo, Ludhiana West</TableCell>
                                <TableCell>21/5/2021</TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell>Mandeep Singh</TableCell>
                                <TableCell>32</TableCell>
                                <TableCell>8146875625</TableCell>
                                <TableCell>mandeep2305@gmail.com</TableCell>
                                <TableCell>BMW (5 seater)</TableCell>
                                <TableCell>Self-Drive</TableCell>
                                <TableCell>Gill, Ludhiana East</TableCell>
                                <TableCell>15/5/2021</TableCell>
                            </TableRow>

                          

                           
                            
                        </TableBody>
                    </Table>
                    </Paper>
                </TableContainer>
              
              
              </Grid>
            </Grid>  
       
       
        </Paper>
    )
}
export default Userbooking;