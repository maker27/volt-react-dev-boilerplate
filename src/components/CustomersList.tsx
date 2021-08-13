import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../assets/constants';
import api from '../api';
import { RootState } from '../store';
import SimpleTable from './SimpleTable';
import ModalWindow from './ModalWindow';
import CustomerForm from './forms/CustomerForm';
import { EditLink, RemoveLink } from './Links';
import useModalState, { modalModes } from '../hooks/useModalState';
import { ICustomer, TObjectOf } from '../types';
import { setCurrentCustomer } from '../store/customerSlice';
import useModal from '../hooks/useModal';
import ListHeader from './ListHeader';

const modalHeaders: TObjectOf<string> = {
    create: 'Create new customer',
    edit: 'Edit customer',
    delete: 'Delete customer'
};

export default function CustomersList(): JSX.Element {
    const { all: customers, current: customer } = useSelector((state: RootState) => state.customers);
    const dispatch = useDispatch();
    const setCustomer = (newCustomer?: ICustomer) => dispatch(setCurrentCustomer(newCustomer));

    const [modalOptions, toggleModalVisible] = useModal(() => {
        switch (modalMode.mode) {
            case 'create':
                api.createCustomer(customer);
                break;
            case 'edit':
                api.editCustomer(customer.id, customer);
                break;
            case 'delete':
                api.deleteCustomer(customer.id);
                break;
        }
    });
    const [modalMode, setModalMode] = useModalState(0);

    const showModal = (mode: modalModes) => {
        setModalMode(mode);
        toggleModalVisible();
    };

    return (
        <>
            <ListHeader
                title={routes.customers.title}
                buttonText="Create"
                onButtonClick={() => {
                    setCustomer();
                    showModal(0);
                }}
            />
            <ModalWindow {...modalOptions} header={modalHeaders[modalMode.mode]} okText={modalMode.okText}>
                {modalMode.mode === 'delete' ? (
                    <div>
                        <p>{`${customer.name} - ${customer.address}, ${customer.phone}`}</p>
                        Are you sure you want to delete this customer?
                    </div>
                ) : (
                    <CustomerForm customer={customer} setFormData={setCustomer} />
                )}
            </ModalWindow>
            <SimpleTable
                columns={['#', 'Name', 'Address', 'Phone', '']}
                rows={Object.values(customers).map(({ id, name, address, phone }) => [
                    id,
                    name || `Anonim #` + id,
                    address,
                    phone,
                    <>
                        <EditLink
                            key={'edit' + id}
                            onClick={() => {
                                setCustomer({ id, name, address, phone });
                                showModal(1);
                            }}
                        />{' '}
                        <RemoveLink
                            key={'delete' + id}
                            onClick={() => {
                                setCustomer({ id, name, address, phone });
                                showModal(2);
                            }}
                        />
                    </>
                ])}
            />
        </>
    );
}
