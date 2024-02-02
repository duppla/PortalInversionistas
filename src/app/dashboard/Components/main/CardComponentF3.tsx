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
    data: number;
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
function CardComponentF3() {
    const { userEmail } = useAuth();
    const getQueryParameter = (userEmail: string | null): string => {
        if (!userEmail) {
            // En caso de que el correo electrónico no esté disponible
            return "";
        }
        // Verifica el correo electrónico y devuelve el parámetro de consulta correspondiente
        if (userEmail === "fcortes@duppla.co") {
            return "skandia";
        } else if (userEmail === "aarevalo@duppla.co") {
            return "weseed";
        } else if (userEmail === "scastaneda@duppla.co") {
            return "disponible";
        }
        // En caso de que el correo electrónico no coincida con ninguno de los casos anteriores
        return "";
    };


const [dataApiF3, setDataApiF3] = useState<ApiResponse | null>(null);

useEffect(() => {
    const queryParameter = getQueryParameter(userEmail);
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

    fetch(getApiUrlFinal(`/principal/f3?investor=${queryParameter}`), options)
        .then(response => response.json())
        .then(response => {
            if (typeof response.data === 'number') {
                setDataApiF3(response); // Coloca el objeto en un array para mantener consistencia
                 
            } else {
                console.error('El valor de data no es un número:');
            }
        }).catch(err => console.error(err));
}, []);

   // Accede directamente al primer elemento del array
   const dataPrueba = dataApiF3;
   const formattedDate = dataApiF3 ? formatFecha(dataApiF3.fecha) : '';
 
  return (
    <Box className='size-card-main-componentF' sx={{ backgroundColor:'#020101', borderRadius:'14px' , /* width: '360px', height:'220px' */ }}>
            <Card className='size-card-main-componentF' sx={{ mt:2, mb:2, backgroundColor:'#020101', borderRadius:'14px', display:'flex', justifyContent:'center', alignContent: 'center', textAlign:'center'}}>
                <CardContent sx={{mt:1, mb:1}}>
                    <Typography className='title-D-F' component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'30px',fontWeight:'500'}}>
                      Adelanto
                    </Typography>
                    <Typography   component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'12px',fontWeight:'500'}}>
                    {formattedDate}
                    </Typography>
                    <Typography sx={{ mt:0.2, mb: 1.5, color:'#E3E8F3', fontStyle:'normal',fontWeight:'700',fontSize:'1.6rem' }} >
                     $ {dataPrueba?.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}                     
                    </Typography>                    
                </CardContent>
               
            </Card>
        </Box>
  )
}

export default CardComponentF3