export interface IProduct {
    id: number;
    name: string;
    price: number;
}

export type TProduct = Omit<IProduct, 'id'>;
