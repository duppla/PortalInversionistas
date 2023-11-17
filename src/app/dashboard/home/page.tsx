'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Graficaprueba from '../Components/BarChartComponentA1'
/* import GraficaLineasB from './../../Components/valuepchart' */


const page = () => {
    return (
        <Box >
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}
                className=''>
                <Grid container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid item className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#333333',
                        borderRadius: '20px',
                    }}>
                        <Graficaprueba />
                    </Grid>

                </Grid>
                {/* prueba de colunmas */}
                <Grid container sx={{
                    mt: 4,
                    ml: 2,
                    /*  backgroundColor: '#FFFFFF', */
                }}>
                    {/*Segunda columna principal-datos del inmueble*/}
                    <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                        <Grid container sx={{}}>
                            <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                className=''>
                                <div className='centrado'>
                                    {/*----------------endpoint  graficas de barras de especificaciones------------------- */}
                                    <Grid className='centrado' container sx={{
                                        /* backgroundColor: '#333333', */
                                        borderRadius: '20px',
                                    }}>
                                        <div>
                                            <Typography component="h1" variant="h3" sx={{ color: '#FFFFFF', fontFamily: 'Roboto', fontSize: '16px', mt: 3, mb: 4 }}>
                                                Valor portafolio
                                            </Typography>
                                        </div>


                                        {/*    <GraficaLineasB /> */}
                                    </Grid>

                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                        <Grid container sx={{}}>
                            <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                className=''>
                                <div className=''>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}

export default page