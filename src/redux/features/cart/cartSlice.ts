import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TCartItem = {
  _id: string;
  price: number;
  quantity: number;
};

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({
          _id: action.payload._id,
          quantity: 1,
          price: action.payload.price,
        });
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((cartProduct) => cartProduct._id !== action.payload);
    },
    increaseCartQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((item) => item._id === action.payload);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decreaseCartQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((item) => item._id === action.payload);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// selector
export const selectCartItems = (state: RootState) => state.cart;
