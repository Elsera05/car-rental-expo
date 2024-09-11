import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsDetails } from "./carApi";
import { isLoading } from "expo-font";

const carDetailsSlice = createSlice({
  name: "carDetails",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
    errorMessage: null,
  },
  reducers: {
    closeDetails: (state) => {
      state.data = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarsDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCarsDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCarsDetails.rejected, (state, action) => {
      state.isError = true;
      state.errorMessage = action.error
    });
  },
});

export const getCarDetails = fetchCarsDetails;
export const { closeDetails } = carDetailsSlice.actions;
export const selectCarDetails = state => state.carDetails //selector
export default carDetailsSlice.reducer