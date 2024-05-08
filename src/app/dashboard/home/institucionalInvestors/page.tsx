"use client";
import { Box, Button } from "@mui/material";
import React from "react";
import { useAuth } from "../../../context/authContext";

const InversionistaInstitucional = () => {
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "blue", mt: 4 }}>
      <h1>Inversionista institucional</h1>
      {/* Add your component code here */}
      <Button
        sx={{ flexGrow: 1, backgroundColor: "red", mt: 4 }}
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default InversionistaInstitucional;
