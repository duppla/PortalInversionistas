"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";

// nivo imports
import {
  ResponsiveSankey,
  SankeyNodeDatum,
  SankeyLinkDatum,
} from "@nivo/sankey";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid } from "../ChartAddons";
import { formatNumber } from "../utils";

const endpoint = "/inmuebles/perdidas_ganancias_sankey";

type Node = {
  id: "Ingresos" | "Utilidad bruta" | "NOI" | "Gastos" | "Reservas";
};

type Link = {
  source: "Ingresos" | "Utilidad bruta" | "NOI" | "Gastos" | "Reservas";
  target: "Ingresos" | "Utilidad bruta" | "NOI" | "Gastos" | "Reservas";
  value: number;
};

type Sankey = {
  nodes: Node[];
  links: Link[];
};

const SankeyChartPyG = () => {
  const email = getEmail();

  const [data, setData] = useState<Sankey>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

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
            {titleGrid("Pérdidas y Ganancias portafolio", "", 2, 1)}
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
      {data && (
        <ResponsiveSankey
          data={data}
          margin={{ top: 20, right: 50, bottom: 80, left: 50 }}
          align="justify"
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
          nodeTooltip={({ node }) => nodeTooltip(node)}
          linkTooltip={({ link }) => linkTooltip(link)}
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

export default SankeyChartPyG;

const getColor = (node: Node) => {
  const nodeId = node.id;

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

function nodeTooltip(node: SankeyNodeDatum<Node, Link>) {
  return (
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
      {formatNumber(node.value, 2)}
    </div>
  );
}

function linkTooltip(link: SankeyLinkDatum<Node, Link>) {
  return (
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
      {formatNumber(link.value, 2)}
    </div>
  );
}
