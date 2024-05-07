"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
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
    const fetchData = async () => {
      const response = await fetch(getApiUrl(endpoint, { email: email }));
      const responseData = await response.json();
      if (responseData) {
        setData(responseData);
      }
    };

    fetchData();
  }, [email]);

  const morosidad = data ? (data.tasa_morosidad * 100).toFixed(1) + "%" : "";
  const formattedDate = data ? formatFecha(data.fecha) : "";

  return CardCompDateBox("Tasa de morosidad", formattedDate, morosidad);
}

export default CardMorosidad;
