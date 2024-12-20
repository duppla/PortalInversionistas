"use client";

// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// nivo imports
import { ResponsiveBar } from "@nivo/bar";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha, formatNumber, generarTicks } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";
import { BarChartTooltip } from "../BarChartComps";

const endpoint = "/clientes/destino_pagos";
const tickCount: number = 5;

type PagosDestino = {
  fecha: string;
  arriendo: number;
  intereses: number;
  prepago: number;
};

type TramoPagosDestino = {
  ult_12_meses: PagosDestino[];
  este_anho: PagosDestino[];
  ult_6_meses: PagosDestino[];
};

type PagosDestinoFront = {
  fecha: string;
  Arriendo: number;
  Adelanto: number;
  "Intereses moratorios": number;
};

function BarChartDestino() {
  const email = getEmail();

  const [data, setData] = useState<TramoPagosDestino>();
  const [key, setKey] = useState<keyof TramoPagosDestino>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  /* Función para actualizar la selección del usuario */
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof TramoPagosDestino);
  };

  let formattedData: PagosDestinoFront[] = [];
  if (data) {
    formattedData = data[key].map((item: PagosDestino) => {
      return {
        fecha: item.fecha,
        "Intereses moratorios": item.intereses,
        Arriendo: item.arriendo,
        Adelanto: item.prepago,
      };
    });
  }

  useEffect(() => {
    if (data) {
      const monthTotal: number[] = data[key].map((item) => {
        return item.arriendo + item.prepago + item.intereses;
      });
      const maxValue = Math.max(...monthTotal);

      setTicks(generarTicks(0, maxValue, tickCount));
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
            {titleGrid("Pagos mensuales y destino")}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {data == null ? (
        <div></div>
      ) : (
        <ResponsiveBar
          data={formattedData}
          keys={["Arriendo", "Adelanto", "Intereses moratorios"]}
          indexBy="fecha"
          label={() => ""}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.7}
          maxValue={ticks[ticks.length - 1]}
          valueScale={{ type: "linear", min: 0 }}
          indexScale={{ type: "band", round: true }}
          colors={["#5782F2", "#5ED1B1", " #FFB024"]}
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
          groupMode="stacked"
          tooltip={(point) => BarChartTooltip(point)}
          borderRadius={4}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            tickValues: formattedData.map(
              (item: { fecha: string }) => item.fecha
            ),
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
            format: (value) => formatNumber(value),
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
              itemsSpacing: 20,
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
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </div>
  );
}

export default BarChartDestino;
