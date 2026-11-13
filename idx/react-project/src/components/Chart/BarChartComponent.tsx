import React from 'react'

import { RechartsDevtools } from "@recharts/devtools";
import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";
import { BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

interface BarChartProps {
  xAxisKey?: string;
  data: Record<string, unknown>[];
}
const BarChartComponent: React.FC<BarChartProps> = ({ xAxisKey, data }) => {
  // Get dynamic keys from the first data object
  const dataKeys = data.length > 0
    ? Object.keys(data[0]).filter((key) => key !== xAxisKey)
    : [];
  return (
    <BarChart
      style={{ 
        width: '100%', 
        aspectRatio: 1.618,
        maxWidth: 700,
        margin: "auto"
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {dataKeys.map((key, index) => (
        <>
        {key}
        <Bar
          key={key}
          dataKey={key}
          fill={COLORS[index % COLORS.length]}
          radius={[5, 5, 0, 0]}
        />
      </>
      ))}
      <XAxis dataKey="year" />
      <YAxis width="auto" />
      <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
      <Legend />
      <RechartsDevtools />
    </BarChart>
  )
}

export default BarChartComponent
