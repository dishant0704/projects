import type React from "react";
import AccordionForm from "./AccordionRoot/AccordionForm";
import AccordionList from "./AccordionRoot/AccordionList";
import AccordionDynamicList from "./AccordionRoot/AccordionDynamicList";
import Accordion from "./UiComponents/accordion/Accordion";
import SorTableList from "./UiComponents/dragAndDrop/SorTableList";

import DemoA from './demo/DemoA'
import DemoB from './demo/DemoB'
import DemoC from './demo/DemoC'

//Icom
import { 
  ListIcon,
  ComponentIcon,
  FormIcon,
  PencilIcon,
  SettingsIcon,
  Trash2Icon
} from "lucide-react";


export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  "accordion": Accordion,
  "accordion-list": AccordionList,
  "accordion-dynamic-list": AccordionDynamicList,
  "accordion-form": AccordionForm,
  "sor-table-list": SorTableList,
  "demo_a": DemoA,
  "demo_b": DemoB,
  "demo_c": DemoC,
};

export const IconRegistry: Record<string,React.ComponentType<any>> = {
  "list": ListIcon,
  "component": ComponentIcon,
  "form":FormIcon,
  "edit": PencilIcon,
  "setting": SettingsIcon,
  "delete": Trash2Icon
}