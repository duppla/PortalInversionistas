import React, { ReactNode } from "react";
import { colorsCard } from "../Styles/colors";

interface Props {
    selected: number,
    color?: string,
    options?: string[],
    className?: string
}

export default function ProgressBar({
    selected,
    color = "futuro",
    options = [],
    className = '',
}: Props) {

    function indicator(option: string, index: number): ReactNode {
        return (
            <div className="flex flex-col grow text-center">
                <p className={`${index == selected ? "text-" + color : "text-gray-400"} font-nunito-sans text-sm sm:hidden`}>{index + 1}</p>
                <p className={`${index == selected ? "text-" + color : "text-gray-400"} font-nunito-sans text-sm hidden sm:block`}>{option}</p>
                <div className={`bg-${color}${index != selected ? "-100" : ""} rounded-full h-1 w-1 place-self-center mb-1`}></div>
                <div className={`bg-${color}-100 rounded-full h-4`}>
                    {index <= selected && <div className={`bg-${color} rounded-full h-4 ${index == selected ? "w-3/4" : "w-full"} justify-self-start`}></div>}
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-row gap-4 ${className}`}>
            {options.map((op, i) => indicator(op, i))}
        </div>
    );
}
