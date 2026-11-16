import React from 'react'

import { Pie, PieChart, Sector, Tooltip, useActiveTooltipDataPoints, useIsTooltipActive} from 'recharts';

import type {
    PieSectorDataItem,
    PieSectorShapeProps,
    TooltipIndex
} from "recharts";

import { RechartsDevtools } from '@recharts/devtools';

import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";

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

// #endregion
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Data types
interface PieData {
    name: string;
    value: number;
}

interface CustomActiveShapePieChartComponentProps {
    xAxisKey?: string;
    data: PieData[];
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
}


const CustomActiveShapePieChartComponent:React.FC<CustomActiveShapePieChartComponentProps> = ({ data, isAnimationActive = true }) => {
  return (
    <PieChart
          style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              margin: "auto",
              color: "#858585", 
              aspectRatio: 1
          }}
          responsive
      margin={{
        top: 50,
        right: 120,
        bottom: 0,
        left: 120,
      }}
    >
      <Pie
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
      {/* <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} /> */}
      <RechartsDevtools />
    </PieChart>
  )
}

export default CustomActiveShapePieChartComponent
