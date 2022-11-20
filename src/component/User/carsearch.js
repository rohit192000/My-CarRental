import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import Usernavbar from './usernavbar';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { Grid, Card, CardContent, CardActions, CardActionArea, CardMedia, TextField } from '@mui/material';
import Footer from './Footer';


const Carsearch = () => {
    const navi = useNavigate();
    const [allcars, getAllcars] = useState([]);
    const getcars = (search) => {
        var cars = '';
        if (search !== '' && search) {
            const searchname = search.split('');
            cars = db.collection('addcar').where('keyword', 'array-contains-any', searchname);
            console.log(searchname);
        } else {
            cars = db.collection("addcar");
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

    const showdetails = (x) => {
        navi('/lookdetail/?id=' + x);
    }
    return (

        <>
            <Usernavbar />
            <Grid container mt={15} columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12} style={{height: '100px', width: '100%', textAlign: 'center' }}>
                    <TextField size='small' variant='outlined' style={{ width: '20%' }} label=" Search your car name here..!" onKeyUp={(e) => getcars(e.target.value)} id='search' />
                </Grid>
                {allcars.map((row) => (
                    <Grid key={row.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia style={{ overflow: 'hidden', height: '10rem' }}>
                                    <img style={{ width: '50%' }} src={row.data().Image} alt={row.data().name} />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant='h5'>{row.data().Name}</Typography>
                                    <Typography variant='subtitle1'>Rs.{row.data().Price} per km Ride</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={() => showdetails(row.id)} variant="contained" style={{ backgroundColor: 'rgb(3, 70, 70)', color: 'white' }}>view details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
}
export default Carsearch;