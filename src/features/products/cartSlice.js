import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    // age localstorage e check korte hbe ache kina[initialData]...nahole array te dhukbe
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
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
                toast.info('Quantity Increased!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else{
                // add to cart ==> cartQuantity object add korte hbe api te
                const assemblledItem = {...action.payload, cartQuantity: 1};
                state.cartItems.push(assemblledItem);
                toast.success('Product added into cart', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            // add to localstorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // removeFromCart function 
        removeFromCart(state, action){
            // new array return kore filter
            const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            state.cartItems = updatedCartItems;
            toast.warn('Product removed!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // clearCart function
        clearCart(state, action){
            state.cartItems = [];

            toast('Cart cleared!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },


        // decreaseCart function
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            // if exist:
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info('Quantity decreased', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                state.cartItems = updatedCartItems;

                toast.error('Product removed from cart', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            // update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        getSubtotal(state, action){
            const subtotal = state.cartItems.reduce((acc, item) => {
                const { price, cartQuantity } = item;
                const itemTotal = price * cartQuantity;
                acc += itemTotal;
                return acc;
            }, 0);

            state.cartTotalAmount = subtotal;
        }
    },
});

export const { addToCart, removeFromCart, clearCart, decreaseCart, getSubtotal } = cartSlice.actions;
export default cartSlice.reducer; 

