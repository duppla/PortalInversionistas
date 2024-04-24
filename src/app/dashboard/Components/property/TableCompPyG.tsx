"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";
import formatFecha from "../utils";

interface DataApiType {
  fecha: string;
  gastos: number;
  reserva: number;
  noi: number;
  utilidad_bruta: number;
  ingresos: number;
}

export default function TableCompPyG() {
  const { userEmail } = useAuth();
  const [responseData, setResponseData] = useState<DataApiType[]>([]);

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const queryParameter = userEmail;
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: { "User-Agent": "insomnia/2023.5.8" },
        };
        const response = await fetch(
          getApiUrl(
            `/inmuebles/perdidas_ganancias_tabla?email=${queryParameter}`
          ),
          options
        );
        const responseData = await response.json();

        setResponseData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userEmail]);

  // Función para formatear las cifras con separadores de miles
  const formatNumber = (value: any) => {
    // Verificar si el valor es numérico antes de aplicar el formato
    if (!isNaN(value) && typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="custom-table nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            <Grid xs={6} md={6} lg={6}>
              <Typography
                className="title-dropdown-menu-container"
                variant="subtitle1"
                sx={{
                  fontFamily: "Helvetica",
                  fontWeight: 300,
                  color: "#ffffff",
                  fontSize: "26px",
                  mt: 2,
                }}
              >
                Perdidas y Ganancias portafolio
              </Typography>
            </Grid>
            {/*   <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Age"
                                onChange={handleSelectChange}
                               

                                sx={{
                                    color: '#9B9EAB', justifyContent: 'flex-end', textAlign: 'end', fill: '#ffffff', '&.MuiSelect-icon': { color: '#FFFFFF !important' },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },

                                }}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                  
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#212126', // Fondo del menú desplegado
                                            border: '1px solid #5682F2', // Borde azul
                                            color: '#9B9EAB', // Letra blanca
                                        },
                                    },
                                }}
                                open={menuOpen}
                                onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
                                onOpen={() => setMenuOpen(true)}   // Abre el menú cuando se hace clic en el botón

                                IconComponent={() => (
                                    // Cambia el ícono según el estado del menú
                                    menuOpen ? (
                                        <ArrowDropUpIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    ) : (
                                        <ArrowDropDownIcon
                                            style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        />
                                    )
                                )}
                            >
                                <MenuItem value='este_anho'>Este año</MenuItem>
                                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
                            </Select>
                        </Grid> */}
          </Grid>
        </FormControl>
      </div>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <TableContainer sx={{ mt: 4 }}>
          <Table
            sx={{ minWidth: 550, background: "#212126" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#6C9FFF",
                    textAlign: "center",
                    fontFamily: "Rustica",
                    fontSize: "20px",
                    minWidth: 170,
                  }}
                  align="right"
                ></TableCell>
                {responseData &&
                  responseData.length > 0 &&
                  responseData.map((row: any, index: any) => (
                    <TableCell
                      key={row.fecha}
                      sx={{
                        color: "#9B9EAB",
                        textAlign: "end",
                        minWidth: 170,
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                      }}
                      align="right"
                    >
                      {formatFecha(row.fecha)}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responseData &&
                Array.isArray(responseData) &&
                responseData.length > 0 && (
                  <>
                    <TableRow
                      key="ingresos"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "#9B9EAB",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#6C9FFF",
                          textAlign: "left",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          minWidth: 170,
                        }}
                        align="right"
                      >
                        Ingresos
                      </TableCell>
                      {responseData.map((row: any) => (
                        <TableCell
                          key={row.fecha}
                          sx={{
                            color: "#9B9EAB",
                            textAlign: "end",
                            minWidth: 170,
                            fontFamily: "Rustica",
                            fontSize: "1rem",
                          }}
                          align="right"
                        >
                          ${formatNumber(row.ingresos)}
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow
                      key="gastos"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "#9B9EAB",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#6C9FFF",
                          textAlign: "left",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          minWidth: 170,
                        }}
                        align="right"
                      >
                        Gastos
                      </TableCell>
                      {responseData.map((row: any) => (
                        <TableCell
                          key={row.fecha}
                          sx={{
                            color: "#9B9EAB",
                            textAlign: "end",
                            minWidth: 170,
                            fontFamily: "Rustica",
                            fontSize: "1rem",
                          }}
                          align="right"
                        >
                          $-{formatNumber(row.gastos)}
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow
                      key="utilidad_bruta"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "#9B9EAB",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#6C9FFF",
                          textAlign: "left",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          minWidth: 170,
                        }}
                        align="right"
                      >
                        Utilidad bruta
                      </TableCell>
                      {responseData.map((row: any) => (
                        <TableCell
                          key={row.fecha}
                          sx={{
                            color: "#9B9EAB",
                            textAlign: "end",
                            minWidth: 170,
                            fontFamily: "Rustica",
                            fontSize: "1rem",
                          }}
                          align="right"
                        >
                          ${formatNumber(row.utilidad_bruta)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow
                      key="reserva"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "#9B9EAB",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#6C9FFF",
                          textAlign: "left",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          minWidth: 170,
                        }}
                        align="right"
                      >
                        Reserva
                      </TableCell>
                      {responseData.map((row: any) => (
                        <TableCell
                          key={row.fecha}
                          sx={{
                            color: "#9B9EAB",
                            textAlign: "end",
                            minWidth: 170,
                            fontFamily: "Rustica",
                            fontSize: "1rem",
                          }}
                          align="right"
                        >
                          $-{formatNumber(row.reserva)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow
                      key="noi"
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "#9B9EAB",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#6C9FFF",
                          textAlign: "left",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          minWidth: 170,
                        }}
                        align="right"
                      >
                        NOI
                      </TableCell>
                      {responseData.map((row: any) => (
                        <TableCell
                          key={row.fecha}
                          sx={{
                            color: "#9B9EAB",
                            textAlign: "end",
                            minWidth: 170,
                            fontFamily: "Rustica",
                            fontSize: "1rem",
                          }}
                          align="right"
                        >
                          ${formatNumber(row.noi)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
