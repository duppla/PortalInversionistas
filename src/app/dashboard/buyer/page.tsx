'use client'
import React, { useEffect, useState } from 'react'
/* import { useAuth } from './../../context/authContext'; */
import Graficaprueba from '../Components/barChart'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Institucionalinversor from '../buyer/institutionalInvestors/property/page'
import InversionistaRetail from '../buyer/institutionalInvestors/customer/page';

function Page() {

    const [mostrarCliente, setMostrarCliente] = useState(false);

    const handleMostrarCliente = () => {
        setMostrarCliente(true);
    };

    const handleMostrarInmueble = () => {
        setMostrarCliente(false);
    };


    return (

        <Box sx={{ display: 'flex', backgroundColor: '#272727', mt: 4 }}>
            <Box sx={{ flexGrow: 1, }}>
                <button onClick={handleMostrarInmueble}>Inmueble</button>
                <button onClick={handleMostrarCliente}>Cliente</button>

                {mostrarCliente ? <Institucionalinversor /> : <InversionistaRetail />}

            </Box>

        </Box>
    )
}

export default Page