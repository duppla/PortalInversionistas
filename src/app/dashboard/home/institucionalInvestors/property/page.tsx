'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import GraficaComponenteb from '../../../Components/property/LineChartComponentB'
import GraficacomponenteH1 from '../../../Components/property/PieChartComponentH1'
import GraficacomponenteH2 from '../../../Components/property/LineChartComponentH2'
import MapacomponenteC from '../../../Components/property/MapComponentC'
import Prueba from '../../../Components/property/Prueba'


const page = () => {
    return (

        <Box sx={{ flexGrow: 1, mt: 1, ml: 1, mr: 1, borderRadius: '20px' }} >
            {/* sección 1 titulo */}
           {/*  <Box maxWidth="xl" sx={{ }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6} lg={6}>
                        <Typography className='title-component' sx={{ mt: 0.3, mb: 1.5, color: '#5682F2', fontStyle: 'normal', fontWeight: '500', fontSize:'3rem' }}>
                            Inmuebles
                        </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{
                    }}>
                    </Grid>
                </Grid>
            </Box> */}
            {/* Sección dashborad */}

            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, }}
                className=''>
                {/* Componente H */}
                <Grid  className='size-container-h1-h2' container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',                   
                    backgroundColor: '#0B0B0D',
                    borderRadius: '20px',
                    
                }} rowSpacing={2} gap={12.6} columnSpacing={{ md: 1, lg: 1, }}
                >
                    <Grid xs={12} sm={12} md={5} lg={5} sx={{
                        borderRadius: '10px',
                        backgroundColor: '#212126',
                       /*  mt: 2, */ mb: 2,
                        p:2
                    }}>
                        <GraficacomponenteH1 />

                    </Grid>
                    <Grid className='' xs={12} sm={12} md={6} lg={6} sx={{
                        borderRadius: '10px',
                        backgroundColor: '#212126',
                       /*  mt: 2, */ mb: 2,
                        p:2
                    }}>
                        <GraficacomponenteH2 />
                    </Grid>
                </Grid>
                {/* Componente B */}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '560px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>
                        <GraficaComponenteb />
                    </Grid>

                </Grid>
                {/* Componente C -Mapa*/}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '640px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '480px',                       
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        mt:2
                    }}>
                        <MapacomponenteC />

                    </Grid>

                </Grid>
                {/* Componente J */}
               {/*  <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '460px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                }}>
                    
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#fffff', fontFamily: 'Roboto', }}>
                            Componente J
                        </Typography>
                        
                    </Grid>

                </Grid> */}



            </Container>

        </Box >
    )
}

export default page