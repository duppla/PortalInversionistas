"use client"
import Navbar from "./Components/navbar";
import Link from "next/link";
import Button from "./Components/button";
import Card from "./Components/card";
import News from "./Components/news";
import Image from "next/image";

export default function Home() {

  const hero = (< div className="grid md:grid-cols-4 items-center justify-center h-[60vh] w-full text-sonador pt-8">
    <h1 className="px-4 md:max-w-screen-sm md:ml-auto md:col-span-2 text-6xl rustica-bold">Invierte seguro con rentabilidades de hasta el 16% <span className="text-3xl">E.A.</span><span className="text-3xl text-sonador-darker">*</span></h1>
    <div className="hidden md:block md:row-span-3 md:col-span-2 h-full bg-[url('https://s3.amazonaws.com/webpages-general-assets/hero-inv.png')] bg-cover"></div>
    <h2 className="px-4 md:max-w-screen-sm md:ml-auto md:col-span-2 md:col-start-1 text-2xl rustica">Adquiere derechos fiduciarios e invierte en portafolios de apartamentos que generan hasta el doble de retorno que las rentas tradicionales.</h2>
    <div className="px-4 md:max-w-screen-sm lg:ml-auto w-full md:col-span-2 md:col-start-1">
      <Button id={"invierte"} onClick={() => { }} className="w-full xl:w-1/2">
        <p className="text-2xl rustica-bold">Quiero saber más</p>
      </Button>
    </div>
  </div>
  );

  return (
    <main className="flex w-full flex-col items-center">
      <Navbar hero={hero}>
        <Link href="/simulador" className="hover:underline">Simulador</Link>
        <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
        <Link href="/legacy">
          <Button id={"login"} onClick={() => { }}>Ingresar</Button>
        </Link>
      </Navbar>
      <div className="flex flex-col text-center text-sonador gap-12 xl:container xl:mx-auto max-md:p-4 max-xl:p-8">
        <h3 className="text-4xl rustica-bold text-ilusion mt-20">Conoce las ventajas de invertir con Duppla</h3>
        <div className="grid md:grid-cols-2 gap-4 my-10 gap-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">16% <span className="text-3xl">E.A.</span><span className="text-3xl text-sonador-darker">*</span></h4>
            <p className="text-lg rustica">Rentabilidades objetivo por encima del mercado</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-6xl rustica-bold">5 años</h4>
            <p className="text-lg rustica">Periodo de inversión</p>
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
        <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:border xl:border-highlight max-xl:rounded-none max-xl:rounded-r-lg max-md:-ml-4 max-xl:-ml-8"
          color="highlight" noPadding>
          <div className="col-span-1">
            <img className="rounded-tr-lg md:rounded-none xl:rounded-l-[11px] -z-10" src={"https://s3.amazonaws.com/webpages-general-assets/op1.png"} alt={'Recuerda realizar tu inversión'}></img>
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col justify-center text-left gap-4 z-50 p-8">
            <h4 className="text-4xl lg:text-5xl rustica-bold">¿Quieres saber más sobre inversiones en finca raíz?</h4>
            <p className="text-2xl rustica">Únete a la charla de nuestros fundadores en Moneycon 2025</p>
            <div className="w-full">
              <Button id={"moneycon"} onClick={() => { }} className="w-full md:w-1/2">
                <p className="text-lg rustica-bold">¡Me interesa!</p>
              </Button>
            </div>
          </div>
        </Card>
        <News />
        <div className="flex flex-col items-left text-left text-xs font-nunito-sans text-sonador-darker">
          <p>* Remuneración objetivo o rentabilidades esperadas de hasta el 16% E.A.</p>
        </div>
      </div>
    </main >
  );
}