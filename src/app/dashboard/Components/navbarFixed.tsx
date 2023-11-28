'use client'

import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import LogoInversionistas from './../../../img/logoinversionistas.svg';
import SettingDupplaMenu from './../../../img/setting-icon.svg';



const settings = ['Cerrar Sesión'];

function ResponsiveAppBar() {
  const { logout } = useAuth();


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleLogout = () => {
    logout();  // Llama a la función de logout desde el contexto
    handleCloseUserMenu();  // Cierra el menú después de cerrar sesión
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className='colorBackgroundPrincipal'  sx={{ width: '100%' }}>
      <Box maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%' }}>

          <Container sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          /*   maxWidth: '100%', */
            padding: '0px',
            margin: '0px',
            /*  backgroundColor: 'red', */

          }} >

            <Image src={LogoInversionistas} alt="" className='img-home' width={492} height={287} />
          </Container>

          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}



          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


          </Box>

          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',  // Añade esta línea para centrar verticalmente
            width: '100%',
            paddingRight: '16px',  // Ajusta el espacio derecho según sea necesario
          }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image src={SettingDupplaMenu} alt="" className='' width={48} height={48} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Cerrar Sesión' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;