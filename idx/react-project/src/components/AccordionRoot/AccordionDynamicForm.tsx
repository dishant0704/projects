import React, { useEffect } from "react";

import { useAppSelector } from "../../app/hooks/reducHooks"; //reducHooks
import DynamicForm from "./DynamicForm";
import ImagesList from "../UiComponents/Images/imagesList";
import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData } from "../UiComponents/accordion/type";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}
const AccordionDynamicForm:React.FC<AccordionDynamicFormProps>= (props) => {
  // const dispatch = useAppDispatch();
  const config = ComponentRegistry["demo_a"];
  const { setTabId } = props
  
  const accordionData:AccordionDynamicItemData[] = [
    {
      id: 0,      
      component: 'dynamic-form',
      props: {config:config,onSubmit:() => {
        console.log("Demo A Form Data:", );
      }},
    },
    {
      id: 1,
      title: "Image list",
      component: 'image-list',
      props: {},
    },
  ]

  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>

      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>
      <AccordionWithComp items={accordionData} />
    </div>
  );
};

export default AccordionDynamicForm
