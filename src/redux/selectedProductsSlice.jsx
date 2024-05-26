import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedProducts : [],
    loading: false,
    error: false
}

const selectedProductsSlice = createSlice({
    name: "selectedProducts",
    initialState,
    reducers:{
        getSelectedProductsPending: (state)=>{
            state.loading = true;
        },
        getSelectedProductsSuccess: (state, {payload})=>{
            state.selectedProducts = payload.map(product => ({
                ...product,
                quantity: product.quantity || 0 // Initialize quantity if it doesn't exist
            }));
            state.loading = false;
            state.error = false;
        },
        getSelectedProductsFailure: (state,{payload})=>{
            state.loading = false;
            state.error = payload; 
        },
        incrementQuantity: (state, { payload }) => {
            const product = state.selectedProducts.find(p => p.id === payload);
            if (product) {
                console.log('Current quantity:', product.quantity);
                product.quantity += 1;
                console.log('New quantity:', product.quantity);
            }
        },
        decrementQuantity: (state, { payload }) => {
            const product = state.selectedProducts.find(p => p.id === payload);
            if (product && product.quantity > 0) {
                console.log('Current quantity:', product.quantity);
                product.quantity -= 1;
            }
        },
        deleteProduct: (state, { payload }) => {
            state.selectedProducts = state.selectedProducts.filter(p => p.id !== payload);
        },
        getSelectedProductsEmpty: (state)=>{
            state.selectedProducts = [],
            state.loading= false,
            state.error = false
        }
    }
});

const {actions, reducer} = selectedProductsSlice;
export const {getSelectedProductsPending, getSelectedProductsSuccess, getSelectedProductsFailure,incrementQuantity, decrementQuantity, deleteProduct,getSelectedProductsEmpty} = actions;
export default reducer;