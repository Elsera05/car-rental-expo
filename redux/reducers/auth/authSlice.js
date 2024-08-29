import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./authApi";

const authSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    errorMessage: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Login failed";
      });
  },
});

export const selectLogin = (state) => state.login;
export default authSlice.reducer;
