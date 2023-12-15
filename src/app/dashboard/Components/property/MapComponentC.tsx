import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useRef, useState } from 'react'
import { Map } from 'mapbox-gl'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import RoomIcon from '@mui/icons-material/Room';
import ReactDOM from 'react-dom';
import { SelectChangeEvent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getApiUrl } from '@/app/url/ApiConfig';
import { getApiUrlFinal } from '@/app/url/ApiConfig';

const themeBtn = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      light: '#3158A3',
      dark: '#9B9EAB',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ffffff',
      light: '#3158A3',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
    error: {
      main: '#FF0000', // Color rojo para resaltar errores
    },
  },
});

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyZXZhbG8iLCJhIjoiY2xwaWxxNGgwMDBtZDJwdGo0YjZzNHlnZyJ9.X_xxMOm_DCKERmwnhC4izA';
interface Location {
  latitud: number;
  longitud: number;
}

interface CityData {
  [key: string]: Location[];
}

function MapComponentC() {
  const mapDivC = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [data, setData] = useState<CityData>({});
  const [selectedCity, setSelectedCity] = useState<string>('BOGOTÁ D.C.');
  const [centroid, setCentroid] = useState<LngLatLike | null>(null);

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const response = await fetch(getApiUrlFinal('/inmuebles/c?investor=skandia')); // Reemplaza 'TU_ENDPOINT' con la URL real de tu endpoint
          const result: CityData = await response.json();
          console.log(result) + 'resultado de data ';
          setData(result);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };  


      const initializeMap = () => {
        const newMap = new mapboxgl.Map({
          container: mapDivC.current!, // container ID
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [-74.5, 4], // Posición por defecto en Colombia (centrado en Bogotá)
          zoom: 12, // Zoom por defecto
        });
        // Desactiva el marcador por defecto
        newMap.once('load', () => {
          newMap.setLayoutProperty('country-label', 'visibility', 'none');
        });
        setMap(newMap);
        // Llamar a la función fetchData para obtener datos del endpoint
        fetchData();
      };
  
      if (!map) {
        initializeMap();
      }
      // Limpieza al desmontar el componente
      return () => {
        map && map.remove()
      };
    }, [map]); 
 

  // Función para cambiar la ciudad seleccionada y centrar el mapa en esa ciudad
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (map && data[city] && data[city].length > 0) {
      const center = data[city][0]; // Tomar la primera ubicación como referencia
      map.setCenter([center.longitud, center.latitud]);
      map.setZoom(80); // Puedes ajustar el zoom según tus necesidades
    }
  };

  // Función para agregar marcadores al mapa
  const addMarkersToMap = () => {
    Object.keys(data).forEach(city => {
      data[city].forEach(location => {
        // Crear un elemento de marcador personalizado con una clase específica
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';

        // Puedes personalizar el estilo del marcador aquí
        markerElement.style.backgroundColor = '#FF864B'; // Cambia el color del fondo
        markerElement.style.width = '18px'; // Cambia el ancho del marcador
        markerElement.style.height = '18px'; // Cambia la altura del marcador
        markerElement.style.borderRadius = '80%'; // Hace que el marcador sea circular

        new mapboxgl.Marker({ element: markerElement })
          .setLngLat([location.longitud, location.latitud])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${city}</p>`))
          .addTo(map!);
      });
    });
  };

  // Actualizar marcadores cuando los datos o la ciudad cambien
  useEffect(() => {
    if (map && selectedCity && data[selectedCity]) {
      map.flyTo({
        center: [data[selectedCity][0].longitud, data[selectedCity][0].latitud],
        zoom: 10,
      });
      addMarkersToMap();
    }
  }, [map, selectedCity, data]);

  return (
    <ThemeProvider theme={themeBtn}>
      <div style={{ width: '100%', height: '400px' }}>
        <div ref={mapDivC} style={{ width: '100%', height: '100%', borderRadius: '20px' }} />

        <div>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => handleCityChange('BOGOTÁ D.C.')}
              disabled={selectedCity === 'BOGOTÁ D.C.'}
              sx={{
                borderRadius: '10px',
                color: '#ffffff', // Letra blanca
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'none',
                width: '160px',
                backgroundColor: '#6C9FFF',
                borderColor: '#6C9FFF', // Color de borde normal
                '&:hover': {
                  backgroundColor: '#3158A3', // Cambia el fondo al pasar el mouse
                  borderColor: '#3158A3', // Cambia el borde al pasar el mouse
                },
                '&.Mui-disabled': {
                  color: '#9A9A9A',
                  backgroundColor: '#3158A3',
                  // Letra blanca cuando está deshabilitado
                },
              }}
            >
              Bogotá
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleCityChange('MOSQUERA')}
              disabled={selectedCity === 'MOSQUERA'}
              sx={{
                borderRadius: '10px',
                color: '#ffffff', // Letra blanca
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'none',
                width: '160px',
                backgroundColor: '#6C9FFF',
                borderColor: '#6C9FFF', // Color de borde normal
                '&:hover': {
                  backgroundColor: '#3158A3', // Cambia el fondo al pasar el mouse
                  borderColor: '#3158A3', // Cambia el borde al pasar el mouse
                },
                '&.Mui-disabled': {
                  color: '#9A9A9A',
                  backgroundColor: '#3158A3',
                  // Letra blanca cuando está deshabilitado
                },
              }}
            >
            Sus alrededores
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleCityChange('MEDELLÍN')}
              disabled={selectedCity === 'MEDELLÍN'}
              sx={{
                borderRadius: '10px',
                color: '#ffffff', // Letra blanca
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'none',
                width: '160px',
                backgroundColor: '#6C9FFF',
                borderColor: '#6C9FFF', // Color de borde normal
                '&:hover': {
                  backgroundColor: '#3158A3', // Cambia el fondo al pasar el mouse
                  borderColor: '#3158A3', // Cambia el borde al pasar el mouse
                },
                '&.Mui-disabled': {
                  color: '#9A9A9A',
                  backgroundColor: '#3158A3',
                  // Letra blanca cuando está deshabilitado
                },
              }}
            >
              Medellín
            </Button>
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MapComponentC;