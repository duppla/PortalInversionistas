import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { DatumValue } from '@nivo/core';

interface Item {
    [key: string]: any;
    fecha: string;
    unidades: number | null;
}


type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

type DataApiType = {
    fecha: string;
    fair_market_price: number;
    valor_contractual: number;
};



const LineChartComponentB = () => {

    const [data, setData] = useState<DataType>({ ult_12_meses: [], este_anho: [], ult_6_meses: [] });
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/b?investor=skandia', options);
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

    /*  función para formateo data según requerimiento d ela gráfica */

    const transformData = (data: DataType, selectedDataKey: string, field: keyof DataApiType) => {
        return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
            x: item.fecha,
            y: item[field],
        }));
    };

/*     const transformedDataContractual = transformData(data, selectedDataKey, 'valor_contractual');
    const transformedDataFairMarket = transformData(data, selectedDataKey, 'fair_market_price'); */


/*     console.log("Transformed data:", transformedDataContractual);
    console.log("Transformed data Market:", transformedDataFairMarket); */


    return (
        <div className='grafica-barcharts nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB', mt: 1 }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography variant="subtitle1" sx={{ color: '#ffffff', }}>Valor de los inmuebles</Typography>
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
            <ResponsiveLine
                axisBottom={{
                    legend: '',
                    legendOffset: -12,
                    tickValues: 'every month',
                    format: (value) => {
                        const date = new Date(value);
                        return `${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`;
                    },
                }}
                axisLeft={{
                    legend: '',
                    legendOffset: 12,
                    tickValues: 5,
                    format: (value) => `${value / 1000000}M`,
                }}
                tooltip={(point) => {
                    const date = new Date(point.point.data.x);
                    const formattedValue = typeof point.point.data.y === 'number' ? `${point.point.data.y / 1000000}M` : 'N/A';
                    return (
                        <div style={{ background: '#272727', color: 'white', padding:  '9px 12px', border: '1px solid #ccc' }}>
                            <div style={{  color: '#C5F5CA' }}><strong>{`Fecha: ${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`}</strong></div>
                            <div style={{  color: '#FF864B' }}>{`Valor: ${formattedValue}`}</div>
                        </div>
                    );
                }}

                curve="monotoneX"

                data={[
                    {
                        data: transformedDataContractual,
                        id: 'Contractual'
                    },
                    {
                        data: transformedDataFairMarket,
                        id: 'Fair Market Price'
                    },

                ]}
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
                            background: '#272727', // Fondo del tooltip
                            color: '#9B9EAB', // Color del texto del tooltip
                        },
                    },
                }}
                colors={['#C5F5CA', '#FF864B']}
                enablePointLabel={false}
                margin={{
                    bottom: 60,
                    left: 80,
                    right: 20,
                    top: 20
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

                yFormat={(value: DatumValue) => typeof value === 'number' ? `${value / 1000000}M` : ''}
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

export default LineChartComponentB;
