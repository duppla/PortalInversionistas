"use client";
import Navbar from "@/app/Components/navbar";
import FormsController from "../../Controllers/forms_controller";
import AplicacionParcial from "../aplicacionParcial";
import Link from "next/link";
import Button from "@/app/Components/button";

export default function Aplicar({ params }: { params: any }) {
  const controller: FormsController = FormsController.getInstance();
  const camp = params.campaign

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <Navbar>
        <Link href="/simulador" className="hover:underline">Simulador</Link>
        <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
        <Link href="/legacy" className="hover:underline">
          <Button id={"login"} onClick={() => { }}>Ingresar</Button>
        </Link>
      </Navbar>
      <AplicacionParcial
        controller={controller}
        campaign={camp}
        showsScore
        redirectAccept={camp == "701Rb00000MGDSsIAP" ? "https://duppla.notion.site/Duppla-Moneycon-17e4df06f7c98040afb5ec37d4717774" : `/saber-mas/${camp}`}
        caption={camp == "701Rb00000MGDSsIAP" ? "Completa el siguiente formulario para descargar el material de nuestra masterclass en Moneycon 2025" : undefined}
      ></AplicacionParcial>
    </main>
  );
}