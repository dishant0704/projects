import type React from "react";

// =====================================================
// Regular Accordion Item
// =====================================================

export interface AccordionItemData {
  id: number;
  title: string;
  content: string;
  index?: number;
}

// =====================================================
// Dynamic Accordion Item (JSON / Redux data)
// =====================================================

export interface AccordionDynamicItemData {
  id: number;
  title: string;
  component: string;
  props?: Record<string, unknown>;
  index?: number;
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

export interface DynamicAccordionItemData {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export interface DynamicAccordionProps {
  items: DynamicAccordionItemData[];
  allowMultiple?: boolean;
}
