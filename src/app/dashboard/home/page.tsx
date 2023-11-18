'use client'
import React from 'react'
import { Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Graficaprueba from '../Components/BarChartComponentA1'
import GraficacomponenteA2 from '../Components/BarChartComponentA2'



const page = () => {
    return (

        <Box sx={{ flexGrow: 1, mt: 4, ml: 2, mr: 2, borderRadius: '20px' }} >
            {/* sección 1 titulo */}
            <Box maxWidth="xl" sx={{ ml: 4 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6} lg={6}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Dashboard principal
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
                {/* primera fila  componente D*/}
                < Grid container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '280px',
                    backgroundColor: '#333333',
                    borderRadius: '20px',
                }} rowSpacing={0.5} gap={1} columnSpacing={{ md: 1, lg: 1, }}  >

                    <Grid xs={12} sm={12} md={3} lg={3} sx={{ backgroundColor: 'blue', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente D1
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} sx={{ backgroundColor: '#ffffff', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente D2
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} sx={{
                        backgroundColor: '#ffffff', width: '560px', height: '260px'
                    }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente D3
                        </Typography>
                    </Grid>
                </Grid>
                {/* Componente A y A1 */}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '460px',
                    backgroundColor: '#333333',
                    borderRadius: '20px',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#333333',
                        borderRadius: '20px',
                    }}>
                        <Graficaprueba />
                    </Grid>

                </Grid>
                {/* Componente E*/}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '460px',
                    backgroundColor: '#333333',
                    borderRadius: '20px',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '460px',
                        backgroundColor: '#333333',
                        borderRadius: '20px',
                    }}>
                        <GraficacomponenteA2 />
                    </Grid>

                </Grid>
                {/* componente F*/}
                < Grid container sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '280px',
                    backgroundColor: '#333333',
                    borderRadius: '20px',
                }} rowSpacing={0.5} gap={1} columnSpacing={{ md: 1, lg: 1, }}  >

                    <Grid xs={12} sm={12} md={3} lg={3} sx={{ backgroundColor: '#ffffff', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente F1
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} sx={{ backgroundColor: '#ffffff', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente F2
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} sx={{
                        backgroundColor: '#ffffff', width: '560px', height: '260px'
                    }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente F3
                        </Typography>
                    </Grid>
                </Grid>
                {/* Componente G */}
                <Grid container sx={{

                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '280px',
                    backgroundColor: '#333333',
                    borderRadius: '20px',
                    /*  backgroundColor: '#FFFFFF', */
                }} rowSpacing={0.5} gap={1} columnSpacing={{ md: 1, lg: 1, }}
                >
                    <Grid xs={12} sm={12} md={5} lg={5} sx={{ backgroundColor: '#f5f5f5', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente G1
                        </Typography>
                    </Grid>
                    <Grid className='' xs={12} sm={12} md={5} lg={5} sx={{ backgroundColor: '#f5f5f5', width: '560px', height: '260px' }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                            Componente G2
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

        </Box >
    )
}

export default page