import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import Usernavbar from './usernavbar';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Grid, Box, Card, CardContent, CardActions, CardActionArea, CardMedia, TextField } from '@mui/material';


const Carsearch = () => {

    const navi = useNavigate();

    const [allcars, getAllcars] = useState([]);

    function getcars(search) {
        // const search = document.getElementById('search').value;
        // const type = document.getElementById('type').value;
        var cars = '';
        if (search != '' && search) {
            const searchname = search.split('');
            cars = db.collection('addcar').where('keyword', 'array-contains-any', searchname);
            console.log(searchname);
        // } else if (type != '') {
        //     cars = db.collection('addcar').where('Category', '>=', type);
        //     console.log(type);
        } else {
            cars = db.collection("addcar");
            console.log(search);
        }
        cars.onSnapshot(function (querySnapshot) {
            const item = [];
            querySnapshot.forEach(function (data) {
                item.push(data);
            })
            getAllcars(item);
        })
    }

    useEffect(() => {
        getcars();
    }, []);

    function showdetails(x) {
        // window.location.href='/lookdetail/?id='+x;
        navi('/lookdetail/?id=' + x);
    }


    return (

        <div>
            <Usernavbar />

            <div style={{ backgroundColor: 'rgb(233, 232, 232)', height: '100px', width: '100%', marginTop: '64px', textAlign: 'center' }}>
                <br />
                <TextField size='small' variant='outlined' style={{ width: '20%' }} label=" Search your car name here..!" onKeyUp={(e) => getcars(e.target.value)} id='search' />
                &nbsp;&nbsp;
                {/* <select style={{ backgroundColor: 'rgb(207, 203, 203)', color: 'rgb(61, 60, 60)', height: '40px', width: '20%', border: 'none', borderRadius: '5px' }} onChange={getcars} id='type'>
                    <option style={{ fontWeight: '100px', background: 'white' }} value=''>Choose Type</option>
                    <option style={{ fontWeight: '100px', background: 'white' }} value='Rent Go'>GO Cars</option>
                    <option style={{ fontWeight: '100px', background: 'white' }} value='Rent Premier'>Premium Cars</option>
                </select> */}
            </div>

            <Grid container style={{ backgroundColor: 'white', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '60px', paddingRight: '60px' }}>
                {allcars.map((row) => (
                    <Grid key={row.id} item lg={3}>
                        <CardContent>
                            <Card>
                                <CardActionArea>
                                    <CardMedia style={{ height: '180px', overflow: 'hidden' }}>
                                        <img style={{ width: '50%' }} src={row.data().Image} alt={row.data().name} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant='h5'>{row.data().Name}</Typography>
                                        <Typography variant='subtitle1'>Rs.{row.data().Price} per km Ride</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {/* <Link style={{textDecoration:'none',color:'white'}}  to="/lookdetail/?"> */}
                                    <Button onClick={() => showdetails(row.id)} variant="contained" style={{ backgroundColor: 'rgb(3, 70, 70)', color: 'white' }}>view details</Button>
                                    {/* </Link>   */}

                                </CardActions>
                            </Card>
                        </CardContent>
                    </Grid>
                ))}

            </Grid>

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
export default Carsearch;