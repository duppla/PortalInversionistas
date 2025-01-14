"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/dashboard";

type Inversion = {
  inversion_original: number;
  participacion_adquirida: number;
  fechas: string[];
  retorno_a_la_fecha: number[];
  devolucion_capital_acumulado: number[];
};
function CardInversion() {
  const email = getEmail();

  const [data, setData] = useState<Inversion>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const inversion = data ? "$ " + data.inversion_original.toLocaleString() : "";

  return CardCompBox({"title": "Inversión", "data": inversion});
}

export default CardInversion;
