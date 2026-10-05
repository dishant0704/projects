import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { ImageData } from "../../../types/types";

interface ImagesState {
  data: ImageData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  data: null,
  loading: false,
  error: null,
};

const STORAGE_KEY = "idx-component-demo:images";

/**
 * Load images page configuration.
 *
 * Priority:
 * 1. localStorage
 * 2. /public/data/images.json
 *
 * When JSON is loaded from the server it is also saved
 * into localStorage.
 */

export const loadImagesPage = createAsyncThunk<
  ImageData[],
  void,
  { rejectValue: string }
>("images/loadPage", async (_, thunkAPI) => {
  // Implementation for loading images page
  try {
    // --------------------------------------------------
    // 1. Try localStorage first
    // --------------------------------------------------

    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        if (Array.isArray(parsedData)) {
          return parsedData as ImageData[];
        }

        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Error parsing stored images:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // --------------------------------------------------
    // 2. Load default JSON
    // --------------------------------------------------

    const response = await fetch("/data/imageData.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load Images configuration: ${response.status}`
      );
    }

    const imageDefaultData = await response.json();

    if (!Array.isArray(imageDefaultData)) {
      throw new Error("Invalid Images configuration.");
    }

    // --------------------------------------------------
    // 3. Normalize image data
    // --------------------------------------------------

    const imageData: ImageData[] = imageDefaultData.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
      flag: false,
    }));

    // --------------------------------------------------
    // 4. Save normalized data to localStorage
    // --------------------------------------------------

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(imageData)
    );

    return imageData;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error
        ? error.message
        : "Unable to load Images configuration."
    );
  }
});

const imagesSlice = createSlice({
  name: "images",

  initialState,

  reducers: {

    // --------------------------------------------------
    //  Replace the complete images page.
    // --------------------------------------------------
    
    setImagesPage: (
      state,
      action: PayloadAction<ImageData[]>
    ) => {
      state.data = action.payload;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(action.payload)
      );
    },

    setImageFlag: (
      state,
      action: PayloadAction<string>
    ) => {
      if (!state.data) return;

      state.data = state.data.map((item) =>
        item.id === action.payload
          ? { ...item, flag: !item.flag }
          : item
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.data)
      );
    },

    clearImageFlags: (state) => {
      if (!state.data) return;

      state.data = state.data.map((item) => ({
        ...item,
        flag: false,
      }));

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.data)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadImagesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadImagesPage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(loadImagesPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Unable to load Images configuration.";
      });
  },
});

export const {
  setImagesPage,
  setImageFlag,
  clearImageFlags,
} = imagesSlice.actions;

export default imagesSlice.reducer;

