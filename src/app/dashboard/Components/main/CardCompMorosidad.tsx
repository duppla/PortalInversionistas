"use client";
import { useEffect, useState } from "react";
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "@/app/context/authContext";
import { formatFecha } from "@/app/dashboard/Components/utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/tasa_morosidad";

interface ApiResponse {
  tasa_morosidad: number;
  fecha: string;
}

function CardCompMorosidad() {
  const { userEmail } = useAuth();
  const [dataApiMorosidad, setDataApiMorosidad] = useState<ApiResponse | null>(
    null
  );

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const email = encodeURIComponent(userEmail);
    const options = {
      method: "GET",
      headers: { "User-Agent": "insomnia/2023.5.8" },
    };

    fetch(getApiUrl(endpoint + `?email=${email}`), options)
      .then((response) => response.json())
      .then((response) => {
        setDataApiMorosidad(response); // Coloca el objeto en un array para mantener consistencia
      })
      .catch((err) => console.error(err));
  }, [userEmail]);
  // Accede directamente al primer elemento del array
  const porcentaje = dataApiMorosidad?.tasa_morosidad
    ? (dataApiMorosidad.tasa_morosidad * 100).toFixed(1) + "%"
    : "0%";

  const formattedDate = dataApiMorosidad
    ? formatFecha(dataApiMorosidad.fecha)
    : "";

  return CardCompDateBox("Tasa de morosidad", formattedDate, porcentaje);
}

export default CardCompMorosidad;
