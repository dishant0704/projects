
import React from "react";

import { RechartsDevtools } from "@recharts/devtools";

import {
  PieChart,
  Pie,
  Sector,
  Tooltip,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts";

import type {
  PieLabelRenderProps,
  PieSectorShapeProps,
} from "recharts";

import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";

// Percentage label
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  const radius =
    innerRadius + (outerRadius - innerRadius) * 0.5;

  const ncx = Number(cx);
  const ncy = Number(cy);

  const x =
    ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);

  const y =
    ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom Pie Shape
const MyCustomPie = (props: PieSectorShapeProps) => {
  const activePoints = useActiveTooltipDataPoints();
  const isTooltipActive = useIsTooltipActive();

  const isThisPieActive =
    isTooltipActive &&
    props.payload === activePoints?.[0];

  const fillOpacity =
    isTooltipActive && !isThisPieActive ? 0.5 : 1;

  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      stroke="none"
      fillOpacity={fillOpacity}
      style={{
        transition: "fill-opacity 0.3s ease",
      }}
    />
  );
};

// Data types
interface PieData {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  xAxisKey?: string;
  data: PieData[];
  isAnimationActive?: boolean;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  xAxisKey = "name",
  data,
  isAnimationActive = true,
}) => {
  return (
    <PieChart
      responsive
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
        margin: "auto",
        color:"#858585"
      }}
    >
      <Pie
        data={data}
        nameKey={xAxisKey}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />

      <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />

      <RechartsDevtools />
    </PieChart>
  );
};

export default PieChartComponent;
