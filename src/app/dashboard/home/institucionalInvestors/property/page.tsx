'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import GraficaComponenteb from '../../../Components/property/LineChartComponentB'
import GraficacomponenteH2 from '../../../Components/property/LineChartComponentH2'
import MapacomponenteC from '../../../Components/property/MapComponentC'
import GraficacomponenteJ from '../../../Components/property/SankeyChartComponentJ'
import TablacomponenteJ from '../../../Components/property/TableComponentJ'



const page = () => {
    return (

        <Box sx={{ flexGrow: 1, mt: 1, ml: 1, mr: 1, borderRadius: '20px' }} >

            {/* Sección dashborad */}
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, }}
                className=''>
                {/* Componente C -Mapa*/}
                <Grid container sx={{
                    marginTop: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '640px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                }}>
                    {/*Grafica principal-datos del inmueble*/}
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        height: '480px',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        mt: 2
                    }}>
                        <MapacomponenteC />
                    </Grid>

                </Grid>
                {/* Componente B */}
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
                        <GraficaComponenteb />
                    </Grid>

                </Grid>


                {/* Componente J */}
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

                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                      /*  backgroundColor: '#9B9EAB',  */
                        borderRadius: '20px',
                        /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
                    }}>

                        <GraficacomponenteJ />
                    </Grid>

                </Grid>

                {/* Componente J */}
                <Grid container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: '100%',
                    height: '540px',
                    backgroundColor: '#212126',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

                }}>

                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        /*  backgroundColor: '#9B9EAB', */
                        borderRadius: '20px',
                        /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
                    }}>
                        <TablacomponenteJ />
                    </Grid>

                </Grid>
                {/* Componente H */}
                <Grid /* className='size-container-h1-h2' */ container sx={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    backgroundColor: '#212126',
                    height: '305px',
                    borderRadius: '20px',

                }} rowSpacing={2} gap={12.6} columnSpacing={{ md: 1, lg: 1, }}
                >
                    <Grid className='' xs={12} sm={12} md={10} lg={10} sx={{
                        width: '100%',
                        /*  backgroundColor: '#9B9EAB', */
                        borderRadius: '20px',
                        /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
                    }}>
                        <GraficacomponenteH2 />

                    </Grid>          
                </Grid>
            </Container>
        </Box >
    )
}

export default page