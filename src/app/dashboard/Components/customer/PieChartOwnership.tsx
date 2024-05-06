"use client";
// react imports
import React, { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";

// nivo imports
import { PieTooltipProps, ResponsivePie } from "@nivo/pie";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { titleGrid } from "../ChartAddons";
import { formatNumber } from "../utils";

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

type OwnershipFront = {
  id: "rango_15_30" | "rango_30_40" | "mayor_40";
  label: "Rango 15% - 30%" | "Rango 30% - 40%" | "Mayor a 40%";
  value: number;
  percentage: number;
};

const PieChartOwnership = () => {
  const email = getEmail();

  const [data, setData] = useState<Ownership>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
            {titleGrid("Porcentaje ownership")}
          </Grid>
        </FormControl>
      </div>

      {formattedData ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={formattedData}
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
            tooltip={(props) => PieChartTooltip(props)}
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

export default PieChartOwnership;

const PieChartTooltip = (
  props: React.PropsWithChildren<PieTooltipProps<OwnershipFront>>
) => {
  const { value, color } = props.datum;
  const percentage = props.datum.data.percentage;
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
        <strong>{formatNumber(percentage, 0, true)}</strong>
      </div>
      <div>
        <strong>{clientLabel}</strong>
      </div>
    </div>
  );
};

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
