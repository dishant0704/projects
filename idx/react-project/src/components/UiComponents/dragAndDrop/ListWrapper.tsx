import React from "react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import style from "./dragAndDrop.module.css";

interface Props {
  dragHandleProps?: SyntheticListenerMap;
  children: React.ReactNode;
}

const ListWrapper: React.FC<Props> = ({ dragHandleProps, children }) => {
  const { sorItem } = style;
  return (
    <>
      <div className={`flex py-2 gap-2 flex-1 items-center  ${sorItem}`}>
        <div className="cursor-move" {...dragHandleProps}>
          ⠿
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default ListWrapper;
