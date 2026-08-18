import React from "react";

import type { SwiperItem } from "../../types/swiper";

interface Props {
  item: SwiperItem;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const SwiperItemComponent: React.FC<Props> = ({
  item,
  index,
  onEdit,
  onDelete,
}) => {

  const { id, name, url } = item;

  return (
    <div
      key={id}
      className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 flex-1 items-center"
    >
      <div className="capitalize align-middle">
        {name}
      </div>

      <div>
        {url}
      </div>

      <div>
        <button
          onClick={onEdit}
          className="edit-btn rounded-sm"
        >
          Edit
        </button>
      </div>

      <div>
        <button
          onClick={onDelete}
          className="delete-btn rounded-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SwiperItemComponent;