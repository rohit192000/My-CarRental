import React, {Component} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import imgbackground from '../image/carbg2.jpg';
// import './App.css';
import Usernavbar from './usernavbar';

const useStyles = makeStyles((theme) => ({
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
 
}));





export default function Registration()  {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);

    


  };


        return(

          <div className="body">
 
 <Usernavbar />



          <Paper>

          <img style={{height:'110vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />

          <Grid container style={{position:'absolute', top:'10vh'}}>
              <Grid item xs={4}> </Grid>
                <Grid item xs={4} style={{backgroundColor:'white'}}>
                  <br></br>
                  <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700'}}>Enter details for the Reservation</Typography>
                  <form>

                  <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" label="Enter name" type="text"></TextField>
                    </CardContent> 


                    <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" label="Enter Phone no." type="number"></TextField>
                    </CardContent>

                    
                    <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" label=" Enter pickup location" type="text"></TextField>
                    </CardContent>
                   
                    
                   
                    <CardContent>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Choose the option</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                          <FormControlLabel style={{display:'inline'}} value="female" control={<Radio />} label="Driver" />                          
                          <FormControlLabel style={{display:'inline'}} value="male" control={<Radio />} label="Self-Drive" />
                        </RadioGroup>
                    </FormControl>
                    </CardContent>
                   
                    <CardContent>
                        <TextField style={{width:'98%'}} variant="outlined" 
                          id="datetime-local"
                          label="Booking Date and Time"
                          type="datetime-local"
                          defaultValue="2017-05-24T10:30"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                         />
                    </CardContent>

                    <CardContent>
                    <Button style={{backgroundColor:'rgb(153, 3, 3)', width:'100%', color:'white'}}>submit</Button>
                    </CardContent>
                  </form>
                </Grid>
             

                </Grid>
                </Paper>
           
            
</div>










            

            
        )
    }
