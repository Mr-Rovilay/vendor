import { createReducer } from "@reduxjs/toolkit";

const initialState = {
authenticateShop: false,
  loading: false,
  // user: null,
  error: null,
  successMessage: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadSellerRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.authenticateShop = true;
      state.loading = false;
      state.seller = action.payload;
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authenticateShop = false;
      state.seller = null;

    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    })
});
