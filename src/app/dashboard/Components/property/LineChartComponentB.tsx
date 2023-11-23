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
    fair_market_price?: number;
    valor_contractual?: number;
}


const RechartsExample: React.FC = () => {

  
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');

    const [dataApi, setDataApi] = useState<{ [key: string]: DataApiType[] }>({});
    const [selectedOption, setSelectedOption] = useState<string>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(
                    'https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/b?investor=skandia',
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
        fair_market_price: item.fair_market_price || null,
        valor_contractual: item.valor_contractual || null,
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
                            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Flujo real vs. flujo esperado desglose</Typography>
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

            <ResponsiveContainer className='ChartContainerSizeManager' width="100%" height={480} style={{ margin: 'auto' }}>

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
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />

                    <YAxis tickFormatter={(value) => `${(Number(value) / 1000000).toFixed(0)}M`} />

                    <Tooltip
                        contentStyle={{ backgroundColor: 'black', border: 'none', color: 'white' }}

                        formatter={(value, name, props) => {
                            return [`${(Number(value) / 1000000).toFixed(0)}M`, name];
                        }}
                    />

                    <Line connectNulls type="monotone" dataKey="fair_market_price" stroke="#FF864B" name="Fair market price" animationDuration={1500} />
                    <Line connectNulls type="monotone" dataKey="valor_contractual" stroke="#C5F5CA" name="Valor Contractuals" animationDuration={1500} />

                </LineChart>

            </ResponsiveContainer>
        </Box>
    );
};

export default RechartsExample;

