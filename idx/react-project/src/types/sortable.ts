// types/sortable.ts

import type React from "react";

export interface SortableItem {
  id: number | string;
}

export interface SortableItemHandlers {
  onEdit: () => void;
  onDelete: () => void;
}

export interface SortableListProps<T extends SortableItem> {
  className?: string;

  items: T[];

  onReorder: (items: T[]) => void;

  onEdit?: (item: T, index: number) => void;

  onDelete?: (item: T, index: number) => void;

  renderItem: (
    item: T,
    index: number,
    handlers: SortableItemHandlers
  ) => React.ReactNode;
}