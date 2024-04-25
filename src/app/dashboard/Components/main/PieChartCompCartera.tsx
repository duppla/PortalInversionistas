"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, FormControl } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "@/app/context/authContext";

const endpoint = "/principal/cartera_mora";

type LabelValue = {
  label: string;
  value: number;
};

type CarteraMora = {
  cartera_mora: LabelValue[];
  total: number;
};

function PieChartCompCartera() {
  const { userEmail } = useAuth();

  const [responseData, setResponseData] = useState<CarteraMora>({
    cartera_mora: [],
    total: 0,
  });

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const email = encodeURIComponent(userEmail);
    const fetchData = async () => {
      try {
        // Tu lógica para hacer la solicitud al API y obtener los datos
        const response = await fetch(getApiUrl(endpoint + `?email=${email}`));
        const responseData = await response.json();

        if (responseData) {
          setResponseData(responseData);
        } else {
          console.error("Respuesta de la API vacía");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userEmail]);

  const getColorByKey = (key: string): string => {
    switch (key) {
      case "a_tiempo":
        return "green";
      case "en_mora":
        return "red";
      default:
        return "gray";
    }
  };
  const formattedDataPieG2 = responseData.cartera_mora.map((item) => ({
    id: item.label,
    label: item.label,
    value: item.value,
    formattedValue: `${item.value.toFixed(2)}%`,
    color: getColorByKey(item.label.toLowerCase().replace(/\s/g, "_")),
  }));

  const formatNumber = (num: number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    const tier = (Math.log10(Math.abs(num)) / 3) | 0;

    if (tier === 0) return num;

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);

    const scaled = num / scale;
    return Math.round(scaled) + suffix;
  };

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
                Cartera en mora
              </Typography>
            </Grid>
            {/*   <Grid xs={6} md={6} lg={6} sx={{ textAlign: 'end' }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Age"
                onChange={handleSelectChange}
                sx={{
                  color: '#9B9EAB',
                  justifyContent: 'flex-end',
                  textAlign: 'end',
                  fill: '#ffffff',
                  '&.MuiSelect-icon': { color: '#FFFFFF !important' },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                  
                  PaperProps: {
                    sx: {
                      backgroundColor: '#212126', // Fondo del menú desplegado
                      border: '1px solid #5682F2', // Borde azul
                      color: '#9B9EAB', // Letra blanca
                    },
                  },
                }}
                open={menuOpen}
                onClose={() => setMenuOpen(false)} // Cierra el menú cuando se hace clic fuera de él
                onOpen={() => setMenuOpen(true)}   // Abre el menú cuando se hace clic en el botón

                IconComponent={() => (
                  // Cambia el ícono según el estado del menú
                  menuOpen ? (
                    <ArrowDropUpIcon
                      style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                      onClick={() => setMenuOpen(!menuOpen)}
                    />
                  ) : (
                    <ArrowDropDownIcon
                      style={{ color: '#9B9EAB', fill: '#9B9EAB', marginLeft: '-20px' }}
                      onClick={() => setMenuOpen(!menuOpen)}
                    />
                  )
                )}
              >
                <MenuItem value='este_anho'>Este año</MenuItem>
                <MenuItem value='ult_6_meses'>Últimos 6 meses</MenuItem>
                <MenuItem value='ult_12_meses'>Últimos 12 meses</MenuItem>
              </Select>
            </Grid>  */}
          </Grid>
        </FormControl>
      </div>

      {formattedDataPieG2.length > 0 && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={formattedDataPieG2}
            margin={{ top: 40, right: 80, bottom: 80, left: -40 }}
            startAngle={0}
            innerRadius={0.7}
            padAngle={1}
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
            tooltip={(tooltipProps) => {
              const { id, value, color, formattedValue, label } =
                tooltipProps.datum;

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
                      {" "}
                      {label}: {Math.round(value * 100)}%
                    </strong>
                  </div>
                </div>
              );
            }}
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
      )}
      <div
        className="centrado div-center-pie "
        style={{
          position: "absolute",
          top: "60%",
          left: "40%",
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
            ${formatNumber(responseData.total)}
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
            {formattedDataPieG2.reduce((acc, curr) => acc + curr.value, 0) === 0
              ? "No hay mora"
              : "Total"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default PieChartCompCartera;
