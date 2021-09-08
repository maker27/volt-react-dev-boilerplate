import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { Route, MemoryRouter } from 'react-router-dom';
import InvoiceForm from '../../src/components/forms/InvoiceForm';
import { IInvoice, IInvoiceItem } from '../../src/types';
import { addInvoice, addInvoiceItem, setCurrentInvoice } from '../../src/store/invoiceSlice';
import { testCustomersList, testInvoiceItemsList, testInvoicesList, testProductsList } from '../data';
import { routes } from '../../src/assets/constants';
import { arrayToObject } from '../../src/utils';
import selectEvent from 'react-select-event';

const deleteInvoiceItem = jest.fn();

const renderForm = (): RenderResult => {
    const { invoices } = store.getState();
    const setInvoice = (newInvoice?: IInvoice) => store.dispatch(setCurrentInvoice(newInvoice));
    const setInvoiceItem = (newInvoiceItem: IInvoiceItem) => store.dispatch(addInvoiceItem(newInvoiceItem));

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/invoices/new`]}>
                <Route path="/invoices/new">
                    <InvoiceForm
                        title={routes.invoices_create.title}
                        customers={arrayToObject(testCustomersList)}
                        products={arrayToObject(testProductsList)}
                        invoice={invoices.current}
                        invoiceItems={arrayToObject(testInvoiceItemsList)}
                        invoiceId={0}
                        setCurrentInvoice={setInvoice}
                        addInvoiceItem={invoiceItem => setInvoiceItem({ ...invoiceItem, id: Date.now() })}
                        editInvoiceItem={setInvoiceItem}
                        deleteInvoiceItem={deleteInvoiceItem}
                    />
                </Route>
            </MemoryRouter>
        </Provider>
    );
};

const getCurrentInvoice = (): IInvoice => {
    const invoice = store.getState().invoices.current;
    expect(invoice).not.toBeUndefined();
    return invoice as IInvoice;
};

describe('InvoiceForm', () => {
    const addedInvoice = testInvoicesList[0];
    beforeAll(() => {
        store.dispatch(addInvoice(addedInvoice));
    });

    test('renders form', () => {
        const { asFragment } = renderForm();
        expect(asFragment()).toMatchSnapshot();

        expect(getCurrentInvoice()).toEqual(addedInvoice);
    });

    test('changes customer select value', async () => {
        const otherCustomer = testCustomersList[1];

        const { getByLabelText } = renderForm();
        const customerSelect = getByLabelText('Customer') as HTMLSelectElement;
        expect(customerSelect.value).toBe('');
        await selectEvent.select(customerSelect, otherCustomer.name);
        expect(getCurrentInvoice()).toEqual({ ...addedInvoice, customer_id: otherCustomer.id });
    });

    test('add new invoice items', async () => {
        const addedItem = testInvoiceItemsList[1];
        const addedItemName = testProductsList.find(({ id }) => id === addedItem.product_id)?.name ?? '';

        const { getByLabelText, getByText } = renderForm();
        const productSelect = getByLabelText('Add product');
        await selectEvent.select(productSelect, addedItemName);
        fireEvent.click(getByText('Add'));

        const invoiceItems = store.getState().invoices.items;
        expect(invoiceItems).toMatchInlineSnapshot(`
                  Object {
                    "${addedItem.product_id}": Object {
                      "id": ${addedItem.id},
                      "invoice_id": ${addedItem.invoice_id},
                      "product_id": ${addedItem.product_id},
                      "quantity": ${addedItem.quantity + 1},
                    },
                  }
                `);
    });
});
