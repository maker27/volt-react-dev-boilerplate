import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoiceSlice';
import productReducer from './productSlice';
import customerReducer from './customerSlice';
import statusReducer from './statusSlice';

export const store = configureStore({
    reducer: {
        invoices: invoicesReducer,
        products: productReducer,
        customers: customerReducer,
        status: statusReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
