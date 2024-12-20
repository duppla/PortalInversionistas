"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
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
    fetchData(endpoint, email, setData);
  }, [email]);

  let porcentaje = data?.participacion_adquirida;
  let participacion = porcentaje ? formatNumber(porcentaje, 1, true) : "";

  return CardCompBox("Participación adquirida", participacion);
}

export default CardParticipacion;
