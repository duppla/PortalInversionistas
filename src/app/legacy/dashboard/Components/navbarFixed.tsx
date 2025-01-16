"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import LogoInversionistas from "../../../../img/logoinversionistas.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ResponsiveAppBar() {
  const { logout } = useAuth();
  const navigate = useRouter();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    logout(); // Llama a la función de logout desde el contexto
    handleCloseUserMenu(); // Cierra el menú después de cerrar sesión
    navigate.push("/"); // Redirecciona a la página de inicio
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      className="colorBackgroundPrincipal"
      sx={{ width: "100%" }}
    >
      <Box maxWidth="xl">
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              height: "100%",
              width: "100%",
              padding: "0px",
              margin: "0px",
            }}
          >
            <Link href="/dashboard/principal">
              <Image
                src={LogoInversionistas}
                alt="Inversionistas logo"
                className="img-home"
                priority
              />
            </Link>
          </Container>

          <Box sx={{ position: "absolute", right: 0, mt: 6, mr: 1 }}>
            <Box sx={{ mt: "45px" }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser} //la referencia para la posicion
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: "#212126", // Fondo del menú desplegado
                      border: "1px solid #5682F2", // Borde azul
                      color: "#9B9EAB", // Letra blanca
                    },
                  },
                }}
              >
                <MenuItem key={"Cerrar Sesión"} onClick={handleLogout}>
                  <Typography
                    sx={{ fontFamily: "Rustica", color: "#ffffff" }}
                    textAlign="center"
                  >
                    {"Cerrar Sesión"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
