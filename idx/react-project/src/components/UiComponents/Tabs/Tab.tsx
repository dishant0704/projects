import React from "react";
import type { TabItem } from "./types";

interface Props {
  item: TabItem;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<Props> = (Props) => {
  //Distructure Props
  const {
    item: { label, icon: Icon, disabled, iconWithText },
    active,
    onClick,
  } = Props;

  return (
    <button
      role="tab"
      aria-label={label}
      title={label}
      disabled={active || disabled}
      onClick={onClick}
      className={`
        flex
        gap-2
        text-left
        px-0
        py-4
        font-medium
        transition-colors       
        border-b-2
        -mb-px
        ${active? Icon? "tabActive iconActiveTab": "tabActive" : "tab"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* {Icon?"Icon loading":"no icon"} */}
      {iconWithText && Icon ? (
        <>
          {Icon && <Icon />}
          {label}
        </>
      ) : Icon ? (
        <>{Icon && <Icon />}</>
      ) : (
        <>{label}</>
      )}
    </button>
  );
};

export default Tab;
