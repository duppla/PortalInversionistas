"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";
import { formatNumber } from "../utils";

const endpoint = "/principal/participacion_adquirida";

type Participacion = {
  participacion_adquirida: number;
};

function CardParticipacion() {
  const { userEmail } = useAuth();
  const [data, setData] = useState<Participacion | null>(null);

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

  let porcentaje = data?.participacion_adquirida;
  let participacion = porcentaje ? formatNumber(porcentaje, 1, true) : "";

  return CardCompBox("Participación adquirida", participacion);
}

export default CardParticipacion;
