import AccordionForm from "./AccordionRoot/AccordionForm";
import AccordionList from "./AccordionRoot/AccordionList";
import Accordion from "./UiComponents/accordion/Accordion";
import SorTableList from "./UiComponents/dragAndDrop/SorTableList";


export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  "accordion": Accordion,
  "accordion-list": AccordionList,
  "accordion-form": AccordionForm,
  "sor-table-list": SorTableList
};