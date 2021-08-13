export interface IInvoiceItem {
    id: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
}

export type TInvoiceItem = Omit<IInvoiceItem, 'id'>;
