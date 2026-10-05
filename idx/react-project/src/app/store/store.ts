import { configureStore } from "@reduxjs/toolkit";

import accordionReducer from "../features/accordion/accordionSlice";
import chartReducer from "../features/chart/chartSlice";
import bannersReducer from "../features/banners/bannersSlice";
import imagesReducer from "../features/images/imagesSlice";

export const store = configureStore({
  reducer: {
    accordion: accordionReducer,
    images: imagesReducer,
    chart: chartReducer,
    banners: bannersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;