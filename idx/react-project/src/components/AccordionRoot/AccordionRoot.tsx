import { Link } from "react-router";

import Tabs from "../UiComponents/Tabs";

import ReguralAccordion from "./ReguralAccordion";
import DynamicAccordion from "./DynamicAccordion";
import { useAppSelector } from "../../app/hooks/reducHooks";
import { useEffect, useState } from "react";
import type { TabItem } from "../UiComponents/Tabs/types";

const componentRegistry: Record<string, React.ComponentType<any>> = {
  regAcc: ReguralAccordion,
  dynAcc: DynamicAccordion,
};

const AccordionRoot = () => {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const { pages, loading } = useAppSelector((state) => state.pages);

  const currpage = pages.find((page) => page.name === "accordion");

  useEffect(() => {
    if (!currpage) {
      return;
    }

    // const tabs:TabItem = currpage.data as TabsProps["items"];
    const tabItems: TabItem[] = currpage.data.map((tab) => {
      const { id, label, props, data } = tab;

      const Component = componentRegistry[id];

      return {
        id,
        label,

        component: Component ?? (() => <div>Component "{id}" not found</div>),

        props: {
          ...(props ?? {}),
          data: data ?? [],
        },
      };
    });

    setTabs(tabItems);
  }, [currpage]);

  console.log("currpage:", currpage);
  console.log("tabs:", tabs);

  return (
    <section className={`${loading ? "disableContainer" : "p-5"}`}>
      <h1>Accordion: </h1>
      <Link to={`/`} className="text-[14px] text-primary-6-light-6">
        Back to Dashboard
      </Link>
      <div className="w-full">
        <Tabs items={tabs} defaultActiveTab="regAcc" />
      </div>
    </section>
  );
};

export default AccordionRoot;
