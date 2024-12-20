"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/principal/inversion_original";

type Inversion = {
  monto_inversion: number;
};
function CardInversion() {
  const email = getEmail();

  const [data, setData] = useState<Inversion>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const inversion = data ? "$ " + data.monto_inversion.toLocaleString() : "";

  return CardCompBox("Inversión original", inversion);
}

export default CardInversion;
