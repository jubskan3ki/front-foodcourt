import { ChangeEvent } from 'react';

export type SelectProps = {
    id: string;
    label?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    labelOptions?: string[];
    name: string;
    value: string | string[];
    selectClasses?: string;
};
