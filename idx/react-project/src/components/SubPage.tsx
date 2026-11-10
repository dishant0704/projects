import { useMemo, useState } from "react";
import { useAppSelector } from "../app/hooks/reducHooks";
import { ComponentRegistry, IconRegistry } from "./ComponentRegistry";
import type { ChartListData, subPageItemData } from "../types/chart";
import type { TabItem } from "./UiComponents/Tabs/types";
import SubPageTemplate from "./page-templates/SubPageTemplate";
import Tabs from "./UiComponents/Tabs";

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

const SubPage = ({ data = [], pageId }: SubPageProps) => {
    const [tabId, setTabId] = useState("chartList");

    const tabs = useMemo<TabItem[]>(() => {
        const safeData = Array.isArray(data) ? data : [];
        const tabsData: TabConfig[] = [
            {
                id: "chartList",
                componentName: "chart-list",
                icon: "list",
                label: "List",
                props: { setTabId },
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

    console.log("pageId:", pageId);

    const { page } = useAppSelector((state) => state.chart);
    const chartsData: ChartListData[] = page?.items?.find((item) => item.id === pageId)?.items ?? [];
    console.log("chartsData:", chartsData);
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <h1 className="py-4 border-b border-gray-300 dark:border-zinc-700">Client</h1>
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

export default SubPage