"use client";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

const endpoint = "/principal/retorno";

interface ApiResponse {
  retorno: number;
}
function CardCompRetorno() {
  const { userEmail } = useAuth();

  const [dataApiRetorno, setDataApiRetorno] = useState<ApiResponse | null>(
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
        if (typeof response.retorno === "number") {
          setDataApiRetorno(response); // Coloca el objeto en un array para mantener consistencia
        } else {
          console.error("El valor de data no es un número:", response);
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  return (
    <Box
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
            className="title-D-F"
            component="div"
            sx={{
              color: "#5782F2",
              fontFamily: "Rustica",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Retorno total a la fecha
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
            ${" "}
            {dataApiRetorno?.retorno
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardCompRetorno;
