"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha } from "../utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/tasa_morosidad";

type Morosidad = {
  tasa_morosidad: number;
  fecha: string;
};

function CardMorosidad() {
  const email = getEmail();
  const [data, setData] = useState<Morosidad>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const morosidad = data ? (data.tasa_morosidad * 100).toFixed(1) + "%" : "";
  const formattedDate = data ? formatFecha(data.fecha) : "";

  return CardCompDateBox("Tasa de morosidad", formattedDate, morosidad);
}

export default CardMorosidad;
