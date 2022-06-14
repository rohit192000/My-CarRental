import React, { Component } from 'react';
import image1 from './image/b5.jpg';
import { Grid, Typography, Paper, Box, Container } from '@material-ui/core';
import Usernavbar from './usernavbar';

import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function About() {


  {

    return (
      <div className="body">

        <Usernavbar />
        <br></br>
        <br></br>
        <Grid container>
          <Grid container item lg={9}>
            <img style={{ height: '450px', width: '100%' }} src={image1} alt="" />
          </Grid>
          <Grid lg={3}  >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box style={{ marginLeft: '70px' }}>
              <Typography variant='h3' style={{ fontFamily: 'gabriola' }}>ABOUT US</Typography>
              <br></br>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* BEST CAR SERVICE</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* ONLINE 24/7 SUPPORT</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* CUSTOMER FRIENDLY</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* ON TIME ARRIVAL</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* AFFORDABLE SUV's</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* FAST BOOKING</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* LUXURY CAR's</Typography>
              <Typography variant='h5' style={{ fontFamily: 'gabriola' }}>* ETC....!</Typography>
            </Box>
          </Grid>
        </Grid>

        <br></br>
        <br></br>

        <Grid container>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={10}>

            {/* <Box style={{textAlign:'justify', fontFamily:'gabriola', backgroundColor:'white'}}> */}
            <Typography style={{ fontFamily: 'verdana', textAlign: 'justify' }} variant='subtitle1'>
              Ride-e-Ride is the most modern and affordable travel solutions where you can gain high quality, up-to-the-minute services. We are young, dynamic and talented team. We provides taxi facility, hotel booking and also plan your tour packages. We have combined the best technological advancements and travel expertise to carve out the best and the easiest way to travel. <br></br>
              <br></br>

              Our rental service, we are committed to offer the complete package to our clients for their pleasant travelling experience and ensure that our package cater to the needs of the customers. If you are planning to have your trip in beautiful places like Shimla, Dharamshala, Kashmir , Dalhousie, Manikaran etc. then Sardar Ji travels will provide you best and cheap services in our region. <br></br>
              <br></br>

              We offers tour packages and taxi services at competitive prices. We have satisfied many clients till date with our services. We have earned good position in the Tourism Industry. We are one amongst the best taxi services provider where the customers are provided with the best and at affordable <br></br>
              <br></br>
              Contact us to book your taxi. We would like to serve you with the best.Contact us to book your taxi. We would like to serve you with the best.Contact us to book your taxi.
            </Typography>
            {/* </Box> */}

          </Grid>
        </Grid>



        <br></br>
        <br></br>

        <Grid container >
          <Grid item lg={4} style={{ height: '195px', backgroundColor: 'black', width: '100%' }}>
            <Box style={{ paddingLeft: '25px', color: 'white', textAlign: 'justify' }}>
              <Typography variant='h5' >About us..</Typography>
              <br></br>
              <Typography variant='subtitle2' >
                Rent-a-Ride is the most modern and affordable travel solutions where you can gain high quality, up-to-the-minute services. We are young, dynamic and talented team. We provides taxi facility, hotel booking and also plan your tour packages. We have combined the best technological advancements and travel from one location to another<br></br>
              </Typography>
            </Box>

          </Grid>

          <Grid style={{ height: '195px', backgroundColor: 'black', width: '100%' }} item lg={4}>
            <Box style={{ paddingLeft: '25px', color: 'white' }}>
              <Typography variant='h5' >Community..</Typography>
              <br></br>
              <Typography variant='subtitle2'  >
                <WhatsAppIcon /> <br></br> <InstagramIcon /> <br></br> <FacebookIcon /> <br></br> <TwitterIcon />
              </Typography>
            </Box>

          </Grid>

          <Grid item lg={4} style={{ width: '100%', height: '195px', backgroundColor: 'black' }}>
            <Box style={{ paddingLeft: '25px', color: 'white' }}>
              <Typography variant='h5' >Contact us..</Typography>
              <br></br>
              <Typography variant='subtitle2' >
                Sardar Ji Travels, Railway Road <br></br>
                Pathankot - 145001<br></br>
                <br></br>
                +91-94658-06344<br></br>
                +91-98154-09635 <br></br>
                +91-98154-59255

              </Typography>
            </Box>

          </Grid>
        </Grid>


        <div style={{ backgroundColor: 'rgb(3, 70, 70)' }}>
          <Typography style={{ color: 'white', textAlign: 'center', fontSize: '13px' }}>Copyright ©2021 Rent-a-Ride All Rights Reserved</Typography>
        </div>



      </div>
    )
  }
}