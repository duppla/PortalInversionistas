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
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import {
  formatFecha,
  formatNumber,
  setTooltipBar,
  calculateAxisValues,
} from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/principal/flujo_real_esperado";
const title = "Flujo real vs. flujo esperado";
/* Mensaje para el tooltip explicativo */
const explainText = `Nota: 'Flujo Real' se refiere a los ingresos generado durante el periodo elegido, mientras que 'Flujo Esperado' alude a las proyecciones de ingreso para el mismo intervalo.`;

const tickCount: number = 6;
const tickIni: number = 500000;

type Flujos = {
  fecha: string;
  flujo_real: number;
  flujo_esperado: number;
  [key: string]: string | number;
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
  [key: string]: Flujos[];
};

function BarChartFlujos() {
  const { userEmail } = useAuth();

  // data: Datos de la API
  const [data, setData] = useState<FlujoRealEsperado | null>(null);
  // selectedKey: periodo seleccionada por el usuario (default ult_12_meses)
  const [selectedKey, setSelectedKey] = useState<string>("ult_12_meses");

  // configuración interna de estados reactivos
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [gridYValues, setGridYValues] = useState<number[]>([]);

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
  }, [userEmail]);

  /* Función que controla la selección del dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  let formattedData: FlujosFront[] = [];
  if (data) {
    formattedData = data[selectedKey as keyof FlujoRealEsperado].map(
      (item: Flujos) => {
        return {
          fecha: item.fecha,
          Real: item.flujo_real, // Cambia la leyenda de flujo_real a Flujo
          Esperado: item.flujo_esperado, // Cambia la leyenda de flujo_esperado a Esperado
        };
      }
    );
  }

  useEffect(() => {
    if (data) {
      const dataFlujos: Flujos[] = data[selectedKey as keyof FlujoRealEsperado];
      const maxValue: number = Math.max(
        ...(dataFlujos?.map((item) =>
          Math.max(item.flujo_real, item.flujo_esperado)
        ) ?? [])
      );
      const gridYValues = calculateAxisValues(maxValue, tickIni, tickCount);
      setGridYValues(gridYValues);
    }
  }, [selectedKey, data]);

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
            {selectGrid(selectedKey, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {BarChart(formattedData, gridYValues)}
    </div>
  );
}

function BarChart(formattedData: FlujosFront[], gridYValues: number[]) {
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
      maxValue={gridYValues[gridYValues.length - 1]}
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
      tooltip={(point) => setTooltipBar(point, 1)}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        tickValues: formattedData?.map((item: { fecha: string }) => item.fecha),
        format: (value) => formatFecha(value), // Formatea la fecha si es una cadena
      }}
      gridYValues={gridYValues}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: gridYValues,
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
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
}

export default BarChartFlujos;
