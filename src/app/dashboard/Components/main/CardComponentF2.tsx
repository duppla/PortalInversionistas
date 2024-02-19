'use client'
<<<<<<< HEAD
import { useEffect, useState, } from 'react';
import { Box, Card,  CardContent,  Typography,} from '@mui/material';
=======
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography} from '@mui/material';
>>>>>>> 7a950f13a2ccde9ae11a0486c1c05d536667d8e0
import { getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';


interface ApiResponse {
    tasa_mora: number;
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
function CardComponentF2() {
    const { userEmail } = useAuth();
         const [dataApiF2, setDataApiF2] = useState<ApiResponse | null>(null);

        useEffect(() => {
            if (!userEmail) {
                return;
            }
            const queryParameter =userEmail;
            const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

            fetch(getApiUrlFinal(`/principal/f2?email=${queryParameter}`), options)

                .then(response => response.json())
                .then(response => {
                    if (typeof response.tasa_mora === 'number') {
                        if(response.tasa_mora > 0){
                            setDataApiF2(response); // Coloca el objeto en un array para mantener consistencia
                        } else {
                            setDataApiF2({fecha: response.fecha, tasa_mora: 0.0});
                        }

                    } else {
                        console.error('El valor de data no es un número:');
                    }
                }).catch(err => console.error(err));
        }, [userEmail]);
        // Accede directamente al primer elemento del array
        const dataPrueba = dataApiF2;
        const porcentaje = dataApiF2?.tasa_mora ? (dataApiF2.tasa_mora * 100).toFixed(1) + '%' : "0%";
        /* console.log(dataPrueba + ' dataPrueba en point d2'); */

        const formattedDate = dataApiF2 ? formatFecha(dataApiF2.fecha) : '';

        return (
            <Box className='size-card-main-componentF' sx={{ backgroundColor: '#020101', borderRadius: '14px', /* width: '360px', height:'220px' */ }}>
                <Card className='size-card-main-componentF' sx={{ mt: 2, mb: 2, backgroundColor: '#020101', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                    <CardContent sx={{ mt: 1, mb: 1 }}>
                        <Typography className='title-D-F' component="div" sx={{ color: '#5782F2', fontFamily: 'Rustica', fontSize: '30px', fontWeight: '500' }}>
                            Tasa de morosidad
                        </Typography>
                        <Typography component="div" sx={{ color: '#5782F2', fontFamily: 'Rustica', fontSize: '12px', fontWeight: '500' }}>
                            {formattedDate}
                        </Typography>
                        <Typography sx={{ mt: 0.2, mb: 1.5, color: '#E3E8F3', fontStyle: 'normal', fontWeight: '700', fontSize: '1.6rem' }} >
                            {/* {dataPrueba?.data}% */}
                            {porcentaje}

                        </Typography>
                    </CardContent>

                </Card>
            </Box>
        )
    }

    export default CardComponentF2