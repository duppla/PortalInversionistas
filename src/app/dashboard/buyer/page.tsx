'use client';
import Link from "next/link";
import React from 'react'
import { useAuth } from './../../context/authContext';

function Page() {
    const { logout } = useAuth();

    return (
        <div>
            <h1> Buyer-inversionista pequeño</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    )
}

export default Page