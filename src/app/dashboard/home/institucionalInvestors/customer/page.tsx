"use client";
import React from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import PieChartActEcon from "@/app/dashboard/Components/customer/PieChartActEcon";
import PieChartOwnership from "@/app/dashboard/Components/customer/PieChartOwnership";
import BarChartPago from "@/app/dashboard/Components/customer/BarChartPago";
import BarChartDestino from "@/app/dashboard/Components/customer/BarChartDestino";
import StreamChartScore from "@/app/dashboard/Components/customer/StreamChartScore";

const Customer = () => {
  let isLargeScreenK = useMediaQuery("min-width: 1200px");

  return (
    <Box sx={{ flexGrow: 1, mt: 1, ml: 2, mr: 2, borderRadius: "20px" }}>
      {/* Sección dashborad Clientes*/}
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }} className="">
        {/* Componente K1 -K2 */}
        <Grid
          className="size-container-k1-k2"
          container
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            backgroundColor: "#0B0B0D",
            borderRadius: "20px",
            mt: 2,
          }}
          columnGap={isLargeScreenK ? 13.5 : 10}
          rowGap={1}
        >
          <Grid
            xs={12}
            sm={5.5}
            md={5.5}
            lg={5.5}
            sx={{
              borderRadius: "10px",
              backgroundColor: "#212126",
              mb: 2,
              p: 3,
              height: "360px",
            }}
          >
            <PieChartActEcon />
          </Grid>
          <Grid
            className=""
            xs={12}
            sm={5.5}
            md={5.5}
            lg={5.5}
            sx={{
              borderRadius: "10px",
              backgroundColor: "#212126",
              mb: 2,
              height: "360px",
              p: 3,
            }}
          >
            <PieChartOwnership />
          </Grid>
        </Grid>
        {/* Componente N */}
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
              width: "100%",
              height: "440px",
              backgroundColor: "#212126",
              borderRadius: "20px",
            }}
          >
            <BarChartDestino />
          </Grid>
        </Grid>
        {/* Componente L*/}
        <Grid
          container
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "560px",
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
              width: "100%",
              height: "460px",
              backgroundColor: "#212126",
              borderRadius: "20px",
            }}
          >
            <StreamChartScore />
          </Grid>
        </Grid>
        {/* Componente O */}
        <Grid
          container
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "600px",
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
              width: "100%",
              height: "520px",
              backgroundColor: "#212126",
              borderRadius: "20px",
            }}
          >
            <BarChartPago />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Customer;
