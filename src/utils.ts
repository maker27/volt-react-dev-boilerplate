import { IInvoiceItem, IProduct, TObjectOf } from './types';

export function arrayToObject<T extends { id: number }>(list: T[], prop: keyof T = 'id'): TObjectOf<T> {
    return list.reduce((s, v) => ({ ...s, [String(v[prop])]: v }), {});
}

export function decimalNumber(value: number, decimalPlaces = 2): number {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
}

export const getInvoiceTotal = (
    invoiceItems: TObjectOf<IInvoiceItem>,
    products: TObjectOf<IProduct>,
    discount = 0
): number => {
    const sum = Object.values(invoiceItems).reduce((sum: number, { product_id, quantity }) => {
        const product = products[product_id];
        return product ? sum + product.price * quantity : sum;
    }, 0);
    return decimalNumber(((100 - discount) / 100) * sum);
};
