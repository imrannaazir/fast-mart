import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TCartItem = {
  _id: string;
  price: number;
  quantity: number;
};

type TInitialState = {
  cartItems: TCartItem[];
};

const initialState: TInitialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add to cart
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({
          _id: action.payload._id,
          quantity: 1,
          price: action.payload.price,
        });
      }
    },

    // delete from cart
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const restCartItems = state.cartItems.filter(
        (cartProduct) => cartProduct._id !== action.payload
      );
      state.cartItems = restCartItems;
    },

    // increase quantity of a item
    increaseCartQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (existingItem) {
        existingItem.quantity++;
      }
    },

    // decrease quantity of a item
    decreaseCartQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
      }
    },

    // clear cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// selector
export const selectCartItems = (state: RootState) => state.cart.cartItems;
