"use client";
import React from "react";
import { Container, Box } from "@mui/material";
import LineChartValorInm from "../Components/property/LineChartValorInm";
import LineChartUnidades from "../Components/property/LineChartUnidades";
import MapMapa from "../Components/property/MapMapa";
import SankeyChartPyG from "../Components/property/SankeyChartPyG";
import TablePyG from "../Components/property/TablePyG";
import { chartBlocks } from "../Components/ChartBlocks";

const page = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 0, ml: 1, mr: 1, borderRadius: "20px" }}>
      <Container maxWidth="xl" sx={{ mt: 0, mb: 0 }} className="">
        {chartBlocks(<MapMapa />, 640, 460, 2)}
        {chartBlocks(<LineChartValorInm />, 520)}
        {chartBlocks(<SankeyChartPyG />, 560)}
        {chartBlocks(<TablePyG />, 460)}
        {chartBlocks(<LineChartUnidades />, 300, 300)}
      </Container>
    </Box>
  );
};
export default page;
