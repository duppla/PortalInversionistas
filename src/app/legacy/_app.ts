"use client";
import { useEffect } from "react";

function SmartLookClient() {
  useEffect(() => {
    import("smartlook-client")
      .then((SmartLook) => {
        SmartLook.default.init("0ed319a59b519e257c52daf7074436d3994fea98", {
          advancedNetwork: true,
          cookies: true,
        });
      })
      .catch((error) => console.error("Error loading SmartLook", error));
  }, []);

  return null;
}

export default SmartLookClient;
