"use client"
import React, { ReactNode } from "react";
import { colorsButton } from '../Styles/colors';
import { usePathname } from 'next/navigation';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

interface Props {
    children?: ReactNode;
    id: string;
    color?: string;
    GAvalue?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    iconTop?: ReactNode;
    onClick?: Function;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    shadow?: boolean;
}

export default function Button({
    children,
    id,
    color = "ilusion",
    GAvalue,
    iconLeft,
    iconRight,
    iconTop,
    onClick,
    className,
    style = { boxShadow: "0px 2px 2px 0px #dae6ff, -2px -4px 5px 2px rgba(255, 255, 255, 0.25)", },
    disabled,
    shadow = false
}: Readonly<Props>) {
    const pathname = usePathname();

    return (
        <button id={id} onClick={() => {
            sendGTMEvent({ event: `Click-${id}`, value: GAvalue, source: pathname });
            onClick ? onClick() : undefined
        }}
            disabled={!onClick || disabled}
            className={`${onClick && !disabled ? colorsButton[color] : colorsButton["disabled"]} font-medium rounded-lg text-sm px-4 py-2 text-center items-center ${className ?? className}`}
            style={shadow ? style : undefined}>
            <div className="flex flex-col justify-center items-center">
                {iconTop && <div className="mb-2">{iconTop}</div>}
                <div className="flex gap-4 flex-row items-center">
                    {iconLeft ?? ''}
                    {children}
                </div>
                {iconRight ?? ''}
            </div>
        </button>
    );
}