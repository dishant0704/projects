import { useEffect, useState } from 'react';
import SubPageTemplate from '../page-templates/SubPageTemplate'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type'
import type { TabItem } from '../UiComponents/Tabs/types';

import { ComponentRegistry } from '../ComponentRegistry';
import Tabs from '../UiComponents/Tabs';

// const componentRegistry: Record<string, React.ComponentType<any>> = {
//   "accordion": Accordion,
//   "accordion-form": AccordionForm,
// };

interface ReguralAccordionProps {
  data?: AccordionItemData[];
}
const ReguralAccordion = ({
  data = [],
}: ReguralAccordionProps) => {
    const [tabs, setTabs] = useState<TabItem[]>([]);

    const tabsData = [
    {
        "id": "accList",
        "componentName" : "accordion-list",
        "label": "Accordion List",
        "props": {            
        }
    },
    {
        "id": "accForm",
        "componentName" : "accordion-form",
        "label": "Accordion Form",
        "props": {            
        }
    }
]

 useEffect(() => {
    // if (!currpage) {
    //   return;
    // }

    // const tabs:TabItem = currpage.data as TabsProps["items"];
    const tabItems: TabItem[] = tabsData.map((tab) => {
      const { id, label, props, componentName } = tab;

      const Component = ComponentRegistry[componentName];

      return {
        id,
        label,

        component: Component ?? (() => <div>Component "{componentName}" not found</div>),

        props: {
          ...(props ?? {}),
          data: data ?? [],
        },
      };
    });

    setTabs(tabItems);
  }, []);
   
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <Accordion items={data} defaultActiveTab={0} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <Tabs items={tabs} defaultActiveTab="accForm" />
                    {/* <AccordionForm /> */}
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default ReguralAccordion
