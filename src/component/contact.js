import React, {Component} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';

import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import imgbackground from './image/carbg2.jpg';
// import './App.css';
import Usernavbar from './usernavbar';

const useStyles = makeStyles((theme) => ({
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
 
}));





export default function Contact()  {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);

  };

  const contact = db.collection("contact");


  function Submitlist(){
    // alert('hi');
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let location = document.getElementById('location').value;

    if(name == '' || phone == '' || email == '' || location == ''){
      alert('Please fill all the details')
    }else{

    contact.add({
      Name:name,
      Phone:phone,
      Email:email,
      Location:location
    }).then(function(success){
      alert('Data is added successfully');
    }).catch(function(error){
      alert('There is a error');
    })
  }
  }




        return(

          <div className="body">
 
 <Usernavbar />



          <Paper>

          <img style={{height:'99vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />

          <Grid container style={{position:'absolute', top:'15vh'}}>
              <Grid item xs={3}> </Grid>
                <Grid item xs={6} style={{backgroundColor:'white'}}>
                  <br></br>
                  <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700'}}>Contact us for more</Typography>
                  <form>

                  <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" id="name" label="Enter name" type="text"></TextField>
                    </CardContent> 


                    <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" id="phone" label="Enter Phone no." type="number"></TextField>
                    </CardContent>

                    
                    <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" id="email" label=" Enter email" type="email"></TextField>
                    </CardContent>

                    <CardContent>
                      <TextField fullWidth variant="outlined" className="form-control" id="location" label=" Enter your location" type="text"></TextField>
                    </CardContent>



                   
                    
{/*                    
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
                    </CardContent> */}

                    <CardContent>
                    <Button onClick={Submitlist} style={{backgroundColor:'rgb(153, 3, 3)', width:'100%', color:'white'}}>submit</Button>
                    </CardContent>
                  </form>
                </Grid>
             

                </Grid>
                </Paper>
           
            
</div>










            

            
        )
    }
