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
  const editHandler = (i: number) => {
    // setEditObj({inx:i, flag:true})
  }
  const deleteHandler = (id: number | null) => {
    //  const newData = accordionData.filter((item)=>item.id !== id);
    //  setAccordionData((pre)=>({ }))
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
          <div className="items-center justify-between w-full p-3 grid grid-cols-5 gap-x-5 gap-y-8 sm:grid-cols-5 flex-1">

            <div className="col-span-3 align-middle">
              <h3 className="font-medium">
                {item.title}
              </h3>
            </div>
            <div>
              <button
                onClick={() => editHandler(index)}
                className="bg-orange-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Edit</button></div>
            <div>
              <button
                onClick={() => deleteHandler(item.id)}
                className="bg-red-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Delete</button></div>
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