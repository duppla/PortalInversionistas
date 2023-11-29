'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import PieChartComponentk1 from '@/app/dashboard/Components/customer/PieChartComponentK1';
import PieChartComponentK2 from '@/app/dashboard/Components/customer/PieChartComponentK2';


const Customer = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 1, ml: 2, mr: 2, borderRadius: '20px' }} >
    {/* sección 1 titulo */}
    <Box maxWidth="xl" sx={{ ml: 4 }}>
        <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={6} lg={6}>
                <Typography sx={{ mt:0.3, mb: 1.5, color: '#5682F2', fontStyle:'normal',fontWeight:'700' }}>
                   <h1>Clientes</h1> 
                </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={6} sx={{
            }}>
            </Grid>
        </Grid>
    </Box>
    {/* Sección dashborad Clientes*/}
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4, }}
        className=''>
        {/* Componente H */}
        <Grid container sx={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            width: '100%',
            height: '480px',
            backgroundColor: '#212126',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            mt: 4
        }} rowSpacing={2} gap={10} columnSpacing={{ md: 1, lg: 1, }}
        >
            <Grid xs={12} sm={12} md={5} lg={5} sx={{
               borderRadius: '20px',
               boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
               mt: 2, mb: 2,
            }}>
                <PieChartComponentk1/>

            </Grid>
            <Grid className='' xs={12} sm={12} md={5} lg={5} sx={{
              borderRadius: '20px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              mt: 2, mb: 2,
            }}>
               <PieChartComponentK2/>
            </Grid>
        </Grid>
        {/* Componente L */}
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
                Componenet L
            </Grid>

        </Grid>
        {/* Componente M*/}
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
                    Componente M
                </Typography>
             {/*  <Prueba />   */}
            </Grid>

        </Grid>
         {/* Componente N */}
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
                    Componente J
                </Typography>
             {/*  <Prueba />   */}
            </Grid>

        </Grid>



    </Container>

</Box >
  )
}

export default Customer