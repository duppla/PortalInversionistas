'use client'
import React from 'react'
import { Grid, Container, Box, Button, ButtonGroup, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import GraficaComponenteb from './../../../Components/LineChartComponentB'



const page = () => {
    return (
        <Box >
           <h1 className='centrado'>INMUEBLES</h1>
           <GraficaComponenteb />

        </Box>
    )
}

export default page