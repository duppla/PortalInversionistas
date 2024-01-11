'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';



type ItemType = {
    fecha: string;
    rentabilidad: number;
    [key: string]: string | number; // Signatura de índice para permitir otras propiedades
};

type DataType = {
    [key: string]: ItemType[];
};

const BarChartComponentP = () => {

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


   /*  const [data, setData] = useState<DataType | null>(null); */
   const [data, setData] = useState<DataType>({
    ult_12_meses: [],
    este_anho: [],
    ult_6_meses: [],
  });
  
  
    const [responseData, setResponseData] = useState<any>(null);
    const [dataApi, setDataApi] = useState<DataType[]>([]);
    const [selectedDataKey, setSelectedDataKey] = useState<string>('ult_12_meses');
    const [selectedValue, setSelectedValue] = useState<string | number>('ult_12_meses');
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        const queryParameter = getQueryParameter(userEmail);
            const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                const response = await fetch(getApiUrlFinal(`/principal/p?investor=${queryParameter}`), options);
                const responseData = await response.json();

                console.log(responseData + ' data: P verificación');
                if (responseData) {
                    setResponseData(responseData);

                    setData(responseData);
                } else {
                    console.error("La respuesta de la API está vacía o nula.");
                }
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


    const formattedDataa = data && data[selectedDataKey] && data[selectedDataKey].length
    ? data[selectedDataKey].map((item: ItemType) => ({
        fecha: item.fecha,
        Rentabilidad: item.rentabilidad,
      })) as Array<{ fecha: string; Rentabilidad: number }>
    : [];
  
 
    /* Función para formatear números como porcentajes sin decimales y ceros */
    function formatNumber(value: number): string {
        const percentageValue = (value * 100).toFixed(1).replace(/\.0$/, ''); // Elimina el .0
        return `${percentageValue}%`;
    }

    /* prueba de formateo data a legible tooltip */
    function formatNumberTooltip(value: number): string {
        if (value < 1) {
            // Formato para valores menores que 1
            return (value * 100).toFixed(0) + '';
        } else {
            // Formato para valores mayores o iguales a 1
            const suffixes = ['', 'K', 'M', 'B', 'T'];
            const suffixNum = Math.floor(('' + value).length / 3);
            let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

            if (shortValue.endsWith('.0')) {
                shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
            }

            return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
        }
    }


    return (
        <div className='grafica-barcharts nivo-text'>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB', mt: 1 }}>
                        <Grid xs={6} md={6} lg={6}>
                            <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Roboto', color: '#ffffff', fontSize: '26px', mt: 2 }}>Porcentaje de propiedad del portafolio</Typography>
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
                                {/*  <MenuItem value='este_anho'>Este año</MenuItem> */}
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </FormControl>
            </div>

            <ResponsiveBar
                data={formattedDataa}
                keys={['Rentabilidad']}
                innerPadding={4}
              
                indexBy="fecha"
                label={() => ''}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                padding={0.5}
                valueScale={{ type: 'linear', min: 0 }}
                indexScale={{ type: 'band', round: true }}

                colors={['#723DFD', '#28ACFF', '#5ED1B1']} // Define tus propios colores
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#9B9EAB', // Color del texto en los ejes
                            },
                            line: {
                                stroke: '#9B9EAB', // Color de las líneas en los ejes
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

                tooltip={(point) => {
                    if (typeof point.data.fecha === 'string') {
                        const [year, month] = point.data.fecha.split('-');
                        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        const shortYear = year.slice(2); // Obtiene los últimos dos dígitos del año
                        const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                
                        let value: string | number = '';
                        let key: keyof typeof point.data = 'fecha'; // Inicializar con 'fecha'
                
                        // Comprobar si 'Rentabilidad' está definido en point.data
                        if ('Rentabilidad' in point.data) {
                            value = point.data.Rentabilidad;
                            key = 'Rentabilidad'; // Actualizar a 'Rentabilidad'
                        }
                
                        return (
                            <div style={{ background: 'black', padding: '8px', borderRadius: '4px', color: 'white' }}>
                                <strong>{formattedDate}</strong>
                                <div>{key}: {value}%</div>
                            </div>
                        );
                    }
                    return null; // Devolver null si point.data.fecha no es una cadena
                }}
                
                borderRadius={2}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                gridYValues={[0, 0.25, 0.5, 0.75, 1]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    tickValues: formattedDataa.map((item: { fecha: string }) => item.fecha),
                    format: (value) => {
                        const [year, month] = value.split('-');
                        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        /*   return `${monthNames[parseInt(month, 10) - 1]} ${year}`; */
                        const shortYear = year.slice(2); // Obtiene los últimos dos dígitos del año
                        return `${monthNames[parseInt(month, 10) - 1]} ${shortYear}`;
                    },

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: [0, 0.25, 0.5, 0.75, 1],
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    format: value => formatNumber(value),
                }}
                /*   enableGridY={false} */
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
              /*   legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        translateX: 10,
                        translateY: 54,
                        itemsSpacing: 16,
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
                ]} */

                role="application"

                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </div>
    )
}

export default BarChartComponentP
