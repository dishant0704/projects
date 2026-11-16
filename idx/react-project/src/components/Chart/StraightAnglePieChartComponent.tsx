import React from 'react'

import {
    Pie, PieChart, Sector, Tooltip, useActiveTooltipDataPoints,
    useIsTooltipActive,
} from 'recharts';

import type {
    PieSectorShapeProps,
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

// Data types
interface PieData {
    name: string;
    value: number;
}

interface StraightAnglePieChartComponentProps {
    xAxisKey?: string;
    data: PieData[];
    isAnimationActive?: boolean;
}


const StraightAnglePieChartComponent: React.FC<StraightAnglePieChartComponentProps> = ({ data, isAnimationActive = true }) => {
    return (
        <div>
            <PieChart style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "80vh",
                margin: "auto",
                color: "#858585", 
                aspectRatio: 2
            }} responsive>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="100%"
                    outerRadius="120%"
                    label
                    isAnimationActive={isAnimationActive}
                    shape={MyCustomPie}
                />
            </PieChart>
            <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
            <RechartsDevtools />
        </div>
    )
}

export default StraightAnglePieChartComponent
