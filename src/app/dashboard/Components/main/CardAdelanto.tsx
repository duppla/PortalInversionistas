"use client";
// react imports
import { useEffect, useState } from "react";

// custom imports
import getApiUrl from "../../../url/ApiConfig";
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
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl(endpoint, { email: email }));
        const responseData = await response.json();
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

  const formattedDate = data ? formatFecha(data.fecha) : "";
  const formattedAdelanto = data
    ? "$ " + data.adelanto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompDateBox("Adelanto", formattedDate, formattedAdelanto);
}

export default CardAdelanto;
