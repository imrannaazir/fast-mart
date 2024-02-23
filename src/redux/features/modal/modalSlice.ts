import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isOpen: boolean;
};
const initialState: TInitialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { onClose, onOpen } = modalSlice.actions;
export const selectIsOpen = (state: RootState) => state.modal.isOpen;
