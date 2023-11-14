'use client'


import React from 'react'
/* import { useAuth } from './../../context/authContext'; */
import Graficaprueba from '../Components/barChart'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';

function Page() {



    return (

        <Box sx={{ display: 'flex', backgroundColor: '#272727', mt: 4 }}>
            <Box sx={{ flexGrow: 1, }}>

                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}
                    className=''>
                    <Container maxWidth="xl" sx={{ mt: 4, }}>
                        <Grid container spacing={1}>
                            {/*Segunda columna principal*/}
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                {/* card inicial apartamentos*/}
                                {/* <Migasdepan /> */} migas de pan
                            </Grid>
                            {/*Segunda columna principal*/}
                            <Grid xs={6} sm={6} md={6} lg={6} sx={{
                                display: 'flex', justifyContent: 'end',
                                justifyItems: 'end',
                                alignItems: 'end',
                            }}>


                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined">Property</Button>
                                    <Link href="/dashboard/buyer/institutionalInvestors">
                                        <Button variant="outlined" sx={{
                                            backgroundColor: '#272727',
                                            color: '#ffffff',
                                            fontFamily: 'Roboto',
                                            fontStyle: 'normal',
                                            fontWeight: '500',
                                            fontSize: '16px',
                                            textTransform: 'none',
                                            width: '120px',
                                            borderColor: '#5682F2',

                                        }} >
                                            Buyer
                                        </Button>
                                    </Link>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                    <Typography component="h1" variant="h5" sx={{ color: '#5682F2' }}>
                        Home
                    </Typography>
                    <Grid container sx={{
                        marginTop: '10px',
                    }}>
                        {/*Segunda columna principal-datos del inmueble*/}
                        <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                            <Grid container sx={{ background: '#ffffff', borderColor: '#CAFACA', borderRadius: '20px' }}>
                                <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                    sx={{
                                        width: '900px',
                                        height: '600px',
                                    }}
                                    className=''>
                                    {/*     <MyResponsiveBar data={myData} /> */}
                                    {/*   <MyResponsiveBar data={[]} />  */}{/* Si MyResponsiveBar espera un array */}

                                    <Graficaprueba />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                            <Grid container sx={{ background: '#F1F1F1', borderRadius: '20px' }}>
                                <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}

                                    sx={{
                                        width: '400px',
                                        height: '400px',
                                    }}>
                                    {/*   <BarCharts /> */}  barras

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* prueba de colunmas */}
                    <Grid container sx={{
                        marginTop: '10px',
                    }}>
                        {/*Segunda columna principal-datos del inmueble*/}
                        <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                            <Grid container sx={{}}>
                                <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                    className='border-cards-componentes centrado'>
                                    <div className=''>

                                        {/*----------------endpoint  graficas de barras de especificaciones------------------- */}
                                        <Grid container sx={{
                                            backgroundColor: '',
                                            width: '100%',
                                            height: '100%',
                                        }}>
                                            {/*  <Chart /> */} fgrafica
                                        </Grid>

                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                            <Grid container sx={{}}>
                                <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                    className='border-cards-componentes centrado'>
                                    <div className=''>


                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

            </Box>

        </Box>
    )
}

export default Page