'use client';
import Image from 'next/image'
import styles from './page.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Script from 'next/script';


import LogoInversionistas from '../img/logoinversionistas.svg'
import { Box, Button, Container, CssBaseline, TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../app/context/authContext';
import swal from 'sweetalert';



const themeCustomer = createTheme({

  palette: {
    primary: {
      main: '#5782F2',
      light: '#E8E9F2',
      dark: '#212126',
      contrastText: '#obobdo'
    },
    secondary: {
      main: '#5782F2',
      light: '#5782F2',
      contrastText: '#47008F',
    },
  },
});



export default function Home() {

  /* useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://web-sdk.smartlook.com/recorder.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []); */

  /*Datos enviados a través del servicio*/
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setDatos((prevDatos) => ({ ...prevDatos, [name]: value }));
  };

  const { login, user, loading } = useAuth();
  const correo = user ? user.email : '';
  const navigate = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(datos.email, datos.password);
      navigate.push('/dashboard/home');

    }

    catch (error) {
      if (error instanceof Error && 'code' in error && typeof error.code === 'string') {
        if (error.code === 'auth/user-not-found') {

          swal({
            text: 'El usuario no se encuentra registrado',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (error.code === 'auth/invalid-email') {
          swal({
            text: 'Ingrese datos validos',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (error.code === 'auth/invalid-login-credentials') {
          swal({
            text: 'La contraseña o correo es incorrecto, intente nuevamente',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        }
        else if (error.code === 'auth/missing-password') {
          swal({
            text: 'Contraseña requerida, intente nuevamente',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else {

          console.error('Error de autenticación:', error);
        }
      }
    }
  }


  return (

    <ThemeProvider theme={themeCustomer} >
      <>
       
      </>


      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <Image className='img-login-logo' src={LogoInversionistas} alt="" />
          </div>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginTop: -2 }}>
            <TextField
              className='miInput'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
              sx={{
                '& label': {
                  color: '#5782F2',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#DADADA',
                  backgroundColor: '#1E1E1E',
                  fontFamily: 'Rustica',
                  fontWeight: '300',

                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              }}
              InputProps={{
                sx: {
                  color: '#DADADA',
                  fontFamily: 'Rustica',

                },
                'inputProps': {
                  'aria-label': 'Email',
                },
              }}
            />

            <TextField
              className='miInput'
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
              autoFocus
              sx={{
                '& label': {
                  color: '#5782F2',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#DADADA',
                  backgroundColor: '#1E1E1E',
                  fontFamily: 'Rustica',

                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',

                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              }}
              InputProps={{
                sx: {
                  color: '#DADADA',
                  fontFamily: 'Rustica',

                },
                'inputProps': {
                  'aria-label': 'Password',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"

              sx={{
                marginTop: '40px',
                mb: 2,
                background: '#5782F2',
                borderRadius: '10px',
                color: '#FFFFFF',
                textTransform: 'none',
                fontFamily: 'Rustica',
                fontWeight: '400',
              }}

            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  )
}
