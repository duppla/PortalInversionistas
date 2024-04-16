"use client";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";
import formatFecha from "@/app/dashboard/Components/utils";

const endpoint = "/principal/tasa_morosidad";

interface ApiResponse {
  tasa_morosidad: number;
  fecha: string;
}

function CardCompMorosidad() {
  const { userEmail } = useAuth();
  const [dataApiMorosidad, setDataApiMorosidad] = useState<ApiResponse | null>(
    null
  );

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
        setDataApiMorosidad(response); // Coloca el objeto en un array para mantener consistencia
      })
      .catch((err) => console.error(err));
  }, [userEmail]);
  // Accede directamente al primer elemento del array
  const porcentaje = dataApiMorosidad?.tasa_morosidad
    ? (dataApiMorosidad.tasa_morosidad * 100).toFixed(1) + "%"
    : "0%";

  const formattedDate = dataApiMorosidad
    ? formatFecha(dataApiMorosidad.fecha)
    : "";

  return (
    <Box
      className="size-card-main-componentF"
      sx={{
        backgroundColor: "#020101",
        borderRadius: "14px" /* width: '360px', height:'220px' */,
      }}
    >
      <Card
        className="size-card-main-componentF"
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
            className="title-D-F"
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "30px",
              fontWeight: "500",
            }}
          >
            Tasa de morosidad
          </Typography>
          <Typography
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {formattedDate}
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
            {/* {dataPrueba?.data}% */}
            {porcentaje}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardCompMorosidad;
