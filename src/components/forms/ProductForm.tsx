import React from 'react';
import { Form } from 'react-bootstrap';
import { TOnChangeEvent, TProduct, IProduct, TFormDataSetter } from '../../types';
import LabeledInput from './LabeledInput';

export default function ProductForm({
    product,
    setFormData
}: {
    product: IProduct;
    setFormData: TFormDataSetter<IProduct>;
}): JSX.Element {
    const setProductProp = (prop: keyof TProduct) => ({ target }: TOnChangeEvent) => {
        if (prop === 'price' && !/^(\d)*(\.)?([0-9]{0,2})?$/.test(target.value)) return;
        setFormData({ ...product, [prop]: target.value });
    };
    return (
        <Form>
            <LabeledInput
                id="form-product-name"
                label="Name"
                value={product.name}
                placeholder="Product Name"
                onChange={setProductProp('name')}
            />
            <LabeledInput
                id="form-product-price"
                label="Price (0.00)"
                value={String(product.price)}
                placeholder="00.00"
                onChange={setProductProp('price')}
            />
        </Form>
    );
}
