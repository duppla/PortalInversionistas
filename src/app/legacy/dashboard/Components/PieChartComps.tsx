import { PieTooltipProps, ResponsivePie } from "@nivo/pie";
import { FormatoFront } from "./PieChartCompCartera";
import { formatNumber } from "./utils";

export default function PieChart(
  data: FormatoFront[],
  innerRadius: number = 0.7,
  padAngle: number = 1
) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 40, left: -40 }}
      startAngle={0}
      innerRadius={innerRadius}
      padAngle={padAngle}
      activeInnerRadiusOffset={3}
      activeOuterRadiusOffset={8}
      colors={["#5782F2", "#FFB024", "#5ED1B1"]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.1}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      tooltip={(props) => PieChartTooltip(props)}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 68,
          translateY: 1,
          itemsSpacing: 7,
          itemWidth: 111,
          itemHeight: 35,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 17,
          symbolShape: "circle",

          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#cccccc",
              },
            },
          ],
        },
      ]}
    />
  );
}

const PieChartTooltip = (
  props: React.PropsWithChildren<PieTooltipProps<any>>
) => {
  const { value, color, label } = props.datum;
  const percentage = props.datum.data.percentage;

  return (
    <div
      style={{
        background: "#000",
        color: color,
        padding: "10px",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <div>
        <strong>{formatNumber(percentage, 0, true)}</strong>
      </div>
      <div>
        {'Monto ' + label.toString().toLocaleLowerCase()}: {formatNumber(value, 1, false, true)}
      </div>
    </div>
  );
};
