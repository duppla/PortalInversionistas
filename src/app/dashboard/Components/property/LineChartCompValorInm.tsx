"use client";
// react modules
import { useEffect, useState } from "react";

// material-ui modules
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";

// nivo modules
import { ResponsiveLine } from "@nivo/line";
import { DatumValue } from "@nivo/core";

// custom modules
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha, formatNumber, generarTicks } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/inmuebles/valor_inmuebles";
const tickCount: number = 5;

type TramoValorInm = {
  ult_12_meses: ValorInm[];
  este_anho: ValorInm[];
  ult_6_meses: ValorInm[];
};

type ValorInm = {
  fecha: string;
  fair_market_price: number;
  valor_contractual: number;
};

type ValorInmFront = {
  x: string;
  y: number;
};

const LineChartCompValorInm = () => {
  const email = getEmail();

  const [data, setData] = useState<TramoValorInm>();
  const [key, setKey] = useState<keyof TramoValorInm>("ult_12_meses");

  const [formatContract, setFormatContract] = useState<ValorInmFront[]>([]);
  const [formatFairMarket, setFormatFairMarket] = useState<ValorInmFront[]>([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof TramoValorInm);
  };

  const formatData = (
    data: ValorInm[],
    field: "fair_market_price" | "valor_contractual"
  ) => {
    return data.map((item) => {
      return {
        x: item.fecha,
        y: item[field],
      };
    });
  };

  // Calcula los valores máximos y mínimos
  const calculateMinMaxValues = (data: ValorInm[]) => {
    const values = data.map((item) => item.fair_market_price);
    values.push(...data.map((item) => item.valor_contractual));

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return { minValue, maxValue };
  };

  useEffect(() => {
    if (data) {
      const { minValue, maxValue } = calculateMinMaxValues(data[key]);
      const ticks = generarTicks(minValue, maxValue, tickCount);
      setTicks(ticks);

      const selectedData = data[key];
      setFormatContract(formatData(selectedData, "valor_contractual"));
      setFormatFairMarket(formatData(selectedData, "fair_market_price"));
    }
  }, [data, key]);

  return (
    <div className="grafica-linecharts-b nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB", mt: 1 }}
          >
            {titleGrid("Valor de los inmuebles")}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {
        <ResponsiveLine
          axisBottom={{
            legend: "",
            legendOffset: -12,
            tickValues: "every month",
            format: (value) => formatFecha(new Date(value)),
          }}
          gridYValues={ticks}
          axisLeft={{
            legend: "",
            legendOffset: 12,
            tickValues: ticks,
            format: (value) => formatNumber(value, 2, false, false),
          }}
          tooltip={(point) =>
            setTooltip(point.point.data.x, point.point.data.y)
          }
          curve="monotoneX"
          data={[
            {
              data: formatContract,
              id: "Contractual",
            },
            {
              data: formatFairMarket,
              id: "Fair Market Price",
            },
          ]}
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
                background: "#272727", // Fondo del tooltip
                color: "#9B9EAB", // Color del texto del tooltip
              },
            },
            grid: {
              line: {
                stroke: "#41434C" /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
              },
            },
          }}
          enableGridX={false}
          lineWidth={7}
          colors={["#C5F5CA", "#FF864B"]}
          enablePointLabel={false}
          margin={{
            bottom: 50,
            left: 50,
            right: 50,
            top: 50,
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
          yFormat={(value) => formatNumber(value)}
          yScale={{
            type: "linear",
            min: ticks[0],
            max: ticks[ticks.length - 1],
            stacked: false,
            reverse: false,
          }}
          legends={[
            {
              anchor: "bottom-left",
              direction: "row",
              justify: false,
              translateX: 10,
              translateY: 55,
              itemsSpacing: 32,
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
        />
      }
    </div>
  );
};

export default LineChartCompValorInm;

function setTooltip(x: DatumValue, y: DatumValue) {
  const formattedValue = formatNumber(y as number, 2, false, false);

  return (
    <div
      style={{
        background: "#272727",
        color: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ color: "#C5F5CA" }}>
        <strong>{formatFecha(new Date(x))}</strong>
      </div>
      <div style={{ color: "#FF864B" }}>{`Valor: ${formattedValue}`}</div>
    </div>
  );
}
