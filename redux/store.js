import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailsSlice from "./reducers/car/carDetailsSlice";
// pnpm @reduxjs/toolkit react-redux
export const store = configureStore({
reducer: {
    car: carSlice,
    carDetails : carDetailsSlice

},
enhancers:
    (getDefaultEnchancers)=>
        __DEV__ ? getDefaultEnchancers()
    .concat(reactotron.createEnhancer()) : getDefaultEnchancers()
})