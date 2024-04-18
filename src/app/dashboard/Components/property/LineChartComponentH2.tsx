"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FormControl, Typography, Select, MenuItem } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { getApiUrl } from "@/app/url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

type DataApiType = {
  fecha: string;
  unidades: number;
};

type DataType = {
  ult_12_meses: any[];
  este_anho: any[];
  ult_6_meses: any[];
  [key: string]: any;
};

interface Item {
  [key: string]: any;
  fecha: string;
  unidades: number | null;
}

const LineChartComponentH2 = () => {
  const { userEmail } = useAuth();

  const [data, setData] = useState<DataType>({
    ult_12_meses: [],
    este_anho: [],
    ult_6_meses: [],
  });
  const [selectedDataKeyH2, setSelectedDataKeyH2] =
    useState<string>("ult_12_meses");
  const [selectedValue, setSelectedValue] = useState<string | number>(
    "ult_12_meses"
  );

  const [transformedData, setTransformedData] = useState<
    { x: string; y: number }[]
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [yAxisValues, setYAxisValues] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParameter = userEmail;

    const fetchData = async () => {
      if (!userEmail) {
        return;
      }
      try {
        const options = {
          method: "GET",
          headers: { "User-Agent": "insomnia/2023.5.8" },
        };
        const response = await fetch(
          getApiUrl(`/inmuebles/numero_unidades?email=${queryParameter}`),
          options
        );

        const newData = await response.json();

        setData((prevData) => {
          const updatedData = { ...prevData };
          updatedData[selectedValue.toString()] =
            newData[selectedValue.toString()];
          return updatedData;
        });

        handleDataSelection(selectedValue.toString());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true); // Iniciar la carga
    fetchData();
  }, [selectedValue, userEmail]);

  useEffect(() => {
    // Actualización de datos de gráfico aquí
    const transformedData = tranformeDataApi(data, selectedDataKeyH2);
    setTransformedData(transformedData);

    // Calcular el mínimo y máximo de unidades para generar los valores del eje Y
    const units = data[selectedDataKeyH2].map((item: any) => item.unidades);
    //const minUnits = Math.min(...units);
    const maxUnits = Math.max(...units);

    const tickCount = 4;
    var count = 0;
    var tickIni = 0.5;
    var tickStep = tickIni;
    var mult = tickIni / 10;
    while (maxUnits / tickCount > tickStep) {
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
    const yAxisValues = Array.from(
      { length: tickCount + 1 },
      (_, index) => index * tickStep
    );
    setYAxisValues(yAxisValues);
  }, [data, selectedDataKeyH2]);

  const handleDataSelection = (dataKey: string) => {
    setSelectedDataKeyH2(dataKey);
  };

  /* Función dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const selectedOption = event.target.value as string;
    setSelectedValue(selectedOption);
    handleDataSelection(selectedOption);
  };

  const tranformeDataApi = (data: DataType, selectedDataKeyH2: string) => {
    return (data[selectedDataKeyH2 as keyof DataType] as DataApiType[]).map(
      (item) => ({
        x: item.fecha,
        y: item.unidades,
      })
    );
  };

  const tranformedData = tranformeDataApi(data, selectedDataKeyH2);

  return (
    <div className="grafica-Linecharts">
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
                Número de unidades
              </Typography>
            </Grid>
            <Grid xs={6} md={6} lg={6} sx={{ textAlign: "end" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Age"
                onChange={handleSelectChange}
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
                IconComponent={() =>
                  // Cambia el ícono según el estado del menú
                  menuOpen ? (
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
                  )
                }
              >
                {/*   <MenuItem value='este_anho'>Este año</MenuItem> */}
                <MenuItem key="ult_6_meses" value="ult_6_meses">
                  Últimos 6 meses
                </MenuItem>
                <MenuItem key="ult_12_meses" value="ult_12_meses">
                  Últimos 12 meses
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      </div>
      {loading && (
        <Typography sx={{ color: "#212126" }}>Cargando...</Typography>
      )}
      {!loading && (
        <ResponsiveLine
          animate
          axisBottom={{
            legend: "",
            legendOffset: -12,
            tickValues: "every month",
            format: (value) => {
              const date = new Date(value);
              const month = new Intl.DateTimeFormat("es", {
                month: "short",
              }).format(date);
              return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date
                .getFullYear()
                .toString()
                .slice(2)}`;
              /* return `${date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase()}${date.toLocaleString('default', { month: 'short' }).slice(1)} ${date.getFullYear()}`; */
            },
          }}
          enableGridX={false}
          gridYValues={yAxisValues}
          /*  gridYValues={[5, 15, 25, 35]}  */
          axisLeft={{
            /*  legend: 'linear scale', */
            legendOffset: 12,
            tickValues: yAxisValues,
          }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#9B9EAB", // Cambia aquí al color que desees para el texto de las marcas en el eje Y
                },
              },
            },
            grid: {
              line: {
                stroke: "#41434C" /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
              },
            },
          }}
          lineWidth={7}
          tooltip={(point) => {
            const date = new Date(point.point.data.x);

            return (
              <div
                style={{
                  background: "#272727",
                  color: "#5ED1B1",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <div>
                  <strong>{`${date
                    .toLocaleString("default", { month: "short" })
                    .charAt(0)
                    .toUpperCase()}${date
                    .toLocaleString("default", { month: "short" })
                    .slice(1)} ${date.getFullYear()}`}</strong>
                </div>
                <div>{`Unidades: ${point.point.data.y}`}</div>
              </div>
            );
          }}
          curve="monotoneX"
          data={[
            {
              data: tranformedData,

              id: "Unidades",
            },
          ]}
          colors={["#5ED1B1"]}
          enablePointLabel={false}
          margin={{
            bottom: 60,
            left: 50,
            right: 20,
            top: 40,
          }}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
          }}
          pointBorderWidth={1}
          pointSize={16}
          pointSymbol={function noRefCheck() {}}
          useMesh
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            precision: "day",
            type: "time",
            useUTC: false,
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: yAxisValues[yAxisValues.length - 1],
            stacked: false,
            reverse: false,
          }}
        />
      )}
    </div>
  );
};

export default LineChartComponentH2;
