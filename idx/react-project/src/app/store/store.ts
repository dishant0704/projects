import { configureStore } from "@reduxjs/toolkit";

import accordionReducer from "../features/accordion/accordionSlice";
import chartReducer from "../features/chart/chartSlice";
import bannersReducer from "../features/banners/bannersSlice";

export const store = configureStore({
  reducer: {
    accordion: accordionReducer,
    chart: chartReducer,
    banners: bannersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;