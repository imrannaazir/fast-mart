import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TFilter = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type TInitialState = {
  status: TFilter[];
  brands: TFilter[];
  searchTerm: string;
};

const initialState: TInitialState = {
  status: [],
  brands: [],
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // add status
    addStatus: (state, action) => {
      state.status.push(action.payload);
    },

    // remove status
    removeStatus: (state, action) => {
      const filteredStatus = state.status.filter(
        (status) => status.value !== action.payload.value
      );
      state.status = filteredStatus;
    },

    // clear status
    clearStatus: (state) => {
      state.status = [];
    },

    // add brands
    addBrand: (state, action) => {
      state.brands.push(action.payload);
    },

    // remove status
    removeBrand: (state, action) => {
      const filteredBrands = state.brands.filter(
        (status) => status.value !== action.payload.value
      );
      state.brands = filteredBrands;
    },

    // clear status
    clearBrand: (state) => {
      state.brands = [];
    },
  },
});

export default filterSlice.reducer;
export const {
  updateSearchTerm,
  addStatus,
  removeStatus,
  clearStatus,
  addBrand,
  removeBrand,
  clearBrand,
} = filterSlice.actions;

// selector
export const selectFilteredStatus = (state: RootState) => state.filter.status;
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;
export const selectFilteredBrands = (state: RootState) => state.filter.brands;
