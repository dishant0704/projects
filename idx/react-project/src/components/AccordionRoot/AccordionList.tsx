import { useEffect, useState } from "react";

import SorTableList from "../UiComponents/dragAndDrop/SorTableList";

import {
  useAppSelector,
} from "../../app/hooks/reducHooks";

import type { AccordionItemData } from "../UiComponents/accordion/type";

import type { EditObject } from "../../types/swiper";

const AccordionList = () => {

  const {
    pages,
    loading,
  } = useAppSelector(
    (state) => state.pages
  );

  const currpage = pages.find(
    (page) => page.name === "accordion"
  );

  const sectionData =
    currpage?.data.find(
      (page) =>
        page.id === "regAcc"
    );

  const data =
    sectionData?.data ?? [];

  const [
    accordionData,
    setAccordionData,
  ] = useState<AccordionItemData[]>([]);

  const [
    editObj,
    setEditObj,
  ] = useState<EditObject>({
    inx: null,
    flag: false,
  });

  // Update local state when Redux data changes
  useEffect(() => {
    setAccordionData(data);
  }, [data]);

  const handleReorder = (
    items: AccordionItemData[]
  ) => {
    setAccordionData(items);
  };

  const handleDelete = (
    item: AccordionItemData
  ) => {
    setAccordionData((prev) =>
      prev.filter(
        (currentItem) =>
          currentItem.id !== item.id
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <SorTableList<AccordionItemData>
        items={accordionData}

        onReorder={handleReorder}

        onEdit={(_, index) => {
          setEditObj({
            inx: index,
            flag: true,
          });
        }}

        onDelete={handleDelete}

        renderItem={(
          item,
          index,
          handlers
        ) => (
          <div className="flex items-center justify-between w-full p-3">

            <div>
              <h3 className="font-medium">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">
                {item.content}
              </p>
            </div>

            {/* Use handlers here if SorTableList provides them */}
            {/* 
            <div>
              ...
            </div>
            */}

          </div>
        )}
      />

    </div>
  );
};

export default AccordionList;

// Since your overall architecture is Redux + localStorage, the next step should be to create something like:

// reorderAccordionItemsAndSave()
// deleteAccordionItemAndSave()

// in your pageSlice, just like you already created:

// addAccordionItemAndSave()