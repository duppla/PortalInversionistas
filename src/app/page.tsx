"use client"
import Navbar from "./Components/navbar";
import Link from "next/link";
import Button from "./Components/button";
import Card from "./Components/card";
import News from "./Components/news";
import Image from "next/image";

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
    <main className="flex w-full flex-col items-center">
      <Navbar hero={hero}>
        <Link href="/saber-mas" className="hover:underline">Simulador</Link>
        <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
        <Link href="/legacy">
          <Button id={"login"} onClick={() => { }}>Ingresar</Button>
        </Link>
      </Navbar>
      <div className="flex flex-col text-center text-sonador gap-12 container mx-auto">
        <h3 className="text-4xl rustica-bold text-ilusion mt-20">Conoce las ventajas de invertir con duppla</h3>
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
        <Card className="flex flex-col relative md:flex-row gap-4 max-xl:rounded-none max-xl:rounded-r-lg max-xl:ml-break-out p-8"
          color="highlight">
          <div className="absolute inset-y-0 left-0 -rotate-[90deg] hidden md:block">
            <Image className="w-full -z-50" src={"https://s3.amazonaws.com/webpages-general-assets/moneyconXduppla.svg"} width={90} height={90} alt={'Recuerda realizar tu inversión'}
              style={{ opacity: 0.2 }}></Image>
          </div>
          <div className="flex flex-col justify-center text-left gap-4 max-xl:pl-break-out z-50">
            <h4 className="text-5xl rustica-bold">¿Quieres saber más sobre inversiones en finca raiz?</h4>
            <p className="text-2xl rustica">Únete a la charla de nuestros fundadores en Moneycon 2025</p>
            <p className="text-lg rustica">Inversionistas institucionales como Skandia confían en Duppla</p>
            <div className="w-full">
              <Button id={"moneycon"} onClick={() => { }} className="w-full md:w-1/2">
                <p className="text-lg rustica-bold">¡Me interesa!</p>
              </Button>
            </div>

          </div>
        </Card>
        <div className="container mx-auto">
          <News />
        </div>
      </div>
    </main >
  );
}
