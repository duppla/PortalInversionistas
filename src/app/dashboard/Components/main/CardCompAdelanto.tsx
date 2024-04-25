"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import { Box, Card, CardContent, Typography } from "@mui/material";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { formatFecha } from "../utils";

const endpoint = "/principal/adelanto";

interface Adelanto {
  adelanto: number;
  fecha: string;
}

function CardCompAdelanto() {
  const { userEmail } = useAuth();

  const [data, setData] = useState<Adelanto | null>(null);

  useEffect(() => {
    if (userEmail) {
      // Verificar si userEmail no es null

      fetch(getApiUrl(endpoint, { email: userEmail }))
        .then((response) => response.json())
        .then((response) => {
          if (typeof response.adelanto === "number") {
            setData(response);
          } else {
            console.error("El valor de data no es un número:");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [userEmail]);

  // Accede directamente al primer elemento del array
  const formattedDate = data ? formatFecha(data.fecha) : "";

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
            Adelanto
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
            $ {data?.adelanto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardCompAdelanto;
