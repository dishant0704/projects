import type React from "react";
import AccordionForm from "./AccordionRoot/AccordionForm";
import AccordionList from "./AccordionRoot/AccordionList";
import Accordion from "./UiComponents/accordion/Accordion";
import SorTableList from "./UiComponents/dragAndDrop/SorTableList";

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
  "accordion-form": AccordionForm,
  "sor-table-list": SorTableList
};

export const IconRegistry: Record<string,React.ComponentType<any>> = {
  "list": ListIcon,
  "component": ComponentIcon,
  "form":FormIcon,
  "edit": PencilIcon,
  "setting": SettingsIcon,
  "delete": Trash2Icon
}