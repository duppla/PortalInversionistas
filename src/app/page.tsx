import Image from 'next/image'
import styles from './page.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthProvider from '../app/context/authContext';
import LogoInversionistas from '../img/logoinversionistas.svg'
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import Link from 'next/link';


export default function Home() {
  return (

    <AuthProvider>
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
          <Box component="form" noValidate sx={{ marginTop: '35px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                labelColor: '#ffffff',
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

            <Link href='/Register'>
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
            </Link>

          </Box>
        </Box>

      </Container>
    </AuthProvider>
  )
}
