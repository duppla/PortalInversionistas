'use client';
import Image from 'next/image'
import styles from './page.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LogoInversionistas from '../img/logoinversionistas.svg'
import { Box, Button, Container, CssBaseline, TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
/* import {useRouter} from "next/router";
 */

import { useState, FormEvent } from 'react';
import { useAuth } from '../app/context/authContext';

import swal from 'sweetalert';

/* import { Router } from 'next/router'; */

const themeCustomer = createTheme({
 
  palette: {
      primary: {
          main: '#ffffff',
          contrastText: '#ffffff',
      },
      secondary: {
          main: '#6C9FFF',
      },
  },
});





export default function Home() {

  /*Datos enviados a través del servicio*/
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  })

  /*Función manejo de cambios en los inputs, maneja un evento e*/
 /*  const handleChange = ({ target: { name, value } }) => {
    setDatos({ ...datos, [name]: value })
  } */
/*   const handleChange = ({ target: { name, value } }) => {
    setDatos((prevDatos) => ({ ...prevDatos, [name]: value }));
  }; */

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setDatos((prevDatos) => ({ ...prevDatos, [name]: value }));
  };

  const { login, user, loading } = useAuth();
  const correo = user ? user.email : '';
  /* const navigate = useNavigate('/'); */
  const navigate = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);




  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(datos.email, datos.password);
      navigate.push('/dashboard/buyer');
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
            text: 'El correo es inválido',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (error.code === 'auth/wrong-password') {
      
          swal({
            text: 'La contraseña es incorrecta, intente nuevamente',
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else {
          // Otro manejo de errores de autenticación de Firebase
          console.error('Error de autenticación:', error);
        }
      
      }
    }
  }


  return (

    <ThemeProvider theme={themeCustomer} >
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <Image src={LogoInversionistas} alt="" width={492} height={287} />
        </div>
        <Typography component="h1" variant='h5' sx={{
          marginTop: '18px',
          color: '#ffffff',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontSize: '36px',
          fontWeight: 'bold',

        }}>
          Portal Inversionistas
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginTop: '35px' }}>
          <TextField
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
              labelColor: '#ffffff',
              color: '#ffffff'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
            sx={{
              labelColor: '#ffffff',
              color: '#ffffff'
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: '40px',
              mb: 2,
              background: '#6C9FFF',
              borderRadius: '10px',
              color: '#FFFFFF',
            }}

          >
            Iniciar sesión
          </Button>

          {/* <Link href='/Register'>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 0, mb: 2,
                background: '#6C9FFF',
                borderRadius: '10px',
                color: '#FFFFFF',
                marginBottom: '80px',

              }}
            >
              Registrarse
            </Button>
          </Link> */}

        </Box>
      </Box>

    </Container>
    </ThemeProvider>

  )
}
