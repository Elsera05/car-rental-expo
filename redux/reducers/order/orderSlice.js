import { createSlice } from "@reduxjs/toolkit";
import {postOrder, putOrderSlip} from "./orderApi";

 
// import * as SecureStore from "expo-secure-store";
 
const initialState = {
  isLoading: false,
  carId: null,
  data: {},
  // paymentCountdown: null,
    // verificationCountdown: null,
  paymentMethod: null,
  promo: null,
  currentStep: null,
  selectedBank: null,
  errorMessage: false,
  activeStep : 0 ,
  status:"pending",
  isModalVisible : false,
  
  

};
 
 
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      state = initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success"
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = action.payload
      state.status = "error"
      // state.isModalVisible = true;
    });
    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status= "upload-success"
      // state.isModalVisible = true;
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      // state.isError = true;
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });
  },
});
 
export { postOrder,putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;

 