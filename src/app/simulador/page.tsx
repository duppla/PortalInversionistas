"use client";
import Link from "next/link";
import Button from "../Components/button";
import Controller from "../Controllers/controller";
import FormsController from "../Controllers/forms_controller";
import Navbar from "../Components/navbar";
import { redirect } from "next/navigation";
import Card from "../Components/card";
import { ResponsiveLine } from "@nivo/line";
import LineChart from "../Components/lineChart";

export default function Simulador() {
  const controller: Controller = FormsController.getInstance();
  let dupplaData: { x: number; y: number; }[] = [];
  let bancoData: { x: number; y: number; }[] = [];
  [1, 224, 323, 43, 533, 62, 7].forEach((valor, index) => {
    dupplaData.push({ "x": index == 0 ? 1 : index * 12, "y": valor * 0.09 });
    bancoData.push({ "x": index == 0 ? 1 : index * 12, "y": valor * 0.11 });
  });

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between absolute">
      <Navbar>
        <Link href="/simulador" className="hover:underline">Simulador</Link>
        <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
        <Link href="/legacy" className="hover:underline">
          <Button id={"login"} onClick={() => { }}>Ingresar</Button>
        </Link>
      </Navbar>
      <div className="grid grid-cols-1 md:grid-cols-6 w-full text-center text-sonador gap-8 xl:container xl:mx-auto max-md:p-4 max-xl:p-8">
        <div className="flex flex-col text-left col-span-1 md:col-span-3">
          <h3 className="text-2xl rustica-bold">Mensual acumulado</h3>
          <Card >
            <h4 className={'rustica text-lg text-center'}>Rentabilidad (en millones de pesos)</h4>
            <LineChart data={dupplaData}></LineChart>
            <div className='grid md:grid-cols-2 gap-2 mx-12 lg:mx-2'>
              <div className='flex flex-row justify-left lg:justify-center'>
                <div className="bg-ilusion size-4 mr-1.5 rounded shrink-0"></div>
                <p className={'text-left font-mukta text-xs'}>Caption</p>
              </div>
              <div className='flex flex-row justify-left lg:justify-center'>
                <div className="bg-proyeccion size-4 mr-1.5 rounded shrink-0"></div>
                <p className={'text-left font-mukta text-xs'}>Caption</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col text-left col-span-1 md:col-span-3">
          <h3 className="text-2xl rustica-bold">Mensual recibido</h3>
          <Card className="size-full">
            Mensual recibido
          </Card>
        </div>
        <div className="flex flex-col text-left col-span-1 md:col-span-3">
          <h3 className="text-2xl rustica-bold">Porcentaje acumulado</h3>
          <Card className="size-full">
            Porcentaje acumulado
          </Card>
        </div>
        <div className="flex flex-col text-left col-span-1 md:col-span-3">
          <h3 className="text-2xl rustica-bold">Anual acumulado</h3>
          <Card className="size-full">
            Anual acumulado
          </Card>
        </div>
      </div>
    </main>
  );
}