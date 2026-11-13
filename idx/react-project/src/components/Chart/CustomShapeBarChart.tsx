
import type React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Label,
  Tooltip,
} from "recharts";

import type {
  BarShapeProps,
  LabelProps,
} from "recharts";

import { RechartsDevtools } from "@recharts/devtools";
import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;

  const color = COLORS[index % COLORS.length];

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(
        Number(x),
        Number(y),
        Number(width),
        Number(height)
      )}
      stroke={color}
      fill={color}
      style={{
        transition: "stroke-width 0.3s ease-out",
      }}
    />
  );
};

const CustomColorLabel = (props: LabelProps) => {
  const fill = COLORS[(props.index ?? 0) % COLORS.length];

  return <Label {...props} fill={fill} />;
};

interface CustomShapeBarChartProps {
  xAxisKey?: string;
  data: Record<string, unknown>[];
}

const CustomShapeBarChart: React.FC<CustomShapeBarChartProps> = ({
  xAxisKey = "name",
  data,
}) => {
  const dataKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== xAxisKey)
      : [];

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        aspectRatio: 1.618,
        margin: "auto"
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>

      <Tooltip
        content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />}
        cursor={{ fillOpacity: 0.5 }}
      />

      <XAxis dataKey={xAxisKey} />

      <YAxis width="auto" />

      {dataKeys.map((key) => (
        <Bar
          key={key}
          dataKey={key}
          shape={TriangleBar}
          activeBar
        >
          <LabelList
            content={CustomColorLabel}
            position="top"
          />
        </Bar>
      ))}

      <RechartsDevtools />
    </BarChart>
  );
};

export default CustomShapeBarChart;
