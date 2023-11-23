'use client'

import React, { useEffect, useState, PureComponent, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface DataItem {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

interface LabelProps {
    x: number;
    y: number;
    stroke: string;
    value: number;
}

interface AxisTickProps {
    x: number;
    y: number;
    stroke: string;
    payload: { value: string };
}

interface DataApiType {
    fecha: string;
    unidades?: number;
    
}

const LineChartComponentH2: React.FC = () => {

  
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');

    const [dataApi, setDataApi] = useState<{ [key: string]: DataApiType[] }>({});
    const [selectedOption, setSelectedOption] = useState<string>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(
                    'https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/h2?investor=skandia',
                    options
                );
                const data = await response.json();
                setDataApi(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


/*     const transformedData = dataSource.map((item) => ({
        fecha: new Date(item.fecha).toLocaleDateString(),
        fair_market_price: item.fair_market_price,
        valor_contractual: item.valor_contractual,
    })); */

    const transformedData = dataApi[selectedOption]?.map((item) => ({
        fecha: new Date(item.fecha).toLocaleDateString(),
        unidades: item.unidades || null,
        
    })) || [];


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

/*     console.log(JSON.stringify(transformedData) + 'transformedData'); */


    return (
        <Box>
            <div>
                <FormControl fullWidth sx={{marginBottom:'40px'}}>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Número de unidades</Typography>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedOption}
                                label="Age"
                                onChange={(event) => {
                                    const selectedOption = event.target.value as string;
                                    setSelectedOption(selectedOption);
                                }}
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

            <ResponsiveContainer className='ChartContainerSizeManager' width="100%" height={360} style={{ margin: 'auto' }}>

                <LineChart
                    width={1000}
                    height={300}
                    data={transformedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="6 6" /* vertical={false} */ />
                    <XAxis dataKey="fecha" height={80} tickFormatter={(fecha) => fecha} />
                    <YAxis tickFormatter={(value) => `${value}`} />
                    <YAxis tickFormatter={(value) => `${(value)}`} />

                    <Tooltip
                        contentStyle={{ backgroundColor: 'black', border: 'none', color: 'white' }}

                        formatter={(value, name, props) => {
                            return [`${(value)}`, name];
                        }}
                    />

                    <Line connectNulls type="monotone" dataKey="unidades" stroke="#5ED1B1" name="unidades" animationDuration={1500} />
                   

                </LineChart>

            </ResponsiveContainer>
        </Box>
    );
};

export default LineChartComponentH2;
