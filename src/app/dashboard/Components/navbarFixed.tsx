"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import LogoInversionistas from "./../../../img/logoinversionistas.svg";
import SettingDupplaMenu from "./../../../img/setting-icon.svg";
import Link from "next/link";

const settings = ["Cerrar Sesión"];

function ResponsiveAppBar() {
  const { logout } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    logout(); // Llama a la función de logout desde el contexto
    handleCloseUserMenu(); // Cierra el menú después de cerrar sesión
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box
            /* className= 'icon-setting-navbar' */ sx={{
              position: "absolute",
              right: 0,
              mt: 6,
              mr: 1,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                className=""
                sx={{ justifyContent: "flex-end" }}
              >
                <Image
                  src={SettingDupplaMenu}
                  alt=""
                  className=""
                  width={48}
                  height={48}
                />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                mt: "45px",
              }}
            >
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{
                  // Fondo del menú
                  mt: "45px",
                }}
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Cerrar Sesión"
                        ? handleLogout
                        : handleCloseUserMenu
                    }
                  >
                    <Typography
                      sx={{
                        fontFamily: "Rustica",
                        color: "#ffffff" /* fontSize:'26px', mt:2 */,
                      }}
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
