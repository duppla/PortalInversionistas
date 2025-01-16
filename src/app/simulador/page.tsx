"use client";
import Link from "next/link";
import Button from "../Components/button";
import Navbar from "../Components/navbar";
import { redirect } from "next/navigation";
import Card from "../Components/card";
import LineChart from "../Components/lineChart";
import { useEffect, useState } from "react";
import SimuladorController from "../Controllers/simulador_controller";
import SimuladorData from "../Models/simulacion_models";

export default function Simulador() {
  const controller = SimuladorController.getInstance();
  let [simuladorData, setSimuladorData] = useState<SimuladorData>();
  let [temp, setTemp] = useState<number>(1);
  let acumulado: { x: number; y: number; }[] = [];
  let mensualRecibido: { x: number; y: number; }[] = [];
  let mensualRecompra: { x: number; y: number; }[] = [];

  useEffect(() => {
    controller.getPortfolio(setSimuladorData, (e: any) => { console.log(e) });
  }, []);

  if (temp === 0) {
    acumulado = [];
    simuladorData?.porcentaje_mes.forEach((valor, index) => {
      acumulado.push({ "x": index + 1, "y": valor });
    });
  }
  else if (temp === 1) {
    acumulado = [];
    simuladorData?.dinero_acumulado.forEach((valor, index) => {
      acumulado.push({ "x": index + 1, "y": valor });
    });
  }
  else {
    acumulado = [];
    simuladorData?.dinero_acumulado.forEach((valor, index) => {
      if (index % 12 === 0) {
        acumulado.push({ "x": index, "y": valor });
      }
    });
  }
  mensualRecibido = [];
  mensualRecompra = [];
  simuladorData?.pago_mensual.forEach((valor, index) => {
    if (index % 12 === 0 || index === 55) {
      mensualRecibido.push({ "x": index, "y": valor });
      mensualRecompra.push({ "x": index, "y": 0 });
    }
    else if (index > 55) {
      const val = (simuladorData?.pago_mensual[55] ?? 0);
      mensualRecibido.push({ "x": index, "y": val });
      mensualRecompra.push({ "x": index, "y": valor - val });
    }
  });

  function formatNumber(value: number) {
    return "$" + value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function formatNumberCompact(value: number) {
    return "$" + value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 2, notation: 'compact' });
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
          <div className="col-span-1 flex flex-col md:flex-row">
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
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(simuladorData?.precio_flujo ?? 0)}</h4>
          <h4 className={'rustica text-lg text-left'}>En venta</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{((simuladorData?.participacion_adquirida ?? 0) * 100).toLocaleString("es-CO")}%</h4>
          <h4 className={'rustica text-lg text-left'}>Precio total</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(simuladorData?.valor_beneficio ?? 0)}</h4>
          <h4 className={'rustica text-lg text-left text-ilusion'}>Rentabilidad*</h4>
          <h4 className={'rustica-bold text-lg text-right text-ilusion'}>{simuladorData?.rentabilidad}</h4>
        </Card>
        <Card className="col-span-1 md:col-span-3 lg:col-span-4 overflow-scroll max-h-72">
          <table className="border-collapse col-span-4 font-nunito-sans text-sm text-left">
            <thead className="font-bold text-base text-nowrap ">
              <tr>
                <th className="border-b pr-4 border-sonador">Inmueble</th>
                <th className="border-b pr-4 border-sonador">SPV IRR</th>
                {simuladorData?.inmuebles[0].flujo.map((inm) => (
                  <th key={inm.fecha} className="border-b pr-2 border-sonador">{inm.fecha}</th>)
                )}
              </tr>
            </thead>
            <tbody>
              {simuladorData?.inmuebles.map((inm, index) => {
                if (index === simuladorData?.inmuebles.length - 1) return;
                return (<tr key={index + inm.inmueble}>
                  <td className="border-t p-0.5 border-sonador/20">{inm.inmueble}</td>
                  <td className="border-t p-0.5 border-sonador/20">{inm.spv_irr ? (inm.spv_irr * 100).toLocaleString("es-CO") : ""}%</td>
                  {simuladorData?.inmuebles[index]?.flujo.map((flu) => (
                    <td className="border-t p-0.5 border-sonador/20">{formatNumber(flu.monto)}</td>)
                  )}
                </tr>)
              }
              )}
            </tbody>
            <tfoot className="text-ilusion font-bold">
              <tr className="">
                <td className="border-t pt-0.5 border-sonador">{simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.inmueble}</td>
                <td className="border-t pt-0.5 border-sonador">{simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.spv_irr}</td>
                {simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.flujo.map((flu) =>
                  (<td className="border-t pt-0.5 border-sonador">{formatNumber(flu.monto)}</td>)
                )}
              </tr>
            </tfoot>
          </table>
        </Card>
        <div className="text-center col-span-1 md:col-span-6">
          <h2 className="text-4xl rustica-bold text-ilusion">Tu inversión</h2>
        </div>
        <Card className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-flow-row p-8 gap-2">
          <h4 className={'rustica text-lg text-left'}>Ingresos*</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumber(simuladorData?.total_acumulado_portafolio ?? 0)}</h4>
          <h4 className={'rustica text-lg text-left'}>Inversión</h4>
          <h4 className={'rustica-bold text-lg text-right'}>-{formatNumber(simuladorData?.monto_a_invertir ?? 0)}</h4>
          <hr className="col-span-2"></hr>
          <h4 className={'rustica text-lg text-left text-ilusion'}>Ganancia*</h4>
          <h4 className={'rustica-bold text-lg text-right text-ilusion'}>{formatNumber(simuladorData?.ganancia_5_anhos ?? 0)}</h4>
        </Card>
        <Card className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-flow-row p-8 gap-1.5">
          <h4 className={'rustica text-lg text-left'}>Participación adquirida</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{((simuladorData?.participacion_comprada ?? 0) * 100).toLocaleString("es-CO")}%</h4>
          <hr className="col-span-2 invisible"></hr>
          <h4 className={'rustica text-lg text-left'}>Retorno mensual promedio</h4>
          <h4 className={'rustica-bold text-lg text-right'}>{formatNumberCompact(simuladorData?.promedio_rentas_mas_valorizacion ?? 0)}</h4>
          <li className={'rustica text-left'}>Renta</li>
          <h4 className={'rustica-bold text-right'}>{formatNumberCompact(simuladorData?.renta_mensual_promedio ?? 0)}</h4>
          <li className={'rustica text-left'}>Valorización con capital</li>
          <h4 className={'rustica-bold text-right'}>{formatNumberCompact(simuladorData?.promedio_valorizacion_mas_capital ?? 0)}</h4>
          <li className={'rustica text-left'}>Retorno de capital</li>
          <h4 className={'rustica-bold text-right'}>{formatNumberCompact((simuladorData?.promedio_mensual_renta_mas_capital ?? 0) - (simuladorData?.renta_mensual_promedio ?? 0))}</h4>
        </Card>
        <Card color="ilusion" className="col-span-1 md:col-span-6 lg:col-span-2">
          <h4 className={'rustica text-lg text-pretty'}>Con Duppla tu dinero puede crecer <span className={'rustica-bold text-2xl'}> {simuladorData?.total_acumulado_portafolio_porc} </span>veces.
            Con ganancias de hasta<span className={'rustica-bold text-2xl'}> {((simuladorData?.ganancia_5_anhos_porc ?? 0) * 100).toLocaleString("es-CO")}% </span>a 5 años.
            Y rentas mensuales promedio del<span className={'rustica-bold text-2xl'}> {((simuladorData?.renta_mensual_promedio_porc ?? 0) * 100).toLocaleString("es-CO")}%</span></h4>
        </Card>
        <div className="flex flex-col text-left col-span-1 md:col-span-6">
          <h3 className="text-2xl rustica-bold">Ingreso acumulado</h3>
          <Card >
            <div className="col-span-1 flex flex-row">
              <Button id="Declaro" onClick={() => { setTemp(1) }} color="toggle_c" className="w-full">
                <p className={temp === 1 ? "text-sonador-darker underline" : ""}>Vista mensual</p>
              </Button>
              <Button id="No declaro" onClick={() => { setTemp(2) }} color="toggle_c" className="w-full">
                <p className={temp === 2 ? "text-sonador-darker underline" : ""}>Vista anual</p>
              </Button>
            </div>
            <LineChart data={[
              {
                "id": "banco",
                "data": acumulado
              },
            ]} formatter={temp === 0 ? (e: any) => { const eVal = parseFloat(e.toString()); return eVal.toFixed(2) + "%" } : formatNumberCompact}></LineChart>
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
        <div className="flex flex-col text-left col-span-1 md:col-span-4">
          <h3 className="text-2xl rustica-bold">Flujos futuros</h3>
          <Card className="col-span-1 md:col-span-3 lg:col-span-4 overflow-scroll">
            <table className="border-collapse col-span-4 font-nunito-sans text-sm text-left">
              <thead className="font-bold text-base text-nowrap ">
                <tr>
                  <th className="border-b pr-4 border-sonador">Inmueble</th>
                  <th className="border-b pr-4 border-sonador">SPV IRR</th>
                  {simuladorData?.inmuebles[0].flujo.map((inm) => (
                    <th key={inm.fecha} className="border-b pr-2 border-sonador">{inm.fecha}</th>)
                  )}
                </tr>
              </thead>
              <tbody>
                {simuladorData?.inmuebles.map((inm, index) => {
                  if (index === simuladorData?.inmuebles.length - 1) return;
                  return (<tr key={index + inm.inmueble}>
                    <td className="border-t p-0.5 border-sonador/20">{inm.inmueble}</td>
                    <td className="border-t p-0.5 border-sonador/20">{inm.spv_irr ? (inm.spv_irr * 100).toLocaleString("es-CO") : ""}%</td>
                    {simuladorData?.inmuebles[index]?.flujo.map((flu) => (
                      <td className="border-t p-0.5 border-sonador/20">{formatNumber(flu.monto)}</td>)
                    )}
                  </tr>)
                }
                )}
              </tbody>
              <tfoot className="text-ilusion font-bold">
                <tr className="">
                  <td className="border-t pt-0.5 border-sonador">{simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.inmueble}</td>
                  <td className="border-t pt-0.5 border-sonador">{simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.spv_irr}</td>
                  {simuladorData?.inmuebles[simuladorData?.inmuebles.length - 1]?.flujo.map((flu) =>
                    (<td className="border-t pt-0.5 border-sonador">{formatNumber(flu.monto)}</td>)
                  )}
                </tr>
              </tfoot>
            </table>
          </Card>
        </div>
        <div className="flex flex-col text-left col-span-1 md:col-span-2">
          <h3 className="text-2xl rustica-bold">Ingresos</h3>
          <Card >
            <LineChart data={[
              {
                "id": "Renta",
                "data": mensualRecibido
              },
              {
                "id": "Recompra",
                "data": mensualRecompra
              },
            ]} formatter={formatNumberCompact}></LineChart>
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
      </div>
    </main >
  );
}

//(e) => { const eVal = parseFloat(e.toString()); return eVal.toFixed(2) + "%" }