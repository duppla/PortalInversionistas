"use client";
import { useEffect, useState } from "react";
import getApiUrl from "../../../url/ApiConfig";
import { getEmail } from "@/app/context/authContext";
import { formatFecha } from "@/app/dashboard/Components/utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/noi";

type Noi = {
  noi: number;
  fecha: string;
};

function CardNOI() {
  const email = getEmail();
  const [data, setData] = useState<Noi | null>(null);

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

  const formattedDate = data ? formatFecha(data.fecha) : "";
  const noi = data
    ? "$ " + data.noi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompDateBox("NOI", formattedDate, noi);
}

export default CardNOI;
