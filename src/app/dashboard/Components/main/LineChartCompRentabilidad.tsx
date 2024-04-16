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
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const endpoint = "/principal/rentabilidad_portafolio";

type Rentabilidad = {
  fecha: string;
  rentabilidad: number;
};

type RentabilidadPortafolio = {
  ult_12_meses: [Rentabilidad];
  este_anho: [Rentabilidad];
  ult_6_meses: [Rentabilidad];
  [key: string]: any;
};

const DropdownIcon = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return menuOpen ? (
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
};

const LineChartCompRentabilidad = () => {
  const { userEmail } = useAuth();

  const [data, setData] = useState<RentabilidadPortafolio>({
    ult_12_meses: [
      {
        fecha: "",
        rentabilidad: 0,
      },
    ],
    este_anho: [{ fecha: "", rentabilidad: 0 }],
    ult_6_meses: [{ fecha: "", rentabilidad: 0 }],
  });

  const [selectedDataKeyRentabilidad, setSelectedDataKeyRentabilidad] =
    useState<string>("ult_12_meses");

  const [selectedValue, setSelectedValue] = useState<string>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [yAxisValues, setYAxisValues] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    fetchData();
  }, [selectedValue, userEmail]);

  useEffect(() => {
    const units = data[selectedDataKeyRentabilidad].map((item: any) =>
      parseFloat(item.rentabilidad)
    );

    if (units.length > 0) {
      const maxYValue = Math.max(...units);
      const minYValue = Math.min(...units);
      const medianYValue = (maxYValue + minYValue) / 2;

      const tickCount = 5;
      let count = 0;
      let tickIni = 0.0005;
      let tickStep = tickIni;
      let mult = tickIni / 10;

      while (
        medianYValue - tickCount * (tickStep / 2) > minYValue ||
        medianYValue + tickCount * (tickStep / 2) < maxYValue
      ) {
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

      let lowest = minYValue - (minYValue % tickStep);
      const yAxisValues = Array.from(
        { length: tickCount + 1 },
        (_, index) => lowest + index * tickStep
      );

      setYAxisValues(yAxisValues);
    } else {
      setYAxisValues([0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    }
  }, [data, selectedDataKeyRentabilidad]);

  function redondearRentabilidad(value: any) {
    const roundedValue = Math.round(value * 100);
    const residual = roundedValue % 5;
    let adjustedValue = roundedValue - residual;

    if (residual > 2) {
      adjustedValue += 5;
    }

    return adjustedValue / 100;
  }

  const handleDataSelection = (dataKey: string) => {
    setSelectedDataKeyRentabilidad(dataKey);
  };

  /* Función dropdown */
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const selectedOption = event.target.value as string;
    setSelectedValue(selectedOption);
    handleDataSelection(selectedOption);
  };

  const tranformeDataApi = (
    data: RentabilidadPortafolio,
    selectedDataKey: string
  ) => {
    return (
      data[selectedDataKey as keyof RentabilidadPortafolio] as Rentabilidad[]
    ).map((item, index) => ({
      x: item.fecha,
      y: item.rentabilidad,
      key: `${selectedDataKey}_${index}`, // Añade el nombre del conjunto de datos a la clave
    }));
  };

  const tranformedData = tranformeDataApi(data, selectedDataKeyRentabilidad);

  /* Mensaje para el tooltip explicativo */

  const minY = (yAxisValues[0] * 100).toFixed(2);
  const maxY = (yAxisValues[yAxisValues.length - 1] * 100).toFixed(2);

  const longText = `Nota: Los valores mostrados en esta gráfica se encuentran en un rango de ${minY}% a ${maxY}% para facilitar su legibilidad. Verifique la escala para una interpretación precisa.`;

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
              <Grid container>
                <Grid xs={10} sm={10} md={10} lg={10}>
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
                    Rentabilidad mensual del portafolio{" "}
                  </Typography>
                </Grid>
                <Grid xs={1} sm={1} md={1} lg={1}>
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
                IconComponent={() => (
                  <DropdownIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )}
              >
                {/*   <MenuItem value='este_anho'>Este año</MenuItem> */}
                <MenuItem value="ult_6_meses">Últimos 6 meses</MenuItem>
                <MenuItem value="ult_12_meses">Últimos 12 meses</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      </div>

      <br />

      {loading && (
        <Typography sx={{ color: "#212126" }}>Cargando...</Typography>
      )}
      {!loading && (
        <ResponsiveLine
          data={[
            {
              data: tranformedData,
              id: "Rentabilidad",
            },
          ]}
          colors={["#5ED1B1"]}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            precision: "month",
            type: "time",
            useUTC: false,
          }}
          yScale={{
            type: "linear",
            min: yAxisValues[0],
            max: yAxisValues[yAxisValues.length - 1],
            stacked: true,
            reverse: false,
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "",
            legendOffset: -12,
            tickValues: "every month",
            format: (value) => {
              const date = new Date(value);
              const year = date.getFullYear();
              const month = date.getMonth();

              const monthNames = [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
              ];

              return `${monthNames[month]} ${year}`;
            },
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
            tickValues: yAxisValues,
            format: (tick) => `${(tick * 100).toFixed(2)}%`,
          }}
          enableGridX={false}
          gridYValues={yAxisValues}
          lineWidth={3}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enablePointLabel={false}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[]}
          tooltip={(point) => {
            const date = new Date(point.point.data.x);
            const year = date.getFullYear();
            const month = date.getMonth();

            const monthNames = [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ];

            const formattedX = `${monthNames[month]} ${year}`;

            const formattedY =
              typeof point.point.data.y === "number"
                ? `${(point.point.data.y * 100).toFixed(2)}%` // Multiplica por 100 y agrega el símbolo de porcentaje
                : point.point.data.y;

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
                  <strong>{formattedX}</strong>
                </div>
                <div>{`Rentabilidad: ${formattedY}`}</div>
              </div>
            );
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
        />
      )}
    </div>
  );
};

export default LineChartCompRentabilidad;
