'use client'
import { useEffect, useState, } from 'react';
import { Box, Card,  CardContent,  Typography,} from '@mui/material';
import { getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';



interface ApiResponse {
    participacion_adquirida: number;
  }
function CardComponentD2() {

    const { userEmail } = useAuth();
   
    const [dataApiD2, setDataApiD2] = useState<ApiResponse | null>(null);

    useEffect(() => {
        if (!userEmail) {
            return;
        }
        const queryParameter = userEmail;
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

        fetch(getApiUrlFinal(`/principal/d2?email=${queryParameter}`), options)
            .then(response => response.json())
            .then(response => {
                if (typeof response.participacion_adquirida === 'number') {
                    setDataApiD2(response); // Coloca el objeto en un array para mantener consistencia
                    /* console.log(response); */
                } else {
                    console.error('El valor de data no es un número:',);
                }
            }).catch(err => console.error(err));
    }, [userEmail]);

    // Accede directamente al primer elemento del array
    const dataPrueba = dataApiD2;
   /*  const porcentaje = dataApiD2?.data ? (dataApiD2.data * 100).toFixed(1) + '%' : null; */
    /* console.log(dataPrueba + ' dataPrueba en point d2'); */
    const porcentaje = dataApiD2?.participacion_adquirida != null
    ? dataApiD2.participacion_adquirida % 1 === 0 // Verifica si es un número entero
        ? `${Math.round(dataApiD2.participacion_adquirida * 100)}%` // Si es entero, multiplica por 100 y agrega %
        : `${(dataApiD2.participacion_adquirida * 100).toFixed(1)}%` // Si tiene decimales, multiplica por 100 y muestra un decimal
    : null;

  return (
    <Box className='size-card-main-d-f' sx={{  backgroundColor:'#020101' , borderRadius:'14px'  /* width: '360px', height:'220px' */ }}>
        
            <Card className='size-card-main-d-f' sx={{ mt:2 , mb: 2 , backgroundColor:'#020101', borderRadius:'14px', display:'flex', justifyContent:'center', alignContent: 'center', textAlign:'center'}}>
                <CardContent sx={{mt:1 , mb: 1}}>
                    <Typography  component="div" sx={{color: '#5782F2', fontFamily: 'Rustica', fontSize:'18px',fontWeight:'500'}} className='title-D-F' >
                     Participación adquirida  
                    </Typography>
                    <Typography sx={{ mt:0.2, mb: 1.5, color:'#E3E8F3', fontStyle:'normal',fontWeight:'700', fontSize:'1.6rem' }} >
                     {/* {dataPrueba?.data}% */}
                    {porcentaje}
                       
                    </Typography>                    
                </CardContent>
               
            </Card>
        </Box>
  )
}

export default CardComponentD2