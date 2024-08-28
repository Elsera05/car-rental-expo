import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchCars = createAsyncThunk (
    "fetchCars",
    async (signal) => {
        const res = await fetch (`https://api-car-rental.binaracademy.org/customer/car`,{signal:signal});
        return res?.json();
    });

export const fetchCarsDetails = createAsyncThunk(
    "fetchCarsDetails",
    async ({id,signal}) => {
        const res = await fetch(`https://api-car-rental.binaracademy.org/customer/car/`+ id,{signal});
        return res?.json();
    }
)    
