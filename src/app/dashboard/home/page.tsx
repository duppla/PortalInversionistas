'use client'
import React from 'react'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Graficaprueba from '../Components/main/BarChartComponentA1'
import GraficacomponenteE from '../Components/main/BarChartComponentE'

import GraficacomponenteG1 from '../Components/main/LineChartComponentG1'
import GraficacomponenteG2 from '../Components/main/PieChartComponentG2'
import CardcomponenteD1 from '../Components/main/CardComponentD1'
import CardcomponenteD2 from '../Components/main/CardComponentD2'
import CardcomponenteD3 from '../Components/main/CardComponentD3'
import CardcomponenteF1 from '../Components/main/CardComponentF1'
import CardcomponenteF2 from '../Components/main/CardComponentF2'
import CardcomponenteF3 from '../Components/main/CardComponentF3'
import GraficacomponenteP from '../Components/main/LineChartComponentP'


import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            light: '#E8E9F2',
            dark: '#9B9EAB',
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#ffffff',
            light: '#FFFFFF',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#47008F',
        },
    },
});


const Page = () => {

    let isLargeScreenK = useMediaQuery('min-width: 1200px')
 

    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{ flexGrow: 1, mt: 1, ml: 1, mr: 1, borderRadius: '20px', overflow:'hidden'}} >
                <Container maxWidth="xl" sx={{ mt: 2, mb: 4, }}
                    className=''>
                    {/* primera fila  componente D*/}
                    < Grid container className='size-card-main' sx={{
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        backgroundColor: '#212126',                       
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        p: 2
                    }}  columnGap={10} rowGap={1} >
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteD1 />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteD2 />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteD3 />
                        </Grid>
                    </Grid>
                    {/* Componente P*/}
                    <Grid container sx={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '100%',
                        height: '305px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                    }}>
                        {/*Grafica principal-datos del inmueble  A2*/}
                        <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                            width: '100%',
                            height: '305px',
                            backgroundColor: '#212126',
                            borderRadius: '20px',

                        }}>
                            <GraficacomponenteP />
                        </Grid>

                    </Grid>
                    {/* Componente A y A1 */}
                    <Grid container sx={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '100%',

                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>
                        {/*Grafica principal-datos del inmueble*/}
                        <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                            width: 'auto',
                            height: '440px',
                            borderRadius: '20px',

                            mb: 2,
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
                        height: '440px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                    }}>
                        {/*Grafica principal-datos del inmueble  A2*/}
                        <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                            width: '100%',
                            height: '440px',
                            backgroundColor: '#212126',
                            borderRadius: '20px',

                        }}>
                            <GraficacomponenteE />
                        </Grid>

                    </Grid>
                    {/* componente F*/}
                    < Grid container className='size-card-main-f' sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        mt: 4,
                        p: 2

                    }} columnGap={10} rowGap={1}  >
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteF1 />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteF2 />
                        </Grid>
                        <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
                            <CardcomponenteF3 />
                        </Grid>
                    </Grid>
                    {/* Componente G */}
                    <Grid container sx={{

                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '100%',
                        height: '370px',
                        backgroundColor: /* '#212126' */ '#0B0B0D',
                        borderRadius: '20px',
                        /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
                        mt: 4
                    }} columnGap={isLargeScreenK ? 13.5 : 10} rowGap={1}>
                        <Grid className='container-G' xs={12} sm={12} md={5.5} lg={5.5} sx={{
                            borderRadius: '10px',
                            backgroundColor: '#212126',
                            mt: 2, mb: 2,
                            p:2
                        }}>
                            <GraficacomponenteG1 />
                        </Grid>
                        <Grid className='' xs={12} sm={12} md={5.5} lg={5.5} sx={{
                            borderRadius: '10px',
                            backgroundColor: '#212126',
                            mt: 2, mb: 2,
                            p: 4
                        }}>
                            <GraficacomponenteG2 />
                        </Grid>
                    </Grid>
                </Container>

            </Box >
        </ThemeProvider>
    )
}

export default Page