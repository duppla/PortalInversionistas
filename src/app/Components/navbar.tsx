"use client"
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
    children?: React.ReactNode;
    hero?: React.ReactNode;
}

export default function Navbar({ children, hero }: Readonly<Props>) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const myScrollFunc = () => {
            const y = window.scrollY;
            if (y >= 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", myScrollFunc);

        return () => {
            window.removeEventListener("scroll", myScrollFunc);
        };
    }, []);

    return (
        <>
            <nav className={`${hero ? 'bg-gradient-to-tr' : 'bg-gradient-to-r'} from-futuro-darker/50 from-50% to-highlight/50 backdrop-blur-xl text-sonador shadow-md shadow-futuro-darker/30 w-full z-50 order-first`}>
                <div className="xl:container xl:mx-auto flex flex-row items-center gap-8 sm:gap-16 justify-between p-4">
                    <Link href="/">
                        <Image
                            src="https://s3.amazonaws.com/webpages-general-assets/dpp_inv_logo.svg"
                            alt="logo duppla"
                            style={{
                                height: '3rem',
                                width: 'auto',
                            }}
                            width={100}
                            height={100}
                            className="hidden sm:block"
                        ></Image>
                        <Image
                            src="https://s3.amazonaws.com/webpages-general-assets/dpp_inv_door.svg"
                            alt="logo duppla"
                            style={{
                                height: '3rem',
                                width: 'auto',
                            }}
                            width={100}
                            height={100}
                            className="sm:hidden"
                        ></Image>
                    </Link>
                    <div className="flex flex-row justify-center items-center gap-4 sm:gap-8 rustica text-md">
                        {children}
                    </div>
                </div>
                {hero}
            </nav>
            <nav className={`bg-futuro-darker/50 backdrop-blur-xl text-sonador shadow-md shadow-futuro-darker/30 
      rounded-2xl fixed bottom-4 z-50 transition-opacity ease-in duration-300
          ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="md:container md:mx-auto p-4 rustica text-md">
                    <div className="flex flex-row items-center gap-4 md:gap-8 justify-between">
                        <Link href="/">
                            <Image
                                src="https://s3.amazonaws.com/webpages-general-assets/dpp_inv_door.svg"
                                alt="logo duppla"
                                style={{
                                    height: '2.5rem',
                                    width: 'auto',
                                }}
                                width={100}
                                height={100}
                            ></Image>
                        </Link>
                        {children}
                    </div>
                </div>
            </nav>
            <footer className="text-sonador content-center shadow-md shadow-sonador-darker/10 w-full h-80 bg-pattern-investor bg-no-repeat bg-center rotate-180 order-last">
                <div className="bg-sonador-darker/20 h-full w-full backdrop-blur-md content-center shadow-inner shadow-sonador/10 -rotate-180 ">
                    <div className="container mx-auto p-4 ">
                        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16 justify-between">
                            <Link href="/">
                                <Image
                                    src="https://s3.amazonaws.com/webpages-general-assets/dpp_inv_logo.svg"
                                    alt="logo duppla"
                                    style={{
                                        height: '3rem',
                                        width: 'auto',
                                    }}
                                    width={100}
                                    height={100}
                                ></Image>
                            </Link>
                            <div className="grid lg:grid-cols-2 text-center sm:text-right gap-4 sm:gap-8 rustica text-md">
                                <Link href="/">Home</Link>
                                <Link href="/saber-mas">Simulador de inversión</Link>
                                <Link href="/saber-mas">Quiero que me contacten</Link>
                                <Link href="/legacy">Acceder a mis portafolios de inversión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}