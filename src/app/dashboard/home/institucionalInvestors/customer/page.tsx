'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import PieChartComponentk1 from '@/app/dashboard/Components/customer/PieChartComponentK1';
import PieChartComponentK2 from '@/app/dashboard/Components/customer/PieChartComponentK2';
import BarChartComponentO from '@/app/dashboard/Components/customer/BarChartComponentO';
import BarChartComponentN from '@/app/dashboard/Components/customer/BarChartComponentN';
import StreamChartComponentL from '@/app/dashboard/Components/customer/StreamChartComponentL';



const Customer = () => {
    return (
        <Box sx={{ flexGrow: 1, mt: 1, ml: 2, mr: 2, borderRadius: '20px' }} >
            {/* sección 1 titulo */}
            {/* <Box maxWidth="xl" sx={{  }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6} lg={6}>
                        <Typography className='title-component' sx={{ mt: 0.3, mb: 1.5, color: '#5682F2', fontStyle: 'normal', fontWeight: '500', fontSize:'3rem' }}>
                            Clientes
                        </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{
                    }}>
                    </Grid>
                </Grid>
            </Box> */}
            {/* Sección dashborad Clientes*/}
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, }}
                className=''>
                {/* Componente K1 -K2 */}
                <Grid className='size-container-k1-k2' container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    backgroundColor: '#0B0B0D',
                    borderRadius: '20px',

                    mt: 2
                }} /* rowSpacing={2}  */ gap={13.2} columnSpacing={{ md: 1, lg: 1, }}
                >
                    <Grid xs={12} sm={12} md={5.5} lg={5.5} sx={{
                        borderRadius: '10px',
                        backgroundColor: '#212126',
                      /*   mt: 2 */ mb: 2,
                        p: 3
                    }}>
                        <PieChartComponentk1 />

                    </Grid>
                   {/*  <Grid className='' xs={12} sm={12} md={1} lg={1} sx={{
                    }}> 
                    </Grid>*/}

                    <Grid className='' xs={12} sm={12} md={5.5} lg={5.5} sx={{
                        borderRadius: '10px',
                        backgroundColor: '#212126',
                       /*  mt: 2, */ mb: 2,
                        p: 3
                    }}>
                        <PieChartComponentK2 />
                    </Grid>
                </Grid>
                {/* Componente N */}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '560px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>
                        <BarChartComponentN />

                    </Grid>

                </Grid>
                {/* Componente L*/}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '560px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',


                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>
                        <StreamChartComponentL />
                    </Grid>

                </Grid>
                {/* Componente O */}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '600px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',


                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '520px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>

                        <BarChartComponentO />
                    </Grid>

                </Grid>
            </Container>

        </Box >
    )
}

export default Customer