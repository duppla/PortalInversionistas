import React from 'react'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResponsivePie } from '@nivo/pie'



type DataApiType = {
    [key: string]: number;
    en_mora: number;
    a_tiempo: number;
    total: number;
};

/* type DataType = {
    ult_12_meses: DataApiType;
    este_anho: DataApiType;
    ult_6_meses: DataApiType;
}; */
type DataType = {
    [key: string]: any;
};

type ItemType = {
    id: string;
    label: string;
    value: number;
};
type MayHaveLabel = {
    id: string;
    label: string;
    value: number;
};

function PieChartComponentG1() {


    const [responseData, setResponseData] = useState<DataType>({
        ult_12_meses: { en_mora: 0, a_tiempo: 0, total: 0 },
        este_anho: { en_mora: 0, a_tiempo: 0, total: 0 },
        ult_6_meses: { en_mora: 0, a_tiempo: 0, total: 0 },
    });
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(`https://salesforce-gdrive-conn.herokuapp.com/inversionistas/main/g1?investor=skandia`, options);
                const responseData = await response.json();

                if (responseData) {
                    setResponseData(responseData);
                } else {
                    console.error('Respuesta de la API vacía');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


/* Itera la data para mostrarla y elemina el campo total */
    const formattedDataPie: MayHaveLabel[] = responseData
        ? Object.keys(responseData[selectedDataKey])
            .filter((key) => key !== 'total')
            .map((key: string) => {
                const item = responseData[selectedDataKey][key];
                return {
                    id: key,
                    label: key,
                    value: item,
                };
            })
        : [];

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


   /*  console.log('formattedDataPie', formattedDataPie); */





    return (
        <div className='grafica-piecharts ' >
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Pagos recibidos</Typography>
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

            {formattedDataPie.length > 0 && (

                <ResponsivePie
                    data={formattedDataPie}
                    margin={{ top: 40, right: 80, bottom: 80, left: -20 }}
                    startAngle={0}
                    innerRadius={0.7}
                    padAngle={1}
                    activeInnerRadiusOffset={3}
                    activeOuterRadiusOffset={8}
                    colors={['#6C9FFF', '#BAFCC5',]}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            ['darker', 0.2]
                        ]
                    }}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    enableArcLabels={false}
                    arcLabelsRadiusOffset={0.1}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            ['darker', 2]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}

                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: 68,
                            translateY: 1,
                            itemsSpacing: 7,
                            itemWidth: 111,
                            itemHeight: 35,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 17,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />


            )}



        </div>
    )
}

export default PieChartComponentG1