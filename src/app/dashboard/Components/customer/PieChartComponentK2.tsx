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


type DataType = {
    [key: string]: any;
};

const PieChartComponentK2 = () => {
 /*    const [responseData, setResponseData] = useState<DataType>({
        ult_12_meses: { en_mora: 0, a_tiempo: 0, total: 0 },
        este_anho: { en_mora: 0, a_tiempo: 0, total: 0 },
        ult_6_meses: { en_mora: 0, a_tiempo: 0, total: 0 },
    }); */
    const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');
    const [menuOpen, setMenuOpen] = useState(false);

    const [responseData, setResponseData] = useState<any>({}); 



    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
                /* const response = await fetch(getApiUrl(`/clientes/k2?investor=skandia`), options); */
                const response = await fetch(getApiUrlFinal(`/clientes/k2?investor=skandia`), options);

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

/*     const formatTooltip = ({ id, value }: { id: string; value: number }) => {
        let categoryLabel = id;

         return `${categoryLabel}: ${value}`;
    };
 */

    const formatTooltip = ({ id, value, percentage }: { id: string; value: number; percentage: number }) => {
        let categoryLabel = id;
        let excludedKeys = [ 'porcent_0_33', 'porcent_33_66', 'porcent_66_100'];
        // Personaliza los nombres de las categorías
        if (id.startsWith('porcent_')) {
            categoryLabel = `${excludedKeys}`;
        } else if (id.startsWith('entre_')) {
            const [lower, upper] = id.split('_').slice(1);
            categoryLabel = `${lower}% - ${upper}%`;
        }
    
        return `${categoryLabel}: ${value} clientes`;
    };
    

    
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



    return (
        <div className="grafica-piecharts" style={{ position: 'relative', width: '100%', height: '380px' }}>
        <div>
            <FormControl fullWidth>
                <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
                    <Grid xs={6} md={6} lg={6}>
                    
                    <Typography  className= 'title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily:'Helvetica', fontWeight:300 ,color: '#ffffff' , fontSize:'26px', mt:2 }}>Porcentaje ownership</Typography>

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
                    colors={[ '#5782F2','#FFB024','#5ED1B1']}
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
                 /*   tooltip={(tooltipProps) => {
                        const { id, value, color, formattedValue , label} = tooltipProps.datum;
                      
                        return (
                          <div
                            style={{
                              background: '#000',
                              color: color, // Usa el color personalizado asignado
                              padding: '10px',
                              borderRadius: '5px',
                              fontSize: '14px',
                            }}
                          >
                            <div>
                              <strong> {label}: {formattedValue} clientes</strong>
                            </div>                                
                          </div>
                        );
                        
                                                console.log(percentageValue + ' prueba de porcentaje existente k2' + isValidPercentage + ' este es el id ' + id + ' este es el value ' + value + ' este es el color ' + color + ' este es el formattedValue ' + formattedValue + ' este es el percentageKey ' + percentageKey + ' este es el percentageValue ' + percentageValue);
                      }}  */

                /*       tooltip={(tooltipProps) => {
                        const { id, value, color, formattedValue } = tooltipProps.datum;
                        
                        // Utiliza una expresión regular para obtener la parte numérica del id
                        const match = id.toString().match(/(\d+_\d+)/);
                        console.log(match);
                        
                        // Construye la clave del porcentaje
                        const percentageKey = match ? `porcent_${match[1]}` : null;
                        console.log(percentageKey + `prueba de porcentaje key`);
                        
                        // Obtiene el valor de porcentaje
                        const percentageValue = percentageKey ? responseData[selectedDataKey][percentageKey] : null;
                    
                        // Verifica si la clave del porcentaje existe y es un número válido
                        const isValidPercentage = !isNaN(percentageValue) && typeof percentageValue === 'number';
                    
                        // Si no hay porcentaje válido, establece un valor predeterminado
                        const fallbackPercentage = 0;
                    
                        console.log(percentageValue + ' prueba de porcentaje existente k2' + isValidPercentage + ' este es el id ' );
                        // Construye el label del tooltip con o sin porcentaje, según la validez de los datos
                        const categoryLabel = isValidPercentage
                            ? `${(percentageValue * 100).toFixed(0)}%: ${value} clientes`
                            : `${(fallbackPercentage * 100).toFixed(0)}%: ${value} clientes`;
                    console.log(categoryLabel + 'prueba de categoria');
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
                    }} */
                    
                    tooltip={(tooltipProps) => {
                        const { id, value, color, formattedValue } = tooltipProps.datum;
                    
                        // Utiliza una expresión regular para encontrar números y caracteres relacionados con el porcentaje en el id
                        const match = id.toString().match(/[\d.%]+/);
                    
                        // Construye la clave del porcentaje
                        const percentageKey = match ? `porcent_${match[0]}` : null;
                        console.log(percentageKey + `prueba de porcentaje key`);
                    
                        // Obtiene el valor de porcentaje
                        const percentageValue = percentageKey ? responseData[selectedDataKey][percentageKey] : null;
                    
                        // Verifica si la clave del porcentaje existe y es un número válido
                        const isValidPercentage = !isNaN(percentageValue) && typeof percentageValue === 'number';
                    
                        // Si no hay porcentaje válido, establece un valor predeterminado
                        const fallbackPercentage = 0;
                    
                        // Construye el label del tooltip con o sin porcentaje, según la validez de los datos
                        const categoryLabel = isValidPercentage
                            ? `${(percentageValue * 100).toFixed(0)}%: ${value} clientes`
                            : `${(fallbackPercentage * 100).toFixed(0)}%: ${value} clientes`;
                    
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