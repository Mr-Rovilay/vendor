import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    // Add to cart
    .addCase("addToCart", (state, action) => {
      const newItem = action.payload;

      // Find index of the item in the cart
      const existingItemIndex = state.cart.findIndex((item) => item._id === newItem._id);

      if (existingItemIndex !== -1) {
        // Replace existing item with new item
        state.cart[existingItemIndex] = newItem;
      } else {
        // Add new item to the cart
        state.cart.push(newItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })

    // Remove from cart
    .addCase("removeFromCart", (state, action) => {
      // Filter out the item to be removed
      state.cart = state.cart.filter((item) => item._id !== action.payload);

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});
