import { useState } from 'react';

export default function useModal(
    onConfirm: () => void
): [{ visible: boolean; onClose: () => void; onConfirm: () => void }, () => void] {
    const [visible, setVisible] = useState(false);
    const closeModal = () => {
        setVisible(false);
    };
    const confirmModal = () => {
        onConfirm();
        closeModal();
    };
    const toggleModalVisible = () => {
        setVisible(prevState => !prevState);
    };
    return [{ visible, onClose: closeModal, onConfirm: confirmModal }, toggleModalVisible];
}
