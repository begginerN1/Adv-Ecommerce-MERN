import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import catReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: catReducer,
        brand: catReducer
    }
})