"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha, formatNumber } from "../utils";
import { titleGrid } from "../ChartAddons";

const endpoint = "/inmuebles/perdidas_ganancias_tabla";

type PyGRow = {
  fecha: string;
  gastos: number;
  reserva: number;
  noi: number;
  utilidad_bruta: number;
  ingresos: number;
};

export default function TablePyG() {
  const email = getEmail();

  const [data, setData] = useState<PyGRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

  // Función para formatear las cifras con separadores de miles
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
            {titleGrid("Perdidas y Ganancias portafolio")}
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
                {data.length > 0 &&
                  data.map((row: PyGRow) => (
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
              {data.length > 0 && (
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
                    {data.map((row: any) => (
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
                        ${formatNumber(row.ingresos, 0, false, false, true)}
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
                    {data.map((row: any) => (
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
                        -${formatNumber(row.gastos, 0, false, false, true)}
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
                    {data.map((row: any) => (
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
                        $
                        {formatNumber(
                          row.utilidad_bruta,
                          0,
                          false,
                          false,
                          true
                        )}
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
                    {data.map((row: any) => (
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
                        -${formatNumber(row.reserva, 0, false, false, true)}
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
                    {data.map((row: any) => (
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
                        ${formatNumber(row.noi, 0, false, false, true)}
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
