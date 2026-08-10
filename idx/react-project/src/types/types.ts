import type { SetStateAction } from "react";

export interface AccordionItemData {
  id?: number;
  title: string;
  content?: string;
}

//Dynamic Accordion Item Data
export interface DynamicAccordionItemData {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export interface ComponentData {
  id: string;
  label: string;
  component: null;
  props: Record<string, unknown> | null;
  data?: AccordionItemData[] | DynamicAccordionItemData[];
}

// Accordion
export interface AccordionData{
    component: null,
    id: string,
    label: string,
    props:null
}
export interface Page {
  name: string;
  advSettings: Record<string, unknown>;
  data: ComponentData[];
}

export interface PageContextType{
    pages:Page[];
    loading:boolean;
    setPages:React.Dispatch<SetStateAction<Page[]>>
}