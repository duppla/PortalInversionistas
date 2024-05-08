"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha } from "../utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/adelanto";

type Adelanto = {
  adelanto: number;
  fecha: string;
};

function CardAdelanto() {
  const email = getEmail();
  const [data, setData] = useState<Adelanto>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const formattedDate = data ? formatFecha(data.fecha) : "";
  const formattedAdelanto = data ? "$ " + data.adelanto.toLocaleString() : "";

  return CardCompDateBox("Adelanto", formattedDate, formattedAdelanto);
}

export default CardAdelanto;
