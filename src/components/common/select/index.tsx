import { useEffect, ChangeEvent } from 'react';
import { SelectProps } from '../../../interface/components/common/select.interface';

function Select({
    id,
    label,
    onChange,
    options = [],
    labelOptions = [],
    name,
    value,
    selectClasses = 'select',
}: SelectProps) {
    useEffect(() => {
        if (options.length > 0 && (!value || value === undefined) && onChange) {
            onChange({
                target: {
                    name,
                    value: options[0],
                },
            } as ChangeEvent<HTMLSelectElement>);
        }
    }, [name, value, options, onChange]);

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                onChange={onChange}
                className={selectClasses}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={option} value={labelOptions[index] || option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
