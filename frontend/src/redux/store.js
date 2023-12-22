import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import catReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "./features/products/productSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: catReducer,
        brand: catReducer,
        product:productReducer
    }
})