import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // Add to cart
    .addCase("addToWishlist", (state, action) => {
      const newItemWishlist = action.payload;

      // Find index of the item in the cart
      const existingItemIndex = state.wishlist.findIndex((item) => item._id === newItemWishlist._id);

      if (existingItemIndex !== -1) {
        // Replace existing item with new item
        state.wishlist[existingItemIndex] = newItemWishlist;
      } else {
        // Add new item to the cart
        state.wishlist.push(newItemWishlist);
      }

      // Save updated cart to localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })

    // Remove from cart
    .addCase("removeFromWishlist", (state, action) => {
      // Filter out the item to be removed
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);

      // Save updated cart to localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    });
});