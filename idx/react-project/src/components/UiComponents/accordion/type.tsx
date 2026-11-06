import type { RegistryComponentProps } from "../../ComponentRegistry";

export interface BaseAccordionItemData {
  id: number | string;
  title: string;
  props?: Record<string, unknown>;
  showHeader?: boolean;
}

// =====================================================
// Regular Accordion Item
// =====================================================

export interface AccordionItemData {
  id: string | number;
  title: string;
  content: string;
  index?: number;
}

// =====================================================
// Dynamic Accordion Item (JSON / Redux data)
// =====================================================

export interface AccordionDynamicItemData
  extends Omit<BaseAccordionItemData, "props"> {
  component?: string;
  index?: number;
  props?: Record<string, unknown>;
}
// =====================================================
// Regular Accordion Component
// =====================================================

export interface RegularAccordionComponentData {
  id: "regAcc";
  label: string;
  component: string;
  props?: Record<string, unknown>;
  items?: AccordionItemData[];
}

// =====================================================
// Dynamic Accordion Component
// =====================================================

export interface DynamicAccordionComponentData {
  id: "dynAcc";
  label: string;
  component: string;
  props?: Record<string, unknown>;
  items?: AccordionDynamicItemData[];
}

// =====================================================
// Page Component
// =====================================================

export type AccordionComponentData =
  | RegularAccordionComponentData
  | DynamicAccordionComponentData;

// =====================================================
// Edit State
// =====================================================

export type EditState = {
  flag: boolean;
  inx: number | null;
};

// =====================================================
// Accordion Page
// =====================================================

export interface AccordionData {
  name: string;
  advSettings: Record<string, unknown>;
  items: AccordionComponentData[];
}

// =====================================================
// Regular Accordion Props
// =====================================================

export interface AccordionProps {
  index?: number;
  items: AccordionItemData[];
  isOpenId?: number;
  allowMultiple?: boolean;
  defaultActiveTab?: number;
}

// =====================================================
// Runtime Dynamic Accordion Item
// =====================================================

export interface DynamicAccordionItemData
  extends BaseAccordionItemData {
  component: string;
}

export interface DynamicAccordionProps {
  items: DynamicAccordionItemData[];
  allowMultiple?: boolean;
  headerButtonObj?: {
    flag: boolean;
    id: string | number | null
  };
  openId?: string | number | null;
  onOpenIdChange?: (id: string | number | null) => void;
}

// =====================================================
// Runtime Dynamic Form
// =====================================================


export interface DynamicImage {
  name: string;
  image: string;
  id: string;
  flag: boolean;
}

export type DynamicFormData = {
  [key: string]: unknown;
  id?: string;
  accordionTitle: string;
  title: string;
  content: string;
  conRev: boolean;
  image?: DynamicImage | DynamicImage[];
  name?: string;
  designation?: string;
};

export interface DynamicRuntimeProps extends DynamicFormData {
  setCom?: (id: string) => void;
  config?: RegistryComponentProps | null;
  goBack?: () => void;
  data?: DynamicFormData;
}

export interface DynamicProps {
  title: string;
  content: string;
  conRev?: boolean;
  images: DynamicImage[];
}

export function isDynamicAccordionItem(
  item: AccordionItemData | AccordionDynamicItemData
): item is AccordionDynamicItemData {
  return "component" in item;
}


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
  id: string;
  label: string;
  component: string;
  props?: ChartProps;
}

// =====================================================
// Chart Component Data
// Represents the parent chart-page component
// =====================================================

export interface ChartComponentData {
  id: "chart-page";
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
