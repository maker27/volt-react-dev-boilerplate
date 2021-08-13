import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import SimpleTable from '../SimpleTable';
import { Button, Form, InputGroup } from 'react-bootstrap';
import LabeledInput from './LabeledInput';
import LabeledSelect from './LabeledSelect';
import {
    ICustomer,
    IInvoice,
    IInvoiceItem,
    IProduct,
    TInvoice,
    TInvoiceItem,
    TObjectOf,
    TOnChangeEvent
} from '../../types';
import { getInvoiceTotal } from '../../utils';

const toSelectOption = ({ id, name }: ICustomer | IProduct) => ({ value: id, label: name });

type TInvoiceFormProps = {
    title: string;
    customers: TObjectOf<ICustomer>;
    products: TObjectOf<IProduct>;
    invoice: IInvoice;
    invoiceItems: TObjectOf<IInvoiceItem>;
    invoiceId: number;
    setCurrentInvoice: (invoice?: IInvoice) => void;
    addInvoiceItem: (invoiceItem: TInvoiceItem) => void;
    editInvoiceItem: (invoiceItem: IInvoiceItem) => void;
    deleteInvoiceItem: (invoiceItem: IInvoiceItem) => void;
};

const DeleteButton: FC<{ onClick?: MouseEventHandler }> = ({ onClick }) => {
    return (
        <button type="button" className="btn btn-outline-danger" onClick={onClick}>
            <i className="bi bi-trash"> </i> Delete
        </button>
    );
};

const InvoiceForm: FC<TInvoiceFormProps> = ({
    title,
    customers,
    products,
    invoice,
    invoiceItems,
    invoiceId,
    setCurrentInvoice,
    addInvoiceItem,
    editInvoiceItem,
    deleteInvoiceItem
}) => {
    const [productId, setProductId] = useState<number>(0);
    const setInvoiceProp = (prop: keyof TInvoice) => ({ target }: TOnChangeEvent) => {
        if (prop === 'discount') {
            const number = +target.value;
            if (number < 0 || number > 100) return;
        }
        setCurrentInvoice({ ...invoice, [prop]: target.value });
    };
    const currentCustomer = customers[invoice.customer_id];
    const currentProduct = products[productId];

    useEffect(() => {
        const total = getInvoiceTotal(invoiceItems, products, invoice.discount);
        if (invoice.total !== total) {
            setCurrentInvoice({ ...invoice, total });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceItems, invoice.discount]);

    return (
        <>
            <h2>{title}</h2>
            <Form className="w-50">
                <LabeledInput
                    className="w-50"
                    id="form-invoice-discount"
                    label="Discount (%)"
                    type="number"
                    value={invoice.discount.toString()}
                    onChange={setInvoiceProp('discount')}
                />
                <LabeledSelect
                    id="form-invoice-customer"
                    label="Customer"
                    value={currentCustomer ? toSelectOption(currentCustomer) : null}
                    options={Object.values(customers).map(toSelectOption)}
                    onChange={selectedOption => {
                        setCurrentInvoice({ ...invoice, customer_id: selectedOption?.value ?? 0 });
                    }}
                />
                <InputGroup className="mb-3">
                    <LabeledSelect
                        className="w-75"
                        id="form-invoice-product"
                        label="Add product"
                        value={currentProduct ? toSelectOption(currentProduct) : null}
                        options={Object.values(products).map(toSelectOption)}
                        onChange={selectedOption => {
                            setProductId(selectedOption?.value ?? 0);
                        }}
                    />
                    <Button
                        variant="outline-secondary"
                        className="button-invoice-add"
                        onClick={() => {
                            if (productId) {
                                const addedItem = Object.values(invoiceItems).find(
                                    ({ product_id }) => product_id === productId
                                );
                                if (addedItem) {
                                    editInvoiceItem({
                                        ...addedItem,
                                        quantity: addedItem.quantity + 1
                                    });
                                } else {
                                    addInvoiceItem({
                                        invoice_id: invoiceId,
                                        product_id: productId,
                                        quantity: 1
                                    });
                                }
                            }
                        }}>
                        Add
                    </Button>
                </InputGroup>
            </Form>
            <SimpleTable
                columns={['Name', 'Price', 'Qty', '']}
                rows={Object.values(invoiceItems).map(invoiceItem => {
                    const { id, product_id, quantity } = invoiceItem;
                    const product = products[product_id];
                    return [
                        product.name,
                        product.price,
                        <Form.Control
                            className="w-25"
                            key={'product' + id}
                            type="number"
                            step="1"
                            value={quantity}
                            onChange={({ target }) => {
                                editInvoiceItem({
                                    ...invoiceItem,
                                    quantity: +target.value
                                });
                            }}
                        />,
                        <DeleteButton
                            key={'delete' + id}
                            onClick={() => {
                                deleteInvoiceItem(invoiceItem);
                            }}
                        />
                    ];
                })}
            />
            <h4>Total: {invoice.total}</h4>
        </>
    );
};

export default InvoiceForm;
