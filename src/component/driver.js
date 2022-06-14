import React, {Component} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@material-ui/core';

import imgbackground from './image/carbg2.jpg';


export default function Driver() {

    return (
        <div className="body">
            
            <Paper>
            <img style={{height:'99vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />


                
            <Grid container style={{position:'absolute', top:'13vh'}}>
              <Grid item xs={4}> </Grid>
                <Grid item xs={4} style={{backgroundColor:'white'}}>
                  <br></br>
                  <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700'}}> Enter Driver Details</Typography>
                  <form className="form-group">

                    <CardContent>
                      <TextField variant="outlined" className="form-control" label="Enter driver name" type="text" fullWidth></TextField>
                    </CardContent>

                    <CardContent>
                      <TextField variant="outlined" className="form-control" label="Enter age " type="number" fullWidth></TextField>
                    </CardContent>

                    
                    <CardContent>
                      <TextField variant="outlined"  className="form-control" label="Enter Licence number" type="text" fullWidth></TextField>
                    </CardContent>

                    
                    <CardContent>
                      <TextField variant="outlined" className="form-control" label="Enter Aadhar Number" type="number" fullWidth></TextField>
                    </CardContent>



                    

                    <CardContent>
                    <Button style={{backgroundColor:'rgb(153, 3, 3)', width:'100%', color:'white'}}>submit</Button>



                        {/* <center>
                        <input style={{height:'35px', width:'200px', backgroundColor:'rgb(85, 57, 85)', color:'white', fontSize:'18px', borderRadius:'10px'}} type="submit" value="Submit"  />
                        </center> */}
                    </CardContent>
                  </form>
                </Grid>
            </Grid>
            </Paper>    




        </div>
    )
}