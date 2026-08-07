export interface Page {
  name: string;
  advSettings: Record<string, unknown>;
  data: unknown[];
}

export interface PageState {
  pages: Page[];
  loading: boolean;
  error: string | null;
}