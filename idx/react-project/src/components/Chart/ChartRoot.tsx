import React, { useMemo } from 'react'
import { Link } from 'react-router'
import Tabs from '../UiComponents/Tabs'
import type { TabItem } from '../UiComponents/Tabs/types'
import { useAppSelector } from '../../app/hooks/reducHooks'

const ChartRoot = () => {
    //  const {
    //     page,
    //     loading,
    //     error,
    //   } = useAppSelector(
    //     (state) => state.chart
    //   );

    // const tabs: TabItem[] = useMemo(() => {
    //     if (!page?.items) {
    //       return [];
    //     }
  return (
    <section className="p-5">
      <h1>Chart:</h1>

      <Link
        to="/"
        className="text-[14px] text-primary-6-light-5"
      >
        Back to Dashboard
      </Link>

      <div className="w-full">
        {/* <Tabs
          items={tabs}
          defaultActiveTab="regAcc"
        /> */}
      </div>
    </section>
  )
}

export default ChartRoot
