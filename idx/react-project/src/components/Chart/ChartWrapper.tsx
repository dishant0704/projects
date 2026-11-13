import React from 'react'
import { useAppSelector } from '../../app/hooks/reducHooks';
import type { ChartListData } from '../../types/chart';
import { ComponentRegistry } from '../ComponentRegistry';

interface ChartWrapperProps {
  // Define any props that the ChartWrapper component might accept
  index: number;
}

const ChartWrapper:React.FC<ChartWrapperProps> = (props) => {
    const {index} = props
    const { page } = useAppSelector((state) => state.chart);
    
      const chartListData: ChartListData[] =
        page?.items?.find((item) => item.id === "chart-page")?.items ?? [];
        const currentChartData = chartListData[index];
        const Component = ComponentRegistry[currentChartData?.component]?.component;
        const componentProps = currentChartData?.props;
        console.log('chartListData', chartListData[index])
  return (
    <div className="w-full py-4 dark:bg-zinc-800 bg-zinc-100 p-4 text-stone-100`">
      {Component && <Component {...componentProps} />}
    </div>
  )
}

export default ChartWrapper
