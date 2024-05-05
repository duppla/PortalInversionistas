"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/principal/inversion_original";

type Inversion = {
  monto_inversion: number;
};
function CardInversion() {
  const email = getEmail();
  const [data, setData] = useState<Inversion | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getApiUrl(endpoint, { email: email }));
      const responseData = await response.json();
      setData(responseData);
    };

    if (email !== null) {
      fetchData();
    }
  }, [email]);

  const monto_inversion = data
    ? "$ " +
      data.monto_inversion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompBox("Inversión original", monto_inversion);
}

export default CardInversion;
