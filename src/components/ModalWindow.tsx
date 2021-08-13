import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type TModalProps = {
    visible: boolean;
    children: React.ReactNode;
    header?: string;
    okText?: string | undefined;
    cancelText?: string;
    onConfirm: () => void;
    onClose?: () => void;
};

export default function ModalWindow({
    visible,
    children,
    header = 'Warning',
    okText = 'OK',
    cancelText = 'Cancel',
    onConfirm,
    onClose
}: TModalProps): JSX.Element {
    return (
        <Modal show={visible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    {okText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
