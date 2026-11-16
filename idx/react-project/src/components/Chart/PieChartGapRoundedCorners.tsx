import React from 'react'

import { Pie, PieChart, Sector, Tooltip, useActiveTooltipDataPoints, useIsTooltipActive, type PieSectorShapeProps } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import CustomTooltip from './CustomTooltip';
import { COLORS } from './chartColor';

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

interface CustomActiveShapePieChartComponentProps {
    xAxisKey?: string;
    data: PieData[];
    isAnimationActive?: boolean;
}

const PieChartGapRoundedCorners:React.FC<CustomActiveShapePieChartComponentProps> = ({data, isAnimationActive=true}) => {
  return (
    <PieChart style={{ 
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
        margin: "auto",
        color:"#858585"}} responsive>
      <Pie
        data={data}
        innerRadius="80%"
        outerRadius="100%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="50%"
        // padding angle is the gap between each pie slice
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
       <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />

      <RechartsDevtools />
    </PieChart>
  )
}

export default PieChartGapRoundedCorners
