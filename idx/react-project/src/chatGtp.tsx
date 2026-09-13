import React from "react";
import type { TabItem } from "./types";

interface Props {
  item: TabItem;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<Props> = ({
  item: { label, icon: Icon, disabled },
  active,
  onClick,
}) => {
  return (
    <button
      role="tab"
      disabled={active || disabled}
      onClick={onClick}
      className={`
        px-5
        py-3
        font-medium
        transition-colors
        border-b-2
        -mb-px
        ${active ? "tabActive" : "tab"}
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default Tab;