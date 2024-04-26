"use client";
import { ReactNode } from "react";

import { Box } from "@mui/material";
function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/*----------------------------Descripción inmueble y gráficas barras de progreso-------------------------------------------- */}
      <Box sx={{ flexGrow: 1, mt: 1 }}>{children}</Box>
      {/*------------------------------------------------------------------------ */}
    </Box>
  );
}

export default Layout;
