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
import { formatFecha, formatNumber, setTooltipBar } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/principal/porcentaje_propiedad";

type Propiedad = {
  fecha: string;
  clientes: number;
  duppla: number;
  inversionistas: number;
};

export type PropiedadFront = {
  fecha: string;
  Clientes: number;
  duppla: number;
  Inversionistas: number;
};

type PropiedadPortafolio = {
  ult_12_meses: Propiedad[];
  este_anho: Propiedad[];
  ult_6_meses: Propiedad[];
};

const BarChartPropiedad = () => {
  const email = getEmail();

  const [data, setData] = useState<PropiedadPortafolio>();
  const [key, setKey] = useState<keyof PropiedadPortafolio>("ult_12_meses");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof PropiedadPortafolio);
  };

  let formattedData: PropiedadFront[] = [];
  if (data) {
    formattedData = data[key].map((item: Propiedad) => {
      return {
        fecha: item.fecha,
        Clientes: item.clientes,
        duppla: item.duppla,
        Inversionistas: item.inversionistas,
      };
    });
  }

  return (
    <div className="grafica-barcharts nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB", mt: 1 }}
          >
            {titleGrid("Porcentaje de propiedad del portafolio")}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {BarChart(formattedData)}
    </div>
  );
};

function BarChart(
  formattedData: PropiedadFront[],
  decimal: number = 0,
  perc: boolean = true
) {
  if (formattedData == null) {
    return <div></div>;
  }
  return (
    <ResponsiveBar
      data={formattedData}
      keys={["Inversionistas", "Clientes", "duppla"]}
      indexBy="fecha"
      label={() => ""}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.7}
      valueScale={{ type: "linear", min: 0 }}
      indexScale={{ type: "band", round: true }}
      colors={["#723DFD", "#28ACFF", "#5ED1B1"]} // Define tus propios colores
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#9B9EAB", // Color del texto en los ejes
            },
            line: {
              stroke: "#9B9EAB", // Color de las líneas en los ejes
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
      tooltip={(point) => setTooltipBar(point, decimal, perc)}
      borderRadius={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      gridYValues={[0, 0.25, 0.5, 0.75, 1]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        tickValues: formattedData.map((item: PropiedadFront) => item.fecha),
        format: (value) => formatFecha(value),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: [0, 0.25, 0.5, 0.75, 1],
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
        format: (value) => formatNumber(value, decimal, perc),
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
          translateX: 10,
          translateY: 54,
          itemsSpacing: 16,
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

export default BarChartPropiedad;
