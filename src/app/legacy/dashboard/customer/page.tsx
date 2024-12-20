"use client";
import React from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import PieChartActEcon from "@/app/legacy/dashboard/Components/customer/PieChartActEcon";
import PieChartOwnership from "@/app/legacy/dashboard/Components/customer/PieChartOwnership";
import BarChartPago from "@/app/legacy/dashboard/Components/customer/BarChartPago";
import BarChartDestino from "@/app/legacy/dashboard/Components/customer/BarChartDestino";
import StreamChartScore from "@/app/legacy/dashboard/Components/customer/StreamChartScore";
import { chartBlocks } from "../Components/ChartBlocks";

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
            mt: 0,
            mb: 3,
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
        {chartBlocks(<BarChartDestino />, 440, 440)}
        {chartBlocks(<StreamChartScore />, 560, 460)}
        {chartBlocks(<BarChartPago />, 560, 520)}
      </Container>
    </Box>
  );
};

export default Customer;
