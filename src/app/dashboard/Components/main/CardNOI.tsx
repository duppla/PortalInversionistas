"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { formatFecha } from "../utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/noi";

type Noi = {
  noi: number;
  fecha: string;
};

function CardNOI() {
  const email = getEmail();
  const [data, setData] = useState<Noi>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  const formattedDate = data ? formatFecha(data.fecha) : "";
  const noi = data
    ? "$ " + data.noi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompDateBox("NOI", formattedDate, noi);
}

export default CardNOI;
