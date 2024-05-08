"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatNumber } from "../utils";
import { titleGrid } from "../ChartAddons";
import PieChart from "../PieChartComps";

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

function PieChartCompCartera() {
  const email = getEmail();
  const [data, setData] = useState<CarteraMora>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  let formattedData: FormatoFront[] = [];
  if (data) {
    formattedData = data.cartera_mora.map((item) => ({
      id: item.label,
      label: item.label,
      value: item.value,
      percentage: item.percentage,
    }));
  }

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
            {titleGrid("Cartera en mora")}
          </Grid>
        </FormControl>
      </div>

      {
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
            {data ? "$ " + formatNumber(data.total, 1) : ""}
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
