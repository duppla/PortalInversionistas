"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// nivo imports
import { ResponsivePie } from "@nivo/pie";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid } from "../ChartAddons";
import { formatNumber } from "../utils";

const endpoint = "/clientes/actividad_economica";

type ActividadEconomica = {
  actividad_economica: string;
  count: number;
  porcentaje: number;
};

type ActividadEconomicaFront = {
  id: string;
  label: string;
  value: number;
};

function PieChatActEcon() {
  const email = getEmail();

  const [data, setData] = useState<ActividadEconomica[]>();

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

  let formattedData: ActividadEconomicaFront[] = [];
  if (data) {
    formattedData = data.map((data: ActividadEconomica) => {
      return {
        id: data.actividad_economica,
        label: changeLabel(data.actividad_economica),
        value: data.count,
      };
    });
  }

  return (
    <div
      className="grafica-piecharts"
      style={{ position: "relative", width: "100%", height: "380px" }}
    >
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            {titleGrid("Actividad económica")}
          </Grid>
        </FormControl>
      </div>

      {formattedData.length > 0 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={formattedData}
            margin={{ top: 40, right: 80, bottom: 80, left: -40 }}
            startAngle={0}
            innerRadius={0.7}
            padAngle={1}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={8}
            colors={["#5782F2", "#FFB024", "#5ED1B1", "#723DFD", "#28ACFF"]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            enableArcLabels={false}
            arcLabelsRadiusOffset={0.1}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            tooltip={(props) => PieChartTooltip(props, data)}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 68,
                translateY: 1,
                itemsSpacing: 7,
                itemWidth: 111,
                itemHeight: 35,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 17,
                symbolShape: "circle",

                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#cccccc",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

function PieChartTooltip(
  tooltipProps: any,
  data: ActividadEconomica[] | undefined
) {
  const { id, color, value, label } = tooltipProps.datum;

  let count = 0;
  let porcentaje = "0%";

  if (data) {
    const currentData = data.find(
      (item: ActividadEconomica) => item.actividad_economica === id
    );

    if (currentData) {
      count = currentData.count;
      porcentaje = formatNumber(currentData.porcentaje, 0, true);
    }
  }

  const labelWithCount = count > 1 ? `${label}s` : label;

  return (
    <div
      style={{
        background: "#000",
        color: color, // Usa el color personalizado asignado
        padding: "10px",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <div>
        <strong>{porcentaje} </strong>
      </div>
      <div>
        {labelWithCount}: {value}
      </div>
    </div>
  );
}

export default PieChatActEcon;

function changeLabel(key: string): string {
  const lowerCaseKey = key ? key.toLowerCase() : "";

  switch (lowerCaseKey) {
    case "empleado":
      return "Empleado";
    case "pensionado":
      return "Pensionado";
    case "independiente":
      return "Independiente";
    case "rentista de capital":
      return "Rentista de capital";
    case "no registra":
      return "No registra";
    default:
      return key; // Devuelve el valor original si no coincide con ninguna etiqueta personalizada
  }
}
