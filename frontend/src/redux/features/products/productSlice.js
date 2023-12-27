import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from 'react-toastify';

const initialState = {
    product: null,
    products: [],
    minPrice: null,
    maxPrice: null,
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// create a product
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (formData, thunkAPI) => {
        try{
            return await productService.createProduct(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
// get products
export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (_, thunkAPI) => {
        try{
            return await productService.getProducts();
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
// get products
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (formData, thunkAPI) => {
        try{  
            return await productService.deleteProduct(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
// get product
export const getAProduct = createAsyncThunk(
    "product/getAproduct",
    async (formData, thunkAPI) => {
        try{  
            return await productService.getAProduct(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
// update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({id, formData}, thunkAPI) => {
        try{  
            return await productService.updateProduct(id,formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

const productSlice = createSlice({
  name: "product",
  initialState,
    reducers: {
        RESET_PROD(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message ='' 
        },
        GET_PRICE_RANGE(state,action) {
            const { products } = action.payload
            const array = [];

            products.map((prod) => {
                const price = prod.price;
                return array.push(price);
            });
            const max = Math.max(...array);
            const min = Math.min(...array);

            state.minPrice = min;
            state.maxPrice = max;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                if (action.payload && action.payload.hasOwnProperty("message")) {
                   toast.error(action.payload)
                } else {
                    state.message="product created successfully!"
                    toast.success("product created successfully!");
                }
                
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products=action.payload
                // toast.success("product loaded successfully!");
                // console.log(action.payload);
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // state.products=action.payload
                toast.success(action.payload);
                // console.log(action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product=action.payload
                // toast.success(action.payload);
                // console.log(action.payload);
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product=action.payload
                
                if (action.payload && action.payload.hasOwnProperty("message")) {
                    toast.error(action.payload.message)
                } else {
                    state.message = 'product updated successfully!'
                    toast.success('product updated successfully!')
                }
                toast.success(action.payload);
                // console.log(action.payload);
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
  }
});

export const {RESET_PROD,GET_PRICE_RANGE} = productSlice.actions

export default productSlice.reducer