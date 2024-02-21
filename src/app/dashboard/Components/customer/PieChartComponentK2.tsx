'use client'
import React from 'react'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography, FormControl, } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'
import { getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';




type DataType = {
    id: string;
    label: string; 
    value: number;
    formattedValue: string;
    color: string;
};


const PieChartComponentK2 = () => {


    const { userEmail } = useAuth();   
    const [selectedDataKeyK2, setSelectedDataKeyK2] = useState<string>('este_anho');
    const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');
    const [menuOpen, setMenuOpen] = useState(false);

    const [responseData, setResponseData] = useState<any>({});



    useEffect(() => {
        if (!userEmail) {
            return;
        }
        const queryParameter = userEmail;
        const fetchData = async () => {
            try {
                const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };           
                const response = await fetch(getApiUrlFinal(`/clientes/k2?email=${queryParameter}`), options);
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
    }, [userEmail]);


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

    // Excluye las claves que no deseas incluir en formattedDataPie
    const excludedKeys = ['total', 'porcent_0_33', 'porcent_33_66', 'porcent_66_100'];

    const formattedDataPie = responseData
    ? responseData[selectedDataKeyK2]?.map((data: any) => {
        const formattedData: DataType[] = [];

        Object.keys(data).forEach((key: string) => {
            // Verifica si la clave no está en excludedKeys
            if (!excludedKeys.includes(key)) {
                // Verifica si la clave es una de las que deseas incluir
                if (key === 'rango_15_30' || key === 'rango_30_40' || key === 'mayor_40') {
                    // Formatea los datos según tus requisitos
                    const label = key === 'rango_15_30' ? 'Rango 15% - 30%' :
                        key === 'rango_30_40' ? 'Rango 30% - 40%' :
                            'Mayor a 40%';
                    formattedData.push({
                        id: key,
                        label: label,
                        value: data[key],
                        formattedValue: `${data[key]}`,
                        color: getColorByKey(key), // Reemplaza getColorByKey con tu lógica de asignación de colores
                    });
                }
            }
        });             
        return formattedData;        
    }).flat()
    : [];


    /* Función para actualizar la selección del usuario */
      const handleDataSelection = (dataKey: string) => {
          setSelectedDataKeyK2(dataKey);
      }; 

    /* Función que controla la selección del dropdown */
       const handleSelectChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {
           const selectedDataKeyK2 = event.target.value as string;
           setSelectedValue(selectedDataKeyK2);
           handleDataSelection(selectedDataKeyK2);
       }; 

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

            {formattedDataPie && formattedDataPie.length > 0 ? (
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
                                const percentageValue = responseData[selectedDataKeyK2][percentageKey];

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

            ):(
                <div>Cargando...</div>  
            )
            }
            
        </div >
    )
}

export default PieChartComponentK2