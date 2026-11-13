
import type React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";

interface ListChartProps {
  xAxisKey?: string;
  data: Record<string, unknown>[];  
}

const LineChartComponent: React.FC<ListChartProps> = ({xAxisKey,  data}) => {

  // Get dynamic keys from the first data object
  const dataKeys = data.length > 0
    ? Object.keys(data[0]).filter((key) => key !== xAxisKey)
    : [];

  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 800,
        margin: "auto",
      }}
      responsive
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      {dataKeys.map((key, index) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2}
        />
      ))}

      <XAxis dataKey="year" />
      <YAxis width="auto" />
      <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
      <Legend />
      <RechartsDevtools />
    </LineChart>
  );
};

export default LineChartComponent;
