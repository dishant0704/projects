
export interface TabItem{
    id: string,
    label:string,
    component: React.ComponentType<any>;
    props?: Record<string, unknown>;
    disabled?:boolean
}

export interface TabsProps{
    items:TabItem[],
    defaultActiveTab?: string;
    className?:string
}