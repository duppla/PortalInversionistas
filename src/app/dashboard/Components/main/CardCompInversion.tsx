"use client";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

const endpoint = "/principal/inversion_original";

interface ApiResponse {
  monto_inversion: number;
}
function CardCompInversion() {
  const { userEmail } = useAuth();
  const [dataApiInversion, setDataApiInversion] = useState<ApiResponse | null>(
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
        if (typeof response.monto_inversion === "number") {
          setDataApiInversion(response); // Coloca el objeto en un array para mantener consistencia
        } else {
          console.error("El valor de data no es un número:");
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  return (
    <Box
      className="size-card-main-d-f"
      sx={{ backgroundColor: "#020101", borderRadius: "14px" }}
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
            Inversión original
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
            {dataApiInversion?.monto_inversion
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardCompInversion;
