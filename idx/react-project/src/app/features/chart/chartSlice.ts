
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {EditState } from "../../../types/types";
import type {ChartData, ChartListData } from "../../../types/chart";

const STORAGE_KEY = "idx-component-demo:chart-data";

interface ChartState {
  page: ChartData | null;
  loading: boolean;
  error: string | null;
  editObject: EditState;
}

const initialState: ChartState = {
  page: null,
  loading: false,
  error: null,
  editObject: { flag: false, inx: null },
};

/**
 * Load chart page configuration.
 *
 * Priority:
 * 1. localStorage
 * 2. /data/chart.json
 *
 * Server data is also saved into localStorage.
 */
export const loadChartPage = createAsyncThunk<
  ChartData,
  void,
  { rejectValue: string }
>(
  "chart/loadChartPage",
  async (_, thunkAPI) => {
    try {

      // --------------------------------------------------
      // 1. Try localStorage first
      // --------------------------------------------------
      const storedData = localStorage.getItem(STORAGE_KEY);

      if (storedData) {
        try {
          const pageData = JSON.parse(storedData) as ChartData;

          if (
            pageData &&
            typeof pageData === "object" &&
            Array.isArray(pageData.items)
          ) {
            return pageData;
          }

          // Invalid or old structure
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // --------------------------------------------------
      // 2. Load default JSON
      // --------------------------------------------------
      const response = await fetch("/data/chart.json");

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          `Failed to load chart data: ${response.status}`
        );
      }

      const pageData: ChartData = await response.json();

      if (
        !pageData ||
        typeof pageData !== "object" ||
        !Array.isArray(pageData.items)
      ) {
        return thunkAPI.rejectWithValue(
          "Invalid chart data structure"
        );
      }

      // --------------------------------------------------
      // 3. Save default data to localStorage
      // --------------------------------------------------
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));

      return pageData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unable to load chart data"
      );
    }
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {

    // --------------------------------------------------
    //  Replace the complete chart page.
    // --------------------------------------------------
    setChartPage: (
      state,
      action: PayloadAction<ChartData>
    ) => {
      state.page = action.payload;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(action.payload)
      );
    },

    // --------------------------------------------------
    //  Add a new chart.
    // --------------------------------------------------
    addChart: (
      state,
      action: PayloadAction<ChartListData>
    ) => {
      if (!state.page) {
        return;
      }

      const chartPage = state.page.items.find(
        (item) => item.id === "chart-page"
      );

      if (!chartPage) {
        return;
      }

      if (!Array.isArray(chartPage.items)) {
        chartPage.items = [];
      }

      chartPage.items.push(action.payload);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.page)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadChartPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadChartPage.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload;
        state.error = null;
      })
      .addCase(loadChartPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      });
  },
});

export default chartSlice.reducer;
