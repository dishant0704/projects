import React, { useState } from "react";

import type { AccordionItemData } from "../UiComponents/accordion/type";

import { useAppDispatch } from "../../app/hooks/reducHooks"; //reducHooks

import { addAccordionItem } from "../../app/features/accordion/accordionSlice";
interface AccordionFormProps {
  setTabId: (tabId: string) => void;
}

const AccordionForm:React.FC<AccordionFormProps>= (props) => {
  const dispatch = useAppDispatch();
  const{setTabId} = props
  
  const [formData, setFormData] = useState<AccordionItemData>({
    id: 0,
    title: "",
    content: "",
    index: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: AccordionItemData = {
      ...formData,
      id: Date.now(),
    };

    dispatch(addAccordionItem(newItem));

    setFormData({
      id: 0,
      title: "",
      content: "",
      index: 0,
    });
    setTabId("accList")
  };

  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>

      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 my-5">
          <input
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
          />

          <div className="grid justify-items-end">
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccordionForm;
