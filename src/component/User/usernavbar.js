import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { styled } from "@mui/material/styles"
import { useNavigate } from 'react-router';
const Usernavbar = () => {
    const Links = styled(Link)(({theme}) => ({
        color:theme.palette.primary.contrastText,
        textDecoration: 'none',
    }));
    var navi = useNavigate();
    const user = localStorage.getItem('user');
    const Logout = () => {
        localStorage.removeItem('user');
        navi('/');
    }
    useEffect(() => {
        if (!user) {
            return navi("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h3" style={{ flexGrow: 1, fontFamily: 'gabriola' }}>Rent-a-Ride</Typography>
                    <Button ><Links onClick={() => { navi('/home') }} >Home</Links></Button>
                    <Button ><Links onClick={() => { navi('/about') }}>About</Links></Button>
                    <Button ><Links onClick={() => { navi('/carsearch') }}>Our Cars</Links></Button>
                    <Button ><Links onClick={() => { navi('/myorder') }}>my bookings</Links></Button>
                    <Button ><Links onClick={() => { navi('/userdetail') }}>User detail</Links></Button>
                    <Button ><Links onClick={() => { navi('/contact') }}>Contact</Links></Button>
                    <Button color="inherit" onClick={Logout} >Logout</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Usernavbar;