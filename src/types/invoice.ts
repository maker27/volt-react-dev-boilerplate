export interface IInvoice {
    id: number;
    customer_id: number;
    discount: number;
    total: number;
}

export type TInvoice = Omit<IInvoice, 'id'>;
