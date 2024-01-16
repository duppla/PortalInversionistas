'use client'

import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { FormControl, Typography, Select, MenuItem } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';


type DataApiType = {
    fecha: string;
    tasa_morosidad: number;
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
    tasa_morosidad: number | null;
}

const LineChartComponentG1 = () => {
    const { userEmail } = useAuth();
    const getQueryParameter = (userEmail: string | null): string => {
        if (!userEmail) {
            // En caso de que el correo electrónico no esté disponible
            return "";
        }
        // Verifica el correo electrónico y devuelve el parámetro de consulta correspondiente
        if (userEmail === "fcortes@duppla.co") {
            return "skandia";
        } else if (userEmail === "aarevalo@duppla.co") {
            return "weseed";
        } else if (userEmail === "scastaneda@duppla.co") {
            return "disponible";
        }
        // En caso de que el correo electrónico no coincida con ninguno de los casos anteriores
        return "";
    };

    const [data, setData] = useState<DataType>({ ult_12_meses: [], este_anho: [], ult_6_meses: [] });
    const [selectedDataKey, setSelectedDataKey] = useState<string>('ult_12_meses');
    const [selectedValue, setSelectedValue] = useState<string | number>('ult_12_meses');

    const [transformedData, setTransformedData] = useState<{ x: string; y: number }[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [yAxisValues, setYAxisValues] = useState<number[]>([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const queryParameter = getQueryParameter(userEmail);
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrlFinal(`/principal/g1?investor=${queryParameter}`), options);

                const newData = await response.json();

                setData((prevData) => {
                    const updatedData = { ...prevData };
                    updatedData[selectedValue.toString()] = newData[selectedValue.toString()];
                    return updatedData;
                });

                handleDataSelection(selectedValue.toString());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        setLoading(true); // Iniciar la carga
        fetchData();
    }, [selectedValue]);



    useEffect(() => {
        const units = data[selectedDataKey].map((item: any) => parseFloat(item.tasa_morosidad));
        if (units.length > 0) {
            const maxYValue = Math.max(...units);
            const minYValue = Math.min(...units);

            const yStep = (maxYValue - minYValue) / 4;
            const yAxisValues = Array.from({ length: 5 }, (_, index) => {
                const roundedValue = minYValue + index * yStep;
                return parseFloat(roundedValue.toFixed(2)); // Redondear a dos decimales
            });

            setYAxisValues(yAxisValues);
        } else {
            // Si no hay datos, establecer valores predeterminados o manejar la situación de otra manera
            setYAxisValues([0, 0.2, 0.4, 0.6, 0.8, 1.0]);  // Cambia estos valores según tus necesidades
        }
    }, [data, selectedDataKey]);

    const tranformeDataApi = (data: DataType, selectedDataKey: string) => {
        return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
            x: item.fecha,
            y: parseFloat(item.tasa_morosidad.toString()), // Asegurar que tasa_morosidad sea interpretado como string
        }));
    };


    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKey(dataKey);
    };

    /* Función dropdown */
    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const selectedOption = event.target.value as string;
        setSelectedValue(selectedOption);
        handleDataSelection(selectedOption);

    };

    /*    const tranformeDataApi = (data: DataType, selectedDataKey: string) => {
           return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
               x: item.fecha,
               y: item.tasa_morosidad,
           }));
       }; */

    /*    const tranformeDataApi = (data: DataType, selectedDataKey: string) => {
           return (data[selectedDataKey as keyof DataType] as DataApiType[]).map((item) => ({
               x: item.fecha,
               y: parseFloat(item.tasa_morosidad.toString()), // Asegurar que tasa_morosidad sea interpretado como string
               roundedY: yAxisRoundWithDynamicDecimals(parseFloat(item.tasa_morosidad.toString())),
           }));
       };
    */

    const tranformedData = tranformeDataApi(data, selectedDataKey);
    /*   console.log('tranformedData:', tranformedData); */

    /* Mensaje para el tooltip explicativo */
    const longText = `
    Nota: Los valores mostrados en esta gráfica se encuentran en un rango de 9% a 52% para facilitar su legibilidad. Verifique la escala para una interpretación precisa.`;

    return (
        <div className='grafica-Linecharts-G'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} sm={6} md={6} lg={6} >
                            <Grid container >
                                <Grid xs={10} sm={10} md={10} lg={10}>
                                    <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Histórico tasa de mora</Typography>
                                </Grid>
                                <Grid xs={2} sm={2} md={2} lg={2}>
                                    <Tooltip title={longText}>
                                        <InfoIcon sx={{ color: '#757575', fill: '#757575', marginTop: '28px', height: '12px', width: '12px', marginLeft: '10px' }} />
                                    </Tooltip>
                                </Grid>
                            </Grid>

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
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    /*   getContentAnchorEl: null, */
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#212126', // Fondo del menú desplegado
                                            border: '1px solid #5682F2', // Borde azul
                                            color: '#9B9EAB', // Letra blanca
                                        },
                                    },
                                }}
                                open={menuOpen}
                                onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
                                onOpen={() => setMenuOpen(true)}   // Abre el menú cuando se hace clic en el botón

                                IconComponent={() => (
                                    // Cambia el ícono según el estado del menú
                                    menuOpen ? (
                                        <ArrowDropUpIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    ) : (
                                        <ArrowDropDownIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    )
                                )}
                            >
                                {/*   <MenuItem value='este_anho'>Este año</MenuItem> */}
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>
            <br />
            {loading && <Typography sx={{ color: '#212126' }}>Cargando...</Typography>}
            {!loading && (


                <ResponsiveLine
                  
                    data={[
                        {
                            data: tranformedData,
                            id: 'Unidades'
                        }
                    ]}
                    colors={['#5ED1B1']}
                    xFormat="time:%Y-%m-%d"
                    margin={{
                        bottom: 60,
                        left: 50,
                        right: 20,
                        top: 40
                    }}
                    xScale={{
                        format: '%Y-%m-%d',
                        precision: 'month',
                        type: 'time',
                        useUTC: false
                    }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false,
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        legend: '',
                        legendOffset: -12,
                        tickValues: 'every month',
                        format: (value) => {
                            const date = new Date(value);
                            const month = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
                            return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear().toString().slice(2)}`;

                        },
                    }}
                    axisLeft={{
                        /*  legend: 'linear scale', */
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 12,
                        tickValues: yAxisValues,
                        /* tickValues: [ 0.15, 0.25, 0.35, 0.45, 0.55,], */
                        format: (tick) => `${(tick * 100).toFixed(0)}%`,
                    }}
                    enableGridX={false}
                    gridYValues={yAxisValues}
                    lineWidth={7}
                    pointLabel="y"
                    enablePoints={false}
                    pointLabelYOffset={-12}
                    pointBorderWidth={2}
                    pointSize={10}
                    pointSymbol={function noRefCheck() { }}
                    pointColor={{ theme: 'background' }}
                    pointBorderColor={{ from: 'serieColor' }}
                    enablePointLabel={true}
                    useMesh={true}
                    legends={[]}
                                     
                    tooltip={(point) => {
                        const date = new Date(point.point.data.x);
                        const formattedY = (typeof point.point.data.y === 'number')
                            ? `${(point.point.data.y * 100).toFixed(0)}%`  // Multiplica por 100 y agrega el símbolo de porcentaje
                            : point.point.data.y;

                        return (
                            <div style={{ background: '#272727', color: '#5ED1B1', padding: '9px 12px', border: '1px solid #ccc' }}>
                                <div><strong>{`Fecha: ${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`}</strong></div>
                                <div>{`Tasa Morosidad: ${formattedY}`}</div>
                            </div>
                        );
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

                />
            )}

        </div>

    );
};

export default LineChartComponentG1;
