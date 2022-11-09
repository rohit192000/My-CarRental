import React, {Component} from 'react';
import {Paper, Grid, Card, CardActions, CardContent, Button, TextField, Typography, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import imgbackground from './image/bp2.jpg';
import img1 from './image/pp.png';




function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  




  
export default function Userprofile() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        {/* <SimpleModal /> */}
      </div>
    );





    return(
        <div>
             <Paper>

                <img style={{height:'99vh', width:'100%', filter:'blur(15px)'}} src={imgbackground} alt="" />


                <Grid container style={{position:'absolute', top:'10vh'}}>
                      <Grid item xs={3}> </Grid>
                      <Grid item xs={6} style={{backgroundColor:'white', textAlign:'center'}}>
                          <Typography style={{backgroundColor:'gray', textAlign:'center', fontFamily:'gabriola', color:'white', fontSize:'40px'}}>User Profile   <Button   type="button" onClick={handleOpen}  style={{backgroundColor:'rgb(153, 3, 3)', color:'white', position:'relative', left:'200px'}}><b>Update</b></Button> </Typography>
                          <br></br>
                          <img style={{height:'180px', width:'250px', borderRadius:'70%', marginLeft:'24px'}} src={img1} alt="" />
                          <br></br>
                          <br></br>
                          <br></br>

                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Name: Rajdeep Singh</Typography>
                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Age: 36 years old</Typography>
                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Gender: Male</Typography>
                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Contact: 85649-45632</Typography>
                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Email: rajsingh@gmail.com</Typography>
                          <Typography variant="h6" style={{fontFamily:'timesnewroman'}}>Aadhar number: 4562-2586-1597</Typography>
                          
                           
                </Grid>

                </Grid>



                <Modal style={{ width:'40%', position:'absolute', top:'10vh', left:'30%'}}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"  >
              <Paper>
              <Typography variant='h4' style={{textAlign:'center', fontFamily:'gabriola', fontWeight:'700', paddingTop:'10px'}}>Update your personal info</Typography>

              <form className="form-group">

                <CardContent >
                 <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter name " type="text" fullWidth></TextField>
                </CardContent>

                <CardContent>
                   <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter age " type="text" fullWidth></TextField>
                </CardContent>

                <CardContent>
                   <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter gender" type="text" fullWidth></TextField>
                </CardContent>

                <CardContent>
                   <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter contact" type="text" fullWidth></TextField>
                </CardContent>


                <CardContent>
                   <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter email" type="text" fullWidth></TextField>
                </CardContent>


                <CardContent>
                   <TextField style={{height:'30px'}} variant='outlined' className="form-control" label="Enter aadhar no" type="text" fullWidth></TextField>
                </CardContent>


               

                
              
               



                <CardContent>
                  <Button style={{backgroundColor:'rgb(153, 3, 3)', width:'100%', color:'white'}}>update</Button>

    {/* <center>
    <input style={{height:'35px', width:'200px', backgroundColor:'rgb(85, 57, 85)', color:'white', fontSize:'18px', borderRadius:'10px'}} type="submit" value="Submit"  />
    </center> */}
                </CardContent>
                 
                 </form>
              </Paper>
            </Modal>







            </Paper>

        </div>
    )
}

