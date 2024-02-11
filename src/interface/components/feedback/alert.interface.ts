export type AlertProps = {
    type?:
        | string
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'default'
        | undefined
        | null;
    message: string | undefined | null;
    icon?: React.ComponentType<{ className?: string }>;
    duration?: number;
};

export type ExtendedAlertProps = AlertProps & {
    key: number;
};
