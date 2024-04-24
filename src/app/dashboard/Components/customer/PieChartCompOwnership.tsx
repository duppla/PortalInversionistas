"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

const endpoint = "/clientes/porcentaje_ownership";

type Ownership = {
  total: number;
  rango_15_30: number;
  rango_30_40: number;
  mayor_40: number;
  porcent_15_30: number;
  porcent_30_40: number;
  porcent_40: number;
};

const PieChartCompOwnership = () => {
  const { userEmail } = useAuth();
  const [responseData, setResponseData] = useState<Ownership>();

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const email = encodeURIComponent(userEmail);
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: { "User-Agent": "insomnia/2023.5.8" },
        };
        const response = await fetch(
          getApiUrl(endpoint + `?email=${email}`),
          options
        );
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
    fetchData();
  }, [userEmail]);

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

  const formatRange = (key: string): string => {
    switch (key) {
      case "rango_15_30":
        return "Rango 15% - 30%";
      case "rango_30_40":
        return "Rango 30% - 40%";
      case "mayor_40":
        return "Mayor a 40%";
      default:
        return "";
    }
  };

  // Excluye las claves que no deseas incluir en formattedDataPie
  const excludedKeys = [
    "total",
    "porcent_15_30",
    "porcent_30_40",
    "porcent_40",
  ];

  const formattedDataPie: {
    id: string;
    label: string;
    value: number;
    formattedValue: string;
    color: string;
  }[] = [];

  if (responseData !== undefined) {
    Object.keys(responseData).forEach((key: string) => {
      if (!excludedKeys.includes(key)) {
        const label = formatRange(key);
        formattedDataPie.push({
          id: key,
          label: label,
          value: responseData[key as keyof Ownership] ?? 0,
          formattedValue: `${responseData[key as keyof Ownership] ?? 0}`,
          color: getColorByKey(key),
        });
      }
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
                Porcentaje ownership
              </Typography>
            </Grid>
          </Grid>
        </FormControl>
      </div>

      {formattedDataPie && formattedDataPie.length > 0 ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={formattedDataPie}
            margin={{ top: 40, right: 80, bottom: 80, left: -40 }}
            startAngle={0}
            innerRadius={0.7}
            padAngle={1}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={8}
            colors={["#5782F2", "#FFB024", "#5ED1B1"]}
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
      ) : (
        <div style={{ color: "#212126" }}>Cargando...</div>
      )}
    </div>
  );
};

export default PieChartCompOwnership;

const getPercentageKey = (id: string): string => {
  if (id.startsWith("rango_")) {
    return `porcent_${id.substring(6).replace("_", "_")}`;
  } else if (id.startsWith("mayor_")) {
    return `porcent_${id.substring(6)}`;
  }
  return "";
};
const PieChartTooltip = (tooltipProps: any, responseData: any) => {
  const { id, value, color } = tooltipProps.datum;

  // Obtenemos la clave correspondiente al porcentaje
  const percentageKey = getPercentageKey(id as string);

  // Verificamos si la clave de porcentaje es válida
  let percentageValue = 0;
  if (percentageKey && responseData) {
    percentageValue = responseData[percentageKey as keyof Ownership] * 100;
  }

  // Creamos las etiquetas para el tooltip
  const percentageLabel = `${percentageValue.toFixed(0)}%`;
  const clientLabel = value > 1 ? `Clientes: ${value}` : `Cliente: ${value}`;

  // Resto de tu código de tooltip
  return (
    <div
      style={{
        background: "#000",
        color: color,
        padding: "10px",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <div>
        <strong>{percentageLabel}</strong>
      </div>
      <div>
        <strong>{clientLabel}</strong>
      </div>
    </div>
  );
};
