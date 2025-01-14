"use client";
import React from "react";
import { Container, Box, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BarChartFlujos from "../Components/main/BarChartFlujos";
import BarChartPropiedad from "../Components/main/BarChartPropiedad";
import LineChartHistMora from "../Components/main/LineChartHistMora";
import PieChartCompCartera from "../Components/main/PieChartCompCartera";
import CardRetorno from "../Components/main/CardRetorno";
import CardNOI from "../Components/main/CardNOI";
import CardMorosidad from "../Components/main/CardMorosidad";
import CardAdelanto from "../Components/main/CardAdelanto";
import LineChartRentabilidad from "../Components/main/LineChartRentabilidad";
import { chartBlocks } from "../Components/ChartBlocks";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CardCompBox } from "../Components/CardComps";

import { getEmail } from "../../context/authContext";
import { useEffect, useState } from "react";

import fetchData from "../../url/ApiConfig";

import { formatNumber } from "../Components/utils";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#E8E9F2",
      dark: "#9B9EAB",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#ffffff",
      light: "#FFFFFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});


const endpoint = "/dashboard";


type Inversion = {
  inversion_original: number;
  participacion_adquirida: number;
  fechas: string[];
  retorno_a_la_fecha: number[];
  devolucion_capital_acumulado: number[];
};

const Page = () => {
  let isLargeScreenK = useMediaQuery("(min-width: 1200px)");

  const [data, setData] = useState<Inversion>();

  useEffect(() => {
    const email = getEmail();
    fetchData(endpoint, email, setData);
  }, []);
  

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          mt: 1,
          ml: 1,
          mr: 1,
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }} className="">
          {/* primera fila  componente D*/}
          <Grid
            container
            className="size-card-main"
            sx={{
              mb: 5,
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              backgroundColor: "#212126",
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              p: 2,
            }}
            columnGap={10}
            rowGap={1}
          >
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompBox title="Inversión original" data={data ? "$ " + data.inversion_original.toLocaleString() : ""} />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompBox title="Participación adquirida" data={data ? formatNumber(data.participacion_adquirida, 1, true) : ""} />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompBox title="Retorno total a la fecha" data={data ? "$ " + data.retorno_a_la_fecha.slice(-1).toLocaleString() : ""}/>
            </Grid>
          </Grid>
          {chartBlocks(<LineChartRentabilidad />, 305, 305)}
          {chartBlocks(<BarChartFlujos />, 440, 440)}
          {chartBlocks(<BarChartPropiedad />, 460, 460)}
          {/* componente F*/}
          <Grid
            container
            className="size-card-main-f"
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              backgroundColor: "#212126",
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              mt: 4,
              p: 2,
            }}
            columnGap={10}
            rowGap={1}
          >
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardNOI />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardMorosidad />
            </Grid>
            <Grid xs={9} sm={12} md={3} lg={3} sx={{}}>
              <CardAdelanto />
            </Grid>
          </Grid>
          {/* Componente G */}
          <Grid
            container
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              width: "100%",
              height: "auto",
              backgroundColor: /* '#212126' */ "#0B0B0D",
              borderRadius: "20px",
              /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
              mt: 4,
            }}
            columnGap={isLargeScreenK ? 13.5 : 10}
            rowGap={1}
          >
            <Grid
              className="container-G"
              xs={12}
              sm={12}
              md={5.5}
              lg={5.5}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#212126",
                mt: 2,
                mb: 2,
                p: 2,
              }}
            >
              <LineChartHistMora />
            </Grid>
            <Grid
              className=""
              xs={12}
              sm={12}
              md={5.5}
              lg={5.5}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#212126",
                mt: 2,
                mb: 2,
                p: 4,
              }}
            >
              <PieChartCompCartera />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Page;
