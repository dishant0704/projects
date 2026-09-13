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
  componentName?:string;
  icon?:React.ComponentType<any>;
  iconWithText?:boolean | false
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
  data?: unknown[]
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  activeTabId?: string; 
  align?:string; 
  onTabChange?:(tabId:string)=>void
}