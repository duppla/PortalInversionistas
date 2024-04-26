"use client";
import React from "react";
import { Container, Box, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BarChartFlujos from "../Components/main/BarChartFlujos";
import BarChartPropiedad from "../Components/main/BarChartPropiedad";
import LineChartCompHistMora from "../Components/main/LineChartCompHistMora";
import PieChartCompCartera from "../Components/main/PieChartCompCartera";
import CardInversion from "../Components/main/CardInversion";
import CardCompParticipacion from "../Components/main/CardCompParticipacion";
import CardCompRetorno from "../Components/main/CardCompRetorno";
import CardCompNOI from "../Components/main/CardCompNOI";
import CardCompMorosidad from "../Components/main/CardCompMorosidad";
import CardAdelanto from "../Components/main/CardAdelanto";
import LineChartCompRentabilidad from "../Components/main/LineChartCompRentabilidad";

import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const Page = () => {
  let isLargeScreenK = useMediaQuery("min-width: 1200px");

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
              marginTop: "10px",
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
              <CardInversion />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompParticipacion />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompRetorno />
            </Grid>
          </Grid>
          {/* Componente P*/}
          <Grid
            container
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              width: "100%",
              height: "305px",
              backgroundColor: "#212126",
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/*Grafica principal-datos del inmueble  A2*/}
            <Grid
              className=""
              xs={12}
              sm={12}
              md={10}
              lg={10}
              sx={{
                width: "100%",
                height: "305px",
                backgroundColor: "#212126",
                borderRadius: "20px",
              }}
            >
              <LineChartCompRentabilidad />
            </Grid>
          </Grid>
          {/* Componente A y A1 */}
          <Grid
            container
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              width: "100%",

              backgroundColor: "#212126",
              borderRadius: "20px",
            }}
          >
            {/*Grafica principal-datos del inmueble*/}
            <Grid
              className=""
              xs={12}
              sm={12}
              md={10}
              lg={10}
              sx={{
                width: "auto",
                height: "440px",
                borderRadius: "20px",

                mb: 2,
              }}
            >
              <BarChartFlujos />
            </Grid>
          </Grid>
          {/* Componente E*/}
          <Grid
            container
            sx={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              width: "100%",
              height: "440px",
              backgroundColor: "#212126",
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/*Grafica principal-datos del inmueble  A2*/}
            <Grid
              className=""
              xs={12}
              sm={12}
              md={10}
              lg={10}
              sx={{
                width: "100%",
                height: "440px",
                backgroundColor: "#212126",
                borderRadius: "20px",
              }}
            >
              <BarChartPropiedad />
            </Grid>
          </Grid>
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
              <CardCompNOI />
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3} sx={{}}>
              <CardCompMorosidad />
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
              <LineChartCompHistMora />
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
