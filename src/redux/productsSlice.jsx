import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products : [],
    loading: false,
    error: false
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        getProductsPending: (state)=>{
            state.loading = true;
        },
        getProductsSuccess: (state, {payload})=>{
            state.products = payload;
            state.loading = false;
            state.error = false;
        },
        getProductsFailure: (state,{payload})=>{
            state.loading = false;
            state.loading = payload;
            
        },
    }
});

const {actions, reducer} = productsSlice;
export const {getProductsPending, getProductsSuccess, getProductsFailure} = actions;
export default reducer;