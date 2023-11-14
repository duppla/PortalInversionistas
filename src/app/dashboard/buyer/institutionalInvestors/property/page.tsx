'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Graficaprueba from './../../../Components/barChart'


const page = () => {
    return (
        <Box >
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
                            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                                <Link href="/dashboard/buyer/institutionalInvestors/property">
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
                                    }}>
                                        Property
                                    </Button>
                                </Link>
                                <Link href="/dashboard/buyer/institutionalInvestors/customer">
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
                                    }}>
                                        Buyer
                                    </Button>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
                <Typography component="h1" variant="h3" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                    Inmuebles
                </Typography>
                <Grid container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                }}>
                    {/*Segunda columna principal-datos del inmueble*/}
                    <Grid item className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#B8B8B8',
                        borderRadius: '20px',
                    }}>
                        <Graficaprueba />
                    </Grid>

                </Grid>
                {/* prueba de colunmas */}
                <Grid container sx={{
                    ml: 2,
                    backgroundColor: '#FFFFFF',
                }}>
                    {/*Segunda columna principal-datos del inmueble*/}
                    <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                        <Grid container sx={{}}>
                            <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                                className=''>
                                <div className=''>

                                    {/*----------------endpoint  graficas de barras de especificaciones------------------- */}
                                    <Grid container sx={{
                                        backgroundColor: '',
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        {/*  <Chart /> */} grafica
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