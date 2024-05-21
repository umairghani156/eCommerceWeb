import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product : [],
    loading: false,
    error: false
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        getProductPending: (state)=>{
            state.loading = true;
        },
        getProductSuccess: (state, {payload})=>{
            state.product = payload;
            state.loading = false;
            state.error = false;
        },
        getProductFailure: (state,{payload})=>{
            state.loading = false;
            state.loading = payload;
            
        },
    }
});

const {actions, reducer} = productSlice;
export const {getProductPending, getProductSuccess, getProductFailure} = actions;
export default reducer;