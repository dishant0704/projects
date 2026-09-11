import { useEffect, useMemo, useState } from "react";

import SubPageTemplate from "../page-templates/SubPageTemplate";
import Accordion from "../UiComponents/accordion/Accordion";

import type {
  AccordionItemData,
} from "../UiComponents/accordion/type";

import type { TabItem } from "../UiComponents/Tabs/types";

import { ComponentRegistry } from "../ComponentRegistry";
import Tabs from "../UiComponents/Tabs";
import { useAppSelector } from "../../app/hooks/reducHooks";

interface ReguralAccordionProps {
  data?: AccordionItemData[];
}

const ReguralAccordion = ({
  data = [],
}: ReguralAccordionProps) => {
  // const [tabs, setTabs] = useState<TabItem[]>([]);
  const [tabId, setTabId] = useState("accList");
  const {editObject, loading}=useAppSelector((state)=> state.accordion)

  const tabs = useMemo<TabItem[]>(() => {
  const safeData = Array.isArray(data) ? data : [];

  const tabsData = [
    {
      id: "accList",
      componentName: "accordion-list",
      label: "Accordion List",
      props: {},
    },
    {
      id: "accForm",
      componentName: "accordion-form",
      label: "Accordion Form",
      props: {
        setTabId,
      },
    },
  ];

  return tabsData.map((tab) => {
    const Component = ComponentRegistry[tab.componentName];

    return {
      id: tab.id,
      label: tab.label,

      component:
        Component ??
        (() => (
          <div>
            Component "{tab.componentName}" not found
          </div>
        )),

      props: {
        ...tab.props,
        data: safeData,
      },
    };
  });
}, [data]);

  const accordionItems = Array.isArray(data)
    ? data
    : [];

  // console.log("TabId", tabId)

  return (
    <section>
      Loading :{loading}
      <SubPageTemplate>
        <SubPageTemplate.Left>
          <Accordion
            items={accordionItems}
            defaultActiveTab={0}
          />
        </SubPageTemplate.Left>

        <SubPageTemplate.Right>
          <Tabs
            items={tabs}
            activeTabId={tabId}
            onTabChange={setTabId}
            defaultActiveTab={tabId}
          />
        </SubPageTemplate.Right>
      </SubPageTemplate>
    </section>
  );
};

export default ReguralAccordion;
