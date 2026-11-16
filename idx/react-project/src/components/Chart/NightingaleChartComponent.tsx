
import { Legend, Pie, PieChart, Sector, Tooltip, useActiveTooltipDataPoints, useIsTooltipActive } from 'recharts';
import type { PieSectorShapeProps, TooltipContentProps } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

import { COLORS } from './chartColor';
import CustomTooltip from './CustomTooltip';

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


// #region Sample data
type NightingaleDatum = {
    name: string;
    value: number;
    weight: number;
    fill: string;
};


const chartStyle = {
    width: "100%",
    maxWidth: "500px",
    maxHeight: "80vh",
    margin: "auto",
    color: "#858585",
    aspectRatio: 1
};



const NightingaleTooltip = ({ active, payload }: TooltipContentProps) => {
    const entry: NightingaleDatum | undefined = payload?.[0]?.payload;

    if (!active || !entry) {
        return null;
    }

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0.5em 1em',
                color: '#111827',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            <p style={{ margin: 0, fontWeight: 'bold' }}>
                {entry.name}
            </p>

            <p style={{ margin: 0 }}>
                Value: {entry.value}
            </p>
        </div>
    );
};


// Data types
interface PieData {
    name: string;
    value: number;
}

interface NightingaleChartComponentProps {
    xAxisKey?: string;
    data: PieData[];
    isAnimationActive?: boolean;
}

const NightingaleChartComponent: React.FC<NightingaleChartComponentProps> = ({ data, isAnimationActive }) => {
    // #endregion
    const maxValue = Math.max(...data.map(entry => entry.value));

    const getOuterRadius = (entry: PieData) =>
        `${25 + (entry.value / maxValue) * 65}%`;
    return (
        <PieChart style={chartStyle} responsive>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius={getOuterRadius}
                startAngle={112.5}
                endAngle={-247.5}
                isAnimationActive={isAnimationActive}
                stroke="none"
                shape={MyCustomPie}
            />
            <Legend />
            {/* <Tooltip content={NightingaleTooltip} /> */}
            <Tooltip content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} />
            <RechartsDevtools />
        </PieChart>
    )
}

export default NightingaleChartComponent
