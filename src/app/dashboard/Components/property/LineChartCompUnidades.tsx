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
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid, selectGrid } from "../ChartAddons";
import { formatFecha, generarTicks, setTooltipLine } from "../utils";

const endpoint = "/inmuebles/numero_unidades";
const tickCount = 4;

type Unidades = {
  fecha: string;
  unidades: number;
};

type TramoUnidades = {
  ult_12_meses: any[];
  este_anho: any[];
  ult_6_meses: any[];
  [key: string]: any;
};

const LineChartCompUnidades = () => {
  const email = getEmail();
  const [data, setData] = useState<TramoUnidades | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getApiUrl(endpoint, { email: email }));
      const responseData = await response.json();
      setData(responseData);
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  useEffect(() => {
    // Calcular el mínimo y máximo de unidades para generar los valores del eje Y
    if (data) {
      const unidades = data[selectedKey as keyof TramoUnidades].map(
        (item: Unidades) => item.unidades
      );
      const maxValue = Math.max(...unidades);
      const ticks = generarTicks(0, maxValue, tickCount);
      setTicks(ticks);
    }
  }, [data, selectedKey]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  const tranformeDataApi = (data: TramoUnidades, selectedKey: string) => {
    return (data[selectedKey as keyof TramoUnidades] as Unidades[]).map(
      (item) => ({
        x: item.fecha,
        y: item.unidades,
      })
    );
  };

  let tranformedData: any[] = [];
  if (data) {
    tranformedData = tranformeDataApi(data, selectedKey);
  }

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
            {selectGrid(selectedKey, handleSelectChange, menuOpen, setMenuOpen)}
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
          data={[
            {
              data: tranformedData,

              id: "Unidades",
            },
          ]}
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
            max: ticks[ticks.length - 1],
            stacked: false,
            reverse: false,
          }}
        />
      }
    </div>
  );
};

export default LineChartCompUnidades;
