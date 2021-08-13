export interface ICustomer {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export type TCustomer = Omit<ICustomer, 'id'>;
