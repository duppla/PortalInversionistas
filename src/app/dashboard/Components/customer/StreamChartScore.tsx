"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// nivo imports
import { ResponsiveStream } from "@nivo/stream";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha, formatNumber } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/clientes/historico_score";

type TramoScore = {
  fecha: string;
  alto: number;
  medio: number;
  bajo: number;
  muy_bajo: number;
};

type HistTramoScore = {
  ult_12_meses: TramoScore[];
  este_anho: TramoScore[];
  ult_6_meses: TramoScore[];
};

type TramoScoreFront = {
  id: string;
  Alto: number;
  Medio: number;
  Bajo: number;
  "Muy bajo": number;
};

function StreamChartScore() {
  const email = getEmail();

  const [data, setData] = useState<HistTramoScore | null>(null);
  const [key, setKey] = useState<keyof HistTramoScore>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setKey(event.target.value as keyof HistTramoScore);
  };

  let formattedData: TramoScoreFront[] = [];
  if (data) {
    formattedData = data[key].map((item: TramoScore) => ({
      id: item.fecha,
      Alto: item.alto ? item.alto : 0,
      Medio: item.medio ? item.medio : 0,
      Bajo: item.bajo ? item.bajo : 0,
      "Muy bajo": item.muy_bajo ? item.muy_bajo : 0,
    }));
  }

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
            {titleGrid("Evaluaciones puntaje crediticio")}
            {selectGrid(key, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      {data == null ? (
        <div></div>
      ) : (
        <ResponsiveStream
          animate={true}
          data={formattedData}
          keys={["Muy bajo", "Bajo", "Medio", "Alto"]}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            tickValues: formattedData.map((_, index: number) => index),
            format: (index) =>
              formatFecha(formattedData[index] ? formattedData[index].id : ""),
          }}
          gridYValues={[0, 0.25, 0.5, 0.75, 1]}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: [0, 0.25, 0.5, 0.75, 1],
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
            format: (value) => formatNumber(value, 0, true),
          }}
          enableGridY={false}
          curve="catmullRom"
          offsetType="none"
          borderWidth={2} // Grosor del borde
          borderColor={{ from: "color" }}
          colors={["#FF1818", "#FD7F23", "#FFD600", "#00FF29"]} // Define tus propios colores */
          fillOpacity={0.099}
          enableStackTooltip={true}
          isInteractive={true}
          valueFormat={(value) => formatNumber(value, 0, true)}
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
          defs={[
            {
              id: "text",
              type: "text",
              color: "white",
            },
          ]}
          dotSize={8}
          dotColor={{ from: "color" }}
          dotBorderWidth={2}
          dotBorderColor={{
            from: "color",
            modifiers: [["darker", 0.7]],
          }}
          legends={[
            {
              anchor: "bottom-left",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 54,
              itemsSpacing: -20,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "square",
              symbolBorderColor: "rgba(0, 0, 0, .5)",

              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemTextColor: "#cccccc",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}

export default StreamChartScore;
