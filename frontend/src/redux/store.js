import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import catReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "./features/products/productSlice";
import filterReducer from "./features/products/filterSlice";
import couponReducer from "./features/coupon/couponSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: catReducer,
        brand: catReducer,
        product: productReducer,
        coupon: couponReducer,
        filter: filterReducer,
    }
})