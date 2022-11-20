import React from 'react';
import image1 from '../image/b5.jpg';
import { Grid, Typography, Box} from '@mui/material';
import Usernavbar from './usernavbar';
import Footer from './Footer';
const About = () => {
  return (
    <>
      <Usernavbar />
      <Grid container mt={2} rowSpacing={8} justifyContent="space-evenly">
        {/* Image */}
        <Grid item lg={9}>
          <img style={{ height: '70vh', width: '100%', objectFit: 'cover' }} src={image1} alt="" />
        </Grid>
        {/* about */}
        <Grid item lg={2}>
          <Box>
            <Typography variant='h3' style={{}}>ABOUT US</Typography>
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
        {/* paragraph */}
        <Grid item xs={11}>
          <Typography fontFamily="verdana" textAlign="justify" variant='subtitle1'>
            Ride-e-Ride is the most modern and affordable travel solutions where you can gain high quality, up-to-the-minute services. We are young, dynamic and talented team. We provides taxi facility, hotel booking and also plan your tour packages. We have combined the best technological advancements and travel expertise to carve out the best and the easiest way to travel.
            Our rental service, we are committed to offer the complete package to our clients for their pleasant travelling experience and ensure that our package cater to the needs of the customers. If you are planning to have your trip in beautiful places like Shimla, Dharamshala, Kashmir , Dalhousie, Manikaran etc. then Sardar Ji travels will provide you best and cheap services in our region.
            We offers tour packages and taxi services at competitive prices. We have satisfied many clients till date with our services. We have earned good position in the Tourism Industry. We are one amongst the best taxi services provider where the customers are provided with the best and at affordable
            Contact us to book your taxi. We would like to serve you with the best.Contact us to book your taxi. We would like to serve you with the best.Contact us to book your taxi.
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
export default About;