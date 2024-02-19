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
  },
});

export default authSlice.reducer;
export const { logIn } = authSlice.actions;
