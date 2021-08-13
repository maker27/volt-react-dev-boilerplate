import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ICustomer, IInvoice, IInvoiceItem, IProduct, TObjectOf, TInvoiceItem } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import InvoiceForm from './forms/InvoiceForm';
import { setCurrentInvoice } from '../store/invoiceSlice';
import { routes } from '../assets/constants';
import api from '../api';
import { useHistory } from 'react-router-dom';

const InvoiceCreate: FC = () => {
    const [customers, products, invoice]: [
        TObjectOf<ICustomer>,
        TObjectOf<IProduct>,
        IInvoice
    ] = useSelector((state: RootState) => [state.customers.all, state.products.all, state.invoices.current]);
    const [invoiceItems, setInvoiceItems] = useState<TObjectOf<IInvoiceItem>>({});
    const dispatch = useDispatch();
    const history = useHistory();

    const setInvoice = (invoice?: IInvoice) => {
        dispatch(setCurrentInvoice(invoice));
    };

    useEffect(() => {
        setInvoice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewInvoice = async () => {
        api.addNewInvoice(invoice, Object.values(invoiceItems));
        history.push(routes.invoices.url);
    };

    const setInvoiceItem = (invoiceItem: TInvoiceItem | IInvoiceItem) => {
        setInvoiceItems(prevInvoiceItems => ({ ...prevInvoiceItems, [invoiceItem.product_id]: invoiceItem }));
    };

    return (
        <>
            <InvoiceForm
                title={routes.invoices_create.title}
                customers={customers}
                products={products}
                invoice={invoice}
                invoiceItems={invoiceItems}
                invoiceId={0}
                setCurrentInvoice={setInvoice}
                addInvoiceItem={setInvoiceItem}
                editInvoiceItem={setInvoiceItem}
                deleteInvoiceItem={(invoiceItem: IInvoiceItem) => {
                    setInvoiceItems(prevInvoiceItems => {
                        const allInvoiceItems = { ...prevInvoiceItems };
                        delete allInvoiceItems[invoiceItem.product_id];
                        return allInvoiceItems;
                    });
                }}
            />
            <div className="text-center">
                <Button className="btn btn-success" onClick={addNewInvoice}>
                    Add invoice
                </Button>
            </div>
        </>
    );
};

export default InvoiceCreate;
