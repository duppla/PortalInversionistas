"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";

// nivo imports
import { PieTooltipProps, ResponsivePie } from "@nivo/pie";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatNumber } from "../utils";
import { titleGrid } from "../ChartAddons";

const endpoint = "/principal/cartera_mora";

type LabelValue = {
  label: "Entre 31 y 60" | "Entre 61 y 90" | "Mayor a 90";
  value: number;
};

type FormatoFront = {
  id: string;
  label: "Entre 31 y 60" | "Entre 61 y 90" | "Mayor a 90";
  value: number;
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
          <ResponsivePie
            data={formattedData}
            margin={{ top: 40, right: 80, bottom: 40, left: -40 }}
            startAngle={0}
            innerRadius={0.6}
            padAngle={0.5}
            activeInnerRadiusOffset={3}
            activeOuterRadiusOffset={8}
            colors={["#6C9FFF", "#B7C6FF", "#5ED1B1"]}
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
            tooltip={(tooltipProps) => setToolTip(tooltipProps)}
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
            {data ? "$ " + formatNumber(data.total) : ""}
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

function setToolTip(
  tooltipProps: React.PropsWithChildren<PieTooltipProps<FormatoFront>>
) {
  const { value, color, label } = tooltipProps.datum;

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
        <strong>
          {label}: {formatNumber(value, 0, true)}
        </strong>
      </div>
    </div>
  );
}

export default PieChartCompCartera;
