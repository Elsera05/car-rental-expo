import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailsSlice from "./reducers/car/carDetailsSlice";
import loginSlice from "./reducers/auth/loginSlice";
// pnpm @reduxjs/toolkit react-redux
export const store = configureStore({
reducer: {
    car: carSlice,
    carDetails : carDetailsSlice,
    user : loginSlice,

},
enhancers:
    (getDefaultEnchancers)=>
        __DEV__ ? getDefaultEnchancers()
    .concat(reactotron.createEnhancer()) : getDefaultEnchancers()
})