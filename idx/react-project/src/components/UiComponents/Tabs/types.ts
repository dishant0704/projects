import type React from "react";
import type { AccordionItemData } from "../accordion/type";

export type ComponentName =
  | "ReguralAccordion"
  | "DynamicAccordion";

export interface PageTabItem {
  id: string;
  label: string;
  component: ComponentName;
  props?: Record<string, unknown>;
  disabled?: boolean;

  // Data belonging to this tab
  data?: AccordionItemData[];
}

export interface TabItem {
  id: string;
  label: string;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
}