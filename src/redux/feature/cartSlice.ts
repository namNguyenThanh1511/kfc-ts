import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../../model/food";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: Food[], action: PayloadAction<Food>) => {
      const index = state.findIndex((food) => food.id === action.payload.id);
      if (index == -1) {
        //chua ton tai
        state.push({ ...action.payload, quantity: 1 });
      } else {
        state[index].quantity++;
      }
    },
    reset: (state, action) => [],
    remove: () => [],
    changeQuantity: (state, action) => [],
  },
});

export const { addToCart, reset, remove, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
