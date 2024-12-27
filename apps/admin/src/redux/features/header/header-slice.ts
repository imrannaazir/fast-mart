import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  isDirty: boolean;
};
const initialState: TInitialState = {
  isDirty: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsDirty: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload;
    },
  },
});

const headerReducer = headerSlice.reducer;
export default headerReducer;
export const { setIsDirty } = headerSlice.actions;
export const selectHeader = (state: RootState) => state.header;
