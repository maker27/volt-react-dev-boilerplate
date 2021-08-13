import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer, TObjectOf } from '../types';
import { arrayToObject } from '../utils';

interface customerState {
    all: TObjectOf<ICustomer>;
    current: ICustomer;
}

const emptyCustomer = { id: 0, name: '', address: '', phone: '' };

const initialState: customerState = {
    all: {},
    current: emptyCustomer
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<Array<ICustomer>>) => {
            state.all = arrayToObject<ICustomer>(action.payload);
        },
        addCustomer: (state, action: PayloadAction<ICustomer>) => {
            const customer = action.payload;
            state.all[customer.id] = customer;
        },
        editCustomer: (state, action: PayloadAction<ICustomer>) => {
            const customer = action.payload;
            state.all[customer.id] = customer;
        },
        deleteCustomer: (state, action: PayloadAction<ICustomer>) => {
            const customer = action.payload;
            delete state.all[customer.id];
        },
        setCurrentCustomer: (state, action: PayloadAction<ICustomer | undefined>) => {
            state.current = action.payload || emptyCustomer;
        }
    }
});

export const {
    setCustomers,
    addCustomer,
    editCustomer,
    deleteCustomer,
    setCurrentCustomer
} = customerSlice.actions;

export default customerSlice.reducer;
