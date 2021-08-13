import React from 'react';
import { Form } from 'react-bootstrap';
import { TOnChangeEvent, TCustomer, ICustomer, TFormDataSetter } from '../../types';
import LabeledInput from './LabeledInput';

export default function CustomerForm({
    customer,
    setFormData
}: {
    customer: ICustomer;
    setFormData: TFormDataSetter<ICustomer>;
}): JSX.Element {
    const setCustomerProp = (prop: keyof TCustomer) => ({ target }: TOnChangeEvent) => {
        setFormData({ ...customer, [prop]: target.value });
    };
    const { name, address, phone } = customer;
    return (
        <Form>
            <LabeledInput
                id="form-customer-name"
                label="Name"
                value={name}
                placeholder="Customer Name"
                onChange={setCustomerProp('name')}
            />
            <LabeledInput
                id="form-customer-address"
                label="Address"
                value={address}
                onChange={setCustomerProp('address')}
            />
            <LabeledInput
                id="form-customer-phone"
                label="Phone"
                value={phone}
                onChange={setCustomerProp('phone')}
            />
        </Form>
    );
}
