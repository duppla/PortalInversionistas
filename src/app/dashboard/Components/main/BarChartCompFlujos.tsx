"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Typography, FormControl, Select, MenuItem } from "@mui/material";

// nivo imports
import { ResponsiveBar } from "@nivo/bar";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { formatFecha, changeArrow, formatMillionsStr } from "../utils";

const endpoint = "/principal/flujo_real_esperado";

type Flujos = {
  fecha: string;
  flujo_real: number;
  flujo_esperado: number;
  [key: string]: string | number;
};

type FlujosFront = {
  fecha: string;
  Real: number;
  Esperado: number;
};

type FlujoRealEsperado = {
  ult_12_meses: [Flujos];
  este_anho: [Flujos];
  ult_6_meses: [Flujos];
  [key: string]: [Flujos];
};

function BarChartCompFlujos() {
  const { userEmail } = useAuth();

  // data: Datos de la API
  const [data, setData] = useState<FlujoRealEsperado | null>(null);
  // selectedKey: periodo seleccionada por el usuario (default ult_12_meses)
  const [selectedKey, setSelectedKey] = useState<string>("ult_12_meses");

  // configuración interna de estados reactivos
  const [menuOpen, setMenuOpen] = useState(false);
  const [gridYValues, setGridYValues] = useState<number[]>([]);
  const [tickValues, setTickValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: userEmail }));
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userEmail]);

  /* Función que controla la selección del dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  let formattedData: FlujosFront[] = [];

  if (data) {
    formattedData = data[selectedKey as keyof FlujoRealEsperado]?.map(
      (item: Flujos) => {
        return {
          fecha: item.fecha,
          Real: item.flujo_real, // Cambia la leyenda de flujo_real a Flujo
          Esperado: item.flujo_esperado, // Cambia la leyenda de flujo_esperado a Esperado
        };
      }
    );
  }

  useEffect(() => {
    if (data) {
      const dataFlujos: Flujos[] = data[selectedKey as keyof FlujoRealEsperado];
      const { gridYValues, tickValues } = calculateAxisValues(dataFlujos);
      setGridYValues(gridYValues);
      setTickValues(tickValues);
    }
  }, [selectedKey, data]);

  /* Función para calcular los valores de los ejes */
  const calculateAxisValues = (data: Flujos[]) => {
    const maxValue = Math.max(
      ...data.map((item) => Math.max(item.flujo_real, item.flujo_esperado))
    );

    const tickCount = 6;
    let count = 0;
    let tickIni = 500000;
    let tickStep = tickIni;
    let mult = tickIni / 10;
    while (maxValue / tickCount > tickStep) {
      if (count % 4 == 0) {
        mult *= 10;
        tickStep += mult;
      } else if (count % 2 == 0) {
        tickStep += mult;
      } else {
        tickStep *= 2;
      }
      count++;
    }

    // Calcular dinámicamente los valores para gridYValues y tickValues
    const gridYValues = Array.from({ length: tickCount + 1 }, (_, index) => {
      return index * tickStep;
    });

    return { gridYValues, tickValues: gridYValues };
  };

  /* Mensaje para el tooltip explicativo */
  const longText = `Nota: 'Flujo Real' se refiere a los ingresos generado durante el periodo elegido, mientras que 'Flujo Esperado' alude a las proyecciones de ingreso para el mismo intervalo.
      `;

  return (
    <div className="grafica-barcharts nivo-text">
      <div>
        <FormControl fullWidth>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ borderBottom: "1px solid #9B9EAB" }}
          >
            <Grid xs={6} md={6} lg={6}>
              <Grid container>
                <Grid xs={8} sm={8} md={8} lg={8}>
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
                    Flujo real vs. flujo esperado{" "}
                  </Typography>
                </Grid>
                <Grid xs={2} sm={2} md={2} lg={2}>
                  <Tooltip title={longText}>
                    <InfoIcon
                      sx={{
                        color: "#757575",
                        fill: "#757575",
                        marginTop: "28px",
                        height: "12px",
                        width: "12px",
                        marginLeft: "10px",
                      }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={6} md={6} lg={6} sx={{ textAlign: "end" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedKey}
                label="Age"
                onChange={handleSelectChange}
                /*  IconComponent={() => <KeyboardArrowDownIcon />} */

                sx={{
                  color: "#9B9EAB",
                  justifyContent: "flex-end",
                  textAlign: "end",
                  fill: "#ffffff",
                  "&.MuiSelect-icon": { color: "#FFFFFF !important" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  /*   getContentAnchorEl: null, */
                  PaperProps: {
                    sx: {
                      backgroundColor: "#212126", // Fondo del menú desplegado
                      border: "1px solid #5682F2", // Borde azul
                      color: "#9B9EAB", // Letra blanca
                    },
                  },
                }}
                open={menuOpen}
                onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
                onOpen={() => setMenuOpen(true)} // Abre el menú cuando se hace clic en el botón
                IconComponent={() => {
                  return changeArrow(menuOpen, setMenuOpen);
                }}
              >
                {/* <MenuItem value='este_anho'>Este año</MenuItem> */}
                <MenuItem value="ult_6_meses">Últimos 6 meses</MenuItem>
                <MenuItem value="ult_12_meses">Últimos 12 meses</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      </div>
      {data == null ? (
        <div></div>
      ) : (
        <ResponsiveBar
          data={formattedData}
          keys={["Real", "Esperado"]}
          indexBy="fecha"
          label={() => ""}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.7}
          maxValue={gridYValues[gridYValues.length - 1]}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#6C6FFF", "#C5F5CA"]} // Define tus propios colores
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
            grid: {
              line: {
                stroke: "#41434C" /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
              },
            },
          }}
          fill={[
            {
              match: {
                id: "Real",
              },
              id: "Real",
            },
            {
              match: {
                id: "Esperado",
              },
              id: "Esperado",
            },
          ]}
          borderRadius={3}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.4]],
          }}
          tooltip={(point) => {
            return setTooltip(point);
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            tickValues: formattedData.map(
              (item: { fecha: string }) => item.fecha
            ),
            format: (value) => {
              if (typeof value === "string") {
                return formatFecha(value); // Formatea la fecha si es una cadena
              } else {
                return value; // O proporciona un valor predeterminado si no es una cadena
              }
            },
          }}
          gridYValues={gridYValues}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: tickValues,
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
            format: (value) => formatMillionsStr(value),
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-left",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 54,
              itemsSpacing: 0,
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
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </div>
  );
}

function setTooltip(point: any) {
  if (typeof point.data.fecha === "string") {
    const formattedDate = formatFecha(point.data.fecha);
    const formattedValue = formatMillionsStr(
      Number(point.data[point.id as keyof FlujosFront]),
      1
    );

    return (
      <div
        style={{
          background: "black",
          padding: "8px",
          borderRadius: "4px",
          color: "white",
        }}
      >
        <strong>{formattedDate}</strong>
        <div>
          {point.id}: {formattedValue}
        </div>
      </div>
    );
  }
  return null; // Devolver null si point.data.fecha no es una cadena
}

export default BarChartCompFlujos;
