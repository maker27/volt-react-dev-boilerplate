import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, TObjectOf } from '../types';
import { arrayToObject } from '../utils';

interface productState {
    all: TObjectOf<IProduct>;
    current: IProduct;
}

const emptyProduct = { id: 0, name: '', price: 0 };

const initialState: productState = {
    all: {},
    current: emptyProduct
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Array<IProduct>>) => {
            state.all = arrayToObject<IProduct>(action.payload);
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload;
            state.all[product.id] = product;
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload;
            state.all[product.id] = product;
        },
        deleteProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload;
            delete state.all[product.id];
        },
        setCurrentProduct: (state, action: PayloadAction<IProduct | undefined>) => {
            state.current = action.payload || emptyProduct;
        }
    }
});

export const {
    setProducts,
    addProduct,
    editProduct,
    deleteProduct,
    setCurrentProduct
} = productSlice.actions;

export default productSlice.reducer;
