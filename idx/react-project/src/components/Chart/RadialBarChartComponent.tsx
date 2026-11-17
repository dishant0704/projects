import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { COLORS } from './chartColor';
import CustomTooltip from './CustomTooltip';

interface RadialData { name: string, uv: number}

interface RadialBarChartComponentProps {
    xAxisKey?: string;
    data: RadialData[];
    isAnimationActive?: boolean;
}
const RadialBarChartComponent:React.FC<RadialBarChartComponentProps> = ({data}) => {
  return (
     <RadialBarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', margin: "auto", aspectRatio: 1.618, color:"#fff" }}
      responsive
      cx="30%"
      barSize={14}
      data={data}
    >
      <RadialBar label={{ position: 'insideStart'}} background={{ fill: '#444444' }} dataKey="uv" />
      <Legend iconSize={10} position="right" />
      <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
      <RechartsDevtools />
    </RadialBarChart>
  )
}

export default RadialBarChartComponent
