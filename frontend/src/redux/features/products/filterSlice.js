import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts:[],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
    reducers: {
        FILTER_BY_SEARCH(state,action){
            const { products, search } = action.payload;
            const searchResult = products.filter((product => product.name?.toLowerCase().includes(search.toLowerCase()) || product.category?.toLowerCase().includes(search.toLowerCase())));

            state.filteredProducts = searchResult;
        },
        SORT_PRODUCTS(state, action) {
            const { products, sort } = action.payload;
            let sortResult = [];

            if (sort === "latest") {
                sortResult = products;
            }
            if (sort === "lowest-price") {
                sortResult = products?.slice().sort((a, b) => {
                    return a.price - b.price
                });
            }
            if (sort === "highest-price") {
                sortResult = products?.slice().sort((a, b) => {
                    return b.price - a.price
                });
            }
            if (sort === "a-z") {
                sortResult = products?.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name)
                });
            }
            if (sort === "z-a") {
                sortResult = products?.slice().sort((a, b) => {
                    return b.name.localeCompare(a.name)
                });
            }
            state.filteredProducts = sortResult;
        },
        FILTER_BY_CAT(state, action) {
            const { products, cat:category } = action.payload;

            let filterResult = [];

            if (category === 'ALL') {
                filterResult = products;
            } else {
                filterResult = products?.filter((product) => {
                    return product.category === category
                })
            }

            state.filteredProducts= filterResult
        },
        FILTER_BY_BRAND(state, action) {
            const { products, brand } = action.payload;

            let filterResult = [];

            if (brand === 'ALL') {
                filterResult = products;
            } else {
                filterResult = products?.filter((product) => {
                    return product.brand === brand;
                })
            }

            state.filteredProducts= filterResult
        },
        FILTER_BY_PRICE(state, action) {
            const { products, price } = action.payload;

            let filterResult = [];

            filterResult = products?.filter((product) => {
                    return product.price >= price[0] && product.price <=price[1];
                })

            state.filteredProducts = filterResult;
        }
    }
});

export const {FILTER_BY_SEARCH,SORT_PRODUCTS,FILTER_BY_CAT,FILTER_BY_BRAND,FILTER_BY_PRICE} = filterSlice.actions

export default filterSlice.reducer