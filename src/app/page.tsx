"use client"
import Navbar from "./Components/navbar";
import Link from "next/link";
import Button from "./Components/button";
import Image from "next/image";
import Card from "./Components/card";

export default function Home() {

  const hero = (< div className="grid md:grid-cols-4 items-center justify-center h-[60vh] w-full text-sonador pt-8">
    <h1 className="px-4 md:max-w-screen-sm md:ml-auto md:col-span-2 text-6xl rustica-bold">Invierte seguro con rentabilidad del 15% EA</h1>
    <div className="hidden md:block md:row-span-3 md:col-span-2 h-full bg-[url('https://s3.amazonaws.com/webpages-general-assets/hero-inv.png')] bg-cover"></div>
    <h2 className="px-4 md:max-w-screen-sm md:ml-auto md:col-span-2 md:col-start-1 text-2xl rustica">Invierte en derechos fiduciarios de portafolios de apartamentos que generan el doble de retorno que comprar por tu cuenta</h2>
    <div className="px-4 md:max-w-screen-sm lg:ml-auto w-full md:col-span-2 md:col-start-1">
      <Button id={"invierte"} onClick={() => { }} className="w-full xl:w-1/2">
        <p className="text-2xl rustica-bold">Quiero saber más</p>
      </Button>
    </div>
  </div>
  );

  return (
    <main className="flex w-full flex-col items-center justify-between absolute">
      <Navbar hero={hero}>
        <Link href="/saber-mas">Simulador</Link>
        <Link href="/saber-mas">Contacto</Link>
        <Button id={"login"} onClick={() => { }}>Login</Button>
      </Navbar>
      <div className="container mx-auto p-4 my-10 text-center text-sonador">
        <h3 className="text-4xl rustica-bold text-ilusion my-10">Conoce las ventajas de invertir con duppla</h3>
        <div className="grid md:grid-cols-2 gap-4 my-10 gap-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">15% E.A.</h4>
            <p className="text-lg rustica">Rentabilidad alta durante 5 años</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">2x</h4>
            <p className="text-lg rustica">Genera el doble que arrendar un apartamento propio</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">+2M USD</h4>
            <p className="text-lg rustica">Vendidos en derechos fiduciarios</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">Know-how</h4>
            <p className="text-lg rustica">Nuestro equipo selecciona por ti los activos en los que invertirás</p>
          </div>
        </div>
        <Card className="p-0 mt-20 content-center" color="light">
          <div className="flex flex-col md:flex-row gap-4 gap-4">
            <div className="relative h-[400px] w-full md:w-3/6 bg-cover bg-center bg-[url('https://s3.amazonaws.com/imgs-website/forbes-2.png')]
          // rounded-[11px] shadow-inner shadow-futuro-darker/50">
              <Link href="/saber-mas">
                <div className="opacity-0 hover:opacity-100 absolute inset-0 rounded-[11px] bg-gradient-to-r from-futuro-darker/80 to-futuro-darker/50 content-center">
                  <p className="text-lg rustica-bold text-sonador-darker">Leer nota</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-4 p-4">
              <h4 className="text-6xl rustica-bold">Una inversión confiable</h4>
              <p className="text-lg rustica">Inversionistas institucionales como Skandia confían en Duppla</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
