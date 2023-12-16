'use client'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState, ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getApiUrl } from '@/app/url/ApiConfig';


type DataApiType = {
  fecha: string;
  arriendo: any;
  compra_venta: any;
  prepago: any;
};

type DataType = {
  ult_12_meses: DataApiType[];
  este_anho: DataApiType[];
  ult_6_meses: DataApiType[];
};

type ItemType = {
  fecha: string;
  arriendo: number;
  compra_venta: number;
  prepago: number;
};


const BarChartComponentA2 = () => {

  const [data, setData] = useState<DataType | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [dataApi, setDataApi] = useState<DataType[]>([]);
  const [selectedDataKey, setSelectedDataKey] = useState<string>('este_anho');
  const [selectedValue, setSelectedValue] = useState<string | number>('este_anho');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };
        const response = await fetch(getApiUrl(`/main/a2?investor=skandia`), options);
        const responseData = await response.json();
        setResponseData(responseData);
        setData(responseData); // Actualiza los datos cuando la respuesta de la API llega
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



  /* Función para ordenar por fecha */
  const sortByDate = (a: DataApiType, b: DataApiType) => {
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  };

  /* Obtén los datos ordenados por fecha */
  const sortedData = responseData
    ? responseData[selectedDataKey].sort(sortByDate)
    : [];

  /* data del enpoint para renderizar la grafica por un map */
  /* Formatea los datos para la gráfica */
  const formattedDataa = sortedData.map((item: ItemType) => ({
    fecha: item.fecha,
    Arriendo: item.arriendo,
    Compraventa: item.compra_venta,
    Prepago: item.prepago,
  }));

  /*   const formattedDataa = responseData
      ? responseData[selectedDataKey].map((item: ItemType) => ({
        fecha: item.fecha,
        Arriendo: item.arriendo,
        Compraventa: item.compra_venta,
        Prepago: item.prepago,
      }))
      : []; */



  /* prueba de formateo data a legible */

  function formatNumber(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

    if (shortValue.endsWith('.0')) {
      shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
    }

    return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
  }
  /* prueba de formateo data a legible tooltip */
  function formatNumberTooltip(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue = (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1);

    if (shortValue.endsWith('.0')) {
      shortValue = shortValue.slice(0, -2); // Elimina el punto decimal y el cero decimal
    }

    return shortValue + (suffixNum > 0 ? ' ' + suffixes[suffixNum] : '');
  }


 

  return (
    <div className='grafica-barcharts nivo-text'>
      <div>
        <FormControl fullWidth>
          <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #9B9EAB' }}>
            <Grid xs={6} md={6} lg={6}>
              <Typography variant="subtitle1" sx={{ fontFamily:'Roboto', color: '#ffffff' , fontSize:'26px', mt:2 }}>Flujo real vs. flujo esperado desglose</Typography>
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

      <ResponsiveBar
        data={formattedDataa}
        keys={['Compraventa', 'Arriendo', 'Prepago']}
        indexBy="fecha"
        label={() => ''}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        valueScale={{ type: 'linear', min: 0 }}
        indexScale={{ type: 'band', round: true }}
        colors={['#28ACFF', '#00B383', '#5ED1B1']} // Define tus propios colores */
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
      
        
        borderRadius={8}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
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
          tickValues: formattedDataa.map((item: { fecha: string }) => item.fecha),      
          format: (value) => {
            const [year, month] = value.split('-');
            const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const shortYear = year.slice(2); // Obtiene los últimos dos dígitos del año
            return `${monthNames[parseInt(month, 10) - 1]} ${shortYear}`;
          },
          
          

        }}
        gridYValues={[ 0, 4000000, 8000000, 12000000, 16000000]}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: [ 0, 4000000, 8000000, 12000000, 16000000],
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
            itemsSpacing: 20,
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
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
      />

    </div>
  )
}

export default BarChartComponentA2

/* {
  render: () => <Bar {...divergingCommonProps} keys={['gained <= 100$', 'gained > 100$', 'lost <= 100$', 'lost > 100$']} padding={0.4} colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']} valueFormat={v => `${v}%`} />
} */