import React from 'react'

import { RechartsDevtools } from "@recharts/devtools";
import { COLORS } from "./chartColor";
import CustomTooltip from "./CustomTooltip";

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

interface ScatterPoint {
    "x": number,
    "y": number,
    "z": number,
}

interface ScatterSeries {
    name: string;
    data: ScatterPoint[]
}

interface ScatterChartComponentProps {
    xAxisKey?: string;
    data: ScatterSeries[];
    isAnimationActive?: boolean
}

const ScatterChartComponent: React.FC<ScatterChartComponentProps> = ({ xAxisKey, data, isAnimationActive = true }) => {
    return (
        <>
            <h1>{xAxisKey}</h1>
            <ScatterChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10,
                }}
            >
                <CartesianGrid />
                <XAxis dataKey="x" type="number" name="stature" unit="cm" />
                <YAxis dataKey="y" type="number" name="weight" unit="kg" width="auto" />
                <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
                {
                    data && data.map((item, inx) => <Scatter name={item.name} data={item.data} fill={COLORS[inx % COLORS.length]} isAnimationActive={isAnimationActive} />)
                }
                <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
                <Legend />
                <RechartsDevtools />
            </ScatterChart>
        </>
    )
}

export default ScatterChartComponent
