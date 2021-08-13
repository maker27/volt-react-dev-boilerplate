import React from 'react';
import { routes } from '../assets/constants';
import SimpleTable from './SimpleTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { EditLink, RemoveLink } from './Links';
import { IInvoice, TObjectOf } from '../types';
import { setCurrentInvoice } from '../store/invoiceSlice';
import useModalState, { modalModes } from '../hooks/useModalState';
import api from '../api';
import ModalWindow from './ModalWindow';
import useModal from '../hooks/useModal';
import ListHeader from './ListHeader';

const modalHeaders: TObjectOf<string> = {
    delete: 'Delete invoice'
};

export default function InvoicesList(): JSX.Element {
    const { all: invoices, current: invoice } = useSelector((state: RootState) => state.invoices);
    const dispatch = useDispatch();
    const setInvoice = (newInvoice?: IInvoice) => dispatch(setCurrentInvoice(newInvoice));

    const [modalOptions, toggleModalVisible] = useModal(() => {
        switch (modalMode.mode) {
            case 'delete':
                api.deleteInvoice(invoice.id);
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
            <ListHeader title={routes.invoices.title} buttonText="Create" to={routes.invoices_create.url} />
            <ModalWindow {...modalOptions} header={modalHeaders[modalMode.mode]} okText={modalMode.okText}>
                <div>
                    <p>{`${invoice.customer_id} - ${invoice.total}`}</p>
                    Are you sure you want to delete this Invoice?
                </div>
            </ModalWindow>
            <SimpleTable
                columns={['#', 'customer', 'discount', 'total', '']}
                rows={Object.values(invoices).map(({ id, customer_id, discount, total }) => [
                    id,
                    customer_id,
                    discount,
                    total,
                    <>
                        <EditLink
                            key={'edit' + id}
                            to={routes.invoices_edit.url.replace(':id', id.toString())}
                        />{' '}
                        <RemoveLink
                            key={'delete' + id}
                            onClick={() => {
                                setInvoice({ id, customer_id, discount, total });
                                showModal(2);
                            }}
                        />
                    </>
                ])}
            />
        </>
    );
}
