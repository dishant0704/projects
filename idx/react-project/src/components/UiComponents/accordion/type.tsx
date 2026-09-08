import type React from "react";

// =====================================================
// Actual Accordion Item
// =====================================================

export interface AccordionItemData {
  id: number;
  title: string;
  content: string;
  index?: number;
}

// =====================================================
// Page Component
// =====================================================

export interface AccordionComponentData {
  id: string;
  label: string;
  component: string;
  props?: Record<string, unknown>;
  items?: AccordionItemData[];
}

// =====================================================
// Accordion Page
// =====================================================

export interface AccordionData {
  name: string;
  advSettings: Record<string, unknown>;
  items: AccordionComponentData[];
}

// =====================================================
// Accordion Props
// =====================================================

export interface AccordionProps {
  items: AccordionItemData[];
  isOpenId?: number;
  allowMultiple?: boolean;
  defaultActiveTab?: number;
}

// =====================================================
// Dynamic Accordion
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
