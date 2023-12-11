'use client'
import { ResponsiveStream } from '@nivo/stream'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TooltipProps as NivoTooltipProps } from '@nivo/stream';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';




type DataApiType = {
    fecha: string;
    alto: any;
    medio: any;
    bajo: any;
    muy_bajo: any;
};

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

type ItemType = {
    fecha: string;
    alto: number;
    medio: number;
    bajo: number;
    muy_bajo: number;
};

function StreamChartComponentL() {
    const [data, setData] = useState<DataType | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(`https://salesforce-gdrive-conn.herokuapp.com/inversionistas/clientes/l?investor=skandia`, options);
                const responseData = await response.json();
                setResponseData(responseData);
                setData(responseData); // Actualiza los datos cuando la respuesta de la API llega
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    /* Función para actualizar la selección del usuario */
    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKey(dataKey);
    };

    /* Función que controla la selección del dropdown */
    const handleSelectChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {
        const selectedDataKey = event.target.value as string;
        setSelectedValue(selectedDataKey);
        handleDataSelection(selectedDataKey);
    };


    // Este código podría ir en el lugar donde obtienes las fechas del servidor
    const formattedData = responseData
        ? responseData[selectedDataKey].map((dataItem: any) => ({
            id: dataItem.fecha, // El identificador de cada serie es la fecha
            Alto: dataItem.alto ? dataItem.alto : 0,
            Medio: dataItem.medio ? dataItem.medio : 0,
            Bajo: dataItem.bajo ? dataItem.bajo : 0,
            Muy_bajo: dataItem.muy_bajo ? dataItem.muy_bajo : 0,
        }))
        : [];

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toISOString(); // Puedes personalizar este método según el formato que necesites
    }



    const sortedFormattedData = formattedData.slice().sort((a: { fecha: number }, b: { fecha: number }) => a.fecha - b.fecha);

    /*  console.log(JSON.stringify(formattedData));
     console.log('Formatted Data:', formattedData); */



    /* Función para formatear números como porcentajes sin decimales y ceros */
    function formatNumber(value: number): string {
        const percentageValue = (value * 100).toFixed(1).replace(/\.0$/, ''); // Elimina el .0
        return `${percentageValue}%`;
    }


    /* prueba de formateo data a legible tooltip */
   /*  function formatNumberTooltip(value: number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
        }
        return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
    } */


    function formatNumberTooltip(value: number): string {
        const percentageValue = (value * 100).toFixed(0); // Multiplica por 100 y redondea
        return `${percentageValue}%`;
    }
    
    


    return (
        <div className='grafica-barcharts-des nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Evaluaciones puntaje crediticio</Typography>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleSelectChange}
                                /*  IconComponent={() => <KeyboardArrowDownIcon />} */

                                sx={{
                                    color: '#9B9EAB', justifyContent: 'flex-end', textAlign: 'end', fill: '#ffffff', '&.MuiSelect-icon': { color: '#FFFFFF !important' },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },

                                }}
                            >
                                <MenuItem value='este_anho'>Este año</MenuItem>
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>
            <ResponsiveStream
                animate={true}
                data={formattedData}
                keys={[
                    'Muy_bajo', 'Bajo', 'Medio', 'Alto',
                ]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,

                    tickValues: sortedFormattedData.length > 0 ?
                        sortedFormattedData.map((item: { id: string }, index: number) => index) : [],

                    format: (index) => {
                        if (sortedFormattedData.length > 0 && index < sortedFormattedData.length) {
                            const { id } = sortedFormattedData[index];
                            const [year, month] = id.split('-');
                            const monthIndex = parseInt(month, 10) - 1;
                            const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

                            return `${monthNames[monthIndex]} ${year}`;
                        }
                        return ''; // Retorna una cadena vacía si no hay datos o el índice es inválido
                    },



                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: 5,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    format: value => formatNumber(value),

                }}
                enableGridY={false}
                curve="catmullRom"              
                offsetType="none"
                borderWidth={2}  // Grosor del borde
                borderColor={{ from: 'color', }}

                colors={['#FF1818', '#FD7F23', '#FFD600', '#00FF29',]} // Define tus propios colores */
                fillOpacity={0.3} 
              /*   
                tooltip={({ node, layer }) => {
                    const formatNumberTooltip = (value: number) => (value * 100).toLocaleString(undefined, { maximumFractionDigits: 1 }) + '%';
                  
                    const altoValue = formatNumberTooltip(node.data.alto);
                    const medioValue = formatNumberTooltip(node.data.medio);
                    const bajoValue = formatNumberTooltip(node.data.bajo);
                    const muyBajoValue = formatNumberTooltip(node.data.muy_bajo);
                  
                    return (
                      <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: 'white' }}>
                        <div>{layer.id}</div>
                        <div>Alto: {altoValue}</div>
                        <div>Medio: {medioValue}</div>
                        <div>Bajo: {bajoValue}</div>
                        <div>Muy Bajo: {muyBajoValue}</div>
                      </div>
                    );
                  }}
                 */
                
                
                
                
                
                
                
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#9B9EAB', // Color del texto en los ejes
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: '#9B9EAB', // Color del texto de las leyendas
                        },
                    },
                    tooltip: {
                        container: {
                            background: 'black', // Fondo del tooltip
                            color: '#9B9EAB', // Color del texto del tooltip
                        },
                    },
                }}
                defs={[
                    {
                        id: 'text',
                        type: 'text',
                        color: 'white',
                    },
                ]}
                dotSize={8}
                dotColor={{ from: 'color' }}
                dotBorderWidth={2}
                dotBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.7
                        ]
                    ]
                }}
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 54,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'square',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemTextColor: '#000000',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default StreamChartComponentL