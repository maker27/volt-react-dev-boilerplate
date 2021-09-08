import React, { useEffect } from 'react';
import { RootState } from '../store';
import { setCurrentInvoice } from '../store/invoiceSlice';
import { connect } from 'react-redux';
import InvoiceForm from './forms/InvoiceForm';
import { useParams } from 'react-router-dom';
import api from '../api';
import { routes } from '../assets/constants';
import LoadingIndicator from './LoadingIndicator/LoadingIndicator';

type TInvoiceEditProps = ReturnType<typeof mapState> & typeof mapDispatch;

const InvoiceEdit = ({
    invoice,
    invoices,
    products,
    invoiceItems,
    setCurrentInvoice,
    ...props
}: TInvoiceEditProps) => {
    const { id } = useParams<{ id: string }>();
    const invoiceId = +id;

    useEffect(() => {
        api.getInvoiceItems(invoiceId).then(() => {
            setCurrentInvoice(invoices[invoiceId]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceId]);

    if (!invoice.id) return <LoadingIndicator />;

    return (
        <InvoiceForm
            title={routes.invoices_edit.title}
            invoiceId={invoiceId}
            invoice={invoice}
            products={products}
            invoiceItems={invoiceItems}
            setCurrentInvoice={async editedInvoice => {
                if (editedInvoice) {
                    const { id, ...invoiceData } = editedInvoice;
                    await api.editInvoice(id, invoiceData);
                }
            }}
            {...props}
            addInvoiceItem={api.addInvoiceItem.bind(api)}
            editInvoiceItem={api.editInvoiceItem.bind(api)}
            deleteInvoiceItem={api.deleteInvoiceItem.bind(api)}
        />
    );
};

const mapState = (state: RootState) => ({
    customers: state.customers.all,
    products: state.products.all,
    invoices: state.invoices.all,
    invoice: state.invoices.current,
    invoiceItems: state.invoices.items
});

const mapDispatch = {
    setCurrentInvoice
};

export default connect(mapState, mapDispatch)(InvoiceEdit);
