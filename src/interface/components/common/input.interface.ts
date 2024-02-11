export type InputProps = {
    id: string;
    label?: string;
    name: string;
    value: string;
    type?: string;
    placeholder?: string;
    error?: string;
    icon?: React.ComponentType<{ className?: string }>;
    variant?: 'inputIcon' | null;
    minLength?: number;
    maxLength?: number;
    inputClasses?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
