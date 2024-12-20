"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";

// nivo imports
import { ResponsiveBar } from "@nivo/bar";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import {
  formatFecha,
  formatNumber,
  setTooltipBar,
  generarTicks,
} from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/principal/flujo_real_esperado";
const title = "Flujo real vs. flujo esperado";
const explainText = `Nota: 'Flujo Real' se refiere a los ingresos generado durante el periodo elegido, mientras que 'Flujo Esperado' alude a las proyecciones de ingreso para el mismo intervalo.`;

const tickCount: number = 5;

type Flujos = {
  fecha: string;
  flujo_real: number;
  flujo_esperado: number;
};

export type FlujosFront = {
  fecha: string;
  Real: number;
  Esperado: number;
};

type FlujoRealEsperado = {
  ult_12_meses: Flujos[];
  este_anho: Flujos[];
  ult_6_meses: Flujos[];
};

function BarChartFlujos() {
  const email = getEmail();

  const [data, setData] = useState<FlujoRealEsperado>();
  const [key, setKey] = useState<keyof FlujoRealEsperado>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof FlujoRealEsperado);
  };

  let formattedData: FlujosFront[] = [];
  if (data) {
    formattedData = data[key].map((item: Flujos) => {
      return {
        fecha: item.fecha,
        Real: item.flujo_real,
        Esperado: item.flujo_esperado,
      };
    });
  }

  useEffect(() => {
    if (data) {
      const monthMax = data[key].map((item) =>
        Math.max(item.flujo_real, item.flujo_esperado)
      );
      const maxValue: number = Math.max(...monthMax);
      const ticks = generarTicks(0, maxValue, tickCount);
      setTicks(ticks);
    }
  }, [key, data]);

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
            {titleGrid(title, explainText)}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
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
      keys={["Real", "Esperado"]}
      indexBy="fecha"
      label={() => ""}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.7}
      maxValue={ticks.at(-1)}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#6C6FFF", "#C5F5CA"]} // Define tus propios colores
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
            id: "Real",
          },
          id: "Real",
        },
        {
          match: {
            id: "Esperado",
          },
          id: "Esperado",
        },
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
        tickValues: formattedData.map((item: FlujosFront) => item.fecha),
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
          anchor: "bottom-left",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 54,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
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
