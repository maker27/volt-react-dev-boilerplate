import { arrayToObject, decimalNumber, getInvoiceTotal } from '../src/utils';
import { testInvoiceItemsList, testProductsList } from './data';

describe('arrayToObject', () => {
    let items = [...testInvoiceItemsList];

    beforeEach(() => {
        items = [...testInvoiceItemsList];
    });

    test('return empty object', () => {
        expect(arrayToObject([])).toEqual({});
    });

    test('return object by id', () => {
        expect(arrayToObject(items)).toEqual({
            1: {
                id: 1,
                invoice_id: 14,
                product_id: 101,
                quantity: 2
            },
            3: {
                id: 3,
                invoice_id: 14,
                product_id: 102,
                quantity: 1
            }
        });
    });

    test('return object by product_id', () => {
        expect(arrayToObject(items, 'product_id')).toEqual({
            101: {
                id: 1,
                invoice_id: 14,
                product_id: 101,
                quantity: 2
            },
            102: {
                id: 3,
                invoice_id: 14,
                product_id: 102,
                quantity: 1
            }
        });
    });
});

describe('decimalNumber', () => {
    test('should not be null', () => {
        expect(decimalNumber(12)).not.toBeNull();
    });

    test('should be equal', () => {
        expect(decimalNumber(12)).toEqual(12);
        expect(decimalNumber(12.0)).toEqual(12);
        expect(decimalNumber(1.123)).toEqual(1.12);
        expect(decimalNumber(0.0879)).toEqual(0.09);
    });
});

describe('getInvoiceTotal', () => {
    const items = arrayToObject(testInvoiceItemsList);
    const products = arrayToObject(testProductsList);

    test('return total of empty items', () => {
        expect(getInvoiceTotal({}, products)).toBe(0);
    });

    test('return total without discount', () => {
        expect(getInvoiceTotal(items, products)).toEqual(63.78);
    });

    test('return total with discount', () => {
        expect(getInvoiceTotal(items, products, 15)).toEqual(54.21);
    });
});
