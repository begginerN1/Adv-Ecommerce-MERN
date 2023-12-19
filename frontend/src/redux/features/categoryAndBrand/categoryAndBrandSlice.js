import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import catAndBrand from './categoryAndBrandService';

const initialState = {
    category: [],
    brand: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create  category
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (formData, thunkAPI) => {
        try{
            return await catAndBrand.createCategory(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
//get categories
export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (thunkAPI) => {
        try{
            return await catAndBrand.getCategories();
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

//delete a  category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (slug, thunkAPI) => {
        try{
            return await catAndBrand.deleteCategory(slug);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

//create  brand
export const createBrand = createAsyncThunk(
    "category/createBrand",
    async (formData, thunkAPI) => {
        try{
            return await catAndBrand.createBrand(formData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

//get brand
export const getBrand = createAsyncThunk(
    "category/getBrand",
    async (_,thunkAPI) => {
        try{
            return await catAndBrand.getBrand();
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

const categoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
    reducers: {
      RESET_AUTH(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message ='' 
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("category created successfully!");
                console.log(action.payload);
                
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload)
            })
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    category: action.payload
                };
                
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.category = [];
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload);
                // console.log(action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // state.brand = action.payload
                toast.success("brand created successfully!");
                console.log(action.payload);
                
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
            .addCase(getBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrand.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    brand: action.payload,
                    message: toast.success(action.payload)
                };
                
            })
            .addCase(getBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.category = [];
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});

export const { RESET_AUTH } = categoryAndBrandSlice.actions;

export default categoryAndBrandSlice.reducer