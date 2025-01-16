"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// custom imports
import { LineChart } from "./LineChartComps";
import { generarTicks } from "./utils";
import { titleGrid } from "./ChartAddons";

const tickCount = 5;

export type RentabilidadFront = {
  x: string;
  y: number;
};

const LineChartRentabilidad = (props: { fechas: string[]; rentabilidad: number[] }) => {
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const maxValue = Math.max(...props.rentabilidad);
    const minValue = Math.min(...props.rentabilidad);
    const ticks = generarTicks(minValue, maxValue, tickCount);
    setTicks(ticks);
  }, [props.fechas, props.rentabilidad]);

  let formattedData: RentabilidadFront[] = [];
  formattedData = props.fechas.map((item: string, index: number) => ({
    x: item,
    y: props.rentabilidad[index],
  }));

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
            {titleGrid("Rentabilidad mensual del portafolio")}
          </Grid>
        </FormControl>
      </div>
      <br />
      {LineChart(formattedData, "Rentabilidad", ticks, 2, true, false)}
    </div>
  );
};

export default LineChartRentabilidad;
