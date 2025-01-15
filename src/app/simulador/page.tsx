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

  function formatNumber(value: number) {
    return "$" + value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function formatNumberCompact(value: number) {
    return "$" + value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 1, notation: 'compact' });
  }

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
        <Card className="col-span-1 md:col-span-6 rounded-[9px]" noPadding>
          <div className="col-span-1 flex flex-col lg:flex-row">
            <Button id="Declaro" onClick={() => { }} color={false ? "sonador" : "toggle_c"} className="w-full">
              <p className="text-gray-500">Beneficio 1 <span className="font-bold">(vendido)</span></p>
            </Button>
            <Button id="No declaro" onClick={() => { }} color={true ? "toggle_c" : "sonador"} className="w-full">
              <p className="text-gray-500">Beneficio 2 <span className="font-bold">(vendido)</span></p>
            </Button>
            <Button id="No declaro" onClick={() => { }} color={true ? "toggle_c" : "sonador"} className="w-full">
              <p className="text-gray-500">Beneficio 3 <span className="font-bold">(vendido)</span></p>
            </Button>
            <Button id="No declaro" onClick={() => { }} color={false ? "toggle_c" : "sonador"} className="w-full">
              <p className="">Beneficio 4</p>
            </Button>
          </div>
        </Card>
        <div className="text-center col-span-1 md:col-span-6">
          <h2 className="text-4xl rustica-bold text-ilusion">Información del portafolio</h2>
        </div>
        <Card color="highlight" className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-cols-2 p-8 gap-2">
          <h4 className={'rustica text-lg text-left'}>Valor presente</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(3556789090)}</h4>
          <h4 className={'rustica text-lg text-left'}>En venta</h4>
          <h4 className={'rustica-bold text-lg text-right'}>95%</h4>
          <h4 className={'rustica text-lg text-left'}>Precio total</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(3056789090)}</h4>
          <h4 className={'rustica text-lg text-left text-ilusion'}>Rentabilidad*</h4>
          <h4 className={'rustica-bold text-lg text-right text-ilusion'}>IPC + 11%</h4>
        </Card>
        <Card className="col-span-1 md:col-span-3 lg:col-span-4 overflow-x-auto">
          <table className="border-collapse col-span-4 font-nunito-sans text-sm text-left">
            <thead>
              <tr>
                <th className="font-bold text-base pr-4">Inmueble</th>
                <th className="font-bold text-base pr-4 text-nowrap">SPV IRR</th>
                <th className="font-bold text-base pr-4 text-nowrap">Enero 2025</th>
                <th className="font-bold text-base pr-4 text-nowrap">Febrero 2025</th>
                <th className="font-bold text-base pr-4 text-nowrap">Inmueble</th>
                <th className="font-bold text-base pr-4 text-nowrap">SPV IRR</th>
                <th className="font-bold text-base pr-4 text-nowrap">Enero 2025</th>
                <th className="font-bold text-base  text-nowrap">Febrero 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t border-sonador">Indiana</td>
                <td className="border-t border-sonador">Indianapolis</td>
              </tr>
              <tr>
                <td className="border-t border-sonador/30">Ohio</td>
                <td className="border-t border-sonador/30">Columbus</td>
              </tr>
              <tr>
                <td className="border-t border-sonador/30">Michigan</td>
                <td className="border-t border-sonador/30">Detroit</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="border-t border-sonador text-ilusion font-bold">Total</td>
                <td className="border-t border-sonador text-ilusion font-bold">Michigan</td>
                <td className="border-t border-sonador text-ilusion font-bold">Michigan</td>
                <td className="border-t border-sonador text-ilusion font-bold">Michigan</td>
                <td className="border-t border-sonador text-ilusion font-bold">Michigan</td>
                <td className="border-t border-sonador text-ilusion font-bold">Michigan</td>
              </tr>
            </tfoot>
          </table>
        </Card>
        <div className="text-center col-span-1 md:col-span-6">
          <h2 className="text-4xl rustica-bold text-ilusion">Tu inversión</h2>
        </div>
        <Card className="col-span-1 md:col-span-2 grid grid-flow-row p-8 gap-2">
          <h4 className={'rustica text-lg text-left'}>Inversión</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumberCompact(306789090)}</h4>
          <h4 className={'rustica text-lg text-left'}>Participación adquirida</h4>
          <h4 className={'rustica-bold text-lg text-right'}>19,8%</h4>
          <hr className="col-span-2"></hr>
          <h4 className={'rustica text-lg text-left text-ilusion'}>Ganancia</h4>
          <h4 className={'rustica-bold text-lg text-right text-ilusion'}>{formatNumberCompact(56789090)}</h4>
        </Card>
        <Card className="col-span-1 md:col-span-2 grid grid-flow-row p-8 gap-2">
          <h4 className={'rustica text-lg text-left'}>Total</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(3556789090)}</h4>
          <h4 className={'rustica text-lg text-left'}>Inversión</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(3056789090)}</h4>
          <hr className="col-span-2"></hr>
          <h4 className={'rustica text-lg text-left text-ilusion'}>Ganancia</h4>
          <h4 className={'rustica-bold text-lg text-right text-ilusion'}>{formatNumber(56789090)}</h4>
        </Card>
        <Card color="ilusion" className="col-span-1 md:col-span-2">
          <h4 className={'rustica text-lg text-pretty'}>Tu dinero crece <span className={'rustica-bold text-2xl'}> {"1,71"} </span>veces. Con ganancias de hasta<span className={'rustica-bold text-2xl'}> {"44%"} </span>a 5 años. Y rentas mensuales promedio del<span className={'rustica-bold text-2xl'}> {"1,67%"}</span></h4>
        </Card>
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
    </main >
  );
}