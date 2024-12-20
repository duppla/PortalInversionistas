"use client";
import Link from "next/link";
import Button from "../Components/button";
import Controller from "../Controllers/controller";
import FormsController from "../Controllers/forms_controller";
import AplicacionParcial from "./aplicacionParcial";
import Navbar from "../Components/navbar";

export default function Aplicar() {
  const controller: Controller = FormsController.getInstance();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between absolute">
      <Navbar>
        <Link href="/saber-mas">Simulador</Link>
        <Link href="/saber-mas">Contacto</Link>
        <Button id={"login"} onClick={() => { }}>Login</Button>
      </Navbar>
      <AplicacionParcial
        controller={controller}
      ></AplicacionParcial>
    </main>
  );
}