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
import { PointTooltipProps } from "@nivo/line";

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

export function setTooltipBar(
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

export function setTooltipLine(point: PropsWithChildren<PointTooltipProps>) {
  const date: string = new Date(point.point.data.x).toISOString().split("T")[0];
  const fecha_formateada = formatFecha(date);
  let formattedY = "";
  if (typeof point.point.data.y === "number") {
    formattedY = formatNumber(point.point.data.y, 1, true);
  }

  return (
    <div
      style={{
        background: "#272727",
        color: "#5ED1B1",
        padding: "9px 12px",
        border: "1px solid #ccc",
      }}
    >
      <div>
        <strong>{fecha_formateada}</strong>
      </div>
      <div>{`Tasa Morosidad: ${formattedY}`}</div>
    </div>
  );
}

export function calculateAxisValues(
  maxValue: number,
  tickIni: number,
  tickCount: number = 5
): number[] {
  let count = 0;
  let tickStep = tickIni;
  let mult = tickIni / 10;
  while (maxValue / tickCount > tickStep) {
    if (count % 4 == 0) {
      mult *= 10;
      tickStep += mult;
    } else if (count % 2 == 0) {
      tickStep += mult;
    } else {
      tickStep *= 2;
    }
    count++;
  }

  // Calcular dinámicamente los valores para gridYValues y tickValues
  const gridYValues: number[] = Array.from(
    { length: tickCount + 1 },
    (_, index) => {
      return index * tickStep;
    }
  );

  return gridYValues;
}
