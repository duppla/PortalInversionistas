'use client'
import { ReactNode } from "react";

import { Box, Container, Grid, Button, ButtonGroup, Typography, Stack } from "@mui/material";
import Link from "next/link";

function Layout({ children }: { children: ReactNode; }) {



    return (

        <Box sx={{ display: 'flex' }}>
        {/*----------------------------Descripción inmueble y gráficas barras de progreso-------------------------------------------- */}
        <Box sx={{ flexGrow: 1, backgroundColor: 'yellow', mt: 4 }}>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'end', alignContent: 'end', alignItems: 'end' }}>
                <Grid sx={{ flexGrow: 1, backgroundColor: 'red' }} container spacing={2}>
                    <Grid item xs={12} md={6} lg={6} sx={{ backgroundColor: 'blue' }}>
                        Migas de pan
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sx={{ backgroundColor: 'green',  }}>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                            <Link href="/dashboard/buyer/institutionalInvestors/property">
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
                            <Link href="/dashboard/buyer/institutionalInvestors/customer">
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
            {children}
        </Box>
        {/*------------------------------------------------------------------------ */}
    </Box>
    


    )
}

export default Layout
