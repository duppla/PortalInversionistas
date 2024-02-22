'use client'
import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useRef, useState } from 'react'
import { Map } from 'mapbox-gl'
import { Button, Stack} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getApiUrlFinal } from '@/app/url/ApiConfig';
import { useAuth } from '@/app/context/authContext';

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
  codigo_inmueble: string;
  latitud: number;
  longitud: number;
  barrio: string;
  valor_inmueble: number;
  mora: boolean;
  categoria_mora: string;
}

interface CityData {
  ciudad: string;
  inmuebles: Location[];
}

function MapComponentC() {

  const { userEmail } = useAuth();

  const mapDivC = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [data, setData] = useState<CityData[]>([]);
  const [selectedCity, setSelectedCity] = useState<number>(0);

  // Función para calcular el centro promedio de un conjunto de ubicaciones
  function calculateAverageCoordinates(locations: Location[]): mapboxgl.LngLatLike {
    const totalCoordinates = locations.length;
    const sumLat = locations.reduce((sum, location) => sum + location.latitud, 0);
    const sumLng = locations.reduce((sum, location) => sum + location.longitud, 0);

    const avgLat = sumLat / totalCoordinates;
    const avgLng = sumLng / totalCoordinates;

    return [avgLng, avgLat]; // Devolver un objeto LngLatLike
  }


  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const queryParameter = userEmail;
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/2023.5.8' } };

    fetch(getApiUrlFinal(`/inmuebles/c?email=${queryParameter}`), options)
      .then(response => response.json())
      .then(result => {
        setData(result)
      })
      .catch(err => console.error(err));

    const initializeMap = () => {
      var locations: Location[] = [];
      if (data.length > 0) {
        locations = data[selectedCity].inmuebles;
      }
      let defaultCenter: mapboxgl.LngLatLike /* = { lng: -74.5, lat: 4 } */ | undefined = undefined;

      if (locations && locations.length > 0) {
        // Calcular el centro promedio si hay ubicaciones
        const center = calculateAverageCoordinates(locations);
        defaultCenter = { lng: (center as [number, number])[0], lat: (center as [number, number])[1] };
      }
      // Establecer el valor por defecto en la mitad de Colombia si no hay ubicaciones
      if (!defaultCenter) {
        defaultCenter = { lng: -74.072090, lat: 4.710989 }; // Bogotá
      }

      const newMap = new mapboxgl.Map({
        container: mapDivC.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: defaultCenter, // Usar el centro calculado o el por defecto
        zoom: 12, // Zoom por defecto
      });

      // Desactiva el marcador por defecto
      newMap.once('load', () => {
        newMap.setLayoutProperty('country-label', 'visibility', 'none');
      });
      setMap(newMap);
      // Llamar a la función fetchData para obtener datos del endpoint
    };

    if (!map) {
      initializeMap();
    }

    // Limpieza al desmontar el componente
    return () => {
      map && map.remove()
    };
  }, []);

  const calculateCityCenter = (city: number) => {
    const locations = data[city]?.inmuebles; // Usa optional chaining para evitar errores si data[city] es undefined
    if (locations && locations.length > 0 && map) {
      const center = calculateAverageCoordinates(locations);
      // Realizar un nuevo flyTo para actualizar el centro del mapa
      map.flyTo({ center, zoom: 10 });
    }
  };


  useEffect(() => {
    if (map && selectedCity && data[selectedCity]) {
      const locations = data[selectedCity].inmuebles;
      if (locations && locations.length > 0) {
        calculateCityCenter(selectedCity);
        addMarkersToMap();
      }
    }
  }, [map, selectedCity, data]);


  const handleCityChange = (city: number) => {
    setSelectedCity(city);
    const locations = data[city].inmuebles;
    if (locations && locations.length > 0 && map) {
      const center = calculateAverageCoordinates(locations);
      map.flyTo({ center, zoom: 12 }); // Ajusta el zoom según tus necesidades
    }
  };

  /* prueba de formateo data a legible tooltip */
  function formatNumber(value: number): string {
    if (value === undefined) {
      return 'N/A'; // Manejar el caso cuando el valor es undefined
    }
    var millones = (Math.abs(value) / 1000000).toFixed(1);
    var shortValue = millones.endsWith('.0') ? millones.slice(0, -2) : millones;

    return shortValue + " M";
  }

  const addMarkersToMap = () => {
    const cityData = data[selectedCity];
    const cityName = cityData.ciudad; // Obtener el nombre de la ciudad seleccionada

    // Convertir el nombre de la ciudad a mayúsculas
    const formattedCityName = cityName.toUpperCase();

    const locations = cityData.inmuebles;

    locations.forEach((location, index) => {
      const markerElement = document.createElement('img');
      markerElement.className = 'custom-marker';
      markerElement.src = "https://s3.amazonaws.com/app-clientes-2.0/Inversionistas/Casa-duppla.svg";
      markerElement.style.width = "28px";

      let popupContent = `
            <p style="color: black;"><strong>${formattedCityName}</strong></p> <!-- Mostrar el nombre de la ciudad en mayúsculas -->
            <p style="color: black;"><strong>Barrio:</strong> ${location.barrio}</p>
            <p style="color: black;"><strong>Valor del inmueble:</strong> ${formatNumber(location.valor_inmueble)}</p>
            <p style="color: black;"><strong>¿Está en mora?:</strong> ${location.mora ? 'Sí' : 'No'}</p>
        `;
      // Agregar categoría de mora si es necesario
      if (location.mora) {
        popupContent += `<p style="color: black;"><strong>¿Cuánto?:</strong> ${location.categoria_mora}</p>`;
      }

      const popup = new mapboxgl.Popup().setHTML(popupContent);

      new mapboxgl.Marker({ element: markerElement })
        .setLngLat([location.longitud, location.latitud])
        .setPopup(popup)
        .addTo(map!);

      // Agregar evento de clic al marcador
      markerElement.addEventListener('click', () => handleMarkerClick(location));

      // Agregar evento close al popup
      popup.on('close', () => handlePopupClose());
    });
  };

  const handlePopupClose = () => {
    if (map && data.length > 0) {
      const locations = data[selectedCity].inmuebles;
      if (locations.length > 0) {
        const center = calculateAverageCoordinates(locations);
        map.flyTo({ center, zoom: 11 });
      }
    }
  };


  useEffect(() => {
    if (map && data[selectedCity]) { // Verifica si data[selectedCity] está definido
      const locations = data[selectedCity].inmuebles;
      if (locations && locations.length > 0) {
        map.flyTo({
          center: calculateAverageCoordinates(locations),
          zoom: 11,
        });
        addMarkersToMap();
      }
    }
  }, [map, selectedCity, data]);


  const handleMarkerClick = (location: Location) => {
    if (map) {
      map.flyTo({ center: [location.longitud, location.latitud], zoom: 15 });
    }
  };

  // Actualizar marcadores cuando los datos o la ciudad cambien
  useEffect(() => {
    const selectedCityData = data[selectedCity];
    if (selectedCityData && selectedCityData.inmuebles) {
      const locations = selectedCityData.inmuebles;
      if (locations.length > 0 && map) {
        map.flyTo({
          center: calculateAverageCoordinates(locations),
          zoom: 11,
        });
        addMarkersToMap();
      }
    }
  }, [map, selectedCity, data]);


  // Función para capitalizar la primera letra de la cadena
  function toTitleCase(text: string): string {
    return text.split(" ").map((l: string) => l[0].toUpperCase() + l.substring(1)).join(" ");
  }


  return (
    <ThemeProvider theme={themeBtn}>
      <div style={{ width: '100%', height: '540px' }}>
        <div ref={mapDivC} style={{ width: '100%', height: '100%', borderRadius: '20px' }} />

        <div>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', mt: 2 }}>
            {data.map((ciudad: CityData, index: number) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleCityChange(index)}
                disabled={selectedCity === index}
                sx={{
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontFamily: 'Rustica',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '16px',
                  textTransform: 'none',
                  width: '200px',
                  backgroundColor: '#6C9FFF',
                  borderColor: '#6C9FFF',
                  '&:hover': {
                    backgroundColor: '#3158A3',
                    borderColor: '#3158A3',
                  },
                  '&.Mui-disabled': {
                    color: '#9A9A9A',
                    backgroundColor: '#3158A3',
                  },
                }}
              >
                {toTitleCase(ciudad.ciudad)}
              </Button>
            ))}

          </Stack>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default MapComponentC;