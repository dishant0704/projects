import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  AccordionData,
  AccordionItemData,
  EditState
} from "../../../components/UiComponents/accordion/type";

const STORAGE_KEY = "idx-component-demo:accordion";

interface AccordionState {
  page: AccordionData | null;
  loading: boolean;
  error: string | null;
  editObject: EditState
}

const initialState: AccordionState = {
  page: null,
  loading: false,
  error: null,
  editObject: { flag: false, inx: null }
};

/**
 * Load accordion page configuration.
 *
 * Priority:
 * 1. localStorage
 * 2. /public/data/accordion.json
 *
 * When JSON is loaded from the server it is also saved
 * into localStorage.
 */
export const loadAccordionPage = createAsyncThunk<
  AccordionData,
  void,
  { rejectValue: string }
>("accordion/loadAccordionPage", async (_, thunkAPI) => {
  try {
    // --------------------------------------------------
    // 1. Try localStorage first
    // --------------------------------------------------
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      try {
        const pageData = JSON.parse(storedData) as AccordionData;

        if (
          pageData &&
          typeof pageData === "object" &&
          Array.isArray(pageData.items)
        ) {
          return pageData;
        }

        // Invalid/old structure
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // --------------------------------------------------
    // 2. Load default JSON
    // --------------------------------------------------
    const response = await fetch("/data/accordion.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load accordion configuration: ${response.status}`
      );
    }

    const pageData = (await response.json()) as AccordionData;

    if (
      !pageData ||
      typeof pageData !== "object" ||
      !Array.isArray(pageData.items)
    ) {
      throw new Error("Invalid accordion configuration.");
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
        : "Unable to load accordion configuration."
    );
  }
});

const accordionSlice = createSlice({
  name: "accordion",

  initialState,

  reducers: {
    // --------------------------------------------------
    //  Replace the complete accordion page.
    // --------------------------------------------------
    setAccordionPage: (
      state,
      action: PayloadAction<AccordionData>
    ) => {
      state.page = action.payload;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(action.payload)
      );
    },

    // --------------------------------------------------
    //  Add a new accordion item to Regular Accordion.
    // --------------------------------------------------
    addAccordionItem: (
      state,
      action: PayloadAction<AccordionItemData>
    ) => {
      if (!state.page) {
        return;
      }

      const regularAccordion = state.page.items.find(
        (item) => item.id === "regAcc"
      );

      if (!regularAccordion) {
        return;
      }

      if (!Array.isArray(regularAccordion.items)) {
        regularAccordion.items = [];
      }

      regularAccordion.items.push(action.payload);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.page)
      );
    },

    // --------------------------------------------------
    //  Delete an accordion item from Regular Accordion.
    // --------------------------------------------------
    deleteAccordionItem: (
      state,
      action: PayloadAction<number>
    ) => {
      if (!state.page) {
        return;
      }

      const regularAccordion = state.page.items.find(
        (item) => item.id === "regAcc"
      );

      if (!regularAccordion || !Array.isArray(regularAccordion.items)) {
        return;
      }

      regularAccordion.items = regularAccordion.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.page)
      );
    },

    // --------------------------------------------------
    //  Replace the order of Regular Accordion items.
    // --------------------------------------------------
    reorderAccordionItems: (
      state,
      action: PayloadAction<AccordionItemData[]>
    ) => {
      if (!state.page) {
        return;
      }

      const regularAccordion = state.page.items.find(
        (item) => item.id === "regAcc"
      );

      if (!regularAccordion) {
        return;
      }

      regularAccordion.items = action.payload;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.page)
      );
    },

    // --------------------------------------------------
    //  Store the edite object.
    // --------------------------------------------------
    setEditObject: (
      state,
      action: PayloadAction<EditState>
    ) => {
      state.editObject = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadAccordionPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loadAccordionPage.fulfilled,
        (state, action: PayloadAction<AccordionData>) => {
          state.loading = false;
          state.page = action.payload;
          state.error = null;
        }
      )

      .addCase(loadAccordionPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Unable to load accordion configuration.";
      });
  },
});

// =====================================================
// Exports
// =====================================================

export const {
  setAccordionPage,
  addAccordionItem,
  deleteAccordionItem,
  reorderAccordionItems,
  setEditObject,
} = accordionSlice.actions;

export default accordionSlice.reducer;
