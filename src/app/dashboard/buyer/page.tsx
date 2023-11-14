


import React from 'react'
/* import { useAuth } from './../../context/authContext'; */

import { Grid, Container, Box, Button, ButtonGroup, Typography} from '@mui/material';

function Page() {
 
    

    return (

        <Box sx={{ display: 'flex',backgroundColor: '#272727', mt: 4 }}>
            <Box sx={{ flexGrow: 1,  }}>
        
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, }}
              className=''>
              <Container maxWidth="xl" sx={{ mt: 4, }}>
                <Grid container spacing={1}>
                  {/*Segunda columna principal*/}
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {/* card inicial apartamentos*/}
                    {/* <Migasdepan /> */} migas de pan
                  </Grid>
                  {/*Segunda columna principal*/}
                  <Grid xs={6} sm={6} md={6} lg={6} sx={{
                    display: 'flex', justifyContent: 'end',
                    justifyItems: 'end',
                    alignItems: 'end',
                  }}>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                      sx={{
                        width: 'auto',
                        height: 'auto',

                        borderRadius: '40%',
                        textTransform: 'none',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#5682F2',
                          color: '#fff',

                        },
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: '#1E1E1E',
                          height: '50px',
                          width: '100%',
                          borderRadius: '30%',
                          textTransform: 'none',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#5682F2',
                            color: '#fff',

                          },
                        }}>

                        Asset</Button>

                      <Button sx={{
                        backgroundColor: 'dark',
                        height: '50px',
                        width: '100%',
                        borderRadius: '30%',
                        textTransform: 'none',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#5682F2',
                          color: '#fff',

                        },
                      }}>Buyer</Button>
                    </ButtonGroup>

                  </Grid>
                </Grid>
              </Container>
              <Typography component="h1" variant="h5" sx={{ color: '#5682F2' }}>
                Home
              </Typography>
              <Grid container sx={{
                marginTop: '10px',
              }}>
                {/*Segunda columna principal-datos del inmueble*/}
                <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                  <Grid container sx={{ background: '#F9F9F9', borderColor: '#CAFACA', borderRadius: '20px' }}>
                    <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                      sx={{
                        width: '400px',
                        height: '400px',
                      }}
                      className=''>

                      {/*    <PieChartT />  */} pie

                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                  <Grid container sx={{ background: '#F1F1F1', borderRadius: '20px' }}>
                    <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}

                      sx={{
                        width: '400px',
                        height: '400px',
                      }}>
                      {/*   <BarCharts /> */}  barras

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* prueba de colunmas */}
              <Grid container sx={{
                marginTop: '10px',
              }}>
                {/*Segunda columna principal-datos del inmueble*/}
                <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                  <Grid container sx={{}}>
                    <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                      className='border-cards-componentes centrado'>
                      <div className=''>

                        {/*----------------endpoint  graficas de barras de especificaciones------------------- */}
                        <Grid container sx={{
                          backgroundColor: '',
                          width: '100%',
                          height: '100%',
                        }}>
                          {/*  <Chart /> */} fgrafica
                        </Grid>

                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className='' xs={12} sm={12} md={6} lg={6}>
                  <Grid container sx={{}}>
                    <Grid item spacing={1} xs={12} sm={12} md={12} lg={12}
                      className='border-cards-componentes centrado'>
                      <div className=''>


                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
           
          </Box>
        
        </Box>
    )
}

export default Page