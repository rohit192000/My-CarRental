import React, {Component} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import imgbackground from '../image/carbg2.jpg';
import Usernavbar from './usernavbar';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';


const useStyles = makeStyles((theme) => ({
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export default function Vacantform()  {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');
  
    const handleChange = (event) => {
      setValue(event.target.value);
  
      
  
  
    };
  
  
          return(
  
            <div className="body">
   
              
   <Usernavbar />

  
            
  
            <img style={{height:'130vh', width:'100%', backgroundAttachment:'fixed', backgroundRepeat:'no-repeat', filter:'blur(15px)'}} src={imgbackground} alt="" />
  
            <Grid container style={{position:'absolute', top:'5vh'}}>
                <Grid item xs={1}> </Grid>
                  <Grid item xs={3} style={{backgroundColor:'white'}}>
                    <br></br> 
                    <br></br>
                    

                    <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700'}}>Enter details for share ride</Typography>
                    <form>
  
                    <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter name" type="text"></TextField>
                      </CardContent> 
  
  
                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter car name" type="text"></TextField>
                      </CardContent>
  
                     
                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter number plate" type="text"></TextField>
                      </CardContent>
  
                      
                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter vacant seats" type="number"></TextField>
                      </CardContent>
  
                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter pickup location" type="text"></TextField>
                      </CardContent>
  
                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter drop location" type="text"></TextField>
                      </CardContent>

                      <CardContent>
                        <TextField fullWidth variant="outlined" className="form-control" label="Enter ride date" type="text"></TextField>
                      </CardContent>
  
  
                      <CardContent>
                      <Button style={{backgroundColor:'rgb(153, 3, 3)', width:'100%', color:'white'}}>submit</Button>
                      </CardContent>
                    </form>
                  </Grid>
                  <Grid item xs={1}> </Grid>

                  <Grid item xs={6}> 
<br></br>
<br></br>
                  <TableContainer>
                    
                    <Table style={{backgroundColor:'white'}}>
                        <TableHead style={{backgroundColor:'teal', color:'white'}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}><b>Name</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Car </b></TableCell>
                                <TableCell style={{color:'white'}}><b>Registration number</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Vacant Seat</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Pickup Location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Drop Location</b></TableCell>
                                <TableCell style={{color:'white'}}><b>Journey date</b></TableCell>

                            </TableRow>
                            </TableHead>

                            <TableBody>
                            <TableRow>
                               <TableCell>Rajan</TableCell>
                               <TableCell>Hundai i20</TableCell>
                               <TableCell>PB55KO5698</TableCell>
                               <TableCell>2</TableCell>
                               <TableCell></TableCell>
                            </TableRow>
                            </TableBody>
                            </Table>
                            </TableContainer>
                  
                  
                  
                  
                  </Grid>


               
  
                  </Grid>
                  
             
              
  </div>
  
  
  
  
  
  
  
  
  
  
              
  
              
          )
      }
  