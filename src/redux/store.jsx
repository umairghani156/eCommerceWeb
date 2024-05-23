import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice"
import productSlice from "./productSlice"
import selectedProductsSlice from "./selectedProductsSlice"


export const store = configureStore({
    reducer:{
        products: productsSlice,
        product: productSlice,
        selectedProducts: selectedProductsSlice,
    }
});
