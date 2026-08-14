import type { PageTabItem } from "../components/UiComponents/Tabs/types";

export interface Page {
  name: string;
  advSettings: Record<string, unknown>;
  data: PageTabItem[];
}

export interface PageState {
  pages: Page[];
  loading: boolean;
  error: string | null;
}