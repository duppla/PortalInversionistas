"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid } from "../ChartAddons";
import PieChart from "../PieChartComps";

const endpoint = "/clientes/porcentaje_ownership";

type OwnershipItem = {
  label: "rango_15_30" | "rango_30_40" | "mayor_40";
  count: number;
  percentage: number;
};

type Ownership = {
  total: number;
  items: OwnershipItem[];
};

export type OwnershipFront = {
  id: "rango_15_30" | "rango_30_40" | "mayor_40";
  label: "Rango 15% - 30%" | "Rango 30% - 40%" | "Mayor a 40%";
  value: number;
  percentage: number;
};

const PieChartOwnership = () => {
  const email = getEmail();

  const [data, setData] = useState<Ownership>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  let formattedData: OwnershipFront[] = [];
  if (data) {
    formattedData = data.items.map((item: OwnershipItem) => {
      const label = formatLabel(item.label);
      return {
        id: item.label,
        label: label,
        value: item.count,
        percentage: item.percentage,
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
            {titleGrid("Porcentaje ownership", "", -1)}
          </Grid>
        </FormControl>
      </div>

      {formattedData ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {PieChart(formattedData)}
        </div>
      ) : (
        <div style={{ color: "#212126" }}>Cargando...</div>
      )}
    </div>
  );
};

export default PieChartOwnership;

const formatLabel = (
  key: "rango_15_30" | "rango_30_40" | "mayor_40"
): "Rango 15% - 30%" | "Rango 30% - 40%" | "Mayor a 40%" => {
  switch (key) {
    case "rango_15_30":
      return "Rango 15% - 30%";
    case "rango_30_40":
      return "Rango 30% - 40%";
    case "mayor_40":
      return "Mayor a 40%";
  }
};
