import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product : {},
    loader: false,
    error: false
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        getProductPending: (state)=>{
            state.loader = true;
        },
        getProductSuccess: (state, {payload})=>{
            state.product = payload;
            state.loader = false;
            state.error = false;
        },
        getProductFailure: (state,{payload})=>{
            state.loader = false;
            state.error = payload;
            
        },
    }
});

const {actions, reducer} = productSlice;
export const {getProductPending, getProductSuccess, getProductFailure} = actions;
export default reducer;