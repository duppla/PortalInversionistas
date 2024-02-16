'use client'
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';


interface DataApiType {
    fecha: string;
    gastos: number;
    reserva: number;
    noi: number;
    utilidad_bruta: number;
    ingresos: number;
};

export default function BasicTable() {


    const { userEmail } = useAuth();
    const [data, setData] = useState<DataApiType[]>([]);
    const [responseData, setResponseData] = useState<any>(null);
    const [orderedKeys, setOrderedKeys] = useState<string[]>([]); // Agregamos esta línea

    const getOrderedKeys = (data: any) => {
        return Object.keys(data).filter((key) => key !== "fecha");
    };

    useEffect(() => {
        if (!userEmail) {
            return;
        }
        const queryParameter = userEmail;
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrlFinal(`/inmuebles/j2?email=${queryParameter}`), options);
                const responseData = await response.json();
                console.info(responseData);

                setData(responseData);
                setResponseData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userEmail]);



    // Función para formatear la fecha en el formato deseado
    const formatFecha = (fecha: string) => {
        const [year, month, day] = fecha.split('-');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return `${monthNames[parseInt(month, 10) - 1]} ${year.slice(2)}`;
    };
    // Función para formatear las cifras con separadores de miles
    /*   const formatNumber = (number: number) => number.toLocaleString(); */
    const formatNumber = (value: any) => {
        // Verificar si el valor es numérico antes de aplicar el formato
        if (!isNaN(value) && typeof value === 'number') {
            return value.toLocaleString();
        }
        return value;
    };


    return (
        <div className='custom-table nivo-text'>

            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Perdidas y Ganancias portafolio</Typography>

                        </Grid>
                        {/*   <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleSelectChange}
                               

                                sx={{
                                    color: '#9B9EAB', justifyContent: 'flex-end', textAlign: 'end', fill: '#ffffff', '&.MuiSelect-icon': { color: '#FFFFFF !important' },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },

                                }}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                  
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#212126', // Fondo del menú desplegado
                                            border: '1px solid #5682F2', // Borde azul
                                            color: '#9B9EAB', // Letra blanca
                                        },
                                    },
                                }}
                                open={menuOpen}
                                onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
                                onOpen={() => setMenuOpen(true)}   // Abre el menú cuando se hace clic en el botón

                                IconComponent={() => (
                                    // Cambia el ícono según el estado del menú
                                    menuOpen ? (
                                        <ArrowDropUpIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    ) : (
                                        <ArrowDropDownIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    )
                                )}
                            >
                                <MenuItem value='este_anho'>Este año</MenuItem>
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </FormControl>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <TableContainer sx={{ mt: 4 }} component={Paper}>
                    <Table sx={{ minWidth: 550, background: '#212126' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '20px', width: 'auto', flexBasis: '50%' }} align="right"></TableCell>
                                {data && data.length > 0 && data.map((row: any, index: any) => (
                                    <TableCell key={index} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                        {formatFecha(row.fecha)}
                                    </TableCell>
                                ))}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && Array.isArray(data) && data.length > 0 && (
                                <>
                                    <TableRow key="ingresos" sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                        <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '1rem', width: 'auto', flexBasis: '50%' }} align="right">
                                            Ingresos
                                        </TableCell>
                                        {data.map((row: any, rowIndex) => (
                                            <TableCell key={rowIndex} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                                ${formatNumber(row.ingresos)}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow key="gastos" sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                        <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '1rem', width: 'auto', flexBasis: '50%' }} align="right">
                                            Gastos
                                        </TableCell>
                                        {data.map((row: any, rowIndex) => (
                                            <TableCell key={rowIndex} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                                $-{formatNumber(row.gastos)}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow key="utilidad_bruta" sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                        <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '1rem', width: 'auto', flexBasis: '50%' }} align="right">
                                            Utilidad bruta
                                        </TableCell>
                                        {data.map((row: any, rowIndex) => (
                                            <TableCell key={rowIndex} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                                ${formatNumber(row.utilidad_bruta)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow key="reserva" sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                        <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '1rem', width: 'auto', flexBasis: '50%' }} align="right">
                                            Reserva
                                        </TableCell>
                                        {data.map((row: any, rowIndex) => (
                                            <TableCell key={rowIndex} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                                $-{formatNumber(row.reserva)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow key="noi" sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                        <TableCell sx={{ color: '#6C9FFF', textAlign: 'center', fontFamily: 'Rustica', fontSize: '1rem', width: 'auto', flexBasis: '50%' }} align="right">
                                            NOI
                                        </TableCell>
                                        {data.map((row: any, rowIndex) => (
                                            <TableCell key={rowIndex} sx={{ color: '#9B9EAB', textAlign: 'end', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                                ${formatNumber(row.noi)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </>
                            )}
                        </TableBody>


                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}