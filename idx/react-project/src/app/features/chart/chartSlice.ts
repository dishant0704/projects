import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
  name: "chart",
  initialState: {},
  reducers: {
    // setChartData: (state, action) => {
    //   state.data = action.payload;
    // },
  },
});
  
export default chartSlice.reducer;