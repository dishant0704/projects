import { useEffect, useState } from 'react';
import SubPageTemplate from '../page-templates/SubPageTemplate'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type'
import AccordionForm from './AccordionForm';
import type { TabItem } from '../UiComponents/Tabs/types';
import Tabs from '../UiComponents/Tabs';

const componentRegistry: Record<string, React.ComponentType<any>> = {
  accList: Accordion,
  accForm: AccordionForm,
};

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
        "label": "Regural Accordion",
        "props": {
            "data": []
        }
    },
    {
        "id": "accForm",
        "label": "Dynamic Accordion",
        "props": {
            "data": []
        }
    }
]

 useEffect(() => {
    // if (!currpage) {
    //   return;
    // }

    // const tabs:TabItem = currpage.data as TabsProps["items"];
    const tabItems: TabItem[] = tabsData.map((tab) => {
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
  }, []);
   
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <Accordion items={data} defaultActiveTab={0} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    {/* <Tabs items={tabs} defaultActiveTab="regAcc" /> */}
                    <AccordionForm />
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default ReguralAccordion
