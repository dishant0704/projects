import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { getPages } from "../../services/pageService";
import type { Page, PageState } from "../../types/pageTypes";

const STORAGE_KEY = "idx-component-demo";

const initialState: PageState = {
  pages: [],
  loading: false,
  error: null,
};

export const loadPages = createAsyncThunk<
  Page[],
  void,
  { rejectValue: string }
>(
  "pages/loadPages",
  async (_, { rejectWithValue }) => {
    try {
      const localData = localStorage.getItem(STORAGE_KEY);
      console.log(
        "localData:",
        localData
      );
      // 1. Use localStorage if available
      if (localData) {
        const parsedData: Page[] = JSON.parse(localData);

        console.log(
          "Loaded from localStorage:",
          parsedData
        );

        return parsedData;
      }

      // 2. Otherwise load default JSON
      const data = await getPages();
      console.log(
        "Loaded from JSON:",
        data.pages
      );

      return data.pages;
    } catch (error) {
      console.error(error);

      return rejectWithValue(
        "Failed to load page data"
      );
    }
  }
);

const pageSlice = createSlice({
  name: "pages",

  initialState,

  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
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
        state.error =
          action.payload ?? "Something went wrong";
      });
  },
});

export const { setPages } = pageSlice.actions;

export default pageSlice.reducer;