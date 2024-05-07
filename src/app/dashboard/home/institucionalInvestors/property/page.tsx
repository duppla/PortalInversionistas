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
    <Box sx={{ flexGrow: 1, mt: 1, ml: 1, mr: 1, borderRadius: "20px" }}>
      {/* Sección dashborad */}
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }} className="">
        {/* Componente C -Mapa*/}
        <Grid
          container
          sx={{
            marginTop: "4px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "640px",
            backgroundColor: "#212126",
            borderRadius: "20px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
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
              height: "480px",
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              mt: 2,
            }}
          >
            <MapMapa />
          </Grid>
        </Grid>
        {/* Componente B */}
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
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
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
            <LineChartValorInm />
          </Grid>
        </Grid>

        {/* Componente J */}
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
              /*  backgroundColor: '#9B9EAB',  */
              borderRadius: "20px",
              /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
            }}
          >
            <SankeyChartPyG />
          </Grid>
        </Grid>

        {/* Componente J */}
        <Grid
          container
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
            height: "540px",
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
              /*  backgroundColor: '#9B9EAB', */
              borderRadius: "20px",
              /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
            }}
          >
            <TablePyG />
          </Grid>
        </Grid>
        {/* Componente H */}
        <Grid
          /* className='size-container-h1-h2' */ container
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            backgroundColor: "#212126",
            height: "305px",
            borderRadius: "20px",
          }}
          rowSpacing={2}
          gap={12.6}
          columnSpacing={{ md: 1, lg: 1 }}
        >
          <Grid
            className=""
            xs={12}
            sm={12}
            md={10}
            lg={10}
            sx={{
              width: "100%",
              /*  backgroundColor: '#9B9EAB', */
              borderRadius: "20px",
              /* boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', */
            }}
          >
            <LineChartUnidades />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default page;
