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
    monto_inversion: number;
  }
function CardComponentD1() {

    const { userEmail } = useAuth();
    const [dataApiD1, setDataApiD1] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const queryParameter = userEmail;
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
        
        fetch(getApiUrlFinal(`/principal/d1?email=${queryParameter}`), options)
            .then(response => response.json())
            .then(response => {
                if (typeof response.monto_inversion === 'number') {
                    setDataApiD1(response); // Coloca el objeto en un array para mantener consistencia
                   /*  console.log(response); */
                } else {
                    console.error('El valor de data no es un número:', );
                }
            }).catch(err => console.error(err));
    }, [userEmail]);

    // Accede directamente al primer elemento del array
    const dataPrueba = dataApiD1;
   console.log(dataPrueba + ' dataPrueba en point d1'); 

    return (
        <Box sx={{ backgroundColor:'#020101', borderRadius:'14px' ,  }}>
              {dataApiD1 == null?<div></div>:
            <Card className='size-card-main-d-f' sx={{ mt:2, mb:2, backgroundColor:'#020101', borderRadius:'14px', display:'flex', justifyContent:'center', alignContent: 'center', textAlign:'center'}}>
                <CardContent sx={{mt:1, mb:1}}>
                    <Typography  className='title-D-F' component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'18px',fontWeight:'500'}} >
                       Inversión original 
                    </Typography>
                    <Typography sx={{ mt:0.2, mb: 1.5, color:'#E3E8F3', fontStyle:'normal',fontWeight:'700', fontSize:'1.6rem' }} >
                     $ {dataPrueba?.monto_inversion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}                     
                    </Typography>                    
                </CardContent>               
            </Card>}
        </Box>
    )
}

export default CardComponentD1