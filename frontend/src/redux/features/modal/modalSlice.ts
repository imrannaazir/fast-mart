import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isOpen: boolean;
  collectionName?: string;
};
const initialState: TInitialState = {
  isOpen: false,
  collectionName: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
      state.collectionName = action.payload;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.collectionName = "";
    },
  },
});

export default modalSlice.reducer;
export const { onClose, onOpen } = modalSlice.actions;
export const selectIsOpen = (state: RootState) => state.modal.isOpen;
export const selectCollectionName = (state: RootState) =>
  state.modal.collectionName;
