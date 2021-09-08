import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInvoice, IInvoiceItem, TObjectOf } from '../types';
import { arrayToObject } from '../utils';

interface IInvoiceState {
    all: TObjectOf<IInvoice>;
    current: IInvoice;
    items: TObjectOf<IInvoiceItem>;
}

const emptyInvoice = {
    id: 0,
    customer_id: 0,
    discount: 0,
    total: 0
};

const initialState: IInvoiceState = {
    all: {},
    current: emptyInvoice,
    items: {}
};

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<Array<IInvoice>>) => {
            state.all = arrayToObject<IInvoice>(action.payload);
        },
        addInvoice: (state, action: PayloadAction<IInvoice>) => {
            const invoice = action.payload;
            state.all[invoice.id] = invoice;
            state.current = invoice;
        },
        editInvoice: (state, action: PayloadAction<IInvoice>) => {
            const invoice = action.payload;
            state.all[invoice.id] = invoice;
            state.current = invoice;
        },
        deleteInvoice: (state, action: PayloadAction<IInvoice>) => {
            const invoice = action.payload;
            delete state.all[invoice.id];
        },
        setCurrentInvoice: (state, action: PayloadAction<IInvoice | undefined>) => {
            state.current = action.payload || emptyInvoice;
        },
        setInvoiceItems: (state, action: PayloadAction<IInvoiceItem[]>) => {
            state.items = arrayToObject<IInvoiceItem>(action.payload, 'product_id');
        },
        addInvoiceItem: (state, action: PayloadAction<IInvoiceItem>) => {
            const invoiceItem = action.payload;
            state.items[invoiceItem.product_id] = invoiceItem;
        },
        deleteInvoiceItem: (state, action: PayloadAction<IInvoiceItem>) => {
            const invoiceItem = action.payload;
            delete state.items[invoiceItem.product_id];
        }
    }
});

export const {
    setInvoices,
    addInvoice,
    editInvoice,
    deleteInvoice,
    setCurrentInvoice,
    setInvoiceItems,
    addInvoiceItem,
    deleteInvoiceItem
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
