"use client";
import Controller from "../../Controllers/controller";
import FormsController from "../../Controllers/forms_controller";
import AplicacionParcial from "../aplicacionParcial";

export default function Aplicar({ params }: { params: any }) {
  const controller: FormsController = FormsController.getInstance();

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <AplicacionParcial
        controller={controller}
        campaign={params.campaign}
      ></AplicacionParcial>
    </main>
  );
}