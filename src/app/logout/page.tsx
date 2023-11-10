'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "../context/authContext";
import React, { MouseEvent } from 'react';


const Page: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      await logout();
      // Puedes realizar acciones adicionales después del cierre de sesión si es necesario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      {/* Contenido de tu componente */}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Page
