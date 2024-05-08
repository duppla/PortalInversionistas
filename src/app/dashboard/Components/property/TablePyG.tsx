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
import { FormControl } from "@mui/material";

// custom imports
import fetchData from "../../../url/ApiConfig";
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
    fetchData(endpoint, email, setData);
  }, [email]);

  const padRight = "60px";
  const posColor = "#9B9EAB";
  const negColor = "#f18282";
  return (
    <div className="custom-table nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid " + posColor }}
          >
            {titleGrid("Perdidas y Ganancias portafolio", "", 2, 1)}
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
          <Table sx={{ background: "#212126" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  padding="none"
                  sx={{
                    color: "#6C9FFF",
                    textAlign: "center",
                    fontFamily: "Rustica",
                    fontSize: "20px",
                  }}
                  align="right"
                ></TableCell>
                {data.length > 0 &&
                  data.map((row: PyGRow) => (
                    <>
                      <TableCell></TableCell>
                      <TableCell
                        key={row.fecha}
                        sx={{
                          color: "#9B9EAB",
                          textAlign: "end",
                          fontFamily: "Rustica",
                          fontSize: "1rem",
                          paddingRight: padRight,
                        }}
                      >
                        {formatFecha(row.fecha)}
                      </TableCell>
                    </>
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
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                        minWidth: "170px",
                      }}
                    >
                      Ingresos
                    </TableCell>
                    {data.map((row: PyGRow) =>
                      dollarValuePairCells(row.ingresos, posColor, padRight)
                    )}
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
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                      }}
                    >
                      Gastos
                    </TableCell>
                    {data.map((row: PyGRow) =>
                      dollarValuePairCells(-row.gastos, negColor, padRight)
                    )}
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
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                      }}
                    >
                      Utilidad bruta
                    </TableCell>
                    {data.map((row: PyGRow) =>
                      dollarValuePairCells(
                        row.utilidad_bruta,
                        posColor,
                        padRight
                      )
                    )}
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
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                      }}
                    >
                      Reserva
                    </TableCell>
                    {data.map((row: PyGRow) =>
                      dollarValuePairCells(-row.reserva, negColor, padRight)
                    )}
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
                        fontFamily: "Rustica",
                        fontSize: "1rem",
                      }}
                    >
                      NOI
                    </TableCell>
                    {data.map((row: PyGRow) =>
                      dollarValuePairCells(row.noi, posColor, padRight)
                    )}
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

function dollarSignCell(color: string) {
  return (
    <TableCell
      sx={{
        color: color,
        textAlign: "end",
        fontFamily: "Rustica",
        fontSize: "1rem",
      }}
    >
      $
    </TableCell>
  );
}

function valueCell(value: number, color: string, paddingRight: string) {
  return (
    <TableCell
      sx={{
        color: color,
        textAlign: "end",
        fontFamily: "Rustica",
        fontSize: "1rem",
        paddingRight: paddingRight,
      }}
    >
      {formatNumber(value, 0, false, false, true)}
    </TableCell>
  );
}

function dollarValuePairCells(
  value: number,
  color: string,
  paddingRight: string
) {
  return (
    <>
      {dollarSignCell(color)}
      {valueCell(value, color, paddingRight)}
    </>
  );
}
