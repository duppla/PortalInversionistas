"use client";
// react imports
import React from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";

// custom imports
import { formatNumber } from "./utils";
import { titleGrid } from "./ChartAddons";
import PieChart from "./PieChartComps";

const endpoint = "/principal/cartera_mora";

type LabelValue = {
  label: "Entre 31 y 60" | "Entre 61 y 90" | "Mayor a 90";
  value: number;
  percentage: number;
};

export type FormatoFront = {
  id: string;
  label: "Entre 31 y 60" | "Entre 61 y 90" | "Mayor a 90";
  value: number;
  percentage: number;
};

type CarteraMora = {
  cartera_mora: LabelValue[];
  total: number;
};

function PieChartCompCartera(props: Readonly<{ mora_30: number; mora_60: number; mora_90: number }>) {
  const total = props.mora_30 + props.mora_60 + props.mora_90;
  const percentage_30 = (props.mora_30 / total);
  const percentage_60 = (props.mora_60 / total);
  const percentage_90 = (props.mora_90 / total);

  const formattedData: FormatoFront[] = [
    {
      id: "Entre 31 y 60",
      label: "Entre 31 y 60",
      value: props.mora_30,
      percentage: percentage_30,
    },
    {
      id: "Entre 61 y 90",
      label: "Entre 61 y 90",
      value: props.mora_60,
      percentage: percentage_60,
    },
    {
      id: "Mayor a 90",
      label: "Mayor a 90",
      value: props.mora_90,
      percentage: percentage_90,
    },
  ];

  return (
    <div
      className="grafica-piecharts-G2"
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
            {titleGrid("Cartera en mora", "", -1, 1.5)}
          </Grid>
        </FormControl>
      </div>

      {
        <div style={{ position: "relative", width: "110%", height: "100%" }}>
          {PieChart(formattedData, 0.6, 0.5)}
        </div>
      }
      <div
        className="centrado div-center-pie "
        style={{
          position: "absolute",
          top: "63%",
          left: "41%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              marginBottom: "8px",
              textAlign: "center",
              fontWeight: "600",
              fontStyle: "normal",
              fontSize: "28px",
            }}
          >
            {props.mora_30 ? "$ " + formatNumber(total, 1) : ""}
          </Typography>
          <Typography
            sx={{
              color: "#6E7880",
              textAlign: "center",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "24px",
            }}
          >
            {formattedData.reduce((acc, curr) => acc + curr.value, 0) === 0
              ? "No hay mora"
              : "Total"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default PieChartCompCartera;
