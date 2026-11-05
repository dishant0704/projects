import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChartData, EditState } from "../../../components/UiComponents/accordion/type";

const STORAGE_KEY = "idx-component-demo:chart-data";

interface ChartState {
  page: ChartData | null;
  loading: boolean;
  error: string | null;
  editObject: EditState
}

const initialState: ChartState = {
  page: null,
  loading: false,
  error: null,
  editObject: { flag: false, inx: null }
};

/**
 * Load chart page configuration.
 *
 * Priority:
 * 1. localStorage
 * 2. /public/data/chart.json
 *
 * When JSON is loaded from the server it is also saved
 * into localStorage.
 */

// export const loadChartPage = createAsyncThunk<
//   ChartState,
//   void,
//   { rejectValue: string }
// >("chart/loadChartPage", async (_, thunkAPI) => {
//   try {
//     // --------------------------------------------------
//     // 1. Try localStorage first
//     // --------------------------------------------------
//     const storedData = localStorage.getItem(STORAGE_KEY);

//     if (storedData) {
//       try {
//         const pageData = JSON.parse(storedData) as ChartState;

//         if (
//           pageData &&
//           typeof pageData === "object" &&
//           Array.isArray(pageData.items)
//         ) {
//           return pageData;
//         }

//       } catch (error) {
//         // Invalid/old structure
//         localStorage.removeItem(STORAGE_KEY);
//       }
//   } catch (error) {
    
//   }
// });

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
    // setChartData: (state, action) => {
    //   state.data = action.payload;
    // },
  },
});
  
export default chartSlice.reducer;