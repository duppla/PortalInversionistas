'use client'
import { ReactNode } from "react";

import { Box, Container, Grid, Button, ButtonGroup, Typography, Stack } from "@mui/material";
import Link from "next/link";
import Navbar from '../../Components/navbarFixed';
function Layout({ children }: { children: ReactNode; }) {



    return (
        <Box sx={{ display: 'flex' }}>          

            {/*----------------------------Descripción inmueble y gráficas barras de progreso-------------------------------------------- */}
            <Box sx={{ flexGrow: 1, mt: 4 }}>               
                {children}
            </Box>
            {/*------------------------------------------------------------------------ */}
        </Box>



    )
}

export default Layout
