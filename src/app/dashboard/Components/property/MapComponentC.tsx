import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import React, { useEffect, useRef } from 'react'
import { Map } from 'mapbox-gl'
import { Container, Box, Button, ButtonGroup, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyZXZhbG8iLCJhIjoiY2xwaWxxNGgwMDBtZDJwdGo0YjZzNHlnZyJ9.X_xxMOm_DCKERmwnhC4izA';

function MapComponentC() {

  const mapDivC = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const map = new Map({
      container: mapDivC.current!, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

  }, []);




  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>

      <div ref={mapDivC}
        style={{
          width: '1100px',
          height: '370px',
          left: 0,
          /*  position:'fixed', */
          top: '40px',
          borderRadius: '20px',
        }}
      ></div>

    </Box>
  )
}

export default MapComponentC




