"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/principal/inversion_original";

interface Inversion {
  monto_inversion: number;
}
function CardInversion() {
  const { userEmail } = useAuth();
  const [data, setData] = useState<Inversion | null>(null);

  useEffect(() => {
    fetch(getApiUrl(endpoint, { email: userEmail }))
      .then((response) => response.json())
      .then((response) => {
        if (typeof response.monto_inversion === "number") {
          setData(response); // Coloca el objeto en un array para mantener consistencia
        } else {
          console.error("El valor de data no es un número:");
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  const monto_inversion = data
    ? "$ " +
      data.monto_inversion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompBox("Inversión original", monto_inversion);
}

export default CardInversion;
