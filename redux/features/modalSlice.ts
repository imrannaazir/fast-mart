import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
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

export const { onOpen, onClose } = modalSlice.actions;
export default modalSlice.reducer;
