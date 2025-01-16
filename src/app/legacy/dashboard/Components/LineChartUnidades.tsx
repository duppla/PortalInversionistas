"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// custom imports
import { titleGrid } from "./ChartAddons";
import { generarTicks } from "./utils";

import { LineChart } from "./LineChartComps";

const tickCount = 4;

type UnidadesFront = {
  x: string;
  y: number;
};

const LineChartUnidades = (props: Readonly<{ fechas: string[]; num_unidades: number[]; }>) => {
  const [ticks, setTicks] = useState<number[]>([]);

  let formattedData: UnidadesFront[] = [];
  if (props.fechas) {
    formattedData = props.fechas.map((item: string, index: number) => ({
      x: item,
      y: props.num_unidades[index],
    }));
  }

  useEffect(() => {
    let minValue = Math.min(...props.num_unidades);
    let maxValue = Math.max(...props.num_unidades);
    if (minValue === maxValue) {
      minValue = 0;
    }
    const ticks = generarTicks(minValue, maxValue, tickCount);
    setTicks(ticks);
  }, [props.fechas, props.num_unidades]);

  return (
    <div className="grafica-Linecharts">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            {titleGrid("Número de unidades del portafolio")}
          </Grid>
        </FormControl>
      </div>
      <br />
      {LineChart(formattedData, "Unidades", ticks, 2, false, true)}
    </div>
  );

};

export default LineChartUnidades;
