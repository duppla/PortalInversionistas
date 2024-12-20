"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";

// nivo imports
import { ResponsiveLine } from "@nivo/line";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid, selectGrid } from "../ChartAddons";
import { formatFecha, generarTicks, setTooltipLine } from "../utils";

const endpoint = "/inmuebles/numero_unidades";
const tickCount = 4;

type Unidades = {
  fecha: string;
  unidades: number;
};

export type TramoUnidades = {
  ult_12_meses: Unidades[];
  este_anho: Unidades[];
  ult_6_meses: Unidades[];
};

type UnidadesFront = {
  x: string;
  y: number;
};

const LineChartUnidades = () => {
  const email = getEmail();

  const [data, setData] = useState<TramoUnidades>();
  const [key, setKey] = useState<keyof TramoUnidades>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  let formattedData: UnidadesFront[] = [];
  if (data) {
    formattedData = data[key].map((item: Unidades) => ({
      x: item.fecha,
      y: item.unidades,
    }));
  }

  useEffect(() => {
    if (data) {
      const unidades = data[key].map((item: Unidades) => item.unidades);
      const maxValue = Math.max(...unidades);
      const ticks = generarTicks(0, maxValue, tickCount);
      setTicks(ticks);
    }
  }, [data, key]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof TramoUnidades);
  };

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
            {titleGrid("Número de unidades")}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {
        <ResponsiveLine
          animate
          axisBottom={{
            legend: "",
            legendOffset: -12,
            tickValues: "every month",
            format: (value) => formatFecha(new Date(value)),
          }}
          enableGridX={false}
          gridYValues={ticks}
          axisLeft={{
            legendOffset: 12,
            tickValues: ticks,
          }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#9B9EAB", // Cambia aquí al color que desees para el texto de las marcas en el eje Y
                },
              },
            },
            grid: {
              line: {
                stroke: "#41434C", // Cambia el color de las líneas de la cuadrícula
              },
            },
          }}
          lineWidth={7}
          tooltip={(point) =>
            setTooltipLine(
              point.point.data.x,
              point.point.data.y,
              "Unidades",
              0,
              false,
              true
            )
          }
          curve="monotoneX"
          data={[{ data: formattedData, id: "Unidades" }]}
          colors={["#5ED1B1"]}
          enablePointLabel={false}
          margin={{
            bottom: 60,
            left: 50,
            right: 20,
            top: 40,
          }}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
          }}
          pointBorderWidth={1}
          pointSize={16}
          pointSymbol={function noRefCheck() {}}
          useMesh
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            precision: "day",
            type: "time",
            useUTC: false,
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: ticks.at(-1),
            stacked: false,
            reverse: false,
          }}
        />
      }
    </div>
  );
};

export default LineChartUnidades;
