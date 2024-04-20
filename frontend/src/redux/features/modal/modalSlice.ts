import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type TInitialState = {
  title: string;
  description?: string;
  isOpen: boolean;
  children?: React.ReactNode;
};
const initialState: TInitialState = {
  isOpen: false,
  title: "",
  description: "",
  children: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        children: ReactNode;
      }>
    ) => {
      const { children, description, title } = action.payload;
      state.isOpen = true;
      state.title = title;
      state.description = description;
      state.children = children;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.title = "";
      state.description = "";
      state.children = null;
    },
  },
});

export default modalSlice.reducer;
export const { onClose, onOpen } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
