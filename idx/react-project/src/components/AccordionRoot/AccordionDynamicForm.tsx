import React, { useEffect } from "react";

import { useAppSelector } from "../../app/hooks/reducHooks"; //reducHooks
import DynamicForm from "./DynamicForm";
import { ComponentRegistry } from "../ComponentRegistry";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}
const AccordionDynamicForm:React.FC<AccordionDynamicFormProps>= (props) => {
  // const dispatch = useAppDispatch();
  const config = ComponentRegistry["demo_a"];
  const { setTabId } = props

  const {
    page,
    editObject,
  } = useAppSelector(
    (state) => state.accordion
  );
  const { flag, inx } = editObject

  const getPageData = () => {
    if (!page) return
    return page.items.find(
      (item) => item.id === "dynAcc"
    );
  }

  useEffect(() => {
    if (!flag || typeof inx !== "number") {
      return;
    }
    const regularAccordion = getPageData(); //get page data
    console.log("regularAccordion: ",regularAccordion);
    const currentItem = regularAccordion?.items?.[inx];
    if (!currentItem) {
      return;
    }
   
    console.log("currentItem: ", currentItem);

  }, [flag, inx, page]);

  const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!page) {
    return;
  }

  const regularAccordion = page.items.find(
    (item) => item.id === "regAcc"
  );

  if (!regularAccordion) {
    return;
  }  

  setTabId("accList");
};

  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>

      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>
      <DynamicForm 
      config={config}
      onSubmit={(data) => {
        console.log("Demo A Form Data:", data);
      }}/>
      {/* <form onSubmit={handleSubmit}>
        <div className="grid gap-5 my-5"> */}
          {/* <input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            type="text"
            className="w-auto"
            placeholder="Title"
            required
          />

          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            rows={5}
            cols={6}
            placeholder="Description"
            required
          /> */}

          {/* <div className="grid justify-items-end">
            <button type="submit" className="btn">
              {flag ? "Save Data" : "Add Data"}
            </button>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default AccordionDynamicForm
