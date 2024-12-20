import React, { ReactNode } from "react";
import { colorsCard } from "../Styles/colors";

interface Props {
    children?: ReactNode,
    color?: string,
    shadowColor?: string,
    className?: string,
    style?: object
}

export default function Pill({
    children,
    color = "cimiento",
    className = '',
    style = {}
}: Props) {

    return (
        <div className={`grid grid-cols-6 gap-2 items-center p-1 rounded-xl ${colorsCard[color]} ${className ?? className}`} style={style}>
            {children}
        </div>
    );
}
