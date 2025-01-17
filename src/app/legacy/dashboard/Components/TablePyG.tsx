"use client";
// react imports
import React from "react";

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
import { formatFecha, formatNumber } from "./utils";
import { titleGrid } from "./ChartAddons";

type PyGRow = {
  fecha: string;
  gastos: number; //opex
  reserva: number; //reserva predial + reserva mantenimiento + reserva capex
  noi: number; //noi ajustado
  utilidad_bruta: number; //noi
  ingresos: number; //venta total + reduc cartera
};

export default function TablePyG(props: Readonly<{ fechas: string[]; opex: number[]; reserva_predial: number[]; reserva_mantenimiento: number[]; reserva_capex: number[]; noi_ajustado: number[]; noi: number[]; venta_total: number[]; reduc_cartera: number[]; }>) {
  let formattedData: PyGRow[] = [];

  const max_months = 5;
  // if the length of the fechas array is greater than max_months just take the last 4 elements
  if (props.fechas.length > max_months) {
    formattedData = props.fechas.slice(-max_months).map((item: string, index: number) => ({
      fecha: item,
      gastos: props.opex.slice(-max_months)[index],
      reserva: props.reserva_predial.slice(-max_months)[index] + props.reserva_mantenimiento.slice(-max_months)[index] + props.reserva_capex.slice(-max_months)[index],
      noi: props.noi_ajustado.slice(-max_months)[index],
      utilidad_bruta: props.noi.slice(-max_months)[index],
      ingresos: props.venta_total.slice(-max_months)[index] + props.reduc_cartera.slice(-max_months)[index],
    }));
  }
  else {
    formattedData = props.fechas.map((item: string, index: number) => ({
      fecha: item,
      gastos: props.opex[index],
      reserva: props.reserva_predial[index] + props.reserva_mantenimiento[index] + props.reserva_capex[index],
      noi: props.noi_ajustado[index],
      utilidad_bruta: props.noi[index],
      ingresos: props.venta_total[index] + props.reduc_cartera[index],
    }));
  }

  const padRight = "60px";
  const posColor = "#9B9EAB";
  const negColor = "#f18282";
  return (
    <div className="nivo-text">
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
            <TableHead key="table_head">
              <TableRow key="first_row">
                <TableCell
                  sx={{
                    color: "#6C9FFF",
                    textAlign: "center",
                    fontFamily: "Rustica",
                    fontSize: "20px",
                  }}
                  align="right"
                  key="empty_cell"
                ></TableCell>
                {formattedData.length > 0 &&
                  formattedData.map((row: PyGRow, index: number) => (
                    <>
                      <TableCell key={"empty_cell_2" + index}></TableCell>
                      <TableCell
                        key={row.fecha + index}
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
              {formattedData.length > 0 && (
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
                    {formattedData.map((row: PyGRow) =>
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
                    {formattedData.map((row: PyGRow) =>
                      dollarValuePairCells(row.gastos, negColor, padRight)
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
                    {formattedData.map((row: PyGRow) =>
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
                    {formattedData.map((row: PyGRow) =>
                      dollarValuePairCells(row.reserva, negColor, padRight)
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
                    {formattedData.map((row: PyGRow) =>
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
