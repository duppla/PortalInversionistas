import React from "react";
import { colorsHighlights } from "../Styles/colors";

interface Props {
    color?: string;
    textLeft?: string;
    textHighlight: string;
}

export default function HighlightBox({
    color = "ilusion",
    textLeft,
    textHighlight
}: Props) {
    return (
        <div className={`grow grid grid-cols-9 gap-2 ${colorsHighlights[color]} rounded-xl p-2 items-center`}>
            {textLeft ?
                <>
                    <div className="col-span-5 grid grid-flow-row auto-rows-max gap-2 px-2 text-left">
                        <p className="font-nunito-sans  text-sm"> {textLeft} </p>
                    </div>
                    <div className={`col-span-4 grid grid-flow-row auto-rows-max gap-2 px-2 ${colorsHighlights[color]} rounded-md text-center`} >
                        <p className="font-nunito font-bold text-xl"> {textHighlight} </p>
                    </div>
                </>
                :
                <>
                    <div className="col-span-9 grid grid-flow-row auto-rows-max gap-2 px-2 text-center">
                        <p className="font-nunito-sans font-bold text-sm"> {textHighlight} </p>
                    </div>
                </>
            }
        </div>
    );
}