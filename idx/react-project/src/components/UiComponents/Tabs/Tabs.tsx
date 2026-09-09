import React, { useState } from "react";
import type { TabsProps } from "./types";

import TabPanel from "./TabPanel";
import Tab from "./Tab";

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    items,
    defaultActiveTab,
    activeTabId,
    onTabChange,
    className,
  } = props;

  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || items[0]?.id
  );

  // If activeTabId is provided, Tabs is controlled
  // Otherwise it uses its own internal state
  const activeTab = activeTabId ?? internalActiveTab;

  const handleTabChange = (tabId: string) => {
    // Update internal state
    setInternalActiveTab(tabId);

    // Notify parent if callback exists
    onTabChange?.(tabId);
  };

  const activeContent = items.find(
    (item) => item.id === activeTab
  );

  const Component = activeContent?.component;
  const componentProps = activeContent?.props;

  console.log("activeTab:", activeTab);

  return (
    <div className={`w-full ${className ?? ""}`}>

      {/* Tab Buttons */}
      <div
        className="flex border-b border-gray-300 dark:border-zinc-700"
        role="tablist"
      >
        {items.map((tabItem) => {
          const { id } = tabItem;

          return (
            <Tab
              key={id}
              item={tabItem}
              active={activeTab === id}
              onClick={() => handleTabChange(id)}
            />
          );
        })}
      </div>

      {/* Content */}
      <TabPanel>
        {Component && <Component {...componentProps} />}
      </TabPanel>

    </div>
  );
};

export default Tabs;
