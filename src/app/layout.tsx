import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inversionistas duppla",
  description: "Duppla es una plataforma de inversiones que te permite invertir en activos inmobiliarios de manera sencilla y segura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-futuro-darker bg-pattern-investor bg-left-top bg-no-repeat">
        <GoogleAnalytics gaId="G-FF0V434HDN" />
        <GoogleTagManager gtmId="GTM-529X3G26" />
        <main>
          {children}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-529X3G26" title="analytics"
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
            </iframe>
          </noscript>
        </main>
      </body>
    </html>
  );
}
