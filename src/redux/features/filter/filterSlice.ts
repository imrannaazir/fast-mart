import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TFilter = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type TInitialState = {
  status: TFilter[];
};

const initialState: TInitialState = {
  status: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
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
  },
});

export default filterSlice.reducer;
export const { addStatus, removeStatus, clearStatus } = filterSlice.actions;

// selector
export const selectFilteredStatus = (state: RootState) => state.filter.status;
