'use client'

import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';


type DataApiType = {
    fecha: string;
    unidades: number;
};


type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/h2?investor=skandia', options);
                const data = await response.json();
                setData(data);
                handleDataSelection(selectedValue.toString());
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedValue]);

    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKey(dataKey);
    };

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
                    format: '%b %d',
                    /*  legend: 'time scale', */
                    legendOffset: -12,
                    tickValues: 'every month'
                }}
                axisLeft={{
                    /*  legend: 'linear scale', */
                    legendOffset: 12,
                     
                    
                }}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#9B9EAB' // Cambia aquí al color que desees para el texto de las marcas en el eje Y
                            }
                        }
                    }
                }}
                lineWidth={6}                           

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
                    type: 'linear'
                }}
            />
        

        </div>
    );
};

export default LineChartComponentH2;
