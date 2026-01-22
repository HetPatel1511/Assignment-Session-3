import { createSlice } from "@reduxjs/toolkit";

const defaultcartValue = localStorage.getItem("cart")
let defaultcart = []
if (defaultcartValue) {
    defaultcart = JSON.parse(defaultcartValue)
}

const cartItems=localStorage.getItem("cart")
  let cartPersist= [];
  if (cartItems) {
    cartPersist = JSON.parse(cartItems)
  }

const initialState = {
    cart: cartPersist
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex((i: any) => action.payload.id == i.id);

            if (index != -1) {
                state.cart = state.cart.map((i: any) => {
                    if (action.payload.id == i.id) {
                        return { ...i, quantityInCart: i.quantityInCart ? i.quantityInCart + 1 : 1 }
                    }
                    return i
                })
            } else {
                state.cart = [...state.cart, { ...action.payload, quantityInCart: 1 }]
            }

            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {
            const index = state.cart.findIndex((i: any) => action.payload.id == i.id);

            if (index != -1) {
                if (state.cart[index].quantityInCart > 1) {
                    state.cart = state.cart.map((i: any) => {
                        if (action.payload.id == i.id) {
                            return { ...i, quantityInCart: i.quantityInCart - 1 }
                        }
                        return i
                    });
                } else {
                    state.cart = state.cart.filter((i: any) => action.payload.id != i.id);
                }
            }

            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeCompletelyFromCart: (state, action) => {
            state.cart = state.cart.filter((i: any) => action.payload.id != i.id);

            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }
})

export const { addToCart, removeFromCart, removeCompletelyFromCart } = cartSlice.actions;

export const selectCart = (state: any) => state.cart.cart
export const totalItemsInCart = (state: any) => state.cart.cart.reduce((acc: any, item: any) => acc + item.quantityInCart, 0)
export const totalCost = (state: any) => state.cart.cart.reduce((acc: any, item: any) => acc + item.quantityInCart*item.price, 0)

export default cartSlice.reducer;
