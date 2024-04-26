"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { formatFecha } from "../utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/adelanto";

interface Adelanto {
  adelanto: number;
  fecha: string;
}

function CardAdelanto() {
  const { userEmail } = useAuth();

  const [data, setData] = useState<Adelanto | null>(null);

  useEffect(() => {
    fetch(getApiUrl(endpoint, { email: userEmail }))
      .then((response) => response.json())
      .then((response) => {
        if (typeof response.adelanto === "number") {
          setData(response);
        } else {
          console.error("El valor de data no es un número:");
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  // Accede directamente al primer elemento del array
  const formattedDate = data ? formatFecha(data.fecha) : "";

  return CardCompDateBox(
    "Adelanto",
    formattedDate,
    "$ " + data?.adelanto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export default CardAdelanto;
