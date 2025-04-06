import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ProductType} from '../../types/Product';

export type CartInstance = {
    id: number,
    instance: ProductType, 
    quantity: number
}

export type CartState = {
  items: CartInstance[];
};


const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<CartInstance>) {
        if(state.items.findIndex(el => el.id === action.payload.id) >= 0){
            state.items[0].quantity += action.payload.quantity;
        }
        else {
            state.items.push({id: action.payload.id, instance: action.payload.instance, quantity: action.payload.quantity});
        }
    },
    removeProduct(state, action: PayloadAction<{id: number}>) {
        const targetIndex = state.items.findIndex(el => el.id === action.payload.id);
        state.items.splice(targetIndex, 1);
    },
    setQuantity(state, action: PayloadAction<Omit<CartInstance, 'instance'>>) {
        const targetIndex = state.items.findIndex(el => el.id === action.payload.id);
        if(action.payload.quantity < 1){
            state.items.splice(targetIndex, 1);
        } else {
            state.items[targetIndex].quantity = action.payload.quantity ? action.payload.quantity : state.items[targetIndex].quantity;
        }
    },
    finalizeCart(state) {
      state.items = [];
    },
    purgeCart(state) {
      state.items = [];
    }
    
  },
  selectors: {
    selectSummary: (state) => state.items.reduce((acc, curr) => acc + (curr.instance.price * curr.quantity), 0),
    selectIsActive: (state) => state.items.length > 0,
    selectProductsFromCart: (state) => state.items,
  }
});

export const { addProductToCart, purgeCart, removeProduct, setQuantity, finalizeCart } = cartSlice.actions;
export const { selectSummary, selectIsActive, selectProductsFromCart } = cartSlice.selectors;
export default cartSlice.reducer;
