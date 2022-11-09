import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { Link } from '@material-ui/core';



const Usernavbar = () => {
    var navi = useNavigate();
    const user = localStorage.getItem('user');
    

    function Logout() {
        localStorage.removeItem('user');
        navi('/');
    }


useEffect(()=>{
if(!user){
   return navi("/")
}
},[])

    return (
        <>
            <AppBar style={{ backgroundColor: 'rgb(3, 70, 70)' }}>
                <Toolbar>
                    <Typography variant="h3" style={{ flexGrow: 1, fontFamily: 'gabriola' }}>Rent-a-Ride</Typography>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/home') }} >Home</Link></Button>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/about') }}>About</Link></Button>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/carsearch') }}>Our Cars</Link></Button>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/myorder') }}>my bookings</Link></Button>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/userdetail') }}>User detail</Link></Button>
                    <Button color="inherit" ><Link style={{ textDecoration: 'none', color: 'white' }} className="nav-item" onClick={() => { navi('/contact') }}>Contact</Link></Button>
                    <Button color="inherit" onClick={Logout} >Logout</Button>


                </Toolbar>

            </AppBar>
        </>
    )
}
export default Usernavbar;