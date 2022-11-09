import React from 'react';
import { Paper, Grid, CardContent, Button, TextField, Typography } from '@material-ui/core';

import imgbackground from './image/carbg2.jpg';

const details = () => {
}
export default function Cardetail() {

  return (
    <div className="body">

      <div>
        <img style={{ height: '99vh', width: '100%', filter: 'blur(15px)' }} src={imgbackground} alt="" />


        <Paper>



          <Grid container style={{ position: 'absolute', top: '12vh' }}>
            <Grid item xs={4}> </Grid>
            <Grid item xs={4} style={{ backgroundColor: 'white' }}>
              <br></br>
              <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola', fontWeight: '700' }}> Enter Car Details</Typography>
              <form className="form-group" onSubmit={details}>

                <CardContent>
                  <TextField variant='outlined' className="form-control" label="Enter car name " type="text" fullWidth></TextField>
                </CardContent>

                <CardContent>
                  <TextField variant='outlined' className="form-control" label="Enter car variant " type="text" fullWidth></TextField>
                </CardContent>

                <CardContent>
                  <TextField variant='outlined' className="form-control" label="Enter number of seats" type="number" fullWidth></TextField>
                </CardContent>

                <CardContent>
                  <TextField variant='outlined' className="form-control" label="Enter car number " type="text" fullWidth></TextField>
                </CardContent>








                <CardContent>
                  <Button style={{ backgroundColor: 'rgb(153, 3, 3)', width: '100%', color: 'white' }}>submit</Button>

                  {/* <center>
                        <input style={{height:'35px', width:'200px', backgroundColor:'rgb(85, 57, 85)', color:'white', fontSize:'18px', borderRadius:'10px'}} type="submit" value="Submit"  />
                        </center> */}
                </CardContent>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}