'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


type DataApiType = {
    fecha: string;
    clientes: any;
    duppla: any;
    inversionistas: any;
};

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};


type ItemType = {
    fecha: string;
    clientes: number;
    duppla: number;
    inversionistas: number;
    // otras propiedades que los objetos en dataApi pueden tener...
}
const BarChartComponentA2 = () => {

    const [data, setData] = useState<DataType | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(`https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/e?investor=skandia`, options);
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

    const colors: Record<string, string> = {
        clientes: '#28ACFF',
        duppla: '#5ED1B1',
        inversionistas: '#723DFD',
    };


    /* data del enpoint para renderizar la grafica por un map */

    const formattedDataa = responseData
        ? responseData[selectedDataKey].map((item: ItemType) => ({
            fecha: item.fecha,
            clientes: item.clientes,
            duppla: item.duppla,
            inversionistas: item.inversionistas,
        }))
        : [];

    const keys = ['duppla', 'clientes', 'inversionistas'];




    /* prueba de formateo data a legible */

    /*  function formatNumber(value: number): string {
       const suffixes = ['', 'K', 'M', 'B', 'T'];
       const suffixNum = Math.floor(('' + value).length / 3);
       let shortValue = (suffixNum !== 0 ? (value / Math.pow(1, suffixNum)) : value).toFixed(1);
   
       if (shortValue.endsWith('.0')) {
         shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
       }
   
       return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
     } */
    function formatNumber(value: number): string {
        if (value < 1) {
            // Formato para valores menores que 1
            return (value * 100).toFixed(0) + '';
        } else {
            // Formato para valores mayores o iguales a 1
            const suffixes = ['', 'K', 'M', 'B', 'T'];
            const suffixNum = Math.floor(('' + value).length / 3);
            let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

            if (shortValue.endsWith('.0')) {
                shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
            }

            return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
        }
    }

    /* prueba de formateo data a legible tooltip */
    function formatNumberTooltip(value: number): string {
        if (value < 1) {
            // Formato para valores menores que 1
            return (value * 100).toFixed(0) + '';
        } else {
            // Formato para valores mayores o iguales a 1
            const suffixes = ['', 'K', 'M', 'B', 'T'];
            const suffixNum = Math.floor(('' + value).length / 3);
            let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

            if (shortValue.endsWith('.0')) {
                shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
            }

            return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
        }
    }




    return (
        <div className='grafica-barcharts nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB', mt:1 }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Porcentaje de propiedad del portafolio</Typography>
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

            <ResponsiveBar
                data={formattedDataa}
                keys={['inversionistas', 'clientes', 'duppla']}
                indexBy="fecha"
                label={() => ''}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear', min: 0 }}
                indexScale={{ type: 'band', round: true }}
                colors={['#723DFD', '#28ACFF', '#5ED1B1']} // Define tus propios colores
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

                tooltip={({ id, value, color }) => (
                    <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: '#9B9EAB' }}>
                        <strong >
                            {id}: {formatNumberTooltip(value)}
                        </strong>

                    </div>
                )}

                borderRadius={2}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: value => {
                        // Puedes personalizar el formato de los ticks si es necesario
                        // Por ejemplo, para mostrar "Ene", "Feb", "Mar"...
                        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        return months[value - 1]; // Restar 1 porque los meses generalmente van de 1 a 12
                    }

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    format: value => formatNumber(value),

                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]

                    }
                ]}

                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />







        </div>
    )
}

export default BarChartComponentA2

