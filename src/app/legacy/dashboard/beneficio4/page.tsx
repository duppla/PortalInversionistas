"use client";
import { useEffect, useState } from "react";

import fetchData from "../../url/ApiConfig";

import PageGenerator, { Inversion } from "../page_generator";

const endpoint = "/dashboard?portafolio=beneficio4";

const Page = () => {
  const [data, setData] = useState<Inversion>();

  useEffect(() => {
    fetchData(endpoint, setData);
  }, []);

  if (data) {
    return PageGenerator(data);
  }
};
export default Page;
