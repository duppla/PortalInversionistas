'use client'
import React from 'react'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Graficaprueba from '../Components/BarChartComponentA1'
import GraficacomponenteA2 from '../Components/BarChartComponentA2'
import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '##5C5E6B',
      light: '#E8E9F2',
      dark: '#9B9EAB',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});




const Page = () => {
    const [selectedValue, setSelectedValue] = useState('Este año');

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
                        height: '560px',
                        backgroundColor: '#212126',
                        borderRadius: '20px',
                    }}>
                        <br />
                        {/*  <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Este año</InputLabel>
                            
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value='Este año'>Este año</MenuItem>
                                <MenuItem value='2023'>2023</MenuItem>
                            </Select>
                        </FormControl> */}
                        <FormControl fullWidth>
                            <Grid container spacing={2} alignItems="center" sx={{borderBottom:'1px solid #9B9EAB'}}>
                                <Grid xs={6} md={6} lg={6}>
                                    <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Flujo real vs. flujo esperado</Typography>
                                </Grid>
                                <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedValue}
                                        label="Age"
                                        onChange={handleChange}
                                        sx={{  color: '#9B9EAB', justifyContent: 'flex-end', textAlign: 'end', ' &.MuiSelect-icon': { color: '#FFFFFF !important' }, 
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, 
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, 
                                        }}
                                        >
                                        <MenuItem value='Este año'>Este año</MenuItem>
                                        <MenuItem value='2023'>2023</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </FormControl>

                        {/* Condicionalmente renderiza las gráficas */}
                        {selectedValue === 'Este año' && <Graficaprueba />}
                        {selectedValue === '2023' && <GraficacomponenteA2 />}


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