import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://api-car-rental.binaracademy.org/customer/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      return res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarsDetails = createAsyncThunk(
  "register/fetchCarsDetails",
  async ({ id, signal }, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://api-car-rental.binaracademy.org/customer/auth/register`, {
        method: 'POST',
        signal,
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      return res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
