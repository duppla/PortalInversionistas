"use client";
import Image from "next/image";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LogoInversionistas from "../img/logoinversionistas.svg";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useAuth } from "../app/context/authContext";
import swal from "sweetalert";
import ContentLoader from "react-content-loader";

const themeCustomer = createTheme({
  palette: {
    primary: {
      main: "#5782F2",
      light: "#E8E9F2",
      dark: "#212126",
      contrastText: "#obobdo",
    },
    secondary: {
      main: "#5782F2",
      light: "#5782F2",
      contrastText: "#47008F",
    },
  },
});

declare global {
  interface Window {
    smartlook: (action: string, key: string, options: object) => void;
  }
}

export default function Home() {
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDatos((prevDatos) => ({ ...prevDatos, [name]: value }));
  };

  const { login } = useAuth();
  const navigate = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(datos.email, datos.password);
      setIsLoading(false);
      navigate.push("/dashboard/home");
    } catch (error) {
      setIsLoading(false);
      if (
        error instanceof Error &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        if (error.code === "auth/user-not-found") {
          swal({
            text: "El usuario no se encuentra registrado",
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-login-credentials"
        ) {
          swal({
            text: "La contraseña o correo es incorrecto, intente nuevamente",
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (error.code === "auth/invalid-email") {
          swal({
            text: "Ingrese datos validos",
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else if (error.code === "auth/missing-password") {
          swal({
            text: "Contraseña requerida, intente nuevamente",
            icon: "info",
            buttons: ["Cerrar"],
            timer: 5000,
          });
        } else {
          console.error("Error de autenticación:", error);
        }
      }
    }
  };

  return (
    <ThemeProvider theme={themeCustomer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Image
              className="img-login-logo"
              src={LogoInversionistas}
              alt="Inversionistas logo"
              priority
            />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ marginTop: -2 }}
          >
            <TextField
              className="miInput"
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
                "& label": {
                  color: "#5782F2",
                },
                "& .MuiOutlinedInput-input": {
                  color: "#DADADA",
                  backgroundColor: "#1E1E1E",
                  fontFamily: "Rustica",
                  fontWeight: "300",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
              }}
              InputProps={{
                sx: {
                  color: "#DADADA",
                  fontFamily: "Rustica",
                },
                inputProps: {
                  "aria-label": "Email",
                },
              }}
            />

            <TextField
              className="miInput"
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
                "& label": {
                  color: "#5782F2",
                },
                "& .MuiOutlinedInput-input": {
                  color: "#DADADA",
                  backgroundColor: "#1E1E1E",
                  fontFamily: "Rustica",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
              }}
              InputProps={{
                sx: {
                  color: "#DADADA",
                  fontFamily: "Rustica",
                },
                inputProps: {
                  "aria-label": "Password",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                marginTop: "40px",
                mb: 2,
                background: "#5782F2",
                borderRadius: "10px",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: "Rustica",
                fontWeight: "400",
              }}
            >
              {isLoading ? (
                <ContentLoader
                  speed={2}
                  width={89}
                  height={20}
                  viewBox="0 0 89 100"
                  backgroundColor="#ffffff"
                  foregroundColor="#eeebea"
                >
                  <svg d="M56.916 52.915h-0.003a2.728 2.728 0 0-2.728 2.729v0.002a2.728 2.728 0 2.728 2.729h0.003a2.728 2.728 0 2.728-2.729v-0.002a2.729 2.729 0 0-2.728-2.729z" />
                  <path d="M44.416 0C19.926 0 0 19.926 0 44.416v46.376h8.778v8.56h71.279v-8.56h8.778V44.416C88.835 19.926 68.909 0 44.416 0zm32.636 96.348H11.78v-5.556h65.27v5.556zm8.778-8.56H3.002v-5.556H85.83v5.555zm-9.398-8.558h-7.106V43.866c0-13.736-11.177-24.913-24.912-24.913-13.736 0-24.913 11.175-24.913 24.913V79.23h-7.106V43.693c0-17.653 14.363-32.016 32.019-32.016 17.655 0 32.015 14.363 32.015 32.016V79.23h0.003zm-10.108 0H22.509V43.866c0-12.082 9.828-21.908 21.91-21.908 12.081 0 21.907 9.829 21.907 21.908V79.23h-0.002zm13.113 0V43.693c0-19.31-15.709-35.02-35.02-35.02-19.313 0-35.019 15.71-35.019 35.023v35.536H3.002V44.42c0-22.838 18.581-41.417 41.417-41.417 22.835 0 41.414 18.579 41.414 41.414V79.23h-6.396z" />
                </ContentLoader>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
