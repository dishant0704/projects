import { useMemo, useState } from "react";

import SubPageTemplate from "../page-templates/SubPageTemplate";
import Accordion from "../UiComponents/accordion/Accordion";

import type { AccordionItemData } from "../UiComponents/accordion/type";

import type { TabItem } from "../UiComponents/Tabs/types";

import { ComponentRegistry, IconRegistry } from "../ComponentRegistry";
import Tabs from "../UiComponents/Tabs";

interface ReguralAccordionProps {
  data?: AccordionItemData[];
}

interface TabConfig {
  id: string;
  componentName: string;
  icon?: string;
  iconWithText?: boolean;
  label: string;
  props?: Record<string, unknown>;
}

const ReguralAccordion = ({ data = [] }: ReguralAccordionProps) => {
  // const [tabs, setTabs] = useState<TabItem[]>([]);
  const [tabId, setTabId] = useState("accList");

  const tabs = useMemo<TabItem[]>(() => {
    const safeData = Array.isArray(data) ? data : [];

    const tabsData:TabConfig[] = [
      {
        id: "accList",
        componentName: "accordion-list",
        icon: "list",
        label: "List",
        props: { setTabId },
      },
      {
        id: "accForm",
        componentName: "accordion-form",
        icon: "form",
        label: "Add Data",
        props: {
          setTabId,
        },
      },
    ];

    return tabsData.map((tab) => {
      const { componentName, icon, id, label, iconWithText, props } = tab;
      const registryItem = ComponentRegistry[componentName];
      if (!registryItem) {
        return <div>Component not found: {componentName}</div>;
      }
      const defaultProps = registryItem.props;

      const Component = registryItem.component;     
      
       const Icon = icon
      ? IconRegistry[icon]
      : undefined;
      
      const tabData = {
        id: id,
        label: label,
        icon: Icon,
        iconWithText: iconWithText,
        component:
          Component ?? (() => <div>Component "{componentName}" not found</div>),

        props: {
          ...defaultProps,
          ...props,
          data: safeData,
        },
      };

      return tabData
    });
  }, [data]);

  const accordionItems = Array.isArray(data) ? data : [];

  // console.log("TabId", tabId)

  return (
    <section>
      <SubPageTemplate>
        <SubPageTemplate.Left>
          <h1 className="py-4 border-b border-gray-300 dark:border-zinc-700">Client</h1>
          <Accordion items={accordionItems} defaultActiveTab={0} />
        </SubPageTemplate.Left>

        <SubPageTemplate.Right>
          <h1 className="py-4 border-b border-gray-300 dark:border-zinc-700">Admin</h1>
          <Tabs
            items={tabs}
            activeTabId={tabId}
            onTabChange={setTabId}
            defaultActiveTab={tabId}
            align="right"
          />
        </SubPageTemplate.Right>
      </SubPageTemplate>
    </section>
  );
};

export default ReguralAccordion;
