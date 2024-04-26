"use client";
import { useEffect, useState } from "react";
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "@/app/context/authContext";
import { formatFecha } from "@/app/dashboard/Components/utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/noi";

interface ApiResponse {
  noi: number;
  fecha: string;
}

function CardCompNOI() {
  const { userEmail } = useAuth();

  const [dataApiNOI, setDataApiNOI] = useState<ApiResponse | null>(null);

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
        const dataValue = response?.noi; // Usando optional chaining para verificar si response existe
        if (typeof dataValue === "number") {
          setDataApiNOI(response); // Coloca el objeto en un array para mantener consistencia
        } else {
          console.error("El valor de data no es un número:", dataValue);
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  const formattedDate = dataApiNOI ? formatFecha(dataApiNOI.fecha) : "";
  // Accede directamente al primer elemento del array
  const dataValue = dataApiNOI?.noi;

  return CardCompDateBox(
    "NOI",
    formattedDate,
    typeof dataValue === "number"
      ? `$ ${dataValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : ""
  );
}

export default CardCompNOI;
