"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "../../../context/authContext";
import { CardCompBox } from "../CardComps";

const endpoint = "/principal/retorno";

type Retorno = {
  retorno: number;
};
function CardCompRetorno() {
  const { userEmail } = useAuth();
  const [data, setData] = useState<Retorno | null>(null);

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

  let retorno = data
    ? "$ " + data.retorno.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompBox("Retorno total a la fecha", retorno);
}

export default CardCompRetorno;
