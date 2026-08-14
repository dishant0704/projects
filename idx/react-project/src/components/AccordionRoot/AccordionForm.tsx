import React, { useState } from "react";

import type { AccordionItemData } from "../UiComponents/accordion/type";

import {
  useAppDispatch,
} from "../../app/hooks/reducHooks";

import { addAccordionItemAndSave } from "../../app/features/pageSlice";

const AccordionForm = () => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] =
    useState<AccordionItemData>({
      id: 0,
      title: "",
      content: "",
    });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newItem: AccordionItemData = {
      ...formData,
      id: Date.now(),
    };

    dispatch(
      addAccordionItemAndSave({
        pageName: "accordion",
        tabId: "regAcc",
        item: newItem,
      })
    );

    setFormData({
      id: 0,
      title: "",
      content: "",
    });
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
              setFormData((prev) => ({
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
            <button
              type="submit"
              className="btn"
            >
              Save
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AccordionForm;