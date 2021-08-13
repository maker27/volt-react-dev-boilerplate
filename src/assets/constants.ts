export const appName = 'Invoice App';

export const routes = {
    invoices: { url: '/', title: 'Invoices List' },
    invoices_create: { url: '/invoices/new', title: 'Create Invoice' },
    invoices_edit: { url: '/invoices/:id/edit', title: 'Edit Invoice' },
    products: { url: '/products', title: 'Products List' },
    customers: { url: '/customers', title: 'Customers List' }
};

export const apiBaseUrl = 'http://localhost:8000/api/';
