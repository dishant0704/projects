import { configureStore } from "@reduxjs/toolkit";

import pageReducer from "../features/pageSlice";

export const store = configureStore({
  reducer: {
    pages: pageReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  console.log("Store state changed:", state);
  if (
    !state.pages.loading &&
    state.pages.pages.length > 0
  ) {
  
    localStorage.setItem(
      "idx-component-demo",
      JSON.stringify(state.pages.pages)
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;