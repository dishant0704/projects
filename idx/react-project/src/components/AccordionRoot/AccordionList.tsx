import { useCallback, useEffect } from "react";
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

import { Trash2Icon, PencilIcon } from "lucide-react";

interface AccordionFormProps {
  setTabId: (tabId: string) => void;
}

const AccordionList:React.FC<AccordionFormProps>= (props) => {
  const dispatch = useAppDispatch();
  const{setTabId} = props

  useEffect(() => {
    dispatch(setEditObject({ flag: false, inx: null }));
  }, [dispatch]);

  const { page} = useAppSelector((state) => state.accordion);

  const accordionData: AccordionItemData[] =
    page?.items?.find((item) => item.id === "regAcc")?.items ?? [];

  const handleEdit = useCallback(
    (index: number) => {
      dispatch(
        setEditObject({
          flag: true,
          inx: index,
        })
      );
      setTabId("accForm")
    },
    [dispatch]
  );

const handleDelete = useCallback(
  (item: AccordionItemData) => {
    dispatch(deleteAccordionItem(item.id));
  },
  [dispatch]
);
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
          <div className="items-center justify-between w-full grid grid-cols-5 gap-5 sm:grid-cols-7 flex-1">
            <div className="col-span-5 align-middle">
              <h3 className="font-medium">{item.title}</h3>
            </div>

            <div>
              <button
                type="button"
                onClick={()=>handleEdit(inx)}
                className="p-2 text-base block text-orange-400 cursor-pointer"
              >
                <PencilIcon />
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="p-2 text-base block text-red-400 cursor-pointer"
              >
                <Trash2Icon/>
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default AccordionList;
