import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  successMessage: null,
  addressLoading: false,
  usersLoading: false,
  users: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // User Authentication Cases
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("SignupRequest", (state) => {
      state.loading = true;
    })
    .addCase("SignupSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("SignupFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update User Info
    .addCase("UpdateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("UpdateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update User Address
    .addCase("UpdateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("UpdateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    })
    .addCase("UpdateUserAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Delete User Address
    .addCase("DeleteUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("DeleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    })
    .addCase("DeleteUserAddressFailed", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // Admin: Get All Users
    .addCase("GetAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("GetAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("GetAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })

    // General Messages
    .addCase("SetSuccessMessage", (state, action) => {
      state.successMessage = action.payload;
    })
    .addCase("SetErrorMessage", (state, action) => {
      state.error = action.payload;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })
    .addCase("ClearMessages", (state) => {
      state.successMessage = null;
    });
});
