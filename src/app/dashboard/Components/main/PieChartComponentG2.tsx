'use client'
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


type DataApiType = {
  [key: string]: number;
  menor_30: number;
  mayor_30: number;
  total: number;
};

/* type DataType = {
  ult_12_meses: DataApiType;
  este_anho: DataApiType;
  ult_6_meses: DataApiType;
}; */
/* type DataType = {
  [key: string]: any;
};
 */
interface DataType {
  [key: string]: {
    menor_30: number;
    mayor_30: number;
    total: number;
  };
}


function PieChartComponentG2() {
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

  const [responseData, setResponseData] = useState<DataType>({
    ult_12_meses: { menor_30: 0, mayor_30: 0, total: 0 },
    este_anho: { menor_30: 0, mayor_30: 0, total: 0 },
    ult_6_meses: { menor_30: 0, mayor_30: 0, total: 0 },
  });
  const [selectedDataKeyG2, setSelectedDataKeyG2] =  useState<keyof DataType>('este_anho');
  const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const queryParameter = getQueryParameter(userEmail);
    const fetchData = async () => {
      try {
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
        /*           const response = await fetch( getApiUrl(`/main/g2?investor=skandia`), options); */
        const response = await fetch(getApiUrlFinal(`/principal/g2?investor=${queryParameter}`), options);

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


  const formattedDataPieG2 = responseData
  ? responseData[selectedDataKeyG2]
    ? Object.entries(responseData[selectedDataKeyG2])
      .filter(([key, _]) => key !== 'total') // Filtra la categoría 'total'
      .map(([key, item]) => {
        let categoryLabel = key;

        // Personaliza los nombres de las categorías
        if (key === 'menor_30') {
          categoryLabel = 'Menor a 30 días';
        } else if (key === 'entre_30_60') {
          categoryLabel = 'Entre 30 y 60 días';
        } else if (key === 'mayor_60') {
          categoryLabel = 'Mayor a 60 días';
        }

        return {
          id: key,
          label: categoryLabel,
          value: item,
          formattedValue: `${item.toFixed(2)}%`,
          color: getColorByKey(key),
        };
      })
    : []
  : [];








  /* Función para actualizar la selección del usuario */
  const handleDataSelection = (dataKey: string) => {
    setSelectedDataKeyG2(dataKey);
  };

  /* Función que controla la selección del dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {
    const selectedDataKeyG2 = event.target.value as string;
    setSelectedValue(selectedDataKeyG2);
    handleDataSelection(selectedDataKeyG2);
  };

  const formatNumber = (num: number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    const tier = Math.log10(Math.abs(num)) / 3 | 0;

    if (tier === 0) return num;

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);

    const scaled = num / scale;
    return Math.round(scaled) + suffix;

    /* return scaled.toFixed(1) + suffix; */
  };

  


  return (
    <div className="grafica-piecharts-G2" style={{ position: 'relative', width: '100%', height: '380px' }}>
      <div>
        <FormControl fullWidth>
          <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
            <Grid xs={6} md={6} lg={6}>
              <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Cartera en mora</Typography>

            </Grid>
           {/*   <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
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
                <MenuItem value='este_anho'>Este año</MenuItem>
                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
              </Select>
            </Grid>  */}
          </Grid>
        </FormControl>
      </div>

      {formattedDataPieG2.length > 0 && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <ResponsivePie
            data={formattedDataPieG2}
            margin={{ top: 40, right: 80, bottom: 80, left: -40 }}
            startAngle={0}
            innerRadius={0.7}
            padAngle={1}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={8}
            colors={['#6C9FFF', '#B7C6FF', '#5ED1B1']}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
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
              const { id, value, color, formattedValue, label } = tooltipProps.datum;

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
                    <strong> {label}: {Math.round(value * 100)}%</strong>
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
      <div className="centrado div-center-pie " style={{ position: 'absolute', top: '60%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ color: "#ffffff", marginBottom: '8px', textAlign: 'center', fontWeight: '600', fontStyle: 'normal', fontSize: '28px' }}>
            {/*  {responseData[selectedDataKey].total.toLocaleString()} */}
            ${formatNumber(responseData[selectedDataKeyG2].total)}
          </Typography>
          <Typography sx={{ color: '#6E7880', textAlign: 'center', fontWeight: '400', fontStyle: 'normal', fontSize: '24px' }}>
            Total
          </Typography>
        </div>
      </div>
    </div >
  )
}

export default PieChartComponentG2