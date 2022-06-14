import React, {Component, useState, useEffect} from 'react';
import {Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Usernavbar from './usernavbar';
import {BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import {Container, Paper, Grid, Box, Card, CardContent, CardActions, CardActionArea, CardMedia} from '@material-ui/core';
import { db } from '../firebase';

import bg2 from './image/b2.jpg';
import img13 from './image/abooo.jpg';
import img14 from './image/range.jpg';
import img15 from './image/b5.jpg';

import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PersonIcon from '@material-ui/icons/Person';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import BeenhereIcon from '@material-ui/icons/Beenhere';


const useStyles = makeStyles((theme) => ({

    bg1: {
      height: '450px',
      width: '100%',
      
    },
    
  }));
  export default function Home() {
      var path=useNavigate();
    const classes = useStyles();
  
    const token = localStorage.getItem('token');
    if(token == null)
    {
       path('/');
    }
    

    function Logout(){
        localStorage.removeItem('token');
       path('/');
    }
    
    const [hatch, getHatch] = useState([]);


    function getHatchback(){
        const cars = db.collection("addcar").where("Type","==","Hatchback").orderBy('date','desc').limit(4).onSnapshot(function(querySnapshot){
            const item = [];
            querySnapshot.forEach(function(data){
                item.push(data);
            })
            getHatch(item);
        })
    }

    useEffect(() => {
        getHatchback();
    }, []);



    const [premium, getPremium] = useState([]);


    function getPremiumCars(){
        const cars = db.collection("addcar").where("Category","==","Rent Premier").orderBy('date','desc').limit(4).onSnapshot(function(querySnapshot){
            const item = [];
            querySnapshot.forEach(function(data){
                item.push(data);
            })
            getPremium(item);
        })
    }

    useEffect(() => {
        getPremiumCars();
    }, []);


    function showdetails(x)
    {
       path('/lookdetail/?id='+x);
    }

    {
        return(
            <div className="body">


                <Usernavbar />


                <h3>WE ARE HERE</h3>
                <img  className={classes.bg1}
                   src={bg2} alt=""        
                />
                <h1 style={{textAlign:'center', marginTop:'-200px', fontSize:'70px', fontFamily:'gabriola', color:'white' }}>Rent-a-Ride</h1>
                <h1 style={{textAlign:'center', marginTop:'-80px', fontSize:'23px', fontFamily:'gabriola', color:'white' }}>Ride with Rent-a-Ride and you will never gonna regret</h1>

                <Container>
                    <Grid container spacing='1'>
                        <Grid item lg={4}>
                            <Paper style={{borderRadius:'5px', boxShadow:'0px 0px 10px black'}}>
                                <Box style={{textAlign:'center', fontFamily:'gabriola', backgroundColor:'white', borderRadius:'20px', padding:'5px'}}>
                                    <Typography variant='h5'>Self Drive Car on Rent</Typography>
                                    <img style={{height:'200px', width:'370px', borderRadius:'10px'}} src={img13} alt="" />
                                    <Typography variant='subtitle1' style={{textAlign:'justify', padding:'10px'}}>
                                        We provide self drive car on rent at the pick-drop location of your choice. You can also add stuff to the vehicle if you are going to a location.
                                    </Typography>
                                </Box>
                            </Paper>

                        </Grid>

                        <Grid item lg={4}>
                            <Paper style={{borderRadius:'5px', boxShadow:'0px 0px 10px black'}}>
                                <Box style={{textAlign:'center', fontFamily:'gabriola', backgroundColor:'white', borderRadius:'20px', padding:'5px'}}>
                                    <Typography variant='h5'>Luxury Car at Reasonable</Typography>
                                    <img style={{height:'200px', width:'370px', borderRadius:'10px'}} src={img14} alt="" />

                                    <Typography variant='subtitle1' style={{textAlign:'justify', padding:'10px'}}>
                                        We provide Luxury cars on rent at the reasonable price with offers also for the marriages and the royal entries in the party at reasonable price.
                                    </Typography>
                                </Box>
                            </Paper>

                        </Grid>

                        <Grid item lg={4}>
                            <Paper style={{borderRadius:'5px', boxShadow:'0px 0px 10px black'}}>
                                <Box style={{textAlign:'center', fontFamily:'gabriola', backgroundColor:'white', borderRadius:'20px', padding:'5px'}}>
                                    <Typography variant='h5'>Car with Driver also available</Typography>
                                    <img style={{height:'200px', width:'370px', borderRadius:'10px'}} src={img15} alt="" />
                                    <Typography variant='subtitle1' style={{textAlign:'justify', padding:'10px'}}>
                                        We provide cars on rent with driver. If you don't wanna drive the car yourself you can also hire the driver from our company with uniform.
                                    </Typography>
                                </Box>
                            </Paper>

                        </Grid>
                    </Grid>
                </Container>
{/* 
                <Grid container style={{backgroundColor:'blue', heigth:'150px', width:'100%'}}>
                    <Typography variant='h6' >We provide the best service in the city</Typography>
                </Grid>
                 */}

                <div style={{height:'45px',width:'100%', backgroundColor:'rgb(1, 105, 105)'}}>
                    <h2 style={{color:'white', fontFamily:'gabriola', textAlign:'center', fontSize:'28px'}}>Our Rent Go cars..!</h2>
                </div>



                <Grid container style={{backgroundColor:'white', paddingTop:'30px', paddingBottom:'30px', paddingLeft:'60px', paddingRight:'60px'}}>

                 {hatch.map((row) => (

<Grid key={row.id} item lg={3}>
<CardContent>
<Card>
    <CardActionArea>
        <CardMedia style={{height:'180px',overflow:'hidden'}}>
        <img style={{width:'100%'}} src={row.data().Image} />
        </CardMedia>
        <CardContent>
            <Typography variant='h5'>{row.data().Name}</Typography>
            <Typography variant='subtitle1'>Rs.{row.data().Price} per km Ride</Typography>
        </CardContent>
    </CardActionArea>
    <CardActions>
        <Button onClick={() => showdetails(row.id)} variant="contained" style={{backgroundColor:'rgb(3, 70, 70)', color:'white'}}>view details</Button>
        
    </CardActions>
</Card>
</CardContent>
</Grid>

                 ))}
                    </Grid>



                <div style={{height:'45px',width:'100%', backgroundColor:'rgb(1, 105, 105)'}}>
                    <h2 style={{color:'white', fontFamily:'gabriola', textAlign:'center', fontSize:'28px'}}>Our Premium Car..!</h2>
                </div>

                    <Grid container  style={{backgroundColor:'white', paddingTop:'30px', paddingBottom:'30px', paddingLeft:'60px', paddingRight:'60px' }}>


                    {premium.map((row) => (

                        <Grid key={row.id} item lg={3}>
                        <CardContent>
                        <Card>
                            <CardActionArea>
                                <CardMedia style={{height:'180px',overflow:'hidden'}}>
                                <img style={{width:'100%'}} src={row.data().Image} />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant='h5'>{row.data().Name}</Typography>
                                    <Typography variant='subtitle1'>Rs.{row.data().Price} per km Ride</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={() => showdetails(row.id)} variant="contained" style={{backgroundColor:'rgb(3, 70, 70)', color:'white'}}>view details</Button>
                                
                            </CardActions>
                        </Card>
                        </CardContent>
                        </Grid>

                 ))}

                </Grid>


<div style={{marginBottom:'50px'}}>
           
                <Typography variant='h3' style={{color:'orange', textAlign:'center', fontWeight:'bolder'}}>WHY CHOOSE US..?</Typography>
                <Grid container >

                    <Grid item xs={4} style={{padding:15}}>
                        <div style={{backgroundColor:'orange', padding:'15px'}}>
                            <Typography variant='h5'> <BeenhereIcon style={{height:'20px', width:'20px', marginLeft:'50px'}}/> FAST SERVICE</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{padding:15}}>
                    <div style={{backgroundColor:'orange', padding:'15px'}}>
                      <Typography variant='h5'> <AlarmOnOutlinedIcon style={{height:'20px', width:'20px', marginLeft:'50px', backgroundColor:'orange'}}/> ON TIME ARRIVAL</Typography>
                      </div>
                    </Grid>
                    
                    <Grid item xs={4} style={{padding:15}}>
                    <div style={{backgroundColor:'orange', padding:'15px'}}>
                      <Typography variant='h5'><PhoneIphoneOutlinedIcon style={{height:'20px', width:'20px', marginLeft:'50px', backgroundColor:'orange'}}/> ONLINE 24/7 SUPPORT</Typography>
                      </div>
                    </Grid>
                    

                    <Grid item xs={4} style={{padding:15}}>
                    <div style={{backgroundColor:'orange', padding:'15px'}}>
                        <Typography variant='h5'> <DirectionsCarIcon style={{height:'20px', width:'20px', marginLeft:'50px', backgroundColor:'orange'}}/> LUXURY CAR</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{padding:15}}>
                    <div style={{backgroundColor:'orange', padding:'15px'}}>
                      <Typography variant='h5'> <PersonIcon style={{height:'20px', width:'20px', marginLeft:'50px', backgroundColor:'orange'}}/> CUSTOMER FRIENDLY</Typography>
                      </div>
                    </Grid>
                    
                    <Grid item xs={4} style={{padding:15}}>
                    <div style={{backgroundColor:'orange', padding:'15px'}}>
                      <Typography variant='h5'><ChildFriendlyIcon style={{height:'20px', width:'20px', marginLeft:'50px', backgroundColor:'orange'}}/> CHILD FRIENDLY</Typography>
                      </div>
                    </Grid>
                </Grid>
</div>

                
           
<Grid container >
                        <Grid item lg={4} style={{height:'195px', backgroundColor:'black', width:'100%'}}>
                                <Box style={{paddingLeft:'25px',color:'white', textAlign:'justify'}}>
                                    <Typography variant='h5' >About us..</Typography>
                                    <br></br>
                                    <Typography variant='subtitle2' >
                                    Rent-a-Ride is the most modern and affordable travel solutions where you can gain high quality, up-to-the-minute services. We are young, dynamic and talented team. We provides taxi facility, hotel booking and also plan your tour packages. We have combined the best technological advancements and travel from one location to another<br></br>
                                    </Typography>
                                </Box>

                        </Grid>

                        <Grid style={{height:'195px', backgroundColor:'black', width:'100%'}} item lg={4}>
                                <Box style={{paddingLeft:'25px',color:'white'}}>
                                    <Typography variant='h5' >Community..</Typography>
                                    <br></br>
                                    <Typography variant='subtitle2'  >
                                   <WhatsAppIcon /> <br></br> <InstagramIcon /> <br></br> <FacebookIcon /> <br></br> <TwitterIcon /> 
                                    </Typography> 
                                </Box>

                        </Grid>

                        <Grid item lg={4} style={{width:'100%',height:'195px', backgroundColor:'black'}}>
                                <Box style={{paddingLeft:'25px',color:'white'}}>
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
               
               <div style={{backgroundColor:'rgb(3, 70, 70)'}}>
                 <Typography  style={{color:'white', textAlign:'center', fontSize:'13px'}}>Copyright ©2021 Rent-a-Ride All Rights Reserved</Typography>
               </div>



                
            </div>
            

        

            
        )
    }
  
}
