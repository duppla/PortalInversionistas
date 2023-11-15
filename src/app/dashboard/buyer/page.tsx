'use client'
import React, { useEffect, useState } from 'react'
/* import { useAuth } from './../../context/authContext'; */
import Graficaprueba from '../Components/barChart'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Institucionalinversor from '../buyer/institutionalInvestors/property/page'
import InversionistaRetail from '../buyer/institutionalInvestors/customer/page';
import Image from 'next/image';
import LogoInver from './../../../img/logoinversionistas.svg';

function Page() {

    const [mostrarCliente, setMostrarCliente] = useState(false);

    const handleMostrarCliente = () => {
        setMostrarCliente(false);
    };

    const handleMostrarInmueble = () => {
        setMostrarCliente(true);
    };


    return (

        <Box sx={{ display: 'flex', mt: 4, ml: 1, mr: 1 }}>
            {/* <Box sx={{ flexGrow: 1, }}>
                <button onClick={handleMostrarInmueble}>Inmueble</button>
                <button onClick={handleMostrarCliente}>Cliente</button>

                {mostrarCliente ?  <InversionistaRetail /> : <Institucionalinversor /> }

            </Box> */}



            <Box id='contenidoInmueble'
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    height: '100vh',
                }}
            >
                <Container className='centrado' maxWidth="xl" sx={{ mt: 2, }}
                >
                    <Image src={LogoInver} alt="Logo" width={492} height={287} />                   
                </Container>
                <Container className='centrado' maxWidth="xl" sx={{ mt: 1, mb: 3, }}>                   

                    <Typography variant="h6" component="div" sx={{ color: '#ffffff' }}>
                        Seleccione el dashboard que desea ver:
                    </Typography>
                </Container>
                {/* Grid botones de navegación secciones */}
                <Grid container className='centrado' spacing={1} >
                   

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div className='centrado'>

                        <Link href="/dashboard/buyer/institutionalInvestors/property">
                            <Button variant="outlined" sx={{
                                backgroundColor: '#272727',
                                color: '#ffffff',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '20px',
                                textTransform: 'none',
                                width: '480px',
                                height: '240px',
                                borderColor: '#5682F2',
                            }}>
                                Portafolio
                            </Button>
                        </Link>
                        </div>
                        {/* <button onClick={handleMostrarInmueble}>Inmueble</button> */}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>

                    <div className='centrado'>

                        <Link href="/dashboard/buyer/institutionalInvestors/customer">
                            <Button variant="outlined" sx={{
                                backgroundColor: '#272727',
                                color: '#ffffff',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '20px',
                                textTransform: 'none',
                                width: '480px',
                                height: '240px',
                                borderColor: '#5682F2',
                            }}>
                                Individual
                            </Button>
                        </Link>
                        {/* <button onClick={handleMostrarCliente}>Cliente</button> */}
                        </div>
                    </Grid>

                   
                </Grid>



            </Box>

        </Box>
    )
}

export default Page