import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiBaseUrl } from './assets/constants';
import { store } from './store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
    IInvoice,
    IProduct,
    ICustomer,
    TCustomer,
    TProduct,
    TInvoice,
    IInvoiceItem,
    TInvoiceItem
} from './types';
import {
    addInvoice,
    addInvoiceItem,
    deleteInvoice,
    deleteInvoiceItem,
    editInvoice,
    editInvoiceItem,
    setInvoiceItems,
    setInvoices
} from './store/invoiceSlice';
import { addProduct, deleteProduct, editProduct, setProducts } from './store/productSlice';
import { addCustomer, deleteCustomer, editCustomer, setCustomers } from './store/customerSlice';
import { StatusType, addStatus, setLoadAction } from './store/statusSlice';

const server = axios.create({
    baseURL: apiBaseUrl
});

type TRequestData = { [key: string]: string | number };

const isInitialRequest = ({ method, url = '' }: AxiosRequestConfig) =>
    method === 'get' && ['customers', 'products', 'invoices'].includes(url);

class API {
    constructor() {
        server.interceptors.request.use((req: AxiosRequestConfig) => {
            if (!isInitialRequest(req)) API.setLoader(true);
            return req;
        });
        server.interceptors.response.use((res: AxiosResponse) => {
            if (!isInitialRequest(res.config)) API.setLoader(false);
            return res;
        });
    }

    private static setLoader(load: boolean) {
        store.dispatch(setLoadAction(load));
        return load;
    }

    private static setError(e: Error) {
        API.setLoader(false);
        store.dispatch(addStatus({ id: Date.now(), type: StatusType.error, value: e.message }));
        console.error(e);
    }

    private request<T>(
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        serverRequest: <T = any, R = AxiosResponse<T>>(
            url: string,
            config?: AxiosRequestConfig
        ) => Promise<R>,
        params: [url: string, data?: TRequestData],
        action: ActionCreatorWithPayload<T>
    ) {
        return serverRequest(...params)
            .then(({ data }) => {
                store.dispatch(action(data));
                return data;
            })
            .catch(e => API.setError(e));
    }

    private getRequest<T>(url: string, action: ActionCreatorWithPayload<T>) {
        return this.request(server.get, [url], action);
    }

    private postRequest<T>(url: string, data: TRequestData, action: ActionCreatorWithPayload<T>) {
        return this.request(server.post, [url, data], action);
    }

    private putRequest<T>(url: string, data: TRequestData, action: ActionCreatorWithPayload<T>) {
        return this.request(server.put, [url, data], action);
    }

    private deleteRequest<T>(url: string, action: ActionCreatorWithPayload<T>) {
        return this.request(server.delete, [url], action);
    }

    getInvoices() {
        return this.getRequest<IInvoice[]>('invoices', setInvoices);
    }

    getProducts() {
        return this.getRequest<IProduct[]>('products', setProducts);
    }

    getCustomers() {
        return this.getRequest<ICustomer[]>('customers', setCustomers);
    }

    getAllData() {
        return Promise.all([this.getInvoices(), this.getProducts(), this.getCustomers()]);
    }

    createCustomer(customerData: TCustomer) {
        this.postRequest<ICustomer>('customers', customerData, addCustomer);
    }

    editCustomer(customerId: number, customerData: TCustomer) {
        this.putRequest<ICustomer>(
            'customers/' + customerId,
            { ...customerData, customer_id: customerId },
            editCustomer
        );
    }

    deleteCustomer(customerId: number) {
        this.deleteRequest<ICustomer>('customers/' + customerId, deleteCustomer);
    }

    createProduct(productData: TProduct) {
        this.postRequest<IProduct>('products', productData, addProduct);
    }

    editProduct(productId: number, productData: TProduct) {
        this.putRequest<IProduct>(
            'products/' + productId,
            { ...productData, product_id: productId },
            editProduct
        );
    }

    deleteProduct(productId: number) {
        this.deleteRequest<IProduct>('products/' + productId, deleteProduct);
    }

    createInvoice(invoiceData: TInvoice) {
        return this.postRequest<IInvoice>('invoices', invoiceData, addInvoice);
    }

    editInvoice(invoiceId: number, invoiceData: Partial<TInvoice>) {
        this.putRequest<IInvoice>('invoices/' + invoiceId, invoiceData, editInvoice);
    }

    deleteInvoice(invoiceId: number) {
        this.deleteRequest<IInvoice>('invoices/' + invoiceId, deleteInvoice);
    }

    getInvoiceItems(invoiceId: number) {
        return this.getRequest<IInvoiceItem[]>('invoices/' + invoiceId + '/items', setInvoiceItems);
    }

    addInvoiceItem(invoiceItemData: TInvoiceItem) {
        return this.postRequest<IInvoiceItem>(
            'invoices/' + invoiceItemData.invoice_id + '/items',
            invoiceItemData,
            addInvoiceItem
        );
    }

    editInvoiceItem({ id, ...invoiceItemData }: IInvoiceItem) {
        this.putRequest<IInvoiceItem>(
            'invoices/' + invoiceItemData.invoice_id + '/items/' + id,
            { ...invoiceItemData },
            editInvoiceItem
        );
    }

    deleteInvoiceItem({ id, invoice_id }: IInvoiceItem) {
        this.deleteRequest<IInvoiceItem>('invoices/' + invoice_id + '/items/' + id, deleteInvoiceItem);
    }

    addNewInvoice(invoice: IInvoice, invoiceItems: TInvoiceItem[]) {
        API.setLoader(true);
        this.createInvoice(invoice).then(({ id }) => {
            Promise.all(
                Object.values(invoiceItems).map(invoiceItem =>
                    this.addInvoiceItem({ ...invoiceItem, invoice_id: id })
                )
            ).then(() => {
                API.setLoader(false);
            });
        });
    }
}

export default new API();
