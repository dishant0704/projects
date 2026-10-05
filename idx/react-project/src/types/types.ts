import type { SetStateAction } from "react";
import type { DynamicAccordionItemData, AccordionItemData } from "../components/UiComponents/accordion/type";

export interface ComponentData {
  id: string;
  label: string;
  component: null;
  props: Record<string, unknown> | null;
  data?: AccordionItemData[] | DynamicAccordionItemData[];
}

export interface ComponentListData {
  form: string;
  layout: string;
  name: string;
  discription: string;
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

export type ImageData = {
  id: string;
  flag: boolean;
  name: string;
  image: string;
};

export type FormData = {
  title: string;
  description: string;
  conRev: boolean;
  image?: ImageData;
};

