// nivo imports
import { ResponsiveLine } from "@nivo/line";

// custom imports
import { formatFecha, formatNumber, setTooltipLine } from "./utils";
// types
import { RentabilidadFront } from "./main/LineChartRentabilidad";
import { TasaMorosidadFront } from "./main/LineChartHistMora";

export function LineChart(
  formattedData: RentabilidadFront[] | TasaMorosidadFront[],
  tooltipText: string,
  ticks: number[],
  decimal: number = 0,
  perc: boolean = false,
  drop_end_zeros: boolean = true
) {
  return (
    <ResponsiveLine
      data={[
        {
          data: formattedData,
          id: "Rentabilidad",
        },
      ]}
      colors={["#5ED1B1"]}
      margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
      xFormat="time:%Y-%m-%d"
      xScale={{
        format: "%Y-%m-%d",
        precision: "month",
        type: "time",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
        min: 0,
        max: ticks ? ticks[ticks.length - 1] : 0,
        stacked: true,
        reverse: false,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        legend: "",
        legendOffset: -12,
        tickValues: "every month",
        format: (value) => formatFecha(new Date(value)),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: ticks,
        format: (tick) => formatNumber(tick, decimal, perc, drop_end_zeros),
      }}
      enableGridX={false}
      gridYValues={ticks}
      lineWidth={3}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={false}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
      tooltip={(point) =>
        setTooltipLine(
          point.point.data.x,
          point.point.data.y,
          tooltipText,
          decimal,
          perc,
          drop_end_zeros
        )
      }
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#9B9EAB", // Cambia aquí al color que desees para el texto de las marcas en el eje Y
            },
          },
        },
        grid: {
          line: {
            stroke: "#41434C" /* '#5C5E6B' */, // Cambia el color de las líneas de la cuadrícula
          },
        },
      }}
    />
  );
}
