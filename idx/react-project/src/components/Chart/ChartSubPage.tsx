import { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks/reducHooks";
import { ComponentRegistry, IconRegistry } from "../ComponentRegistry";
import type { ChartListData, subPageItemData } from "../../types/chart";
import type { TabItem } from "../UiComponents/Tabs/types";
import SubPageTemplate from "../page-templates/SubPageTemplate";
import Tabs from "../UiComponents/Tabs";
import ChartWrapper from "./ChartWrapper";

interface SubPageProps {
    data?: subPageItemData[];
    pageId?: string;
}

interface TabConfig {
    id: string;
    componentName: string;
    icon?: string;
    iconWithText?: boolean;
    label: string;
    props?: Record<string, unknown>;
}

const ChartSubPage = ({ data = [], pageId }: SubPageProps) => {
    const [tabId, setTabId] = useState("chartList");
    const [index, setIndex] = useState<number>(0)

    const tabs = useMemo<TabItem[]>(() => {
        const safeData = Array.isArray(data) ? data : [];
        const tabsData: TabConfig[] = [
            {
                id: "chartList",
                componentName: "list-component",
                icon: "list",
                label: "List",
                props: { setIndex, setTabId },
            },
            {
                id: "chartForm",
                componentName: "chart-form",
                icon: "form",
                label: "Add Data",
                props: {
                    setTabId,
                },
            },
        ]

        return tabsData.map((tab) => {
            const { componentName, icon, id, label, iconWithText, props } = tab
            const registryItem = ComponentRegistry[componentName];

            const Component = registryItem?.component;

            const Icon = icon ? IconRegistry[icon] : undefined;

            return {
                id,
                label,
                icon: Icon,
                iconWithText,

                component: Component ?? (() => (
                    <div>Component "{componentName}" not found</div>
                )),

                props: {
                    ...(registryItem?.props ?? {}),
                    ...props,
                    data: safeData,
                },
            };
        })

    }, [data]);
    
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <h2 className="py-4 border-b border-gray-300 dark:border-zinc-700">Client</h2>
                    <ChartWrapper index={index} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <h2 className="py-4 border-b border-gray-300 dark:border-zinc-700">Admin</h2>
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

export default ChartSubPage