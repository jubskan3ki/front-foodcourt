export interface Question {
    id: string;
    label: string;
    name: string;
    type:
        | 'text'
        | 'password'
        | 'checkbox'
        | 'email'
        | 'number'
        | 'tel'
        | 'date'
        | 'month'
        | 'range'
        | 'switch'
        | 'select';
    placeholder?: string;
    required?: boolean;
    options?: Array<{ label: string; value: string }>;
}
