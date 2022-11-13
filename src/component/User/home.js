import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Usernavbar from './usernavbar';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box} from '@mui/material';
import { db } from '../../firebase';

import bg2 from '../image/b2.jpg';
import img13 from '../image/abooo.jpg';
import img14 from '../image/range.jpg';
import img15 from '../image/b5.jpg';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import BeenhereIcon from '@mui/icons-material/Beenhere';


const useStyles = makeStyles((theme) => ({

    bg1: {
        height: '450px',
        width: '100%',

    },

}));
const Home = () => {
    var path = useNavigate();
    const classes = useStyles();

    // const token = localStorage.getItem('token');


    const [hatch, getHatch] = useState([]);

    function getHatchback() {
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


    function getPremiumCars() {
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


    function showdetails(x) {
        path('/lookdetail/?id=' + x);
    }
    return (
        <div className="body">


            <Usernavbar />


            <h3>WE ARE HERE</h3>
            <img className={classes.bg1}
                src={bg2} alt=""
            />
            <h1 style={{ textAlign: 'center', marginTop: '-200px', fontSize: '70px', fontFamily: 'gabriola', color: 'white' }}>Rent-a-Ride</h1>
            <h1 style={{ textAlign: 'center', marginTop: '-80px', fontSize: '23px', fontFamily: 'gabriola', color: 'white' }}>Ride with Rent-a-Ride and you will never gonna regret</h1>

            <Container>
                <Grid container >
                    <Grid item lg={4}>
                        <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                            <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                                <Typography variant='h5'>Self Drive Car on Rent</Typography>
                                <img style={{ height: '200px', width: '370px', borderRadius: '10px' }} src={img13} alt="" />
                                <Typography variant='subtitle1' style={{ textAlign: 'justify', padding: '10px' }}>
                                    We provide self drive car on rent at the pick-drop location of your choice. You can also add stuff to the vehicle if you are going to a location.
                                </Typography>
                            </Box>
                        </Paper>

                    </Grid>

                    <Grid item lg={4}>
                        <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                            <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                                <Typography variant='h5'>Luxury Car at Reasonable</Typography>
                                <img style={{ height: '200px', width: '370px', borderRadius: '10px' }} src={img14} alt="" />

                                <Typography variant='subtitle1' style={{ textAlign: 'justify', padding: '10px' }}>
                                    We provide Luxury cars on rent at the reasonable price with offers also for the marriages and the royal entries in the party at reasonable price.
                                </Typography>
                            </Box>
                        </Paper>

                    </Grid>

                    <Grid item lg={4}>
                        <Paper style={{ borderRadius: '5px', boxShadow: '0px 0px 10px black' }}>
                            <Box style={{ textAlign: 'center', fontFamily: 'gabriola', backgroundColor: 'white', borderRadius: '20px', padding: '5px' }}>
                                <Typography variant='h5'>Car with Driver also available</Typography>
                                <img style={{ height: '200px', width: '370px', borderRadius: '10px' }} src={img15} alt="" />
                                <Typography variant='subtitle1' style={{ textAlign: 'justify', padding: '10px' }}>
                                    We provide cars on rent with driver. If you don't wanna drive the car yourself you can also hire the driver from our company with uniform.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>


            <Grid style={{ height: '20%', width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgb(1, 105, 105)' }}>
                <Typography variant='h2' style={{ color: 'white', fontFamily: 'gabriola', textAlign: 'center' }}>Our Rent Go Cars..!</Typography >
            </Grid>




            <Container>
                <Grid container spacing={1}>

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
                </Grid>
            </Container>

            <Grid style={{ height: '20%', width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgb(1, 105, 105)' }}>
                <Typography variant='h2' style={{ color: 'white', fontFamily: 'gabriola', textAlign: 'center' }}>Our Premium Cars..!</Typography >
            </Grid>

            <Container>
                <Grid container spacing={1}>
                    {premium.map((row) => (
                        <Grid key={row.id} item lg={6} md={6} >
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

                </Grid>
            </Container>
            <div style={{ marginBottom: '50px' }}>

                <Typography variant='h3' style={{ color: 'orange', textAlign: 'center', fontWeight: 'bolder' }}>WHY CHOOSE US..?</Typography>
                <Grid container >

                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <BeenhereIcon style={{ height: '20px', width: '20px', marginLeft: '50px' }} /> FAST SERVICE</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <AlarmOnOutlinedIcon style={{ height: '20px', width: '20px', marginLeft: '50px', backgroundColor: 'orange' }} /> ON TIME ARRIVAL</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'><PhoneIphoneOutlinedIcon style={{ height: '20px', width: '20px', marginLeft: '50px', backgroundColor: 'orange' }} /> ONLINE 24/7 SUPPORT</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <DirectionsCarIcon style={{ height: '20px', width: '20px', marginLeft: '50px', backgroundColor: 'orange' }} /> LUXURY CAR</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'> <PersonIcon style={{ height: '20px', width: '20px', marginLeft: '50px', backgroundColor: 'orange' }} /> CUSTOMER FRIENDLY</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{ padding: 15 }}>
                        <div style={{ backgroundColor: 'orange', padding: '15px' }}>
                            <Typography variant='h5'><ChildFriendlyIcon style={{ height: '20px', width: '20px', marginLeft: '50px', backgroundColor: 'orange' }} /> CHILD FRIENDLY</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
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
        </div >
    )
}
export default Home;
