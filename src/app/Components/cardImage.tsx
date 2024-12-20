import React, { ReactNode } from "react";
import Image from 'next/image'
import { colorsCard } from "../Styles/colors";

interface Props {
  children?: ReactNode,
  header: ReactNode,
  src: string,
  alt?: string,
  color?: string,
  shadowColor?: string,
  className?: string,
  position?: number
}

export default function CardImage({
  children,
  header,
  src,
  alt = '',
  color = "white",
  shadowColor,
  className = '',
  position = 2
}: Props) {

  let shadow = shadowColor ? "0px 6px 6px 0px" + shadowColor + ", -2px -4px 10px 2px " + shadowColor : "0px 6px 6px 0px #dae6ff, -2px -4px 10px 2px rgba(255, 255, 255, 0.25)";

  return (
    <div className={`${colorsCard[color]} h-full rounded-3xl p-3 content-center ${className}`}
      style={{
        boxShadow: shadow,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="col-span-1 grid grid-cols-7 items-center order-first">
          {header}
        </div>
        <div className={`col-span-1 row-span-2 rounded-xl content-center border-[1px] order-${position} lg:-order-1`}>
          <Image src={src} width={100} height={100} layout="responsive" alt={alt}></Image>
        </div>
        <div className="order-1">
          {children}
        </div>
      </div>
    </div>
  );
}
