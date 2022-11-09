import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';
import { Button, Grid, } from '@material-ui/core';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import { Table, TableBody, TableHead, TableRow, TableCell, Paper} from '@material-ui/core';

import imgbackground from './image/nee.jpg';





const Viewmore = ()=> {
    return(
        <div>

                          

              <AppBar style={{backgroundColor: 'rgb(3, 70, 70)'}}>
                    <Toolbar>
                    <Typography variant="h6" style={{ flexGrow:1, fontFamily:'gabriola', fontSize:'40px'}}>Rent-a-Ride</Typography>
                    {/* <Button style={{backgroundColor:'rgb(153, 3, 3)'}} ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/driverdb">Back to dashboard</Link></Button> */}
                    

                    </Toolbar>

      </AppBar>
<Grid container>
<Paper>
<img style={{height:'110vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />


     
      <Grid item xs={4} style={{position:'absolute', top:'100px', left:'36%'}}>
     

                <Paper>
                    <Table>
                        <TableHead >
                            <TableRow >
                                <TableCell style={{color:'white',backgroundColor:'black'}}><b>Name</b></TableCell>
                                <TableCell style={{color:'black'}}>Ramandeep singh</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Contact</b></TableCell>
                                <TableCell style={{color:'black'}}>85649-54632</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Email</b></TableCell>
                                <TableCell style={{color:'black'}}>ramandeep0612@gmail.com</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Pick-up Location</b></TableCell>
                                <TableCell style={{color:'black'}}>Veer Palace, Ludhiana-East</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Drop Location</b></TableCell>
                                <TableCell style={{color:'black'}}>Gill chowk, Ludhiana</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Total km</b></TableCell>
                                <TableCell style={{color:'black'}}>15.6km</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Type</b></TableCell>
                                <TableCell style={{color:'black'}}>Daily Ride</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Option</b></TableCell>
                                <TableCell style={{color:'black'}}>Driver</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Date & Time</b></TableCell>
                                <TableCell style={{color:'black'}}>23-05-2021 & 15:35</TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell style={{color:'white',backgroundColor:'black'}}><b>Charges</b></TableCell>
                                <TableCell style={{color:'black'}}>$58.00</TableCell>
                            </TableRow>

                            
                        </TableBody> 
                    </Table>
                </Paper>
        
        </Grid>            
        </Paper>
        </Grid>



        </div>
    )
}
export default Viewmore;