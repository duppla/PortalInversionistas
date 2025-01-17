"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// custom imports
import { generarTicks } from "./utils";
import { titleGrid } from "./ChartAddons";
import { LineChart } from "./LineChartComps";

const tickCount = 5;

export type TasaMorosidadFront = {
  x: string;
  y: number;
};

function LineChartHistMora(props: Readonly<{ fechas: string[]; tasa_mora: number[] }>) {
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    let minValue = Math.min(...props.tasa_mora);
    let maxValue = Math.max(...props.tasa_mora);
    if (minValue === maxValue) {
      minValue = -0.01;
      maxValue = 0.01;
    }
    const ticks = generarTicks(minValue, maxValue, tickCount);
    setTicks(ticks);
  }, [props.fechas, props.tasa_mora]);



  let formattedData: TasaMorosidadFront[] = [];
  formattedData = props.fechas.map((item: string, index: number) => ({
    x: item,
    y: props.tasa_mora[index],
  }));

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
            {titleGrid("Histórico tasa de mora")}
          </Grid>
        </FormControl>
      </div>
      <br />
      {LineChart(formattedData, "Tasa de mora", ticks, 2, true)}
    </div>
  );
}

export default LineChartHistMora;
