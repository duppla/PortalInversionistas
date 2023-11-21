'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import GraficaComponenteb from './../../../Components/LineChartComponentB'



const page = () => {
    return (

        <Box sx={{ flexGrow: 1, mt: 4, ml: 2, mr: 2, borderRadius: '20px' }} >
            {/* sección 1 titulo */}
            <Box maxWidth="xl" sx={{ ml: 4 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6} lg={6}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Inmuebles
                        </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{
                    }}>
                    </Grid>
                </Grid>
            </Box>
            {/* Sección dashborad */}

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}
                className=''>
                {/* Componente H */}
                <Grid container sx={{

                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '280px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                }} rowSpacing={0.5} gap={1} columnSpacing={{ md: 1, lg: 1, }}
                >
                    <Grid xs={12} sm={12} md={5} lg={5} sx={{ backgroundColor: '#f5f5f5', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente H1
                        </Typography>
                    </Grid>
                    <Grid className='' xs={12} sm={12} md={5} lg={5} sx={{ backgroundColor: '#f5f5f5', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente H2
                        </Typography>
                    </Grid>
                </Grid>
                {/* Componente B */}
                <Grid container sx={{
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
                    height: '460px',
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
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#fffff', fontFamily: 'Roboto', }}>
                            Componente C
                        </Typography>
                    </Grid>

                </Grid>


            </Container>

        </Box >
    )
}

export default page