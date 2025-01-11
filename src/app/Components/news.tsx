"use client"
import React from 'react';
import Card from './card';
import Button from './button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';


function News() {

    const [showNews, setShowNews] = React.useState(false);

    return (
        <>
            <h3 className="text-4xl rustica-bold text-ilusion my-10">Noticias</h3>
            <div className='grid lg:grid-cols-3 gap-4 my-10 gap-4'>
                <Card shadowColor='#232b8522' className='flex flex-col col-span-1 p-0 content-between'>
                    <div className="h-60 -m-3 bg-cover bg-top bg-[url('https://s3.amazonaws.com/imgs-website/Skandia_forbes.jpeg')]
          // rounded-t-xl shadow-inner shadow-futuro-darker/50">
                        <Link href="https://forbes.co/2023/12/05/negocios/skandia-invierte-en-duppla-adquirio-el-90-de-un-portafolio-residencial">
                            <div className="opacity-0 hover:opacity-100 absolute inset-0 rounded-xl bg-gradient-to-b from-futuro-darker/80 to-futuro-darker/50 content-center">
                                <p className="text-lg rustica-bold text-sonador-dark underline">Leer nota en forbes.co</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-8 text-balance">
                        <h4 className="text-3xl rustica-bold">Invierte junto a los grandes</h4>
                        <p className="text-lg rustica">Inversionistas institucionales como Skandia confían en Duppla</p>
                    </div>
                </Card >
                {!showNews && <Button id={"invierte"} color="light" onClick={() => { setShowNews(true) }} className="w-full xl:w-1/2 md:hidden">Ver más</Button>}
                <Card shadowColor='#232b8522' className={`flex flex-col col-span-1 p-0 content-between ${showNews ? 'visible' : 'hidden lg:block'}`}>
                    <div className="h-60 -m-3 bg-cover bg-top bg-[url('https://s3.amazonaws.com/imgs-website/Skandia_forbes.jpeg')]
          // rounded-t-xl shadow-inner shadow-futuro-darker/50">
                        <Link href="https://forbes.co/2023/12/05/negocios/skandia-invierte-en-duppla-adquirio-el-90-de-un-portafolio-residencial">
                            <div className="opacity-0 hover:opacity-100 absolute inset-0 rounded-xl bg-gradient-to-b from-futuro-darker/80 to-futuro-darker/50 content-center">
                                <p className="text-lg rustica-bold text-sonador-dark underline">Leer nota en forbes.co</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-8 text-balance">
                        <h4 className="text-3xl rustica-bold">Apoyamos el emprendimiento</h4>
                        <p className="text-lg rustica">Orgullosamente patrocinamos Moneycon 2025</p>
                    </div>
                </Card >
                <Card shadowColor='#232b8522' className={`flex flex-col col-span-1 p-0 content-between ${showNews ? 'visible' : 'hidden lg:block'}`}>
                    <div className="h-60 -m-3 bg-cover bg-top bg-[url('https://s3.amazonaws.com/imgs-website/Skandia_forbes.jpeg')]
          // rounded-t-xl shadow-inner shadow-futuro-darker/50">
                        <Link href="https://forbes.co/2023/12/05/negocios/skandia-invierte-en-duppla-adquirio-el-90-de-un-portafolio-residencial">
                            <div className="opacity-0 hover:opacity-100 absolute inset-0 rounded-xl bg-gradient-to-b from-futuro-darker/80 to-futuro-darker/50 content-center">
                                <p className="text-lg rustica-bold text-sonador-dark underline">Leer nota en forbes.co</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-8 text-balance">
                        <h4 className="text-3xl rustica-bold">Un modelo novedoso en el país</h4>
                        <p className="text-lg rustica">Inspirado en el modelo <span className='italic'>rent-to-own</span> estadounidense</p>
                    </div>
                </Card >
            </div >
        </>

    );
}

export default News;
