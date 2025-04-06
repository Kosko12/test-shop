import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ProductType} from '../../types/Product';

export type ProductInstance = {
    id: number,
    instance: ProductType
}

export type ProductsState = {
  items: ProductInstance[];
};


const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductInstance>) {
      state.items.push({id: action.payload.id, instance: action.payload.instance});
    }, 
    addMultipleProducts(state, action: PayloadAction<ProductsState>) {
        state.items = action.payload.items;
    },
    updateProduct(state, action: PayloadAction<ProductInstance>) {
        const targetIndex = state.items.findIndex(el => el.id === action.payload.id);
        state.items[targetIndex].instance = action.payload.instance;
    },
    updateQuantity(state, action: PayloadAction<{id: number, quantity: number, mode: 'replace' | 'add'}>) {
      const targetElement = state.items.find(el => el.id === action.payload.id);
      if(targetElement) {
        
        targetElement.instance.quantity = action.payload.mode === 'replace' ? action.payload.quantity : action.payload.quantity + targetElement.instance.quantity;
      }
    },
    updateStock(state, action: PayloadAction<{id: number, quantity: number}>){
      const targetElement = state.items.find(el => el.id === action.payload.id);
      if(targetElement) {
        
        targetElement.instance.stock = targetElement.instance.stock - action.payload.quantity;
      }
    }
  },
  selectors: {
    selectProduct(state, id: number) {
      return state.items.find(el => el.id === id);
    },
    selectProductsForPage(state, start: number, prodPerPage: number){
      const objCopy = Array.from(state.items);
      return objCopy.splice(prodPerPage * start, prodPerPage);
    }
  }
});

export const { addProduct, updateQuantity, updateStock, addMultipleProducts, updateProduct } = productsSlice.actions;
export const { selectProduct, selectProductsForPage } = productsSlice.selectors;
export default productsSlice.reducer;
