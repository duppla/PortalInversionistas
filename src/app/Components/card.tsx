import React, { ReactNode } from "react";
import { colorsCard } from '../Styles/colors'

interface Props {
  children?: ReactNode,
  color?: string,
  shadowColor?: string,
  className?: string,
  isFull?: boolean
}

export default function Card({
  children,
  color = "sonador",
  shadowColor,
  className = '',
  isFull = true
}: Props) {
  return (
    <div className={`${colorsCard[color]} ${isFull && 'h-full'} rounded-xl p-3 content-center ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {children}
    </div>
  );
}
