'use client';

import React from 'react'
/* import { useAuth } from './../../context/authContext'; */
import { Box } from "@mui/material";

function Page() {
 
    const isBrowser = typeof window !== 'undefined';

    return (

        <Box sx={{ display: 'flex', backgroundColor: 'red' }}>
            {isBrowser && window.location && window.location.pathname === '/dashboard/buyer' && (
                <div>
                    <h1> Buyer-inversionista pequeño</h1>
                </div>
            )}
        <div>
            
            <h1> Buyer-inversionista pequeño</h1>

            

        </div>
        </Box>
    )
}

export default Page