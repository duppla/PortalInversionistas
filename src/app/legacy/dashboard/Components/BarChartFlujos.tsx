"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// nivo imports
import { ResponsiveBar } from "@nivo/bar";

// custom imports
import {
  formatFecha,
  formatNumber,
  setTooltipBar,
  generarTicks,
} from "./utils";
import { titleGrid } from "./ChartAddons";

const title = "Dispersión de pagos";

const tickCount: number = 5;

export type FlujosFront = {
  x: string;
  Flujo: number;
  Adelanto: number;
  "Reducción cartera": number;
  "NOI ajustado": number;
};

function BarChartFlujos(props: Readonly<{ fechas: string[]; flujo: number[]; adelanto: number[]; reduccion_cartera: number[]; noi_ajustado: number[] }>) {
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const maxValue = Math.max(...props.flujo);
    const ticks = generarTicks(0, maxValue, tickCount);
    setTicks(ticks);
  }, [props.fechas, props.flujo]);

  let formattedData: FlujosFront[] = [];
  formattedData = props.fechas.map((item: string, index: number) => ({
    x: item,
    Flujo: props.flujo[index],
    Adelanto: props.adelanto[index],
    "Reducción cartera": props.reduccion_cartera[index],
    "NOI ajustado": props.noi_ajustado[index],
  }));

  return (
    <div className="grafica-barcharts nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            {titleGrid(title)}
          </Grid>
        </FormControl>
      </div>
      {BarChart(formattedData, ticks, 1, false, true)}
    </div>
  );
}

function BarChart(
  formattedData: FlujosFront[],
  ticks: number[],
  decimal: number = 0,
  perc: boolean = false,
  drop_end_zeros: boolean = true
) {
  if (formattedData == null) {
    return <div></div>;
  }
  return (
    <ResponsiveBar
      data={formattedData}
      keys={["Adelanto", "Reducción cartera", "NOI ajustado"]}
      indexBy="x"
      label={() => ""}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.7}
      maxValue={ticks.at(-1)}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#723DFD", "#28ACFF", "#5ED1B1"]} // Define tus propios colores
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#9B9EAB", // Color del texto en los ejes
            },
          },
        },
        legends: {
          text: {
            fill: "#9B9EAB", // Color del texto de las leyendas
          },
        },
        tooltip: {
          container: {
            background: "black", // Fondo del tooltip
            color: "#9B9EAB", // Color del texto del tooltip
          },
        },
        grid: {
          line: {
            stroke: "#41434C" /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
          },
        },
      }}
      fill={[
        {
          match: {
            id: "y",
          },
          id: "y",
        }
      ]}
      borderRadius={3}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.4]],
      }}
      tooltip={(point) => setTooltipBar(point, decimal)}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        tickValues: formattedData.map((item: FlujosFront) => item.x),
        format: (value) => formatFecha(value),
      }}
      gridYValues={ticks}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: ticks,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
        format: (value) => formatNumber(value, decimal, perc, drop_end_zeros),
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 54,
          itemsSpacing: 10,
          itemDirection: "left-to-right",
          itemWidth: 150,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "square",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
    />
  );
}

export default BarChartFlujos;
