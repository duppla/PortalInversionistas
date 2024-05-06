"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveSankey } from "@nivo/sankey";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";
import getApiUrl from "@/app/url/ApiConfig";
import { getEmail } from "@/app/context/authContext";

const endpoint = "/inmuebles/perdidas_ganancias_sankey";

type DataApiType = {
  fecha: string;
  pagado: any;
  mora: any;
};
interface Node {
  id: string;
  // otras propiedades...
}

type DataType = {
  ult_12_meses: DataApiType[];
  este_anho: DataApiType[];
  ult_6_meses: DataApiType[];
};

const SankeyChartCompPyG = () => {
  const email = getEmail();

  const [dataSnkey, setDataSnkey] = useState<any>(null); // Estado para almacenar la data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();

        const reorderedNodes = [
          "Ingresos",
          "Utilidad bruta",
          "NOI",
          "Gastos",
          "Reservas",
        ].map((nodeId) => {
          return responseData.nodes.find((node: Node) => node.id === nodeId);
        });
        const formattedData = {
          nodes: reorderedNodes.map((node) => ({
            id: node.id,
            nodeColor: getColor(node),
          })),
          links: responseData.links.map((link: any) => ({
            source: link.source,
            target: link.target,
            value: link.value,
          })),
        };

        setDataSnkey(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  // Definir tus escalas de colores verdes y rojos

  // Función de color personalizada
  const getColor = (node: any) => {
    const nodeId = typeof node === "string" ? node : node.id;

    if (nodeId === "Ingresos") {
      return "#8fffad";
    } else if (nodeId === "Utilidad bruta") {
      return "#76B17D";
    } else if (nodeId === "NOI") {
      return "#04c437";
    } else if (nodeId === "Gastos") {
      return "#FF1818";
    } else if (nodeId === "Reservas") {
      return "#f18282";
    }

    return "#cccccc";
  };

  const formatValue = (value: any) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      // Si el valor es mayor o igual a 1000, formatearlo en mil
      return `${(value / 1000).toFixed(0)} Mil`;
    } else {
      // Si el valor es menor que 1000, mostrarlo tal como está
      return value.toString();
    }
  };

  return (
    <div className="grafica-barcharts-des nivo-text">
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
                Pérdidas y Ganancias portafolio
              </Typography>
            </Grid>
            <Grid xs={6} md={6} lg={6} sx={{ textAlign: "end" }}></Grid>
          </Grid>
        </FormControl>
      </div>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Helvetica",
          fontWeight: 300,
          color: "#ffffff",
          fontSize: "18px",
          mt: 2,
        }}
      >
        Mes actual
      </Typography>
      {dataSnkey && (
        <ResponsiveSankey
          data={dataSnkey}
          margin={{ top: 20, right: 50, bottom: 80, left: 50 }}
          align="justify"
          /*  colors={['#FFFFBA','#6C9FFF', '#F4DCFF','#FF9900',  '#BAFCC5',]}   */
          /*   colors={{ scheme: 'set2' }} */
          colors={getColor}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={24}
          nodeBorderWidth={1}
          nodeBorderColor={{ from: "color", modifiers: [["brighter", 0.5]] }}
          nodeBorderRadius={3}
          linkOpacity={0.3}
          linkHoverOpacity={0.5}
          linkHoverOthersOpacity={0.2}
          linkContract={4}
          linkBlendMode="screen"
          enableLinkGradient={true}
          enableLabels={true}
          labelPadding={16}
          labelOrientation="horizontal"
          /* Tooltip para la grafica */

          nodeTooltip={({ node }) => (
            <div
              style={{
                backgroundColor: "black",
                color: "#9B9EAB",
                padding: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: node.color,
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></div>
              <strong>{node.label}</strong>
              <br />
              {formatValue(node.value)}
            </div>
          )}
          linkTooltip={({ link }) => (
            <div
              style={{
                backgroundColor: "black",
                color: "#9B9EAB",
                padding: "10px",
              }}
            >
              <p>
                {" "}
                <strong>{link.source.label}</strong> a{" "}
                <strong>{link.target.label}</strong>
              </p>
              <div
                style={{
                  backgroundColor: link.color,
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></div>
              {formatValue(link.value)}
            </div>
          )}
          layout="horizontal"
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 0.1]],
          }}
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
          }}
          legends={[
            {
              anchor: "bottom-left",
              direction: "row",
              translateX: 30,
              translateY: 28,
              itemWidth: 100,
              itemHeight: 14,
              itemDirection: "left-to-right",
              itemsSpacing: 2,
              itemTextColor: "#999",
              symbolShape: "square",
              symbolSize: 14 /* 
                             textSize: 20, */,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#9B9EAB",
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
};

export default SankeyChartCompPyG;
