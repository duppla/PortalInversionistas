"use client";
// react imports
import { useEffect, useState } from "react";

// material-ui imports
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { LineChart } from "../LineChartComps";
import { generarTicks } from "../utils";
import { titleGrid, selectGrid } from "../ChartAddons";

const endpoint = "/principal/rentabilidad_portafolio";

const tickCount = 5;

type Rentabilidad = {
  fecha: string;
  rentabilidad: number;
};

export type RentabilidadFront = {
  x: string;
  y: number;
};

type RentabilidadPortafolio = {
  ult_12_meses: [Rentabilidad];
  este_anho: [Rentabilidad];
  ult_6_meses: [Rentabilidad];
  [key: string]: any;
};

const LineChartRentabilidad = () => {
  const { userEmail } = useAuth();
  const [data, setData] = useState<RentabilidadPortafolio | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("ult_12_meses");

  const [menuOpen, setMenuOpen] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);

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

  useEffect(() => {
    if (data) {
      const dataMora = data[selectedKey as keyof RentabilidadPortafolio];
      const maxValue = Math.max(
        ...dataMora.map((item: Rentabilidad) => item.rentabilidad)
      );
      const ticks = generarTicks(0, maxValue, tickCount);
      setTicks(ticks);
    }
  }, [selectedKey, data]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  let formattedData: RentabilidadFront[] = [];
  if (data) {
    formattedData = data[selectedKey].map((item: Rentabilidad) => ({
      x: item.fecha,
      y: item.rentabilidad,
    }));
  }

  /* Mensaje para el tooltip explicativo */

  const minY = (ticks[0] * 100).toFixed(2);
  const maxY = (ticks[ticks.length - 1] * 100).toFixed(2);

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
            {titleGrid("Rentabilidad mensual del portafolio", longText)}
            {selectGrid(selectedKey, handleSelectChange, menuOpen, setMenuOpen)}
          </Grid>
        </FormControl>
      </div>
      <br />
      {LineChart(formattedData, "Rentabilidad", ticks, 2, true, false)}
    </div>
  );
};

export default LineChartRentabilidad;
