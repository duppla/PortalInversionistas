'use client'

import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { getApiUrl } from '@/app/url/ApiConfig';


type DataApiType = {
    fecha: string;
    unidades: number;
};

type DataType = {
    ult_12_meses: any[];
    este_anho: any[];
    ult_6_meses: any[];
    [key: string]: any;
};


interface Item {
    [key: string]: any;
    fecha: string;
    unidades: number | null;
}

const LineChartComponentH2 = () => {
    const [data, setData] = useState<DataType>({ ult_12_meses: [], este_anho: [], ult_6_meses: [] });
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');

    const [transformedData, setTransformedData] = useState<{ x: string; y: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrl('/inmuebles/h2?investor=skandia'), options);
                const newData = await response.json();

                setData((prevData) => {
                    const updatedData = { ...prevData };
                    updatedData[selectedValue.toString()] = newData[selectedValue.toString()];
                    return updatedData;
                });

                handleDataSelection(selectedValue.toString());
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedValue]);

    useEffect(() => {
        // Actualización de datos de gráfico aquí
        const transformedData = tranformeDataApi(data, selectedDataKey);
        setTransformedData(transformedData);
    }, [data, selectedDataKey]);

    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKey(dataKey);
    };

    /* Función dropdown */
    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const selectedOption = event.target.value as string;
        setSelectedValue(selectedOption);
        handleDataSelection(selectedOption);

    };

    const tranformeDataApi = (data: DataType, selectedDataKey: string) => {
        return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
            x: item.fecha,
            y: item.unidades,
        }));
    };

    const tranformedData = tranformeDataApi(data, selectedDataKey);

    return (
        <div className='grafica-Linecharts'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Número de unidades</Typography>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleSelectChange}
                                sx={{
                                    color: '#9B9EAB',
                                    justifyContent: 'flex-end',
                                    textAlign: 'end',
                                    fill: '#ffffff',
                                    '&.MuiSelect-icon': { color: '#FFFFFF !important' },
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

            <ResponsiveLine
                animate
                axisBottom={{
                    legend: '',
                    legendOffset: -12,
                    tickValues: 'every month',
                    format: (value) => {
                        const date = new Date(value);
                        const month = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
                        return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear().toString().slice(2)}`;
                        /* return `${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`; */
                    },
                }}
                axisLeft={{
                    /*  legend: 'linear scale', */
                    legendOffset: 12,
                    tickValues: [ 5, 15, 25, 35],
                }}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#9B9EAB' // Cambia aquí al color que desees para el texto de las marcas en el eje Y
                            }
                        }
                    },
                    grid: {
                        line: {
                            stroke: '#41434C' /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
                        },
                    },
                }}
                lineWidth={7}
                tooltip={(point) => {
                    const date = new Date(point.point.data.x);

                    return (
                        <div style={{ background: '#272727', color: '#5ED1B1', padding: '9px 12px', border: '1px solid #ccc' }}>
                            <div ><strong>{`Fecha: ${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`}</strong></div>
                            <div >{`Unidades: ${point.point.data.y}`}</div>

                        </div>
                    );
                }}
                enableGridX={false}
                gridYValues={[5, 15, 25, 35]} 
              
                curve="monotoneX"
                data={[
                    {
                        data: tranformedData,

                        id: 'Unidades'
                    }
                ]}
                colors={['#5ED1B1']}
                enablePointLabel={false}

                margin={{
                    bottom: 60,
                    left: 50,
                    right: 20,
                    top: 40
                }}
                pointBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.3
                        ]
                    ]
                }}
                pointBorderWidth={1}
                pointSize={16}
                pointSymbol={function noRefCheck() { }}
                useMesh

                xFormat="time:%Y-%m-%d"
                xScale={{
                    format: '%Y-%m-%d',
                    precision: 'day',
                    type: 'time',
                    useUTC: false
                }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,



                }}

            />


        </div>
    );
};

export default LineChartComponentH2;
