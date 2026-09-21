import { useMemo, useState } from 'react'
import SubPageTemplate from '../page-templates/SubPageTemplate'
import AccordionWithComp from '../UiComponents/accordion/AccordionWithComp'
import type { AccordionDynamicItemData, AccordionItemData} from '../UiComponents/accordion/type'

import Tabs from '../UiComponents/Tabs'
import type { TabItem } from '../UiComponents/Tabs/types'
import { ComponentRegistry, IconRegistry } from '../ComponentRegistry'
import { useAppSelector } from '../../app/hooks/reducHooks'

interface DynamicAccordionProps{
    data?:AccordionItemData[]
}

interface TabConfig{
    id: string;
  componentName: string;
  icon?: string;
  iconWithText?: boolean;
  label: string;
  props?: Record<string, unknown>;
}

const DynamicAccordion = ({data = []}:DynamicAccordionProps) => {    
    const [tabId, setTabId] = useState("accList");

    const tabs = useMemo<TabItem[]>(() => {
        const safeData = Array.isArray(data)? data : [];
        const tabsData:TabConfig[] = [
            {
        id: "accList",
        componentName: "accordion-dynamic-list",
        icon: "list",
        label: "List",
        props: { setTabId },
      },
      {
        id: "accForm",
        componentName: "accordion-dynamic-form",
        icon: "form",
        label: "Add Data",
        props: {
          setTabId,
        },
      },
        ]

        return tabsData.map((tab) => {
            const{componentName, icon, id, label, iconWithText, props}=tab
            const registryItem = ComponentRegistry[componentName];
            if (!registryItem) {
              return <div>Component not found: {componentName}</div>;
            }
            const defaultProps = registryItem.props;

            const Component = registryItem.component;
            const Icon = icon ? IconRegistry[icon] : undefined;
            const tabData = {
                id: id,
                label: label,
                icon: Icon,
                iconWithText: iconWithText,
                component:
                    Component ??
                    (() => <div>Component "{componentName}" not found</div>),
                props: {
                    ...defaultProps,
                    ...props,
                    data: safeData,
                },
            }
            return tabData
        })

    },[data])

    const {page} = useAppSelector((state) => state.accordion);   
        const accordionDynamicData: AccordionDynamicItemData[] =  page?.items?.find((item) => item.id === "dynAcc")?.items ?? [];    
   
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                     <h1 className="py-4 border-b border-gray-300 dark:border-zinc-700">Client</h1>
                    <AccordionWithComp items={accordionDynamicData} />
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
    )
}

export default DynamicAccordion
