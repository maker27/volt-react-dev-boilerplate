import React from 'react';
import { IInvoice, TInvoice } from './invoice';
import { IProduct, TProduct } from './product';
import { ICustomer, TCustomer } from './customer';
import { IInvoiceItem, TInvoiceItem } from './invoice-item';

export type { IInvoice, IProduct, ICustomer, IInvoiceItem, TCustomer, TProduct, TInvoice, TInvoiceItem };

export type TOnChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type TObjectOf<T> = { [key: string]: T };

export type TFormDataSetter<T> = (value: T) => void;
