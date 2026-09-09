import { useEffect, useState } from "react";

import SubPageTemplate from "../page-templates/SubPageTemplate";
import Accordion from "../UiComponents/accordion/Accordion";

import type {
  AccordionItemData,
} from "../UiComponents/accordion/type";

import type { TabItem } from "../UiComponents/Tabs/types";

import { ComponentRegistry } from "../ComponentRegistry";
import Tabs from "../UiComponents/Tabs";

interface ReguralAccordionProps {
  data?: AccordionItemData[];
}

const ReguralAccordion = ({
  data = [],
}: ReguralAccordionProps) => {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [tabId, setTabId] = useState("accList");
  const [edit, setEdit] = useState({ flag: false, inx: null })

  const tabsData = [
    {
      id: "accList",
      componentName: "accordion-list",
      label: "Accordion List",
      props: { setEdit },
    },
    {
      id: "accForm",
      componentName: "accordion-form",
      label: "Accordion Form",
      props: { setTabId },
    },
  ];
  useEffect(() => {
    if (edit.flag) {
      setTabId("accForm")
    }

  }, [edit.flag])

  useEffect(() => {
    const safeData = Array.isArray(data) ? data : [];

    const tabItems: TabItem[] = tabsData.map((tab) => {
      const {
        id,
        label,
        props,
        componentName,
      } = tab;

      const Component =
        ComponentRegistry[componentName];

      return {
        id,
        label,

        component:
          Component ??
          (() => (
            <div>
              Component "{componentName}" not found
            </div>
          )),

        props: {
          ...(props ?? {}),
          data: safeData,
        },
      };
    });

    setTabs(tabItems);
  }, [data]);

  const accordionItems = Array.isArray(data)
    ? data
    : [];

  console.log("TabId", tabId)

  return (
    <section>
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
