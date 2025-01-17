"use client";
// react imports
import React, { useEffect, useRef, useState } from "react";

// mapbox imports
import mapboxgl, { Map } from "mapbox-gl";

// material-ui imports
import { Button, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// custom imports
import { formatNumber } from "./utils";

let defaultCenter: { lat: number; lng: number } = {
  lat: 4.710989,
  lng: -74.07209,
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFyZXZhbG8iLCJhIjoiY2xwaWxxNGgwMDBtZDJwdGo0YjZzNHlnZyJ9.X_xxMOm_DCKERmwnhC4izA";

type Inmueble = {
  codigo: string;
  ciudad: string;
  latitud: number;
  longitud: number;
  estrato: string;
  valor_compra: number;
  barrio: string;
};

type Mapa = {
  ciudad: string;
  inmuebles: Inmueble[];
}

function MapMapa(props: Readonly<{ mapa: Mapa[] }>) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();
  const [city, setCity] = useState<number>(0);

  let locations: Inmueble[] = [];
  let center = defaultCenter;
  if (props.mapa.length > 0) {
    locations = props.mapa[city].inmuebles || [];
    center = locations.length > 0 ? avgCoords(locations) : defaultCenter;
  }

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: center, // starting position
        zoom: 12, // Zoom por defecto
      });

      // Desactiva el marcador por defecto
      newMap.once("load", () => {
        newMap.setLayoutProperty("country-label", "visibility", "none");
      });
      setMap(newMap);
    };

    if (!map) {
      initializeMap();
    }

    // Limpieza al desmontar el componente
    return () => {
      map?.remove();
    };
  }, []);

  useEffect(() => {
    if (map && props.mapa[city]) {
      const locations = props.mapa[city].inmuebles;
      if (locations.length > 0) {
        map.flyTo({ center: avgCoords(locations), zoom: 11 });
        addMarkersToMap(map);
      }
    }
  }, [map, city, props.mapa]);

  const handleCityChange = (city: number) => {
    setCity(city);
  };

  const addMarkersToMap = (map: mapboxgl.Map) => {
    const locations = props.mapa[city].inmuebles;

    locations.forEach((location) => {
      const markerElement = document.createElement("img");
      markerElement.className = "custom-marker";
      markerElement.src =
        "https://s3.amazonaws.com/app-clientes-2.0/Inversionistas/Casa-duppla.svg";
      markerElement.style.width = "28px";

      let popupContent = `
        ${popupTitle(location.codigo)}
        ${popupBarrio(location.barrio)}
        ${popupValorInmueble(location.valor_compra)}
        ${popupEstrato(location.estrato)}
        `;

      const popup = new mapboxgl.Popup().setHTML(popupContent);

      new mapboxgl.Marker({ element: markerElement })
        .setLngLat([location.longitud, location.latitud])
        .setPopup(popup)
        .addTo(map);

      // Agregar evento de clic al marcador
      markerElement.addEventListener("click", () =>
        handleMarkerClick(location)
      );

      // Agregar evento close al popup
      popup.on("close", () => handlePopupClose());
    });
  };

  const handlePopupClose = () => {
    if (map && props.mapa.length > 0) {
      const locations = props.mapa[city].inmuebles;
      if (locations.length > 0) {
        map.flyTo({ center: avgCoords(locations), zoom: 11 });
      }
    }
  };

  const handleMarkerClick = (location: Inmueble) => {
    if (map) {
      map.flyTo({ center: [location.longitud, location.latitud], zoom: 15 });
    }
  };

  return (
    <ThemeProvider theme={themeBtn}>
      <div style={{ width: "100%", height: "540px" }}>
        <div
          ref={mapDiv}
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        />

        <div>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-start", mt: 2 }}
          >
            {props.mapa.map((mapa: Mapa, index: number) => (
              <Button
                key={mapa.ciudad}
                variant="outlined"
                onClick={() => handleCityChange(index)}
                disabled={city === index}
                sx={{
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontFamily: "Rustica",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  textTransform: "none",
                  width: "200px",
                  backgroundColor: "#6C9FFF",
                  borderColor: "#6C9FFF",
                  "&:hover": {
                    backgroundColor: "#3158A3",
                    borderColor: "#3158A3",
                  },
                  "&.Mui-disabled": {
                    color: "#9A9A9A",
                    backgroundColor: "#3158A3",
                  },
                }}
              >
                {toTitleCase(mapa.ciudad)}
              </Button>
            ))}
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MapMapa;

// Función para calcular el centro promedio de un conjunto de ubicaciones
function avgCoords(locations: Inmueble[]): { lat: number; lng: number } {
  const count = locations.length;
  const sumLat = locations.reduce((sum, item) => sum + item.latitud, 0);
  const sumLng = locations.reduce((sum, item) => sum + item.longitud, 0);

  const avgLat = sumLat / count;
  const avgLng = sumLng / count;

  return { lat: avgLat, lng: avgLng };
}

const themeBtn = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#3158A3",
      dark: "#9B9EAB",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#ffffff",
      light: "#3158A3",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    error: {
      main: "#FF0000", // Color rojo para resaltar errores
    },
  },
});

const popupTitle = (cityName: string) => {
  return `<p style="color: black;">
    <strong>${cityName}</strong>
  </p>`;
};

const popupBarrio = (barrio: string | null) => {
  return barrio
    ? `<p style="color: black;">
    <strong>Barrio:</strong> ${barrio}
  </p>`
    : "";
};

const popupEstrato = (estrato: string | null) => {
  return estrato
    ? `<p style="color: black;">
    <strong>Estrato:</strong> ${estrato}
  </p>`
    : "";
};

const popupValorInmueble = (valor: number) => {
  return `<p style="color: black;">
    <strong>Valor del inmueble:</strong> ${formatNumber(valor)}
  </p>`;
};

const popupMora = (mora: boolean) => {
  return `<p style="color: black;">
    <strong>¿Está en mora?:</strong> ${mora ? "Sí" : "No"}
  </p>`;
};

const popupCategoriaMora = (categoria: string) => {
  return `<p style="color: black;">
    <strong>¿Cuánto?:</strong> ${categoria}
  </p>`;
};

function toTitleCase(text: string): string {
  let str = text.toLowerCase().split("");
  str[0] = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str[i] === " " || str[i] === ".") {
      str[i + 1] = str[i + 1]?.toUpperCase();
    }
  }
  return str.join("");
}
