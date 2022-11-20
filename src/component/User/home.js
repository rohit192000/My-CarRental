import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Usernavbar from './usernavbar';
import Footer from './Footer';
import { db } from '../../firebase';
import { Typography, Button, Paper, Grid, Box } from '@mui/material';
import { AlarmOnOutlined, DirectionsCar, Person, ChildFriendly, PhoneIphoneOutlined, Beenhere } from '@mui/icons-material';
import bg2 from '../image/b2.jpg';
import img13 from '../image/abooo.jpg';
import img14 from '../image/range.jpg';
import img15 from '../image/b5.jpg';
const Home = () => {
    var path = useNavigate();
    const [hatch, getHatch] = useState([]);
    const getHatchback = () => {
        db.collection("addcar").where("Category", "==", "Go Cars").onSnapshot(function (querySnapshot) {
            const item = [];
            querySnapshot.forEach(function (data) {
                item.push(data);
            })
            getHatch(item);
        })
    }
    useEffect(() => {
        getHatchback();
    }, []);
    const [premium, getPremium] = useState([]);
    const getPremiumCars = () => {
        db.collection("addcar").where("Category", "==", "Premium Cars").limit(4).onSnapshot(function (querySnapshot) {
            const item = [];
            querySnapshot.forEach(function (data) {
                item.push(data);
            })
            getPremium(item);
        })
    }
    useEffect(() => {
        getPremiumCars();
    }, []);
    const showdetails = (x) => {
        path('/lookdetail/?id=' + x);
    }
    return (
        <>
            <Grid container mt={2} rowSpacing={3} columnSpacing={2}>
                <Usernavbar />
                <Grid item xs={12} sx={{ color: "#ffffff" }}>
                    <img style={{ height: '70vh', width: '100%', objectFit: 'cover' }} src={bg2} alt="" />
                    <Typography variant="h2" mt={-25} style={{ textAlign: 'center', fontFamily: "gabriola" }}>Rent-a-Ride</Typography>
                    <Typography variant='h4' style={{ textAlign: 'center', fontFamily: 'gabriola' }}>Ride with Rent-a-Ride and you will never gonna regret</Typography>
                </Grid>
                <Grid item lg={4}>
                    <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                        <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                            <Typography variant='h5'>Self Drive Car on Rent</Typography>
                            <img style={{ height: '200px', borderRadius: '10px' }} src={img13} alt="" />
                            <Typography variant='subtitle1'>
                                We provide self drive car on rent at the pick-drop location of your choice. You can also add stuff to the vehicle if you are going to a location.
                            </Typography>
                        </Box>
                    </Paper>

                </Grid>
                <Grid item lg={4} sx={{ textAlign: 'justify' }}>
                    <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                        <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                            <Typography variant='h5'>Luxury Car at Reasonable</Typography>
                            <img style={{ height: '200px', borderRadius: '10px' }} src={img14} alt="" />
                            <Typography variant='subtitle1'>
                                We provide Luxury cars on rent at the reasonable price with offers also for the marriages and the royal entries in the party at reasonable price.
                            </Typography>
                        </Box>
                    </Paper>

                </Grid>
                <Grid item lg={4}>
                    <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                        <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                            <Typography variant='h5'>Car with Driver also available</Typography>
                            <img style={{ height: '200px', borderRadius: '10px' }} src={img15} alt="" />
                            <Typography variant='subtitle1'>
                                We provide cars on rent with driver. If you don't wanna drive the car yourself you can also hire the driver from our company with uniform.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={12} style={{ height: '20%', width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgb(1, 105, 105)' }}>
                    <Typography variant='h2' style={{ color: 'white', fontFamily: 'gabriola', textAlign: 'center' }}>Our Rent Go Cars..!</Typography >
                </Grid>
                {hatch.map((row) => (
                    <Grid key={row.id} item lg={6} md={6} xs={12}>
                        <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                            <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                                <img style={{ height: '200px', width: '370px', borderRadius: '10px' }} src={row.data().Image} alt="" />
                                <Typography variant='h5'>{row.data().Name}</Typography>
                                <Typography variant='subtitle1' style={{ padding: '10px' }}>Rs.{row.data().Price} per km Ride</Typography>
                                <Button onClick={() => showdetails(row.id)} variant="contained" style={{ backgroundColor: 'rgb(3, 70, 70)', color: 'white' }}>view details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                <Grid item lg={12} style={{ height: '20%', width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgb(1, 105, 105)' }}>
                    <Typography variant='h2' style={{ color: 'white', fontFamily: 'gabriola', textAlign: 'center' }}>Our Premium Cars..!</Typography >
                </Grid>
                {premium.map((row) => (
                    <Grid key={row.id} item xs={12} sm={6} >
                        <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                            <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                                <img style={{ height: '200px', width: '370px', borderRadius: '10px' }} src={row.data().Image} alt="" />
                                <Typography variant='h5'>{row.data().Name}</Typography>
                                <Typography variant='subtitle1' style={{ padding: '10px' }}>Rs.{row.data().Price} per km Ride</Typography>
                                <Button onClick={() => showdetails(row.id)} variant="contained" style={{ backgroundColor: 'rgb(3, 70, 70)', color: 'white' }}>view details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Typography variant='h3' style={{ color: 'orange', textAlign: 'center', fontWeight: 'bolder' }}>WHY CHOOSE US..?</Typography>
                </Grid>
                <Grid container xs={12} columnSpacing={1} rowSpacing={1}>

                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <Beenhere /> FAST SERVICE </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <AlarmOnOutlined /> ON TIME ARRIVAL</Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'><PhoneIphoneOutlined /> ONLINE 24/7 SUPPORT</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <DirectionsCar /> LUXURY CAR </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <Person /> CUSTOMER FRIENDLY</Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={6} md={4}>
                        <Grid style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'><ChildFriendly /> CHILD FRIENDLY</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg={12}>
                    <Footer />
                </Grid>
            </Grid>
        </>
    )
}
export default Home;
