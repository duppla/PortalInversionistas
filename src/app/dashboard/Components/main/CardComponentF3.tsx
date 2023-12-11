'use client'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Card, CardActions, CardContent, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';


interface ApiResponse {
    data: number;
}
function CardComponentF3() {
const [dataApiF3, setDataApiF3] = useState<ApiResponse | null>(null);

useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

    fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/f3?investor=skandia', options)
        .then(response => response.json())
        .then(response => {
            if (typeof response.data === 'number') {
                setDataApiF3(response); // Coloca el objeto en un array para mantener consistencia
                /*  console.log(response); */
            } else {
                console.error('El valor de data no es un número:', response);
            }
        }).catch(err => console.error(err));
}, []);

   // Accede directamente al primer elemento del array
   const dataPrueba = dataApiF3;
   /*   console.log(dataPrueba + ' dataPrueba en point d1'); */
  return (
    <Box className='size-card-main-d-f' sx={{ backgroundColor:'#020101', borderRadius:'14px' , /* width: '360px', height:'220px' */ }}>
            <Card sx={{ mt:4, backgroundColor:'#020101', borderRadius:'14px', display:'flex', justifyContent:'center', alignContent: 'center', textAlign:'center'}}>
                <CardContent sx={{mt:4}}>
                    <Typography  component="div" sx={{color: '#5782F2', fontFamily: 'Roboto', fontSize:'30px',fontWeight:'500'}}>
                      <p>Prepago</p> 
                    </Typography>
                    <Typography variant="h5"sx={{ mt:2, mb: 1.5, color:'#E3E8F3', fontStyle:'normal',fontWeight:'700' }} >
                    <h2> $ {dataPrueba?.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h2> 
                    </Typography>                    
                </CardContent>
               
            </Card>
        </Box>
  )
}

export default CardComponentF3