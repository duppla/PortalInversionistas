"use client";
import Link from "next/link";
import Button from "../Components/button";
import Controller from "../Controllers/controller";
import FormsController from "../Controllers/forms_controller";
import AplicacionParcial from "./aplicacionParcial";
import Navbar from "../Components/navbar";
import { redirect } from "next/navigation";

export default function Aplicar() {
  const controller: Controller = FormsController.getInstance();

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between absolute">
      <Navbar>
        <Link href="/saber-mas" className="hover:underline">Simulador</Link>
        <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
        <Link href="/legacy" className="hover:underline">
          <Button id={"login"} onClick={() => { }}>Ingresar</Button>
        </Link>
      </Navbar>
      <AplicacionParcial
        controller={controller}
      ></AplicacionParcial>
    </main>
  );
}