import  React from 'react';
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
  return (
    <div className='grafica-barcharts-des nivo-text'> 
    <div>
    <FormControl fullWidth>
      <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
        <Grid xs={6} md={6} lg={6}>
          <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Pérdidas y Ganancias portafolio</Typography>
        </Grid>
        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>

        </Grid>
      </Grid>
    </FormControl>
  </div>
    <TableContainer sx={{mt:4}} component={Paper}>
      <Table sx={{ minWidth: 650, background:'#212126'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color:'#9B9EAB', textAlign: 'center', width: '33%', fontFamily:'Rustica', fontSize:'1.4rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}  >Gastos</TableCell>
            <TableCell  sx={{color:'#9B9EAB',textAlign: 'center',  width: '33%', fontFamily:'Rustica', fontSize:'1.4rem'}} align="right">Reservas</TableCell>
            <TableCell sx={{color:'#9B9EAB', textAlign: 'center', width: '33%', fontFamily:'Rustica', fontSize:'1.4rem'}}  align="right">NOI</TableCell>
         
                      
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } , color:'#9B9EAB'}}
            >
              <TableCell   sx={{ color:'#7DC1FF', textAlign: 'center', fontFamily:'Rustica', fontSize:'1rem', width: 'auto', flexBasis: '50%'}} component="th" scope="row">
              {row.name} 
              </TableCell>
              <TableCell sx={{color:' #EEF0F4', textAlign: 'center',width: '33%', fontFamily:'Rustica', fontSize:'1rem'}}align="right">{row.calories}</TableCell>
              <TableCell sx={{color:' #EEF0F4',textAlign: 'center', width: '33%', fontFamily:'Rustica', fontSize:'1rem'}}align="right">{row.fat}</TableCell>
        
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}