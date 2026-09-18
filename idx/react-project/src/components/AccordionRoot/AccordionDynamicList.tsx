import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/reducHooks';
import SorTableList from '../UiComponents/dragAndDrop/SorTableList';
import type { AccordionDynamicItemData} from '../UiComponents/accordion/type';
import { reorderAccordionDynamicItems } from '../../app/features/accordion/accordionSlice';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface AccordionDynamicListProps{
    setTabId:(tabId:string)=>void
}

const AccordionDynamicList:React.FC<AccordionDynamicListProps> = (props) => {
    const dispatch = useAppDispatch();
    const{setTabId} = props;
    
    const {page} = useAppSelector((state) => state.accordion);   
    const accordionDynamicData: AccordionDynamicItemData[] =  page?.items?.find((item) => item.id === "dynAcc")?.items ?? [];

    const handleEdit = () =>{}

    const handleDelete = () =>{}
    console.log("accordionDynamicData: ", accordionDynamicData)
  return (
    <div>
        <SorTableList<AccordionDynamicItemData> items={accordionDynamicData} onReorder={(items) => {
                  dispatch(reorderAccordionDynamicItems(items));
                }} 
                onEdit={(item)=>{}} 
                onDelete={(item)=>{}} 
                renderItem={(item, inx) => (
                <div className="items-center justify-between w-full grid grid-cols-5 gap-5 sm:grid-cols-7 flex-1">
                    <div className="col-span-5 align-middle">
                    <h3 className="font-medium">{item.title}</h3>
                    </div>

                    <div>
                    <button
                        type="button"
                        onClick={() => {}}
                        className="p-2 text-base block text-orange-400 cursor-pointer"
                    >
                        <PencilIcon />
                    </button>
                    </div>

                    <div>
                    <button
                        type="button"
                        onClick={() => {}}
                        className="p-2 text-base block text-red-400 cursor-pointer"
                    >
                        <Trash2Icon/>
                    </button>
                    </div>
                </div>
                )} />
      
    </div>
  )
}

export default AccordionDynamicList
