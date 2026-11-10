import { useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import Tabs from '../UiComponents/Tabs'
import type { TabItem } from '../UiComponents/Tabs/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks/reducHooks'
import { loadChartPage } from '../../app/features/chart/chartSlice'

import { ComponentRegistry } from '../ComponentRegistry'

const ChartRoot = () => {
  const dispatch = useAppDispatch();
  const {
    page,
    loading,
    error,
  } = useAppSelector(
    (state) => state.chart
  );

    useEffect(() => {
    dispatch(loadChartPage())
      .unwrap()
      .then((pageData) => {
        console.log("Chart page loaded successfully:", pageData);
      })
      .catch((err) => {
        console.error("Failed to load chart page:", err);
      });
  }, [dispatch]);

const tabs: TabItem[] = useMemo(() => {
  if (!page?.items) {
    return [];
  }

  return page.items.map((item) => {

    // Resolve parent component
    const ParentComponent =
      ComponentRegistry[item.component]?.component;

    // Resolve nested components
    const nestedTabs: TabItem[] = (item.items ?? []).map((child) => {
      const ChildComponent =
        ComponentRegistry[child.component]?.component;

      return {
        id: String(child.id),
        label: child.title,
        component: ChildComponent ?? (() => null),
        props: child.props,
      };
    });

    return {
      id: item.id,
      label: item.label,
      component: ParentComponent ?? (() => null),

      // Pass nested components to SubPage
      props: {
        ...item.props,
        items: nestedTabs,
      },
    };
  });
}, [page]);

  if (loading) {
    return <div className="p-5">Loading Charts...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!page) {
    return (
      <div className="p-5">
        <h1>Charts</h1>
        <p>Chart page configuration was not loaded.</p>
      </div>
    );
  }

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
        <Tabs
          items={tabs}
          defaultActiveTab="chart-page"
        />
      </div>
    </section>
  )
}

export default ChartRoot;