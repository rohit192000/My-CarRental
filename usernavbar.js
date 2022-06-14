import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button, ButtonGroup } from '@material-ui/core';
import {BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';



const Usernavbar = ()=> {
var path=useNavigate();
    const user = localStorage.getItem('user');
    if(user == null)
    {
        path('/');
    }

function Logout(){
    localStorage.removeItem('user');
    path('/');
}

    return(

        <AppBar style={{backgroundColor: 'rgb(3, 70, 70)'}}>
        <Toolbar>
        <Typography variant="h3" style={{ flexGrow:1, fontFamily:'gabriola'}}>Rent-a-Ride</Typography>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/home">Home</Link></Button>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/about">About</Link></Button>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/carsearch">Our Cars</Link></Button>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/myorder">my bookings</Link></Button>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/userdetail">User detail</Link></Button>
        <Button color="inherit" ><Link style={{textDecoration:'none',color:'white'}} className="nav-item" to="/contact">Contact</Link></Button>
        <Button color="inherit" onClick={Logout} >Logout</Button>


        </Toolbar>

</AppBar>

    )
}
export default Usernavbar;