import React, { ReactNode } from "react";
import Card from "./card";
import { colorsCard } from "../Styles/colors";

/* 
Define los props que entrarán y su tipado. Además de definir cuales son opcionales y cuales no.
Los children son definidos por el componente que usa esta base a partir del contenido dinámico que deben mostrar.
*/
interface Props {
    children: ReactNode,
    color?: string,
    title: string,
    titleColor?: string;
}

/*
Componente base del widget largo mostrado al inicio de algunas views.
Define color y borde por defecto en caso de no definirlo en las props.
*/
export default function WidgetTop({
    children,
    color,
    title,
    titleColor,
}: Props) {
    return (
        <Card color={color}  >
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-2 items-center'>
                {/* Primera columna (Título) */}
                <div className="sm:flex text-center sm:text-left items-center p-2">
                    <h4 className={` rustica-bold font-medium text-lg md:text-md leading-5 text-${titleColor}`}>{title}</h4>
                </div>
                {/* Segunda columna (children) */}
                <div className="md:col-span-2 flex flex-col p-2 gap-2">
                    {children}
                </div>
            </div>
        </Card>
    );
}
