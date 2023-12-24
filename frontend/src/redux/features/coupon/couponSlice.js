import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import couponService from './couponService';
import { toast } from 'react-toastify';

const initialState = {
    coupon: null,
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createCoupon = createAsyncThunk(
    "coupon/createCoupon",
    async (formData, thunkAPI) => {
        try{
            return await couponService.createCoupon(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
export const getCoupons = createAsyncThunk(
    "coupon/getCoupons",
    async (_, thunkAPI) => {
        try{
            return await couponService.getCoupons();
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

export const deleteCoupon = createAsyncThunk(
    "coupon/deleteCoupon",
    async (id, thunkAPI) => {
        try {
            return await couponService.deleteCoupon(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getACoupons = createAsyncThunk(
    "coupon/getACoupons",
    async (name, thunkAPI) => {
        try{
            return await couponService.getACoupon(name);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)


const couponSlice = createSlice({
  name: 'coupon',
  initialState,
    reducers: {
       RESET_COUPON(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message ='' 
      },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // if (action.payload && action.payload.hasOwnProperty("message")) {
                //    toast.error(action.payload)
                // } else {
                //     state.message="coupon created successfully!"
                //     toast.success("coupon created successfully!");
                // }
                toast.success("coupon created successfully!");
                
            })
        .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
        .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupons=action.payload
                // toast.success("coupon created successfully!");
                
            })
        .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
        .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // state.coupons=action.payload
                toast.success(action.payload);
                
            })
        .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
        })
        .addCase(getACoupons.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(getACoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupon=action.payload
                toast.success("coupon applied successfully!");
                console.log(action.payload);
            
                
            })
        .addCase(getACoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const {RESET_COUPON} = couponSlice.actions

export default couponSlice.reducer