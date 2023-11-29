import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useRef , useState} from 'react'
import { Map } from 'mapbox-gl'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://salesforce-gdrive-conn.herokuapp.com/inversionistas/inmuebles/c?investor=skandia'); // Reemplaza 'TU_ENDPOINT' con la URL real de tu endpoint
        const result: CityData = await response.json();
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
        zoom: 9, // Zoom por defecto
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
        map.setZoom(12); // Puedes ajustar el zoom según tus necesidades
      }
    };

  // Función para agregar marcadores al mapa
  const addMarkersToMap = () => {
    Object.keys(data).forEach(city => {
      data[city].forEach(location => {
        new mapboxgl.Marker()
          .setLngLat([location.longitud, location.latitud])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${city}</p>`))
          .addTo(map!);
      });
    });
  };

  // Actualizar marcadores cuando los datos o la ciudad cambien
  useEffect(() => {
    if (map && selectedCity && data[selectedCity]) {
      addMarkersToMap();
    }
  }, [map, selectedCity, data]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div ref={mapDivC} style={{ width: '100%', height: '100%' }} />
      <div>
        <button onClick={() => handleCityChange('BOGOTÁ D.C.')}>Bogotá</button>
        <button onClick={() => handleCityChange('MEDELLÍN')}> Medellín</button>
        {/* Agrega más botones según las ciudades disponibles */}
      </div>
    </div>
  );
}

export default MapComponentC;