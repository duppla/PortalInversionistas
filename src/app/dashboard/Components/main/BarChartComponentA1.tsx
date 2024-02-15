'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';



import { useAuth } from '../../../context/authContext';
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';




type DataApiType = {
    fecha: string;
    flujo_real: any;
    flujo_esperado: any;
};

type DataType = {
    ult_12_meses: DataApiType[];
    este_anho: DataApiType[];
    ult_6_meses: DataApiType[];
};

type ItemType = {
    fecha: string;
    flujo_real: number;
    flujo_esperado: number;
};
function BarChart() {

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

    const [data, setData] = useState<DataType | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKeyA, setSelectedDataKeyA] = useState<string>('ult_12_meses');
    const [selectedValue, setSelectedValue] = useState<string | number>('ult_12_meses');
    const [menuOpen, setMenuOpen] = useState(false);

    const [gridYValues, setGridYValues] = useState<number[]>([]);
    const [tickValues, setTickValues] = useState<number[]>([]);

    useEffect(() => {
      
        const queryParameter = getQueryParameter(userEmail);
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };              
                const response = await fetch(getApiUrlFinal(`/principal/a?investor=${queryParameter}`), options);
                const responseData = await response.json();
                setResponseData(responseData);
                setData(responseData); // Actualiza los datos cuando la respuesta de la API llega
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userEmail]);

    /* Función para actualizar la selección del usuario */
    const handleDataSelection = (dataKey: string) => {
        setSelectedDataKeyA(dataKey);
    };

    /* Función que controla la selección del dropdown */
    const handleSelectChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {
        const selectedDataKeyA = event.target.value as string;
        setSelectedValue(selectedDataKeyA);
        handleDataSelection(selectedDataKeyA);
    };


  const getDataForSelectedKey = (): ItemType[] => {
        if (!responseData) return [];

        switch (selectedDataKeyA) {
            case 'ult_12_meses':
                return responseData.ult_12_meses;
         case 'este_anho':
                return responseData.este_anho; 
            case 'ult_6_meses':
                return responseData.ult_6_meses;
            default:
                return [];
        }
    };

   const formattedData = responseData
        ? responseData[selectedDataKeyA]
            ? responseData[selectedDataKeyA].map((item: ItemType) => {

                return {
                    fecha: item.fecha,
                    Real: item.flujo_real, // Cambia la leyenda de flujo_real a Flujo
                    Esperado: item.flujo_esperado, // Cambia la leyenda de flujo_esperado a Esperado
                    
                };
            })
            : []
        : [];



    /* prueba de formateo data a legible */

    function formatNumber(value: number): string {

        return (value/1000000).toFixed(0) + " M";
    }

    /* prueba de formateo data a legible tooltip */
    function formatNumberTooltip(value: number): string {
        if (value === undefined) {
            return 'N/A'; // Manejar el caso cuando el valor es undefined
        }
        var millones = (Math.abs(value)/1000000).toFixed(1);
        var shortValue = millones.endsWith('.0')? millones.slice(0, -2): millones;

        return shortValue + " M";
    }


    useEffect(() => {
        const dataForSelectedKey = getDataForSelectedKey();
        const { gridYValues, tickValues } = calculateAxisValues(dataForSelectedKey);
        setGridYValues(gridYValues);
        setTickValues(tickValues);
    }, [selectedDataKeyA, responseData]);


    /* Función para calcular los valores de los ejes */
    const calculateAxisValues = (data: ItemType[]) => {
        const maxValue = Math.max(...data.map(item => Math.max(item.flujo_real, item.flujo_esperado)));
        const numTicks = 5;

        // Lógica para el resto de los casos
        const step = maxValue / (numTicks - 1);

        // Calcular dinámicamente los valores para gridYValues y tickValues
        const gridYValues = Array.from({ length: numTicks }, (_, index) => {
            const tickValue = index * step;
            return Math.round(tickValue);
        });

        // Asegurarse de que 0 esté incluido
        if (!gridYValues.includes(0)) {
            gridYValues.unshift(0);
        }

        return { gridYValues, tickValues: gridYValues };
    };


    /* Mensaje para el tooltip explicativo */
    const longText = `Nota: 'Flujo Real' se refiere a los ingresos generado durante el periodo elegido, mientras que 'Flujo Esperado' alude a las proyecciones de ingreso para el mismo intervalo.
      `;
      

    return (
        <div className='grafica-barcharts nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Grid container >
                                <Grid xs={8} sm={8} md={8} lg={8}>
                                    <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Flujo real vs. flujo esperado </Typography>
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
                                /*  IconComponent={() => <KeyboardArrowDownIcon />} */

                                sx={{
                                    color: '#9B9EAB', justifyContent: 'flex-end', textAlign: 'end', fill: '#ffffff', '&.MuiSelect-icon': { color: '#FFFFFF !important' },
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
                                {/* <MenuItem value='este_anho'>Este año</MenuItem> */}
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>
            {data == null?<div></div>:
            <ResponsiveBar
                data={formattedData}
                keys={['Real', 'Esperado']}
                indexBy="fecha"
                label={() => ''}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                padding={0.7}
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['#6C6FFF', '#C5F5CA']} // Define tus propios colores
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
                fill={[
                    {
                        match: {
                            id: 'Real',
                        },
                        id: 'Real',
                    },
                    {
                        match: {
                            id: 'Esperado',
                        },
                        id: 'Esperado',
                    },
                ]}
                borderRadius={3}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.4
                        ]
                    ]
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
                        if (typeof value === 'string') {
                          const [year, month] = value.split('-');
                          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                          const shortYear = year.slice(2); // Obtiene los últimos dos dígitos del año
                          return `${monthNames[parseInt(month, 10) - 1]} ${shortYear}`;
                        } else {
                          return value; // O proporciona un valor predeterminado si no es una cadena
                        }
                      },
                }}
                gridYValues={gridYValues}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: tickValues,
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
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 54,
                        itemsSpacing: 0,
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
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />}
        </div>
    )
    
}

export default BarChart


