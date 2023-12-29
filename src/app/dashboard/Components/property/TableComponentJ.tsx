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

import { getApiUrl } from '@/app/url/ApiConfig';


type DataApiType = {
    fecha: string;
    arriendo: any;
    compra_venta: any;
    prepago: any;
    intereses: any;
};

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

type ItemType = {
    fecha: string;
    arriendo: number;
    compra_venta: number;
    prepago: number;
    intereses: number;
};

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Categoria 1', 159, 6.0, 24, 4.0),
    createData('Categoria 2', 237, 9.0, 37, 4.3),
    createData('Categoria 3', 262, 16.0, 24, 6.0),
    createData('Categoria 4', 305, 3.7, 67, 4.3),
    createData('Categoria 5', 356, 16.0, 49, 3.9),
];


export default function BasicTable() {
    const [data, setData] = useState<any | null>(null);
    const [responseData, setResponseData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrl(`/inmuebles/j?investor=skandia`), options);
                const responseData = await response.json();
                setResponseData(responseData);
                setData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='grafica-barcharts-des nivo-text'>

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
            {/* ... (código previo) */}
            <TableContainer sx={{ mt: 4 }} component={Paper}>
                <Table sx={{ minWidth: 650, background: '#212126' }} aria-label="simple table">
                    <TableBody>
                        {data?.nodes.map((node: any) => (
                            <TableRow key={node.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: '#9B9EAB' }}>
                                <TableCell sx={{ color: '#6C9FFF' , textAlign: 'start', fontFamily: 'Rustica', fontSize: '20px', width: 'auto', flexBasis: '50%' }} component="th" scope="row">
                                    {node.id}
                                </TableCell>
                                {/* Puedes ajustar esta parte dependiendo de cómo quieras mostrar el valor en la tabla */}
                                <TableCell sx={{  color: '#EEF0F4', textAlign: 'center', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                   ${data.links.find((link: any) => link.source === node.id)?.value || 0}
                                </TableCell>
                                <TableCell sx={{  color: '#EEF0F4', textAlign: 'center', width: '33%', fontFamily: 'Rustica', fontSize: '1rem' }} align="right">
                                   ${data.links.find((link: any) => link.source === node.id)?.value || 0}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}