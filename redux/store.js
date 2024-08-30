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

















// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import carSlice from "./reducers/car/carSlice";
// import carDetailsSlice from "./reducers/car/carDetailsSlice";
// import loginSlice from "./reducers/auth/loginSlice";
// import createSecureStore from "redux-persist-expo-securestore";
// import { persistReducer, persistStore } from "redux-persist";
// import reactotron from "../ReactotronConfig";
// import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
// // import userSlice from "./reducers/auth/userSlice"; 

// const storage = createSecureStore();

// // const persistConfig = {
// //     key: 'root',
// //     storage,
// //     whitelist: ['user'],
// //     stateReconciler : autoMergeLevel1,
// //     debug: true,
// // };

// // const reducer = combineReducers({
// //     car: carSlice,
// //     carDetails: carDetailsSlice,
// //     user: persistReducer(persistConfig, loginSlice),
// // });

// // export const store = configureStore({
// //     reducer,
// //     middleware: (getDefaultMiddleware) =>
// //         getDefaultMiddleware({
// //             serializableCheck: false,
// //         }),
// //     enhancers: (getDefaultEnhancers) =>
// //         __DEV__
// //             ? getDefaultEnhancers().concat(reactotron.createEnhancer())
// //             : getDefaultEnhancers(),
// // });

// // export const persistor = persistStore(store);



// // reducer: {
// //     car: carSlice,
// //     carDetails : carDetailsSlice,
// //     user : loginSlice,

// // },
// // enhancers:
// //     (getDefaultEnchancers)=>
// //         __DEV__ ? getDefaultEnchancers()
// //     .concat(reactotron.createEnhancer()) : getDefaultEnchancers()
// // })