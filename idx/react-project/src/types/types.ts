import type { SetStateAction } from "react";

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
  data: unknown[];
}

export interface PageContextType{
    pages:Page[];
    loading:boolean;
    setPages:React.Dispatch<SetStateAction<Page[]>>
}