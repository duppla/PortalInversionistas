"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import getApiUrl from "@/app/url/ApiConfig";
import { getEmail } from "@/app/context/authContext";

const endpoint = "/clientes/actividad_economica";

type ActividadEconomica = {
  actividad_economica: string;
  count: number;
  porcentaje: number;
};

function PieChartTooltip(tooltipProps: any, responseData: any) {
  const { id, color, formattedValue, label } = tooltipProps.datum;

  const originalData = responseData
    ? responseData.find((data: any) => data.actividad_economica === id)
    : null;
  const count = originalData ? originalData.count : 0;
  const porcentaje = originalData ? originalData.porcentaje * 100 : 0;

  // Lógica para ajustar la etiqueta según el recuento
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
        <strong>{porcentaje.toFixed(0)}% </strong>
      </div>
      <div>
        {labelWithCount}: {formattedValue}
      </div>
    </div>
  );
}

function PieChatCompActEcon() {
  const email = getEmail();

  const [responseData, setResponseData] = useState<[ActividadEconomica]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();

        if (responseData) {
          setResponseData(responseData);
        } else {
          console.error("Respuesta de la API vacía");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  const getColorByKey = (key: string): string => {
    switch (key) {
      case "a_tiempo":
        return "green";
      case "en_mora":
        return "red";
      default:
        return "gray";
    }
  };

  function getCategoryLabel(key: string): string {
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

  const formattedDataPie = responseData
    ? responseData.map((data: ActividadEconomica) => {
        return {
          id: data.actividad_economica,
          label: getCategoryLabel(data.actividad_economica),
          value: data.count,
          formattedValue: `${data.count}`,
          color: getColorByKey(data.actividad_economica),
        };
      })
    : [];

  /* Función para actualizar la selección del usuario */

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
            <Grid xs={6} md={6} lg={6}>
              <Typography
                className="title-dropdown-menu-container"
                variant="subtitle1"
                sx={{
                  fontFamily: "Helvetica",
                  fontWeight: 300,
                  color: "#ffffff",
                  fontSize: "26px",
                  mt: 2,
                }}
              >
                Actividad económica
              </Typography>
            </Grid>
          </Grid>
        </FormControl>
      </div>

      {formattedDataPie.length > 0 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={formattedDataPie}
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
            tooltip={(tooltipProps) => {
              return PieChartTooltip(tooltipProps, responseData);
            }}
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

export default PieChatCompActEcon;
