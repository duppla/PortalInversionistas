'use client'
import { ReactNode } from "react";
import PrivateRoute from "../login/privateRoute";
import Navbar from './Components/navbarFixed';
import { useAuth } from "../context/authContext";
import { Box, Container, Grid, Button, ButtonGroup, Typography, Stack } from "@mui/material";
import Link from "next/link";

function Layout({ children }: { children: ReactNode; }) {

  const { logout } = useAuth();

  return (
    <PrivateRoute>
      <Box sx={{ display: 'flex', }}>
        <Box id='contenidoInmueble'
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            height: '100vh',
          }}
        >
          {/*Nabvar fixed Mui*/}
          <Navbar />

          {/*----------------------------visualización dashboard-------------------------------------------- */}
          <Box sx={{ flexGrow: 1, backgroundColor: '#272727', mt: 4, borderTopLeftRadius: '39px', borderTopRightRadius: '39px' }}>

            <Box >
              <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}
                className=''>
                <Container maxWidth="xl" sx={{ mt: 4, }}>
                  <Grid container spacing={1}>
                    {/*Segunda columna principal*/}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      {/* card inicial apartamentos*/}

                      <Typography component="h1" variant="h5" sx={{ color: '#5682F2', fontFamily: 'Roboto', }}>
                        Dashboard principal
                      </Typography>
                    </Grid>
                    {/*Segunda columna principal*/}
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{
                      display: 'flex', justifyContent: 'end',
                      justifyItems: 'end',
                      alignItems: 'end',
                    }}>
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                        <Link href="/dashboard/home">
                          <Button variant="outlined" sx={{
                            backgroundColor: '#272727',
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            textTransform: 'none',
                            width: '120px',
                            borderColor: '#5682F2',
                          }}>
                            Principal
                          </Button>
                        </Link>
                        <Link href="/dashboard/home/institucionalInvestors/property">
                          <Button variant="outlined" sx={{
                            backgroundColor: '#272727',
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            textTransform: 'none',
                            width: '120px',
                            borderColor: '#5682F2',
                          }}>
                            Property
                          </Button>
                        </Link>
                        <Link href="/dashboard/home/institucionalInvestors/customer">
                          <Button variant="outlined" sx={{
                            backgroundColor: '#272727',
                            color: '#ffffff',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            textTransform: 'none',
                            width: '120px',
                            borderColor: '#5682F2',
                          }}>
                            Buyer
                          </Button>
                        </Link>

                      </Stack>
                    </Grid>
                  </Grid>
                </Container>
              </Container>

            </Box>


            {children}
            <button onClick={logout}>Cerrar sesión</button>
          </Box>

          {/*------------------------------------------------------------------------ */}


        </Box>
      </Box>
    </PrivateRoute>
  )
}

export default Layout
