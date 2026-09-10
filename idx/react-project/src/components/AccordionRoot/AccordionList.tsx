import { useEffect } from "react";
import SorTableList from "../UiComponents/dragAndDrop/SorTableList";

import { useAppSelector, useAppDispatch } from "../../app/hooks/reducHooks";

import {
  reorderAccordionItems,
  deleteAccordionItem,
  setEditObject,
} from "../../app/features/accordion/accordionSlice";

import type {
  AccordionItemData,
} from "../UiComponents/accordion/type";

const AccordionList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setEditObject({ flag: false, inx: null }));
  }, [dispatch]);

  const { page, loading, error } = useAppSelector((state) => state.accordion);

  /*
   * New structure:
   *
   * page
   *  └── items
   *       ├── regAcc
   *       │    └── items[]
   *       └── dynAcc
   *
   * We need the items belonging to regAcc.
   */
  const accordionData: AccordionItemData[] =
    page?.items?.find((item) => item.id === "regAcc")?.items ?? [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SorTableList<AccordionItemData>
        items={accordionData}
        onReorder={(items) => {
          dispatch(reorderAccordionItems(items));
        }}
        onEdit={(item) => {
          // dispatch(setEditingAccordionItem(item));
        }}
        onDelete={(item) => {
          // dispatch(deleteAccordionItem(item.id));
        }}
        renderItem={(item, inx) => (
          <div className="items-center justify-between w-full p-3 grid grid-cols-5 gap-x-5 gap-y-8 sm:grid-cols-5 flex-1">
            <div className="col-span-3 align-middle">
              <h3 className="font-medium">{item.title}</h3>
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  dispatch(setEditObject({ flag: true, inx: inx }))
                }
                className="bg-orange-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => dispatch(deleteAccordionItem(item.id))}
                className="bg-red-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default AccordionList;
