import React from 'react';
import { routes } from '../assets/constants';
import api from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import SimpleTable from './SimpleTable';
import useModalState, { modalModes } from '../hooks/useModalState';
import { IProduct, TObjectOf } from '../types';
import ModalWindow from './ModalWindow';
import ProductForm from './forms/ProductForm';
import { EditLink, RemoveLink } from './Links';
import { setCurrentProduct } from '../store/productSlice';
import useModal from '../hooks/useModal';
import ListHeader from './ListHeader';

const modalHeaders: TObjectOf<string> = {
    create: 'Add new product',
    edit: 'Edit product',
    delete: 'Delete product'
};

export default function ProductsList(): JSX.Element {
    const { all: products, current: product } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();
    const setProduct = (newProduct?: IProduct) => dispatch(setCurrentProduct(newProduct));

    const [modalOptions, toggleModalVisible] = useModal(() => {
        switch (modalMode.mode) {
            case 'create':
                return api.createProduct(product);
            case 'edit':
                return api.editProduct(product.id, product);
            case 'delete':
                return api.deleteProduct(product.id);
        }
        return null;
    });
    const [modalMode, setModalMode] = useModalState(0);

    const showModal = (mode: modalModes) => {
        setModalMode(mode);
        toggleModalVisible();
    };

    return (
        <>
            <ListHeader
                title={routes.products.title}
                buttonText="Create"
                onButtonClick={() => {
                    setProduct();
                    showModal(0);
                }}
            />
            <ModalWindow {...modalOptions} header={modalHeaders[modalMode.mode]} okText={modalMode.okText}>
                {modalMode.mode === 'delete' ? (
                    <div>
                        <p>{`${product.name} - ${product.price}`}</p>
                        Are you sure you want to delete this product?
                    </div>
                ) : (
                    <ProductForm product={product} setFormData={setProduct} />
                )}
            </ModalWindow>
            <SimpleTable
                columns={['#', 'Name', 'Price', '']}
                rows={Object.values(products).map(({ id, name, price }) => [
                    id,
                    name,
                    Number(price).toFixed(2),
                    <>
                        <EditLink
                            key={'edit' + id}
                            onClick={() => {
                                setProduct({ id, name, price });
                                showModal(1);
                            }}
                        />{' '}
                        <RemoveLink
                            key={'delete' + id}
                            onClick={() => {
                                setProduct({ id, name, price });
                                showModal(2);
                            }}
                        />
                    </>
                ])}
            />
        </>
    );
}
