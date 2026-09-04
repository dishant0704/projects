import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { getPages } from "../../services/pageService";
import type { Page, PageState } from "../../types/pageTypes";
import type { AccordionItemData } from "../../components/UiComponents/accordion/type";
import type { RootState } from "../store/store";

const STORAGE_KEY = "idx-component-demo";

const initialState: PageState = {
  pages: [],
  loading: false,
  error: null,
};

export const addAccordionItemAndSave = createAsyncThunk<
  void,
  {
    pageName: string;
    tabId: string;
    item: AccordionItemData;
  },
  { state: RootState }
>(
  "pages/addAccordionItemAndSave",
  async ({ pageName, tabId, item }, { dispatch, getState }) => {
    // Update Redux
    dispatch(
      addAccordionItem({
        pageName,
        tabId,
        item,
      }),
    );

    // Get updated Redux state
    const state = getState();

    const pages = state.pages.pages;

    // Save updated pages
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  },
);

export const loadPages = createAsyncThunk<
  Page[],
  void,
  { rejectValue: string }
>("pages/loadPages", async (_, { rejectWithValue }) => {
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    console.log("localData:", localData);
    // 1. Use localStorage if available
    if (localData) {
      const parsedData: Page[] = JSON.parse(localData);

      console.log("Loaded from localStorage:", parsedData);

      return parsedData;
    }

    // 2. Otherwise load default JSON
    const data = await getPages();
    console.log("Loaded from JSON:", data.pages);

    // 3. Save default data to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.pages));

    return data.pages;
  } catch (error) {
    console.error(error);

    return rejectWithValue("Failed to load page data");
  }
});

const pageSlice = createSlice({
  name: "pages",
  initialState,

  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },

    addAccordionItem: (
      state,
      action: PayloadAction<{
        pageName: string;
        tabId: string;
        item: AccordionItemData;
      }>,
    ) => {
      const { pageName, tabId, item } = action.payload;

      const page = state.pages.find((page) => page.name === pageName);

      if (!page) {
        return;
      }

      const tab = page.data.find((tab) => tab.id === tabId);

      if (!tab) {
        return;
      }

      if (!tab.data) {
        tab.data = [];
      }

      tab.data.push(item);
    },
    reorderAccordionItems: (
      state,
      action: PayloadAction<{
        pageName: string;
        tabId: string;
        items: AccordionItemData[];
      }>,
    ) => {
      const { pageName, tabId, items } = action.payload;

      const page = state.pages.find((page) => page.name === pageName);

      if (!page) {
        return;
      }

      const tab = page.data.find((tab) => tab.id === tabId);

      if (!tab) {
        return;
      }

      tab.data = items.map((item, index) => ({
        ...item,
        index,
      }));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })

      .addCase(loadPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { setPages, addAccordionItem, reorderAccordionItems } = pageSlice.actions;

export default pageSlice.reducer;
