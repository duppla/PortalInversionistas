"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { formatFecha } from "../utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/tasa_morosidad";

type Morosidad = {
  tasa_morosidad: number;
  fecha: string;
};

function CardMorosidad() {
  const { userEmail } = useAuth();
  const [data, setData] = useState<Morosidad | null>(null);

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

  const morosidad = data ? (data.tasa_morosidad * 100).toFixed(1) + "%" : "";
  const formattedDate = data ? formatFecha(data.fecha) : "";

  return CardCompDateBox("Tasa de morosidad", formattedDate, morosidad);
}

export default CardMorosidad;
