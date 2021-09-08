import React, { FC } from 'react';
import Select, { ValueType, ActionMeta } from 'react-select';
import { Form } from 'react-bootstrap';

type TSelectOption = { value: number; label: string };
type TOnChange = (value: ValueType<TSelectOption, false>, action: ActionMeta<TSelectOption>) => void;

type TLabeledSelectProps = {
    id: string;
    label: string;
    value: TSelectOption | null;
    options: TSelectOption[];
    className?: string;
    onChange?: TOnChange;
};

const LabeledSelect: FC<TLabeledSelectProps> = ({ id, label, value, options, className = '', onChange }) => {
    return (
        <Form.Group className={'mb-3 ' + className} controlId={id}>
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Select
                inputId={id}
                searchable
                isClearable={true}
                name="form-field-name"
                options={options}
                value={value}
                onChange={onChange}
            />
        </Form.Group>
    );
};

export default LabeledSelect;
