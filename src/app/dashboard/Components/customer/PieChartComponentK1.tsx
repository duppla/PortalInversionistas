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
  [key: string]: Array<{
    actividad_economica: string;
    count: number;
    porcentaje: number;
  }>;
};

function PieChartComponentK1() {


  const { userEmail } = useAuth();
  const [selectedDataKeyK1, setSelectedDataKeyK1] = useState<string>('este_anho');
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

        const response = await fetch(getApiUrlFinal(`/clientes/k1?email=${queryParameter}`), options);

        const responseData = await response.json();

        if (responseData) {
          setResponseData(responseData);
          /* console.log(JSON.stringify(responseData) + ' data en k1'); */
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

  const formattedDataPie = responseData
    ? responseData[selectedDataKeyK1]
      ? Object.keys(responseData[selectedDataKeyK1])
        .map((key: string) => {
          const data = responseData[selectedDataKeyK1][key];

          return {
            id: data.actividad_economica,
            label: getCategoryLabel(data.actividad_economica),
            value: data.count,
            formattedValue: `${data.count}`,
            color: getColorByKey(data.actividad_economica),
          };
        })
      : []
    : [];



  function getCategoryLabel(key: string): string {

    const lowerCaseKey = key ? key.toLowerCase() : '';

    switch (lowerCaseKey) {
      case 'empleado':
        return 'Empleado';
      case 'pensionado':
        return 'Pensionado';
      case 'independiente':
        return 'Independiente';
      case 'rentista de capital':
        return 'Rentista de capital';
      case 'no registra':
        return 'No registra';
      default:
        return key; // Devuelve el valor original si no coincide con ninguna etiqueta personalizada
    }
  }


  /* Función para actualizar la selección del usuario */
  const handleDataSelection = (dataKey: string) => {
    setSelectedDataKeyK1(dataKey);
  };

  /* Función que controla la selección del dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {
    const selectedDataKeyK1 = event.target.value as string;
    setSelectedValue(selectedDataKeyK1);
    handleDataSelection(selectedDataKeyK1);
  };




  return (
    <div className="grafica-piecharts" style={{ position: 'relative', width: '100%', height: '380px' }}>
      <div>
        <FormControl fullWidth>
          <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
            <Grid xs={6} md={6} lg={6}>

              <Typography className='title-dropdown-menu-container' variant="subtitle1" sx={{ fontFamily: 'Helvetica', fontWeight: 300, color: '#ffffff', fontSize: '26px', mt: 2 }}>Actividad económica</Typography>

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
            colors={['#5782F2', '#FFB024', '#5ED1B1', '#723DFD', '#28ACFF']}
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
              const originalData = responseData[selectedDataKeyK1].find((data: any) => data.actividad_economica === id);
              const count = originalData ? originalData.count : 0;
              const porcentaje = originalData ? originalData.porcentaje * 100 : 0;

              // Lógica para ajustar la etiqueta según el recuento
              const labelWithCount = count > 1 ? `${label}s` : label;

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
                    <strong>{porcentaje.toFixed(0)}% </strong>
                  </div>
                  <div>
                    {labelWithCount}: {formattedValue}
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
                      itemTextColor: '#cccccc'
                    }
                  }
                ]
              }
            ]}
          />


        </div>

      )
      }

    </div >
  )
}

export default PieChartComponentK1