import React, { useEffect, useState } from "react";

import type { AccordionData, AccordionDynamicItemData} from "../UiComponents/accordion/type";

import { useAppDispatch, useAppSelector } from "../../app/hooks/reducHooks"; //reducHooks

import { addAccordionItem, setAccordionPage, setEditObject } from "../../app/features/accordion/accordionSlice";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}
const AccordionDynamicForm:React.FC<AccordionDynamicFormProps>= (props) => {
  const dispatch = useAppDispatch();
  const { setTabId } = props

  const {
    page,
    editObject,
  } = useAppSelector(
    (state) => state.accordion
  );
  const { flag, inx } = editObject
  const [formData, setFormData] = useState<AccordionDynamicItemData>({
    id: 0,
    title: "",
    component: "",
    index: 0,
  });

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
    setFormData({
      id: currentItem.id,
      title: currentItem.title,
      component: currentItem.component,
      index: inx,
    });
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

  const currentItems = regularAccordion.items ?? [];

  if (flag) {
    // -----------------------------
    // EDIT
    // -----------------------------
    if (typeof inx !== "number") {
      return;
    }

    if (inx < 0 || inx >= currentItems.length) {
      return;
    }

    const updatedItems = [...currentItems];

    updatedItems[inx] = {
      ...formData,
      index: inx,
    };

    const updatedPage: AccordionData = {
      ...page,

      items: page.items.map((item) =>
        item.id === "dynAcc"
          ? {
              ...item,
              items: updatedItems,
            }
          : item
      ),
    };

    dispatch(setAccordionPage(updatedPage));

    dispatch(
      setEditObject({
        flag: false,
        inx: null,
      })
    );
  } else {
    // -----------------------------
    // ADD
    // -----------------------------
    dispatch(
      addAccordionItem({
        ...formData,
        id: Date.now(),
        index: currentItems.length,
      })
    );
  }

  setFormData({
    id: 0,
    title: "",
    content: "",
    index: 0,
  });

  setTabId("accList");
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
              {flag ? "Save Data" : "Add Data"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccordionDynamicForm
