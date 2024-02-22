import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  accessToken: string;
  user: {
    email: string;
    role: string;
    exp: number;
    iat: number;
  } | null;
};

const initialState: TInitialState = {
  accessToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    logOut: (state) => {
      state.accessToken = "";
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;
