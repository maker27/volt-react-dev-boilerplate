import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import ProductForm from '../../src/components/forms/ProductForm';
import { IProduct } from '../../src/types';
import { addProduct, setCurrentProduct } from '../../src/store/productSlice';
import { testProductsList } from '../data';

const setFormData = jest.fn();

const renderForm = (product: IProduct): RenderResult => {
    const setProduct = (newProduct?: IProduct) => store.dispatch(setCurrentProduct(newProduct));
    return render(
        <Provider store={store}>
            <ProductForm product={product} setFormData={setProduct} />
        </Provider>
    );
};

const getProduct = (productId: number): IProduct => {
    const product = store.getState().products.all[productId];
    expect(product).not.toBeUndefined();
    return product as IProduct;
};

const getCurrentProduct = (): IProduct => {
    const product = store.getState().products.current;
    expect(product).not.toBeUndefined();
    return product as IProduct;
};

describe('ProductForm', () => {
    const addedProduct = testProductsList[0];
    beforeAll(() => {
        store.dispatch(addProduct(addedProduct));
    });

    test('renders form', () => {
        const product = getProduct(addedProduct.id);
        const { asFragment } = renderForm(product);
        expect(asFragment()).toMatchSnapshot();
    });

    test('changes name field', () => {
        let product = getProduct(addedProduct.id);
        const newValue = 'Test Name';

        const { asFragment, rerender } = renderForm(product);
        let textInput = screen.getByLabelText('Name') as HTMLInputElement;
        expect(textInput.value).toBe(addedProduct.name);
        fireEvent.change(textInput, { target: { value: newValue } });

        textInput = screen.getByLabelText('Name') as HTMLInputElement;
        product = getCurrentProduct();
        expect(product).toMatchInlineSnapshot(`
            Object {
              "id": ${addedProduct.id},
              "name": "${newValue}",
              "price": ${addedProduct.price},
            }
        `);

        rerender(
            <Provider store={store}>
                <ProductForm product={product} setFormData={setFormData} />
            </Provider>
        );
        expect(textInput.value).toBe(newValue);
        expect(asFragment()).toMatchSnapshot();
    });
});
