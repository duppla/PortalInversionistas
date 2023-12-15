'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getApiUrl } from '@/app/url/ApiConfig';


type DataApiType = {
    fecha: string;
    pagado: any;
    mora: any;

};

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};


function BarChartComponentO() {

    const [data, setData] = useState<DataType | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrl(`/clientes/o?investor=skandia`), options);
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

    /* data del enpoint para renderizar la grafica por un map */

    const formattedData = responseData
        ? responseData[selectedDataKey].map((item: { fecha: string; pagado: number; mora: number; }) => ({
            fecha: item.fecha,
            'Pago a tiempo': item.pagado,  // Solo valores positivos o cero
            'En mora': -Math.abs(item.mora)    // Solo valores negativos
        }))
        : [];


    /*   console.log(JSON.stringify(formattedData)); */

    /* prueba de formateo data a legible */

    function formatNumber(value: number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
        }

        return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');


    }

    /* prueba de formateo data a legible tooltip */
    function formatNumberTooltip(value: number): string {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixNum = Math.floor(('' + value).length / 3);
        let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

        if (shortValue.endsWith('.0')) {
            shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
        }

        return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
    }



    return (
        <div className='grafica-barcharts-des nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Default de pagos</Typography>
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
                data={formattedData}
                keys={['Pago a tiempo', 'En mora']}
                indexBy="fecha"
                label={() => ''}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                padding={0.4}
                colors={['#12CA98', '#E54B2E',]}
                /*  enableGridY={false} */

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
                    grid: {
                        line: {
                            stroke: '#41434C' /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
                        },
                    },
                }}

                /* valueFormat={(v) => (typeof v === 'number' ? v.toString() : '')} */
                valueFormat={(v) => (typeof v === 'number' ? Math.abs(v).toString() : '')} // Convertir valores a positivos antes de formatear
                gridYValues={[-1000000, -3000000, -5000000, -7000000,  0, 1000000, 3000000, 5000000, 7000000]} 
                axisLeft={{
                    tickSize: 2,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: [-1000000, -3000000, -5000000, -7000000,  0, 1000000, 3000000, 5000000, 7000000 ],
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    format: value => formatNumber(value),

                }}
                tooltip={(point) => {
                    if (typeof point.data.fecha === 'string') {
                        const [year, month] = point.data.fecha.split('-');
                        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                        const formattedValue = formatNumberTooltip(Number(point.data[point.id]));

                        return (
                            <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: 'white' }}>
                                <strong>{formattedDate}</strong>
                                <div>{point.id}: {formattedValue}</div>
                            </div>
                        );
                    }
                    return null; // Devolver null si point.data.fecha no es una cadena
                }}

                borderRadius={4}
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
                    tickValues: formattedData.map((item: { fecha: string }) => item.fecha),
                    format: (value) => {
                        const [year, month] = value.split('-');
                        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        const shortYear = year.slice(2); // Obtiene los últimos dos dígitos del año
                        return `${monthNames[parseInt(month, 10) - 1]} ${shortYear}`;
                    },

                }}

                labelSkipWidth={12}
                labelSkipHeight={12}
                layout="vertical"
                groupMode="stacked"

                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 54,
                        itemsSpacing: 20,
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

export default BarChartComponentO