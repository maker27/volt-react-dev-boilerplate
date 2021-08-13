import React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeStatus, TStatus } from '../store/statusSlice';

const alertStyles = {
    0: 'warning',
    1: 'success',
    2: 'danger'
};

function SingleAlert({ id, type, value }: TStatus): JSX.Element {
    const dispatch = useDispatch();
    return (
        <Alert variant={alertStyles[type]} onClose={() => dispatch(removeStatus(id))} dismissible>
            {value}
        </Alert>
    );
}

export default function InfoPanel(): JSX.Element {
    const statusesList = useSelector((state: RootState) => state.status.list);
    return (
        <>
            {statusesList.map(({ id, type, value }) => (
                <SingleAlert key={id} id={id} type={type} value={value} />
            ))}
        </>
    );
}
