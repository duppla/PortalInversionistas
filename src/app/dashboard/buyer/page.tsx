'use client';
import Link from "next/link";
import React from 'react'
import { useAuth } from './../../context/authContext';
import { Box } from "@mui/material";

function Page() {
    const { logout } = useAuth();

    return (

        <Box sx={{ display: 'flex', backgroundColor: 'red' }}>
        <div>
            
            <h1> Buyer-inversionista pequeño</h1>


            <button onClick={logout}>Cerrar sesión</button>

        </div>
        </Box>
    )
}

export default Page