"use client";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState, ReactNode } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { Typography, FormControl, Select, MenuItem } from "@mui/material";
import { getApiUrl } from "@/app/url/ApiConfig";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAuth } from "@/app/context/authContext";
import formatFecha from "../utils";

const endpoint = "/clientes/comportamiento_pago";

type DataApiType = {
  fecha: string;
  pagado: any;
  mora: any;
};

type DataType = {
  ult_12_meses: DataApiType[];
  este_anho: DataApiType[];
  ult_6_meses: DataApiType[];
};

function BarChartCompPago() {
  console.log = () => {};

  const { userEmail } = useAuth();

  const [data, setData] = useState<DataType | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [selectedDataKeyO, setSelectedDataKeyO] =
    useState<string>("ult_12_meses");
  const [selectedValue, setSelectedValue] = useState<string | number>(
    "ult_12_meses"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const [gridYValues, setGridYValues] = useState<number[]>([]);
  const [tickValues, setTickValues] = useState<number[]>([]);

  const calculateAxisValues = (data: DataApiType[]) => {
    // Calcula la suma máxima de ambos valores en positivo
    const maxSum = Math.max(
      ...data.map((item) => item.pagado + Math.abs(item.mora))
    );

    const tickCount = 5;
    let count = 0;
    let tickIni = 500000;
    let tickStep = tickIni;
    let mult = tickIni / 10;
    while (maxSum / tickCount > tickStep) {
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
        setResponseData(responseData);
        setData(responseData); // Actualiza los datos cuando la respuesta de la API llega
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    if (responseData) {
      // Utiliza los datos relevantes para el cálculo
      const { gridYValues, tickValues } = calculateAxisValues(
        responseData[selectedDataKeyO]
      );
      setGridYValues(gridYValues);
      setTickValues(tickValues);
    }
  }, [responseData, selectedDataKeyO]);

  /* Función para actualizar la selección del usuario */
  const handleDataSelection = (dataKey: string) => {
    setSelectedDataKeyO(dataKey);
  };

  /* Función que controla la selección del dropdown */
  const handleSelectChange = (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => {
    const selectedDataKeyO = event.target.value as string;
    setSelectedValue(selectedDataKeyO);
    handleDataSelection(selectedDataKeyO);
  };

  /* data del enpoint para renderizar la grafica por un map */

  const formattedData =
    responseData?.[selectedDataKeyO]?.map(
      (item: { fecha: string; pagado: number; mora: number }) => ({
        fecha: item.fecha,
        "Pago a tiempo": item.pagado, // Solo valores positivos o cero
        "Pago con Atraso": Math.abs(item.mora), // Solo valores negativos
      })
    ) ?? [];

  /* prueba de formateo data a legible */
  function formatNumber(value: number): string {
    return (value < 0 ? "-" : "") + (value / 1000000).toFixed(0) + " M";
  }

  /* prueba de formateo data a legible tooltip */

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
                Comportamiento de pago
              </Typography>
            </Grid>
            <Grid xs={6} md={6} lg={6} sx={{ textAlign: "end" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
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
                IconComponent={() => setIconComponent(menuOpen, setMenuOpen)}
              >
                {/*    <MenuItem value='este_anho'>Este año</MenuItem> */}
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
          keys={["Pago a tiempo", "Pago con Atraso"]}
          indexBy="fecha"
          label={() => ""}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          padding={0.8}
          maxValue={gridYValues[gridYValues.length - 1]}
          colors={["#12CA98", "#FFB024"]}
          /*  enableGridY={false} */

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
          /* valueFormat={(v) => (typeof v === 'number' ? v.toString() : '')} */
          valueFormat={(v) =>
            typeof v === "number" ? Math.abs(v).toString() : ""
          } // Convertir valores a positivos antes de formatear
          gridYValues={gridYValues}
          axisLeft={{
            tickSize: 2,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: tickValues,
            legend: "",

            legendPosition: "middle",
            legendOffset: -40,
            format: (value) => formatNumber(value),
          }}
          tooltip={(point) => {
            return setTooltip(point);
          }}
          borderRadius={4}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            tickValues: formattedData.map(
              (item: { fecha: string }) => item.fecha
            ),
            format: (value) => {
              return formatFecha(value);
            },
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          layout="vertical"
          groupMode="stacked"
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-left",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 54,
              itemsSpacing: 20,
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
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </div>
  );
}

const setTooltip = (point: any) => {
  if (typeof point.data.fecha === "string") {
    const formattedDate = formatFecha(point.data.fecha);
    const formattedValue = formatNumberTooltip(Number(point.data[point.id]));

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
  return null;
};

function formatNumberTooltip(value: number): string {
  let millones = (value / 1000000).toFixed(1);
  let shortValue = millones.endsWith(".0") ? millones.slice(0, -2) : millones;

  return (value < 0 ? "-" : "") + shortValue + " M";
}

const setIconComponent = (menuOpen: boolean, setMenuOpen: any) => {
  const icon = menuOpen ? (
    <ArrowDropUpIcon
      style={{
        color: "#9B9EAB",
        fill: "#9B9EAB",
        marginLeft: "-20px",
      }}
      onClick={() => setMenuOpen(!menuOpen)}
    />
  ) : (
    <ArrowDropDownIcon
      style={{
        color: "#9B9EAB",
        fill: "#9B9EAB",
        marginLeft: "-20px",
      }}
      onClick={() => setMenuOpen(!menuOpen)}
    />
  );
  return icon;
};

export default BarChartCompPago;
