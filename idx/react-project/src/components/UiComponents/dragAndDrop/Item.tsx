import React from "react";
import type { SwiperItem } from "../../../types/swiper";

interface Props {
  inx: number;
  item: SwiperItem;
  editBtn: (inx: number) => void;
  deleteBtn: (id: number) => void;
}
const Item: React.FC<Props> = ({ inx, item, editBtn, deleteBtn }) => {
  const { id, name, url } = item;
  return (
    <div
      key={id}
      className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 flex-1 items-center"
    >
      <div className="capitalize align-middle">{name}</div>
      <div>{url}</div>
      <div>
        <button
          onClick={() => editBtn(inx)}
          className="edit-btn rounded-sm"
        >
          Edit
        </button>
      </div>
      <div>
        <button
          onClick={() => deleteBtn(id)}
          className="delete-btn rounded-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
