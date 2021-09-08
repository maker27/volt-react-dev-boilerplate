import { decimalNumber } from '../src/utils';
import { IInvoice } from '../src/types';

export const testCustomersList = [
    {
        id: 1,
        name: 'Test Customer',
        address: 'Test Address',
        phone: '8(999)777-44-11'
    },
    {
        id: 2,
        name: 'Other Customer',
        address: '',
        phone: ''
    }
];

export const testProductsList = [
    { id: 101, name: 'Product 101', price: 23.39 },
    { id: 102, name: 'Product 102', price: 17 }
];

export const testInvoiceItemsList = [
    {
        id: 1,
        invoice_id: 14,
        product_id: 101,
        quantity: 2
    },
    {
        id: 3,
        invoice_id: 14,
        product_id: 102,
        quantity: 1
    }
];

function calculateInvoiceTotal(invoice: Omit<IInvoice, 'total'>) {
    const sum = testInvoiceItemsList.reduce((sum, item) => {
        if (item.invoice_id === invoice.id) {
            sum += (testProductsList.find(({ id }) => id === item.product_id)?.price ?? 0) * item.quantity;
        }
        return sum;
    }, 0);
    return decimalNumber(((100 - invoice.discount) / 100) * sum);
}

const testInvoice = {
    id: 14,
    customer_id: 1,
    discount: 3
};

export const testInvoicesList = [
    {
        ...testInvoice,
        total: calculateInvoiceTotal(testInvoice)
    }
];
