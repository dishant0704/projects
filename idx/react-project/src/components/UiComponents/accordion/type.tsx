// Define structure for the accordion data
export interface AccordionItemData {
  id?: number;
  title: string;
  content?: string;
}

export interface AccordionProps{
    index?:number;
    items: AccordionItemData[];
    allowMultiple?: boolean // If true, multiple sections can be open at once
}

//Dynamic Accordion Item Data
export interface DynamicAccordionItemData {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export interface DynamicAccordionProps{
    items: DynamicAccordionItemData[];
    allowMultiple?: boolean // If true, multiple sections can be open at once
}