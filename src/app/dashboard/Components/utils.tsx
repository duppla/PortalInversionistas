// react imports
import { PropsWithChildren, Dispatch, SetStateAction } from "react";

// material-ui imports
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

// nivo imports
import { BarTooltipProps } from "@nivo/bar";

// custom imports
// types
import { FlujosFront } from "./main/BarChartFlujos";
import { PropiedadFront } from "./main/BarChartPropiedad";

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

export function formatNumber(
  value: number,
  decimal: number = 0,
  perc: boolean = false
): string {
  let newVal = "";
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor((("" + value.toFixed(0)).length - 1) / 3);

  if (perc) {
    newVal = (value * 100).toFixed(decimal);
  } else {
    newVal = (
      suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value
    ).toFixed(decimal);
  }
  newVal = dropEndZero(newVal, decimal);
  return newVal + (perc ? "%" : ` ${suffixes[suffixNum]}`);
}

function dropEndZero(value: string, decimal: number): string {
  if (decimal !== 0) {
    for (let i = 0; i < decimal; i++) {
      if (value.endsWith("0")) {
        value = value.slice(0, -1);
      } else {
        break;
      }
    }
  }
  value = value.endsWith(".") ? value.slice(0, -1) : value;
  return value;
}

export function setTooltip(
  point: PropsWithChildren<BarTooltipProps<FlujosFront | PropiedadFront>>,
  decimal: number = 0,
  perc: boolean = false
) {
  if (typeof point.data.fecha === "string") {
    const formattedDate = formatFecha(point.data.fecha);
    const formattedValue = formatNumber(
      Number(point.data[point.id as keyof (FlujosFront | PropiedadFront)]),
      decimal,
      perc
    );

    return (
      <div
        style={{
          background: "black",
          padding: "8px",
          borderRadius: "4px",
          color: "white",
        }}
      >
        <strong>{formattedDate}</strong>
        <div>
          {point.id}: {formattedValue}
        </div>
      </div>
    );
  }
  return null; // Devolver null si point.data.fecha no es una cadena
}
