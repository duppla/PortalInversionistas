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
import { useAuth } from "../../../context/authContext";
import { formatFecha, formatNumber } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/inmuebles/valor_inmuebles";

type TramoValorInm = {
  ult_12_meses: any[];
  este_anho: any[];
  ult_6_meses: any[];
  [key: string]: any;
};

type ValorInm = {
  fecha: string;
  fair_market_price: number;
  valor_contractual: number;
  formattedY?: string; // Agregamos formattedY al tipo
};

const LineChartCompValorInm = () => {
  const { userEmail } = useAuth();
  const [data, setData] = useState<TramoValorInm | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("ult_12_meses");

  const [transformedDataContractual, setTransformedDataContractual] = useState<
    { x: string; y: number }[]
  >([]);
  const [transformedDataFairMarket, setTransformedDataFairMarket] = useState<
    { x: string; y: number }[]
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: userEmail }));
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedKey, userEmail]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  const transformData = (
    data: TramoValorInm,
    selectedDataKeyB: string,
    field: keyof ValorInm
  ) => {
    return (data[selectedDataKeyB as keyof TramoValorInm] as ValorInm[]).map(
      (item) => {
        let numericValue;
        if (typeof item[field] === "number") {
          numericValue = item[field] as number;
        } else if (typeof item[field] === "string") {
          numericValue = parseFloat(item[field] as string);
        } else {
          numericValue = NaN;
        }

        let formattedValue;
        if (!isNaN(numericValue)) {
          formattedValue =
            numericValue >= 1000000
              ? (numericValue / 1000000).toFixed(0) + "M"
              : numericValue.toLocaleString();
        } else {
          formattedValue = "N/A";
        }

        return {
          x: item.fecha,
          y: !isNaN(numericValue) ? numericValue : 0,
          formattedY: formattedValue, // Agregamos una propiedad adicional para el valor formateado
        };
      }
    );
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
      // Calcula los valores máximos y mínimos al actualizar la data
      const { minValue, maxValue } = calculateMinMaxValues(data[selectedKey]);

      // Calcula los nuevos valores para el eje y
      const medianYValue = (minValue + maxValue) / 2;

      const tickCount = 6;
      let count = 0;
      let tickIni = 5000000;
      let tickStep = tickIni;
      let mult = tickIni / 10;
      while (
        medianYValue - tickCount * (tickStep / 2) > minValue ||
        medianYValue + tickCount * (tickStep / 2) < maxValue
      ) {
        if (count % 4 == 0) {
          mult *= 10;
          tickStep += mult;
        } else if (count % 2 == 0) {
          tickStep += mult;
        } else {
          tickStep *= 2;
        }
        count++;
      }

      let lowest = minValue - (minValue % tickStep);
      const ticks = Array.from(
        { length: tickCount + 1 },
        (_, index) => lowest + index * tickStep
      );

      // Actualiza los valores en el componente
      setTicks(ticks);
    }
  }, [data, selectedKey]);

  useEffect(() => {
    if (data) {
      // Actualización de datos de gráfico aquí
      setTransformedDataContractual(
        transformData(data, selectedKey, "valor_contractual")
      );
      setTransformedDataFairMarket(
        transformData(data, selectedKey, "fair_market_price")
      );
    }
  }, [data, selectedKey]);

  // Función para redondear y formatear el valor
  const formatTooltipValue = (value: number) => {
    const millionValue = value / 1000000;
    const roundedMillionValue = Math.round(millionValue);
    return `${roundedMillionValue}M`;
  };

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
            {selectGrid(selectedKey, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {
        <ResponsiveLine
          axisBottom={{
            legend: "",
            legendOffset: -12,
            tickValues: "every month",
            format: (value) => {
              const date = new Date(value).toISOString().split("T")[0];
              return formatFecha(date);
            },
          }}
          gridYValues={ticks}
          axisLeft={{
            legend: "",
            legendOffset: 12,
            tickValues: ticks,
            format: (value) => formatTooltipValue(value),
          }}
          tooltip={(point) => {
            const fecha_str = new Date(point.point.data.x)
              .toISOString()
              .split("T")[0];

            const formattedValue =
              typeof point.point.data.y === "number"
                ? formatTooltipValue(point.point.data.y)
                : "N/A";

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
                  <strong>{formatFecha(fecha_str)}</strong>
                </div>
                <div
                  style={{ color: "#FF864B" }}
                >{`Valor: ${formattedValue}`}</div>
              </div>
            );
          }}
          curve="monotoneX"
          data={[
            {
              data: transformedDataContractual,
              id: "Contractual",
            },
            {
              data: transformedDataFairMarket,
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
          yFormat={(value: DatumValue) =>
            typeof value === "number" ? formatNumber(value) : ""
          }
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
