import React from 'react'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResponsivePie } from '@nivo/pie'
import { getApiUrl, getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';


type DataType = {
    [key: string]: any;
};

const PieChartComponentK2 = () => {
    console.log = () => {};

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
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');
    const [menuOpen, setMenuOpen] = useState(false);

    const [responseData, setResponseData] = useState<any>({});



    useEffect(() => {
        const queryParameter = getQueryParameter(userEmail);
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                /* const response = await fetch(getApiUrl(`/clientes/k2?investor=skandia`), options); */
                const response = await fetch(getApiUrlFinal(`/clientes/k2?investor=${queryParameter}`), options);
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


    const getColorByKey = (key: string): string => {
        switch (key) {
            case 'a_tiempo':
                return 'green';
            case 'en_mora':
                return 'red';
            default:
                return 'gray';
        }
    };


    const excludedKeys = ['total', 'porcent_0_33', 'porcent_33_66', 'porcent_66_100'];
    const formattedDataPie = responseData
        ? responseData[selectedDataKey]
            ? Object.keys(responseData[selectedDataKey])
                .filter((key) => !excludedKeys.includes(key)) // Filtra la categoría 'total'
                .map((key: string) => {
                    const item = responseData[selectedDataKey][key];
                    let categoryLabel = key;

                    // Personaliza los nombres de las categorías
                    if (key === 'entre_0_33') {
                        categoryLabel = 'Entre 0% y 33%';
                    } else if (key === 'entre_33_66') {
                        categoryLabel = 'Entre 33% y 66%';
                    } else if (key === 'entre_66_100') {
                        categoryLabel = 'Entre 66% y 99%';
                    }

                    return {
                        id: key,
                        label: categoryLabel,
                        value: item,
                        formattedValue: `${item}`,
                        color: getColorByKey(key), // Reemplaza getColorByKey con tu lógica de asignación de colores
                    };
                })
            : []
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

 /*    console.log(JSON.stringify(responseData) + ' componente piechart'); */
    const categoryToPercentageMapping = {
        "Entre 15% y 30%": "porcent_0_33",
        "Entre 30% y 40%": "porcent_33_66",
        "Mayor a 40%": "porcent_66_100",
    };


    return (
        <div className="grafica-piecharts" style={{ position: 'relative', width: '100%', height: '380px' }}>
            <div>
                <FormControl fullWidth>
                    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                        <Grid xs={6} md={6} lg={6}>

                            <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Porcentaje ownership</Typography>

                        </Grid>
                        {/*    <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
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
                                    style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft:'-20px' }}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                  />
                                ) : (
                                  <ArrowDropDownIcon
                                    style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft:'-20px' }}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                  />
                                )
                              )}
                        >
                            <MenuItem value='este_anho'>Este año</MenuItem>
                            <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                            <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                        </Select>
                    </Grid> */}
                    </Grid>
                </FormControl>
            </div>

            {formattedDataPie.length > 0 && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <ResponsivePie
                        data={formattedDataPie}
                        margin={{ top: 40, right: 80, bottom: 80, left: -40 }}
                        startAngle={0}
                        innerRadius={0.7}
                        padAngle={1}
                        activeInnerRadiusOffset={3}
                        activeOuterRadiusOffset={8}
                        colors={['#5782F2', '#FFB024', '#5ED1B1']}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        /* animate={false} */
                        /*  motionConfig="gentle"  */
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
                            modifiers: [['darker', 2]],
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            },
                        ]}
                        tooltip={(tooltipProps) => {
                            const { id, value, color, formattedValue } = tooltipProps.datum;
                        
                            // Verifica si el ID existe en el mapeo
                            if (categoryToPercentageMapping.hasOwnProperty(id.toString())) {
                                // Obtiene la key de porcentaje correspondiente
                                const percentageKey = categoryToPercentageMapping[id.toString() as "Entre 15% y 30%" | "Entre 30% y 40%" | "Mayor a 40%"];
                        
                                // Obtiene el valor de porcentaje
                                const percentageValue = responseData[selectedDataKey][percentageKey];
                        
                                // Verifica si el valor de porcentaje es válido
                                const isValidPercentage = !isNaN(percentageValue) && typeof percentageValue === 'number';
                        
                                // Construye el label del tooltip con o sin porcentaje, según la validez de los datos
                                const categoryLabel = isValidPercentage
                                    ? `${(percentageValue * 100).toFixed(0)}%: ${value} clientes`
                                    : `${value} clientes`;
                        
                                return (
                                    <div
                                        style={{
                                            background: '#000',
                                            color: color,
                                            padding: '10px',
                                            borderRadius: '5px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <div>
                                            <strong>{categoryLabel}</strong>
                                        </div>
                                    </div>
                                );
                            }
                        
                            // Si el ID no está en el mapeo, muestra la categoría sin porcentaje
                            return (
                                <div
                                    style={{
                                        background: '#000',
                                        color: color,
                                        padding: '10px',
                                        borderRadius: '5px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <div>
                                        <strong>{`${value} clientes`}</strong>
                                    </div>
                                </div>
                            );
                        }}




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


                </div>

            )
            }
            {/* <div className="centrado" style={{ position: 'absolute', top: '60%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ color: "#ffffff", marginBottom: '8px', textAlign: 'center', fontWeight: '600', fontStyle: 'normal', fontSize: '36px' }}>
                {responseData[selectedDataKey].total.toLocaleString()}
                </Typography>
                <Typography sx={{ color: '#6E7880', textAlign: 'center', fontWeight: '400', fontStyle: 'normal', fontSize: '24px' }}>
                    Total
                </Typography>
            </div>
        </div> */}
        </div >
    )
}

export default PieChartComponentK2