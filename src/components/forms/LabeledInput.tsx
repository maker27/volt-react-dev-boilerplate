import { TOnChangeEvent } from '../../types';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type TLabeledInputProps = {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    type?: string;
    className?: string;
    maxLength?: number;
    onChange?: (e: TOnChangeEvent) => void;
};

const LabeledInput: FC<TLabeledInputProps> = ({
    id,
    label,
    value,
    placeholder,
    type = 'text',
    className = '',
    maxLength = 255,
    onChange
}) => {
    return (
        <Form.Group className={'mb-3 ' + className} controlId={id}>
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
            />
        </Form.Group>
    );
};

export default LabeledInput;
