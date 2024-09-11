import { createAsyncThunk } from "@reduxjs/toolkit";   
export const postOrder = createAsyncThunk(
  "postOrder",
  async ({ token, formData }) => {
    try {
      const res = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: token,
          },
          body: JSON.stringify({
            start_rent_at: formData.startRentAt,
            finish_rent_at: formData.finishRentAt,
            car_id: formData.carId,
          }),
        }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.message);
      return body;
    } catch (e) {
      return e.message;
    }
  }
);
 
export const putOrderSlip = createAsyncThunk(
  "putOrderSlip",
  async ({ token, id, formData }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order/" + id + "/slip",
        {
          method: "PUT", //update data di backend pasti pakai PUT 
          headers: { 
            "Content-Type": "multipart/form-data",
            "access_token": token, //access token yang buat di backend
          },
          body: formData,
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);
      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

