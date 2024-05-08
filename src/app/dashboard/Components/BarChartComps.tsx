import { formatFecha, formatNumber } from "./utils";
export const BarChartTooltip = (point: any) => {
  if (typeof point.data.fecha === "string") {
    const formattedDate = formatFecha(point.data.fecha);
    const formattedValue = formatNumber(Number(point.data[point.id]), 1);

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
  return null;
};
