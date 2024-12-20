"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid } from "../ChartAddons";
import PieChart from "../PieChartComps";

const endpoint = "/clientes/actividad_economica";

type ActividadEconomica = {
  actividad_economica: string;
  count: number;
  porcentaje: number;
};

export type ActividadEconomicaFront = {
  id: string;
  label: string;
  value: number;
  percentage: number;
};

function PieChatActEcon() {
  const email = getEmail();

  const [data, setData] = useState<ActividadEconomica[]>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  let formattedData: ActividadEconomicaFront[] = [];
  if (data) {
    formattedData = data.map((data: ActividadEconomica) => {
      return {
        id: data.actividad_economica,
        label: changeLabel(data.actividad_economica),
        value: data.count,
        percentage: data.porcentaje,
      };
    });
  }

  return (
    <div
      className="grafica-piecharts"
      style={{ position: "relative", width: "100%", height: "380px" }}
    >
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            {titleGrid("Actividad económica", "", -1)}
          </Grid>
        </FormControl>
      </div>

      {formattedData.length > 0 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {PieChart(formattedData)}
        </div>
      )}
    </div>
  );
}

export default PieChatActEcon;

function changeLabel(key: string): string {
  const lowerCaseKey = key ? key.toLowerCase() : "";

  switch (lowerCaseKey) {
    case "empleado":
      return "Empleado";
    case "pensionado":
      return "Pensionado";
    case "independiente":
      return "Independiente";
    case "rentista de capital":
      return "Rentista de capital";
    case "no registra":
      return "No registra";
    default:
      return key; // Devuelve el valor original si no coincide con ninguna etiqueta personalizada
  }
}
