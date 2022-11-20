import React from "react";
import { styled } from '@mui/material/styles'
import { Typography, Grid, Box, ListItemButton, ListItemText, ListItemIcon, } from "@mui/material";
import { WhatsApp, Instagram, Facebook, Twitter } from "@mui/icons-material";
const Footer = () => {
    const Icon = styled(ListItemIcon)(({ theme }) => ({
        color: theme.palette.primary.light
    }));
    return (
        <>
            <Grid item xs={12} sm={12}>&nbsp;</Grid>
            <Grid container columnSpacing={3} p={2} sx={{ backgroundColor: "black", color: "#ffffff", textAlign: "justify" }}>
                <Grid item xs={11} sm={4}>
                    <Box >
                        <Typography variant='h5' >About us..</Typography>
                        <Typography variant='subtitle2' mt={2}>
                            Rent-a-Ride is the most modern and affordable travel solutions where you can gain high quality, up-to-the-minute services. We are young, dynamic and talented team. We provides taxi facility, hotel booking and also plan your tour packages. We have combined the best technological advancements and travel from one location to another
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box>
                        <Typography variant='h5' >Community..</Typography>
                        <ListItemButton sx={{ color: '#ffffff !important', textDecoration: 'none' }}>
                            <Icon >
                                <WhatsApp />
                            </Icon>
                            <ListItemText primary="Whatsapp" />
                        </ListItemButton>
                        <ListItemButton sx={{ color: '#ffffff !important', textDecoration: 'none' }}>
                            <Icon>
                                <Instagram />
                            </Icon>
                            <ListItemText primary="Instagram" />
                        </ListItemButton>
                        <ListItemButton sx={{ color: '#ffffff !important', textDecoration: 'none' }}>
                            <Icon>
                                <Facebook />
                            </Icon>
                            <ListItemText primary="Facebook" />
                        </ListItemButton>
                        <ListItemButton sx={{ color: '#ffffff !important', textDecoration: 'none' }}>
                            <Icon>
                                <Twitter />
                            </Icon>
                            <ListItemText primary="Twitter" />
                        </ListItemButton>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box >
                        <Typography variant='h5' >Contact us..</Typography>
                        <Typography variant='subtitle2' >
                            Sardar Ji Travels, Railway Road <br></br>
                            Pathankot - 145001<br></br>
                            +91-94658-06344<br></br>
                            +91-98154-09635 <br></br>
                            +91-98154-59255
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={4}></Grid>
                <Grid item xs={12} sm={7} md={5} mt={1}>
                    <Typography>Copyright ©2022 Rent-a-Ride All Rights Reserved</Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default Footer;