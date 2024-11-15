import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // age localstorage e check korte hbe ache kina[initialData]...nahole array te dhukbe
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addToCart function
        addToCart(state, action){
            // check if cart item is already existed
            const existedItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            // if item exists:
            if(existedItemIndex >= 0){
                // increase quantity
                state.cartItems[existedItemIndex].cartQuantity += 1;
            }else{
                // add to cart ==> cartQuantity object add korte hbe api te
                const assemblledItem = {...action.payload, cartQuantity: 1};
                state.cartItems.push(assemblledItem);
            }
            // add to localstorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // removeFromCart function 
        removeFromCart(state, action){
            // new array return kore filter
            const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            state.cartItems = updatedCartItems;
            // update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // clearCart function
        clearCart(state, action){
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },


        // decreaseCart function
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            // if exist:
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                state.cartItems = updatedCartItems;
            }
            // update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, clearCart, decreaseCart } = cartSlice.actions;
export default cartSlice.reducer; 

