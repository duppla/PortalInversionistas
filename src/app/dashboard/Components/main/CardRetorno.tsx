"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import fetchData from "../../../url/ApiConfig";
import { getEmail } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/principal/retorno";

type Retorno = {
  retorno: number;
};
function CardCompRetorno() {
  const email = getEmail();
  const [data, setData] = useState<Retorno>();

  useEffect(() => {
    fetchData(endpoint, email, setData);
  }, [email]);

  let retorno = data
    ? "$ " + data.retorno.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompBox("Retorno total a la fecha", retorno);
}

export default CardCompRetorno;
