"use client";
import React from "react";
import { Grid, Container, Box } from "@mui/material";
import LineChartValorInm from "../../../Components/property/LineChartValorInm";
import LineChartUnidades from "../../../Components/property/LineChartUnidades";
import MapMapa from "../../../Components/property/MapMapa";
import SankeyChartPyG from "../../../Components/property/SankeyChartPyG";
import TablePyG from "../../../Components/property/TablePyG";

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

function chartBlocks(
  element: JSX.Element,
  height_container: number = 560,
  height_element: number = 460,
  mt: number = 0
) {
  return (
    <Grid
      container
      sx={{
        marginTop: "60px",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        width: "100%",
        height: height_container,
        backgroundColor: "#212126",
        borderRadius: "20px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Grid
        className=""
        xs={12}
        sm={12}
        md={10}
        lg={10}
        sx={{
          width: "100%",
          height: height_element,
          backgroundColor: "#212126",
          borderRadius: "20px",
          mt: mt,
        }}
      >
        {element}
      </Grid>
    </Grid>
  );
}
