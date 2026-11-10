
// =====================================================
// Chart Item Data
// =====================================================

import type { AccordionItemData } from "../components/UiComponents/accordion/type";

export interface subPageItemData extends AccordionItemData{}

// =====================================================
// Chart Item Data
// =====================================================

export interface ChartItemData {
  label: string;
  value: number;
}

// =====================================================
// Chart Props
// =====================================================

export interface ChartProps {
  chartType: "line" | "bar" | "pie";
  data: ChartItemData[];
}

// =====================================================
// Chart List Data
// Represents individual charts
// =====================================================

export interface ChartListData {
  id: string | number;
  title: string;
  component: string;
  props?: Record<string, unknown>;
}

// =====================================================
// Chart Component Data
// Represents the parent chart-page component
// =====================================================

export interface ChartComponentData {
  id: string;
  label: string;
  component: string;
  props?: Record<string, unknown>;
  items?: ChartListData[];
}

// =====================================================
// Chart Page
// =====================================================

export interface ChartData {
  name: string;
  advSettings: Record<string, unknown>;
  items: ChartComponentData[];
}