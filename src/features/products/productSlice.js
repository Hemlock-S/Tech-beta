// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//     items: [],
//     status: null
// }

// export const ProductsFetching = createAsyncThunk('products/ProductsFetching', async () => {
//     const res = await axios.get('https://dummyjson.com/products');
//     return res.data;
// });
// // location means --> slice name + thunk constructor

// export const productSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     // Promise type work is in here like [data fetching]
//     // builder --> promise type work which builds something
//     // 
//     extraReducers: (builder) => {
//         builder.addCase(ProductsFetching.pending, (state, action) => {
//             state.status = 'pending';
//         });

//         builder.addCase(ProductsFetching.fulfilled, (state, action) => {
//             state.status = 'successfull';
//             state.items = action.payload; //immer [package] => vitore vitore spread kore pore data join koira ney.
//         });

//         builder.addCase(ProductsFetching.rejected, (state, action) => {
//             state.status = 'rejected';
//         });
//     },
// });

// export default productSlice.reducer;

import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: null,
}

export const productsFetching = createAsyncThunk('products/productsFetching', async () => {
    const res = await axios.get('https://dummyjson.com/products');
    return res.data;
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productsFetching.pending, (state, action) => {
            state.status = 'Loading...'
        });
        builder.addCase(productsFetching.fulfilled, (state, action) => {
            state.status = '';
            state.items = action.payload;
        });
        builder.addCase(productsFetching.rejected, () => (state, action) => {
            state.status = 'Something went wrong!';
        });
    }
});

export default productsSlice.reducer;

