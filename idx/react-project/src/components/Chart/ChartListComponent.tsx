import React, { useCallback } from 'react'
import SorTableList from "../UiComponents/dragAndDrop/SorTableList";
import { useAppSelector, useAppDispatch } from "../../app/hooks/reducHooks";

import type {ChartListData} from "../../types/chart";
import {setEditObject } from '../../app/features/accordion/accordionSlice';

import { Trash2Icon, PencilIcon } from "lucide-react";
import { reorderChartItems } from '../../app/features/chart/chartSlice';

interface ChartListComponentProps {
  setTabId: (tabId: string) => void;
}

const ChartListComponent:React.FC<ChartListComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const { setTabId } = props;

  const { page } = useAppSelector((state) => state.chart);

  const chartListData: ChartListData[] =
    page?.items?.find((item) => item.id === "chart-page")?.items ?? [];

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
      (item: ChartListData) => {
        // dispatch(deleteAccordionItem(item.id));
      },
      [dispatch]
    );

  return (
    <div>
      <SorTableList<ChartListData>
        items={chartListData}
        onReorder={(items) => {
          dispatch(reorderChartItems(items));
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
                onClick={() => handleEdit(inx)}
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
                <Trash2Icon />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  )
}
export default ChartListComponent

