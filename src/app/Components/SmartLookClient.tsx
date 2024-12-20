'use client';
import { useEffect } from "react";

const SmartLookClient = () => {
  useEffect(() => {
    // Importa Smartlook de manera dinámica solo en el lado del cliente
    import("smartlook-client")
      .then((Smartlook) => {
        Smartlook.default.init("14f51def4837c57c7bfee5e79059196a449315d8", {
          advancedNetwork: true,
          cookies: true,
        });
      })
      .catch((error) => console.error("Error loading Smartlook: ", error));
  }, []);

  return null; // Este componente no renderiza nada
};

export default SmartLookClient;
