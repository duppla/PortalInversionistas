'use client'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Card, CardActions, CardContent, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';


interface ApiResponse {
    noi: number;
    fecha: string;
}

function formatFecha(inputFecha: string): string {
    const meses = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
  
    const [year, month, day] = inputFecha.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthAbbr = meses[monthIndex];
  
    return `${monthAbbr} ${year}`;
  }

function CardComponentF1() {
    const { userEmail } = useAuth();
   
    const [dataApiF1, setDataApiF1] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const queryParameter = userEmail;
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

        /* fetch(getApiUrl('/main/f1?investor=skandia'), options) */
        fetch(getApiUrlFinal(`/principal/f1?email=${queryParameter}`), options)
       
            .then(response => response.json())
            .then(response => {
                const dataValue = response?.noi; // Usando optional chaining para verificar si response existe
                if (typeof dataValue === 'number') {
                    setDataApiF1(response); // Coloca el objeto en un array para mantener consistencia
                } else {
                    console.error('El valor de data no es un número:', dataValue);
                }
            
            }).catch(err => console.error(err));
    }, [userEmail]);

    const formattedDate = dataApiF1 ? formatFecha(dataApiF1.fecha) : '';
    // Accede directamente al primer elemento del array
    const dataValue = dataApiF1?.noi;
    /*   console.log(dataPrueba + ' dataPrueba en point d1'); */

    return (
        <Box className='size-card-main-componentF' sx={{ backgroundColor:'#020101', borderRadius:'14px' , /* width: '360px', height:'220px' */ }}>
            <Card className='size-card-main-componentF' sx={{ mt:2, mb: 2, backgroundColor:'#020101', borderRadius:'14px', display:'flex', justifyContent:'center', alignContent: 'center', textAlign:'center'}}>
                <CardContent sx={{mt:1, mb:1}}>
                    <Typography  className='title-D-F' component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'30px',fontWeight:'500'}}>
                       NOI
                    </Typography>
                    <Typography   component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'12px',fontWeight:'500'}}>
                    {formattedDate}
                    </Typography>
                    <Typography sx={{ mt:0.2, mb: 1.5, color:'#E3E8F3', fontStyle:'normal',fontWeight:'700', fontSize:'1.6rem' }} >
                    {typeof dataValue === 'number' ? `$ ${dataValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                        
                    </Typography>                    
                </CardContent>
               
            </Card>
        </Box>
    )
}

export default CardComponentF1