import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Dispatch, SetStateAction } from "react";

export function formatFecha(inputFecha: string): string {
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const [year, month, _] = inputFecha.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  const monthAbbr = meses[monthIndex];

  return `${monthAbbr} ${year}`;
}

export function changeArrow(
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>
): JSX.Element {
  // Cambia el ícono de la flecha según el estado del menú
  const icon = menuOpen ? (
    <ArrowDropUpIcon
      style={{
        color: "#9B9EAB",
        fill: "#9B9EAB",
        marginLeft: "-20px",
      }}
      onClick={() => setMenuOpen(!menuOpen)}
    />
  ) : (
    <ArrowDropDownIcon
      style={{
        color: "#9B9EAB",
        fill: "#9B9EAB",
        marginLeft: "-20px",
      }}
      onClick={() => setMenuOpen(!menuOpen)}
    />
  );
  return icon;
}

export function formatMillionsStr(value: number, decimal: number = 0): string {
  let newVal = (value / 1000000).toFixed(decimal);
  if (decimal !== 0) {
    for (let i = 0; i < decimal; i++) {
      if (newVal.endsWith("0")) {
        newVal = newVal.slice(0, -1);
      } else {
        break;
      }
    }
  }
  newVal = newVal.endsWith(".") ? newVal.slice(0, -1) : newVal;
  return newVal + " M";
}
