import React from "react";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import type {
  SortableItem,
  SortableListProps,
} from "../../../types/sortable";

import ListWrapper from "./ListWrapper";

const SorTableList = <T extends SortableItem>({
  className,
  items,
  onReorder,
  onEdit,
  onDelete,
  renderItem,
}: SortableListProps<T>) => {

  const DraggableItem = ({
    id,
    index,
  }: {
    id: T["id"];
    index: number;
  }) => {

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({
      id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const item = items.find(
      (currentItem) => currentItem.id === id
    );

    if (!item) {
      return null;
    }

    const handleEdit = () => {
      onEdit?.(item, index);
    };

    const handleDelete = () => {
      onDelete?.(item, index);
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <ListWrapper dragHandleProps={listeners}>
          {renderItem(item, index, {
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
        </ListWrapper>
      </div>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = items.findIndex(
      (item) => item.id === over.id
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedItems = arrayMove(
      items,
      oldIndex,
      newIndex
    );

    onReorder(reorderedItems);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={className ?? ""}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SorTableList;