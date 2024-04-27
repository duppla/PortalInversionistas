"use client";
import { useEffect, useState } from "react";
import getApiUrl from "../../../url/ApiConfig";
import { useAuth } from "@/app/context/authContext";
import { formatFecha } from "@/app/dashboard/Components/utils";
import { CardCompDateBox } from "../CardComps";

const endpoint = "/principal/noi";

type Noi = {
  noi: number;
  fecha: string;
};

function CardNOI() {
  const { userEmail } = useAuth();
  const [data, setData] = useState<Noi | null>(null);

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

  const formattedDate = data ? formatFecha(data.fecha) : "";
  const noi = data
    ? "$ " + data.noi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

  return CardCompDateBox("NOI", formattedDate, noi);
}

export default CardNOI;
