"use client";
import { ReactNode } from "react";
import PrivateRoute from "../login/privateRoute";
import Navbar from "./Components/navbarFixed";
import { Box, Container, Grid, Button, Stack } from "@mui/material";
import Link from "next/link";

function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <PrivateRoute>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <Box
          id="contenidoInmueble"
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Navbar />
          {/*----------------------------visualización dashboard-------------------------------------------- */}
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#OBOBOD",
              mt: 2,
              mb: 2,
              borderTopLeftRadius: "39px",
              borderTopRightRadius: "39px",
            }}
          >
            <Box>
              <Container maxWidth="xl" sx={{ mt: 4, mb: 2 }} className="">
                <Container maxWidth="xl" sx={{ mt: 4 }}>
                  <Grid container spacing={1}>
                    {/*Primera columna vacía*/}
                    <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                    {/*Segunda columna principal*/}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        justifyItems: "end",
                        alignItems: "end",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        {botonDashboard("DB1", "/legacy/dashboard/beneficio1")}
                        {botonDashboard("DB2", "/legacy/dashboard/beneficio2")}
                        {botonDashboard("DB3", "/legacy/dashboard/beneficio3")}
                      </Stack>
                    </Grid>
                  </Grid>
                </Container>
              </Container>
            </Box>
            {children}
          </Box>
        </Box>
      </Box>
    </PrivateRoute>
  );
}

export default Layout;

function botonDashboard(texto: string, link: string) {
  return (
    <Link href={link}>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "#212126",
          color: "#ffffff",
          fontFamily: "Rustica",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "16px",
          textTransform: "none",
          borderColor: "#5682F2",
          "&:hover": {
            backgroundColor: "#3158A3", // Cambia el fondo al pasar el mouse
            borderColor: "#3158A3", // Cambia el borde al pasar el mouse
          },
          "&.Mui-disabled": {
            color: "#9A9A9A",
            backgroundColor: "#6C9FFF",
            // Letra blanca cuando está deshabilitado
          },
        }}
      >
        {texto}
      </Button>
    </Link>
  );
}
