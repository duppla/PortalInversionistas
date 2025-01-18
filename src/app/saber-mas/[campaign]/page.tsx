"use client";
import Navbar from "@/app/Components/navbar";
import FormsController from "../../Controllers/forms_controller";
import AplicacionParcial from "../aplicacionParcial";
import Link from "next/link";
import Button from "@/app/Components/button";

export default function Aplicar({ params }: { params: any }) {
  const controller: FormsController = FormsController.getInstance();

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
        campaign={params.campaign}
        showsScore
        reloadOnAccept
      ></AplicacionParcial>
    </main>
  );
}