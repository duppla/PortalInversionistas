'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { colorsFormSelector } from '../Styles/colors'

interface Props {
    children?: ReactNode,
    color?: string,
    textLeft?: string,
    textRight?: string,
    defaultOpen?: boolean
}

function Accordeon({
    children,
    color = "sonador",
    textLeft,
    textRight,
    defaultOpen = false,
}: Props) {

    const [isOpen1, setIsOpen1] = useState(defaultOpen);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const toggleAccordion1 = () => {
        setIsOpen1(!isOpen1);
        setIsDropdownOpen(false);
    };

    const arrowRotation = isOpen1 ? 'rotate-0' : 'rotate-180';
    return (

        <div id="accordion-collapse" data-accordion="collapse">
            <button
                type="button"
                className={`${colorsFormSelector[color]} flex flex-cols items-center w-full p-2 font-medium border border-solid rounded-xl gap-2 ${isOpen1 ? 'rounded-b-none' : ''}`}
                onClick={toggleAccordion1}
                aria-expanded={isOpen1}
                aria-controls="accordion-collapse-body-1">
                <span className="font-nunito-sans text-[16px] md:text-lg text-left accordion-button-text">{textLeft}</span>
                <span className="grow font-nunito-sans font-bold text-[16px] md:text-lg text-left accordion-button-text">{textRight}</span>
                <svg
                    data-accordion-icon
                    className={`w-3 h-3 shrink-0 mr-1 ${isOpen1 ? 'rotate-0' : 'rotate-180'} justify-self-end`}
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
            </button>
            <div
                id="accordion-collapse-body-1"
                className={`transition-all duration-500 gap-2 ${isOpen1 ? 'block' : 'hidden'} rounded-b-xl border-t-0 outline-4`}
                aria-labelledby="accordion-collapse-heading-1"
                style={{ borderColor: color }}
            >
                {children}
            </div>
        </div>
    )
}

export default Accordeon