import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import cartService from './cartService';
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalQuantoty: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

//save cart
export const saveCartDB = createAsyncThunk(
    "cart/saveCartDB",
    async (cartData, thunkAPI) => {
        try{
            return await cartService.saveCartDB(cartData);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)
//get cart
export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, thunkAPI) => {
        try{
            return await cartService.getCard();
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
        
    }
)

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {

      const productIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`${action.payload.name} was increased by one!`, { position: 'top-left' });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} was added to the cart!`, { position: 'top-left' });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  
    DECREASE_CART(state, action) {
      
      const productIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} was decreased by one!`, { position: 'top-left' });

      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        // const newCartItem = state.cartItems.filter((item) => item._id !== action.payload._id); state.cartItems = newCartItem;

        state.cartItems = [...state.cartItems.filter((item) => item._id !== action.payload._id)];
        toast.success(`${action.payload.name} was removed from the cart!`, { position: 'top-left' })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART(state, action) {

      state.cartItems = [...state.cartItems.filter((item) => item._id !== action.payload._id)];
      toast.success(`${action.payload.name} was removed from the cart!`, { position: 'top-left' });

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {

      state.cartItems = [];
      toast.success(`Cart was cleared!`, { position: 'top-left' });

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CART_LOGOUT(state) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    TOTAL_CART(state, action) {

      const array = [];

      state.cartItems?.map(item => {
        return array.push(item.cartQuantity);
      });

      if (array.length === 0) {
        return;
      }
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      },0);
      
      state.cartTotalQuantity = totalQuantity;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    SUBTOTAL_CART(state, action) {

      const array = [];

      state.cartItems?.map(item => {
        const totalAmount = item.price * item.cartQuantity;
        return array.push(totalAmount);
      });

      if (array.length === 0) {
        return
      }

      state.cartTotalAmount = array.reduce((a, b) => {
        return a + b;
      },0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(saveCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
        if (action.payload.length > 0) {
          window.location.href = FRONTEND_URL + "/cart";
        } else {
          window.location.href = FRONTEND_URL;
        }
        console.log(action.payload);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        console.log(action.payload);
      })
  }
}
);

export const {ADD_TO_CART,DECREASE_CART,REMOVE_FROM_CART,CLEAR_CART,TOTAL_CART,SUBTOTAL_CART,CART_LOGOUT} = CartSlice.actions

export default CartSlice.reducer