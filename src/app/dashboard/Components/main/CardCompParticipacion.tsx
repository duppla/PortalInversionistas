"use client";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

const endpoint = "/principal/participacion_adquirida";

interface ApiResponse {
  participacion_adquirida: number;
}
function CardCompParticipacion() {
  const { userEmail } = useAuth();
  const [dataApiParticipacion, setDataApiParticipacion] =
    useState<ApiResponse | null>(null);

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const email = encodeURIComponent(userEmail);
    const options = {
      method: "GET",
      headers: { "User-Agent": "insomnia/2023.5.8" },
    };

    fetch(getApiUrl(endpoint + `?email=${email}`), options)
      .then((response) => response.json())
      .then((response) => {
        if (typeof response.participacion_adquirida === "number") {
          // Coloca el objeto en un array para mantener consistencia
          setDataApiParticipacion(response);
        } else {
          console.error("El valor de data no es un número:");
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  let porcentaje = dataApiParticipacion?.participacion_adquirida;
  let participacion = "";

  if (porcentaje !== null && porcentaje !== undefined) {
    // Multiplica el porcentaje por 100 y verifica si es un número entero
    porcentaje *= 100;
    if (Number.isInteger(porcentaje)) {
      // Si es entero lo redondea y agrega %
      participacion = `${Math.round(porcentaje)}%`;
    } else {
      // Si tiene decimales, multiplica por 100 y muestra un decimal
      participacion = `${porcentaje.toFixed(1)}%`;
    }
  }

  return (
    <Box
      className="size-card-main-d-f"
      sx={{
        backgroundColor: "#020101",
        borderRadius: "14px" /* width: '360px', height:'220px' */,
      }}
    >
      <Card
        className="size-card-main-d-f"
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: "#020101",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ mt: 1, mb: 1 }}>
          <Typography
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "18px",
              fontWeight: "500",
            }}
            className="title-D-F"
          >
            Participación adquirida
          </Typography>
          <Typography
            sx={{
              mt: 0.2,
              mb: 1.5,
              color: "#E3E8F3",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "1.6rem",
            }}
          >
            {participacion}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardCompParticipacion;
