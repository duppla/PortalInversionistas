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


type DataApiType = {
    fecha: string;
    rentabilidad: number;
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
    rentabilidad: number | null;
}

const LineChartComponentP = () => {
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
                const response = await fetch(getApiUrlFinal(`/principal/p?investor=${queryParameter}`), options);

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
        const units = data[selectedDataKey].map((item: any) => parseFloat(item.rentabilidad));

        if (units.length > 0) {
            const maxYValue = Math.max(...units);
            const minYValue = Math.min(...units);

            const yStep = (maxYValue - minYValue) / 3;
            const yAxisValues = Array.from({ length: 4 }, (_, index) => {
                const value = minYValue + index * yStep;
                return value;
            });

            setYAxisValues(yAxisValues);
        } else {
            // Si no hay datos, establecer valores predeterminados o manejar la situación de otra manera
            setYAxisValues([0, 0.2, 0.4, 0.6, 0.8, 1.0]);  // Cambia estos valores según tus necesidades
        }
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
            y: item.rentabilidad,
        }));
    };

    const tranformedData = tranformeDataApi(data, selectedDataKey);

  
      
      

    return (
        <div className='grafica-Linecharts'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Rentabilidad mensual del portafolio</Typography>

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

                    enableGridX={true}
                    gridYValues={yAxisValues}

                    /*  gridYValues={[5, 15, 25, 35]}  */
                    axisLeft={{
                        /*  legend: 'linear scale', */
                        legendOffset: 12,
                        tickValues: yAxisValues,
                        format: (tick) => `${(tick * 100).toFixed(2)}%`,
                        /*  format: (tick) => `${(Math.round(tick * 100) / 100).toFixed(2)}%`, */ // Redondear a dos decimales
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
                    lineWidth={4}
                    tooltip={(point) => {
                        const date = new Date(point.point.data.x);
                        const formattedY = (typeof point.point.data.y === 'number')
                            ? `${(point.point.data.y * 100).toFixed(2)}%`  // Multiplica por 100 y agrega el símbolo de porcentaje
                            : point.point.data.y;

                        return (
                            <div style={{ background: '#272727', color: '#5ED1B1', padding: '9px 12px', border: '1px solid #ccc' }}>
                                <div><strong>{`Fecha: ${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`}</strong></div>
                                <div>{`Rentabilidad: ${formattedY}`}</div>
                            </div>
                        );
                    }}
                    curve="monotoneX"
                    data={[
                        {
                            data: tranformedData,
                            id: 'Rentabilidad'
                        }
                    ]}
                    colors={['#5ED1B1']}
                    enablePointLabel ={false} 
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
                    pointBorderWidth={6}
                    enablePoints={true} // Habilitar la visualización de puntos
                    pointSize={6} // Tamaño de los puntos
                    pointColor={['#5ED1B1']} // Color de los puntos
                    useMesh={true} // Usar una malla para mejorar la renderización
                    pointSymbol={function noRefCheck() { }}
                    xFormat="time:%Y-%m-%d"
                    xScale={{
                        format: '%Y-%m-%d',
                        precision: 'month',
                        type: 'time',
                        useUTC: false
                    }}
                                  
                      
                   /*  markers={[
                        {
                          axis: 'y',
                          value: 0.0069725101569419095,
                          lineStyle: { stroke: 'red', strokeWidth: 1 },
                          legend: 'Punto Específico'
                        }
                      ]} */
                  /*     enableSlices="x"                     
                      layers={[
                        'grid',
                        'markers',
                        'areas',
                        function noRefCheck(){},
                        'lines',
                        'slices',
                        'axes',
                        'points',
                        'legends'
                      ]}
                    
                      pointLabelYOffset={-20} */
                    
                 
                   
                      
                    /*   xScale={{ type: 'point' }} */
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false,
                    }}

                /*  yFormat=" >-.2f" */

                />
            )}

        </div>

    );
};

export default LineChartComponentP;
