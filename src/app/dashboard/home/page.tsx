'use client'
import React from 'react'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Graficaprueba from '../Components/BarChartComponentA1'
import GraficacomponenteA2 from '../Components/BarChartComponentA2'
import GraficacomponenteE from '../Components/BarChartComponentE'
import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    const [selectedValue, setSelectedValue] = useState('Este año');
    const [changeState, setChangeState] = useState(true);
    const [selectedView, setSelectedView] = useState('general');


    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value as string);
    };



    return (
        <ThemeProvider theme={theme}>
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
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
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
                        height: '100%',
                        backgroundColor: '#212126',
                        borderRadius: '20px',

                    }}>
                        {/*Grafica principal-datos del inmueble*/}
                        <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                            width: '100%',
                            height: '600px',
                            backgroundColor: '#212126',
                            borderRadius: '20px',

                        }}>

                            {/* Condicionalmente renderiza las gráficas */}
                            {selectedView === 'general' && <Graficaprueba />}
                            {selectedView === 'detalle' && <GraficacomponenteA2 />}
                            <br /><br />
                            <div className='centrado'>
                                <div>
                            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 1 }}>

                                <Button variant="outlined" sx={{
                                    backgroundColor: '#272727',
                                    color: '#9B9EAB',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    width: '140px',
                                    borderColor: '#9B9EAB',
                                }}
                                onClick={() => setSelectedView('general')}
                                
                                >
                                   Vista general
                                </Button>

                                <Button variant="outlined" sx={{
                                    backgroundColor: '#272727',
                                    color: '#9B9EAB',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    width: '140px',
                                    borderColor: '#9B9EAB',
                                }}
                                onClick={() => setSelectedView('detalle')}
                                
                                >
                                    Detalle
                                </Button>
                            </Stack>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    {/* Componente E*/}
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
                        {/*Grafica principal-datos del inmueble  A2*/}
                        <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                            width: '100%',
                            height: '460px',
                            backgroundColor: '#212126',
                            borderRadius: '20px',

                        }}>
                            <GraficacomponenteE />
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
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
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
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
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
        </ThemeProvider>
    )
}

export default Page