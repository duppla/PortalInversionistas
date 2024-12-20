"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { generarTicks } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";
import { LineChart } from "../LineChartComps";

const endpoint = "/principal/historico_morosidad";

const tickCount = 5;

type TasaMorosidad = {
  fecha: string;
  tasa_morosidad: number;
};

export type TasaMorosidadFront = {
  x: string;
  y: number;
};

type HistoricoMora = {
  ult_12_meses: TasaMorosidad[];
  este_anho: TasaMorosidad[];
  ult_6_meses: TasaMorosidad[];
};

function LineChartHistMora() {
  const email = getEmail();
  const [data, setData] = useState<HistoricoMora>();
  const [key, setKey] = useState<keyof HistoricoMora>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  useEffect(() => {
    if (data) {
      const dataMora = data[key];
      const maxValue = Math.max(
        ...dataMora.map((item: TasaMorosidad) => item.tasa_morosidad)
      );
      const ticks = generarTicks(0, maxValue, tickCount);
      setTicks(ticks);
    }
  }, [key, data]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof HistoricoMora);
  };

  let formattedData: TasaMorosidadFront[] = [];
  if (data) {
    formattedData = data[key].map((item: TasaMorosidad) => ({
      x: item.fecha,
      y: item.tasa_morosidad,
    }));
  }

  /* Mensaje para el tooltip explicativo */
  const minY = (ticks[0] * 100).toFixed(0);
  const maxY = (ticks[ticks.length - 1] * 100).toFixed(0);

  const longText = `Nota: Los valores mostrados en esta gráfica se encuentran en un rango de ${minY}% a ${maxY}% para facilitar su legibilidad. Verifique la escala para una interpretación precisa.`;

  return (
    <div className="grafica-Linecharts-G">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            {titleGrid("Histórico tasa de mora", longText)}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      <br />
      {LineChart(formattedData, "Tasa de mora", ticks, 1, true)}
    </div>
  );
}

export default LineChartHistMora;
