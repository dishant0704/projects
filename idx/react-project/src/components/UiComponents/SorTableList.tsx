import React from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import type { EditObject, imageData, SwiperData, SwiperItem } from "../../types/swiper";
import ListItem from "./ListItem";

interface Props {
  className?: string;
  items: SwiperItem[];
  onReorder: (items: imageData) => void;
  setData: React.Dispatch<React.SetStateAction<SwiperData>>
  setEditObj: React.Dispatch<React.SetStateAction<EditObject>>
}

const SorTableList: React.FC<Props> = ({
  className,
  items,
  onReorder,
  setEditObj,
  setData
}) => {
  const DraggableItem = ({ id, inx }: { id: SwiperItem["id"], inx: number }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const editHandler = (i: number) => {
      setEditObj({ inx: i, flag: true })
    }

    const deleteHandler = (id: number | null) => {
      const newData = items.filter((item) => item.id !== id);
      console.log("newData:", newData)
      setData((pre) => ({
        ...pre,
        data: newData
      }))
    }

    const item = items.find((item) => item.id === id);

    if (!item || item.id === null) return null;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <ListItem
          inx={inx}
          item={item}
          dragHandleProps={listeners}
          editBtn={editHandler}
          deleteBtn={deleteHandler}
        />
      </div>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = items.findIndex(
      (item) => item.id === over.id
    );

    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className={className ? className : ""}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, inx) => (
            <DraggableItem
              inx={inx}
              key={item.id}
              id={item.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SorTableList;