"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";
import { formatNumber } from "../utils";

const endpoint = "/principal/participacion_adquirida";

type Participacion = {
  participacion_adquirida: number;
};

function CardParticipacion() {
  const email = getEmail();
  const [data, setData] = useState<Participacion>();

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

  let porcentaje = data?.participacion_adquirida;
  let participacion = porcentaje ? formatNumber(porcentaje, 1, true) : "";

  return CardCompBox("Participación adquirida", participacion);
}

export default CardParticipacion;
