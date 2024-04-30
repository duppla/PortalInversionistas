/* import type { Metadata } from 'next' */
import { Inter } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import AuthProvider from "../app/context/authContext";

interface Metadata {
  title: string;
  description?: string | null | undefined;
  script: {
    type: string;
    innerHTML: string;
  }[];
  meta: {
    tag: string;
    rel: string;
    href: string;
  }[];
  // Other properties...
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal inversionistas",
  description: "Inversionistas duppla",
  meta: [
    {
      tag: "link",
      rel: "stylesheet",
      href: "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
    },
  ],
  script: [
    {
      type: "text/javascript",
      innerHTML: `
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments) },
              h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');
            o.api=new Array();
            c.async=true;
            c.type='text/javascript';
            c.charset='utf-8';
            c.src='https://web-sdk.smartlook.com/recorder.js';
            h.appendChild(c);
          })(document);
          smartlook('init', '0ed319a59b519e257c52daf7074436d3994fea98', { region: 'eu' });
        `,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
